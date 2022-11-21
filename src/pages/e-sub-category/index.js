import React, { useCallback, useEffect, useState } from 'react';
import { Edit2, Trash2 } from 'react-feather';
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
    const [subCategoryDelete, setSubCategoryDelete] = useState({ show: false, loading: false, value: null })

    // fetch sub-category data
    const fetchSubCategory = useCallback(async (page) => {
        try {
            setLoading(true)
            const response = await Requests.ESubCategory.Index(page, limit)
            console.log(response)
            if (response && response.data && response.data.body && response.status === 200) {
                setData(response.data.body.subcategory)
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
        fetchSubCategory(1)
    }, [fetchSubCategory])

    // handle paginate page change
    const handlePageChange = page => {
        fetchSubCategory(page)
    }

    // handle paginate row change
    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true)
        const response = await Requests.ESubCategory.Index(page, newPerPage)
        setData(response.data.body.subcategory)
        setLimit(newPerPage)
        setLoading(false)
    }

    // Handle sub-category delete
    const handleSubCategoryDelete = async () => {
        try {
            setSubCategoryDelete({ ...subCategoryDelete, loading: true })
            const response = await Requests.ESubCategory.Delete(subCategoryDelete.value._id)
            if (response && response.status === 200) {
                fetchSubCategory(1)
                Toastify.Success('Sub Category Deleted Successfully')
            }
            setSubCategoryDelete({ ...subCategoryDelete, loading: false, show: false })
        } catch (error) {
            setSubCategoryDelete({ ...subCategoryDelete, loading: false, show: false })
            if (error) {
                if (error.response) {
                    await CustomError(error.response)
                } else {
                    Toastify.Error("Something going wrong.")
                }
            }
        }
    }

    // data columns
    const columns = [
        {
            name: "Title image",
            selector: row => row.banner ?
                <Image
                    src={Requests.HostUrl + row.banner}
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
            name: "Category",
            selector: row => row.category && row.category.name ? row.category.name : "N/A",
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
                    <Link to={`/dashboard/e-sub-category/edit/${row._id}`}>
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
                            onClick={() => setSubCategoryDelete({ ...subCategoryDelete, value: row, show: true })}
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
                    mainTitle="Manage E-Sub-Category"
                    subTitle="Manage your e-sub-category"
                    tag="Home / E-Sub-Category /"
                    pageTag="Manage e-sub-category"
                />

                {/* Add e-sub-category button */}
                <Container.Column className="text-end">
                    <Link to={"/dashboard/e-sub-category/store"}>
                        <PrimaryButton className="px-4 mb-3">
                            <Text className="fs-15 mb-0">Add e-sub-category</Text>
                        </PrimaryButton>
                    </Link>
                </Container.Column>

                {/* Main e-sub-category card */}
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
                            // clearSearch={() => fetchSubCategory(1)}
                            />
                        </Card.Body>
                    </Card.Simple>
                </Container.Column>
            </div>

            {/* Delete E-Sub-Category confirmation modal */}
            <DeleteModal
                show={subCategoryDelete.show}
                loading={subCategoryDelete.loading}
                message={<Text className="fs-15">Want to delete {subCategoryDelete.value ? subCategoryDelete.value.title : null} category ?</Text>}
                onHide={() => setSubCategoryDelete({ value: null, show: false, loading: false })}
                doDelete={handleSubCategoryDelete}
            />
        </div>
    );
}

export default Index;