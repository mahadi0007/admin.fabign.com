import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Trash2 } from 'react-feather';
import { Text } from '../../components/text';
import { DataTable } from '../../components/table';
import { Image } from '../../components/image/Index';
import { TitleBar } from '../../components/titleBar';
import { Card } from '../../components/card';
import { Container } from '../../components/container';
import { DangerButton, PrimaryButton } from '../../components/button';
import { Requests } from '../../utils/http';
import { CustomError } from '../../utils/error';
import { Toastify } from '../../components/toastify';
import { DeleteModal } from '../../components/modal';

const Index = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalRows, setTotalRows] = useState(0)
    const [limit, setLimit] = useState(10)
    const [searchLoading, setsearchLoading] = useState(false)
    const [leafCategoryDelete, setLeafCategoryDelete] = useState({ show: false, loading: false, value: null })
    // fetch category data
    const fetchLeafCategory = useCallback(async (page) => {
        try {
            setLoading(true)
            const response = await Requests.LeafCategory.Index(page, limit)
            if (response && response.status === 200) {
                setData(response.data.data)
                setTotalRows(response.data.total)
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
        fetchLeafCategory(1)
    }, [fetchLeafCategory])

    // handle paginate page change
    const handlePageChange = page => fetchLeafCategory(page)

    // handle paginate row change
    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true)
        const response = await Requests.LeafCategory.Index(page, newPerPage)
        setData(response.data.data)
        setLimit(newPerPage)
        setLoading(false)
    }

    // Handle search
    const handleSearch = async data => {
        setsearchLoading(true)
        const response = await Requests.Search.LeafCategory(data)
        if (response.data) setData(response.data.data)
        setsearchLoading(false)
    }

    // Handle search suggestion
    const handleSuggestion = async (value) => {
        let data = {
            results: [],
            message: null
        }
        const response = await Requests.Search.LeafCategory(value)
        if (response && response.data.data && response.data.data.length) {
            for (let i = 0; i < response.data.data.length; i++) {
                const element = response.data.data[i]
                data.results.push(element.title)
            }
        } else {
            data.message = "No results found"
        }
        return data
    }

    // Handle leaf category delete
    const handleCategoryDelete = async () => {
        try {
            setLeafCategoryDelete({ ...leafCategoryDelete, loading: true })
            const response = await Requests.LeafCategory.Delete(leafCategoryDelete.value._id)
            if (response && response.status === 200) {
                fetchLeafCategory(1)
                Toastify.Success('Leaf-Category Deleted Successfully')
            }
            setLeafCategoryDelete({ ...leafCategoryDelete, loading: false, show: false })
        } catch (error) {
            setLeafCategoryDelete({ ...leafCategoryDelete, loading: false, show: false })
            if (error) {
                if (error.response) {
                    await CustomError(error.response)
                } else {
                    Toastify.Error("Something going wrong.")
                }
            }
        }
    }

    const customStyle = {
        cursor: "pointer"
    }

    // data columns
    const columns = [
        {
            name: "Title image",
            selector: row => row.title_image ?
                <Image
                    src={row.title_image}
                    className="my-1"
                    alt="..."
                    x={50}
                    y={50}
                />
                : "N/A",
            maxWidth: "15px",
        },
        {
            name: "Main image",
            selector: row => row.main_image ?
                <Image
                    src={row.main_image}
                    alt="..."
                    x={50}
                    y={50}
                />
                : "N/A",
            maxWidth: "15px",
        },
        {
            name: "Title",
            selector: row => row.title || "N/A",
            sortable: true,
            maxWidth: "300px"
        },
        {
            name: "Description",
            selector: row => <div data-bs-toggle="tooltip" data-bs-placement="top" title={row.description} style={customStyle}>
                {row.description}
            </div> || "N/A",
            maxWidth: "400px"
        },
        {
            name: "Hidden",
            sortable: true,
            selector: row => row.is_hidden ? <EyeOff className="text-muted" size={18} /> : <Eye size={18} />,
            maxWidth: "40px"
        },
        {
            name: "Action",
            grow: 0,
            cell: row =>
                <div>
                    {row.is_deleteable === true ?
                        <DangerButton
                            type="button"
                            className="btn-circle"
                            onClick={() => setLeafCategoryDelete({ ...leafCategoryDelete, value: row, show: true })}
                        ><Trash2 size={18} />
                        </DangerButton>
                        : null}
                </div>
        }
    ]

    return (
        <div>
            <TitleBar
                mainTitle="Manage Leaf Category"
                subTitle="Manage leaf-category"
                tag="Home / Leaf Category /"
                pageTag="Manage your leaf-category"
            />

            <Container.Column className="text-end">
                <Link to="/dashboard/leaf-category/store">
                    <PrimaryButton className="px-4 mb-3">
                        <Text className="fs-15 mb-0">Add leaf category</Text>
                    </PrimaryButton>
                </Link>
            </Container.Column>

            {/* Main category card */}
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
                            searchable
                            placeholder={"Search"}
                            search={handleSearch}
                            suggestion={handleSuggestion}
                            searchLoading={searchLoading}
                            clearSearch={() => fetchLeafCategory(1)}
                        />
                    </Card.Body>
                </Card.Simple>
            </Container.Column>

            {/* Delete leaf category confirmation modal */}
            <DeleteModal
                show={leafCategoryDelete.show}
                loading={leafCategoryDelete.loading}
                message={<Text className="fs-15">Want to delete {leafCategoryDelete.value ? leafCategoryDelete.value.title : null} leaf-category ?</Text>}
                onHide={() => setLeafCategoryDelete({ value: null, show: false, loading: false })}
                doDelete={handleCategoryDelete}
            />
        </div>
    );
}

export default Index;