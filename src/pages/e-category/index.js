import React, { useCallback, useEffect, useState } from 'react';
import { Edit2 , Trash2} from 'react-feather';
import { Link } from 'react-router-dom';
import { PrimaryButton, SuccessButton, DangerButton } from '../../components/button';
import { Container } from '../../components/container';
import { DeleteModal } from '../../components/modal';
import { Image } from '../../components/image/Index';
import { TitleBar } from '../../components/titleBar';
import { Toastify } from '../../components/toastify';
import { DataTable } from '../../components/table';
import { CustomError } from '../../utils/error';
import { Text } from '../../components/text';
import { Card } from '../../components/card';
import { Requests } from '../../utils/http';

const Index = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalRows, setTotalRows] = useState(0)
    const [limit, setLimit] = useState(10)
    const [categoryDelete, setCategoryDelete] = useState({ show: false, loading: false, value: null })

    // fetch category data
    const fetchCategory = useCallback(async (page) => {
        try {
            setLoading(true)
            const response = await Requests.ECategory.Index(page, limit)
            if (response && response.data && response.data.body && response.status === 200) {
                setData(response.data.body.category)
                setTotalRows(response.data.body.total)
            }
            setLoading(false)
        } catch (error) {
            if (error) {
                setLoading(false)
                if (error.response) {
                    await CustomError(error.response)
                } else {
                    Toastify.Error("Something going wrong.")
                }
            }
        }
    }, [limit])

    useEffect(() => {
        fetchCategory(1)
    }, [fetchCategory])

    // handle paginate page change
    const handlePageChange = page => {
        fetchCategory(page)
    }

    // handle paginate row change
    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true)
        const response = await Requests.ECategory.Index(page, newPerPage)
        setData(response.data.body.category)
        setLimit(newPerPage)
        setLoading(false)
    }

    // Handle category delete
    const handleCategoryDelete = async () => {
        try {
            setCategoryDelete({ ...categoryDelete, loading: true })
            const response = await Requests.ECategory.Delete(categoryDelete.value._id)
            if (response && response.status === 200) {
                fetchCategory(1)
                Toastify.Success('Category Deleted Successfully')
            }
            setCategoryDelete({ ...categoryDelete, loading: false, show: false })
        } catch (error) {
            setCategoryDelete({ ...categoryDelete, loading: false, show: false })
            if (error) {
                if (error.response) {
                    await CustomError(error.response)
                } else {
                    Toastify.Error("Something going wrong.")
                }
            }
        }
    }

    console.log(data)

    // data columns
    const columns = [
        {
            name: "Title image",
            selector: row => row.banner ?
                <Image
                    src={Requests.HostUrl+row.banner}
                    className="my-1"
                    alt="..."
                    x={50}
                    y={50}
                />
                : "N/A",
            maxWidth: "15px",
        },
        {
            name: "Name",
            selector: row => row.name || "N/A",
            sortable: true
        },
        {
            name: "Is Active",
            selector: row => row.isActive === true ? "True" : "False" || "N/A",
        },
        {
            name: "Action",
            grow: 0,
            minWidth: "200px",
            cell: row =>
                <div>
                    <Link to={`/dashboard/e-category/edit/${row._id}`}>
                        <SuccessButton
                            type="button"
                            className="btn-circle me-1"
                        >
                            <Edit2 size={18} />
                        </SuccessButton>
                    </Link>

                    {row.products.length < 1 ?
                        <DangerButton
                            type="button"
                            className="btn-circle"
                            onClick={() => setCategoryDelete({ ...categoryDelete, value: row, show: true })}
                        ><Trash2 size={18} />
                        </DangerButton>
                        : null
                    }
                </div>
        }
    ]

    return (
        <div>
            <div>

                {/* Title bar */}
                <TitleBar
                    mainTitle="Manage E-Category"
                    subTitle="Manage your e-category"
                    tag="Home / E-Category /"
                    pageTag="Manage e-category"
                />

                {/* Add e-category button */}
                <Container.Column className="text-end">
                    <Link to={"/dashboard/e-category/store"}>
                        <PrimaryButton className="px-4 mb-3">
                            <Text className="fs-15 mb-0">Add e-category</Text>
                        </PrimaryButton>
                    </Link>
                </Container.Column>

                {/* Main e-category card */}
                <Container.Column>
                    <Card.Simple className="border-0">
                        <Card.Body>
                            <DataTable
                                columns={columns}
                                data={data}
                                loading={loading}
                                totalRows={totalRows}
                                handlePerRowsChange={handlePerRowsChange}
                                handlePageChange={handlePageChange}
                            // searchable
                            // placeholder={"Search"}
                            // search={handleSearch}
                            // suggestion={handleSuggestion}
                            // searchLoading={searchLoading}
                            // clearSearch={() => fetchCategory(1)}
                            />
                        </Card.Body>
                    </Card.Simple>
                </Container.Column>
            </div>

            {/* Delete E-Category confirmation modal */}
            <DeleteModal
                show={categoryDelete.show}
                loading={categoryDelete.loading}
                message={<Text className="fs-15">Want to delete {categoryDelete.value ? categoryDelete.value.title : null} category ?</Text>}
                onHide={() => setCategoryDelete({ value: null, show: false, loading: false })}
                doDelete={handleCategoryDelete}
            />
        </div>
    );
}

export default Index;