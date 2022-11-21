import React,{ useCallback, useEffect, useState } from "react";
import { AlignJustify } from 'react-feather';
import { Link, useHistory, useParams } from "react-router-dom";
// import { ESubCategoryForm } from '../../components/form/ESubCategoryForm ';
import { PrimaryButton } from '../../components/button';
import { Container } from '../../components/container';
import { TitleBar } from '../../components/titleBar';
import { Toastify } from '../../components/toastify';
import { Loader } from '../../components/loading';
import { CustomError } from '../../utils/error';
import { Card } from '../../components/card';
import { Text } from '../../components/text';
import { Requests } from '../../utils/http';
import { ESubCategoryForm } from "../../components/form/ESubCategoryForm";

const Edit = () => {
    const history = useHistory()
    const { id } = useParams()
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false)

    const fetchSingleESubCategory = useCallback(
        async () => {
            try {
                const response = await Requests.ESubCategory.Show(id);
                if (response && response.status === 200) {
                    setLoading(false);
                    setData(response.data.body);
                }
            } catch (error) {
                if (error) {
                    setLoading(false);
                    Toastify.Error(error.message);
                }
            }
        },
        [id]
    );

    useEffect(() => {
        fetchSingleESubCategory();
    }, [fetchSingleESubCategory]);

    // handle sub-category update
    const handleESubCategoryUpdate = async (data) => {
        setUpdateLoading(true)
        try {
            const response = await Requests.ESubCategory.Update(data, id);
            if (response && response.status === 200) {
                setUpdateLoading(false)
                Toastify.Success(response.data.message)
            }
            history.push("/dashboard/e-sub-category")
        } catch (error) {
            if (error) {
                setUpdateLoading(false)
                if (error.response) {
                    await CustomError(error.response)
                } else {
                    Toastify.Error("Something going wrong.")
                }
            }
        }
    }

    return (
        <div>
            {/* Title bar */}
            <TitleBar
                mainTitle="Edit E-Sub-Category"
                subTitle="Edit your e-sub-category"
                tag="Home / E-commerce / E-Sub-Category /"
                pageTag="Edit e-sub-category"
            />

            {/* Manage sub-category button */}
            <Container.Column className="text-end">
                <Link to={"/dashboard/e-sub-category"}>
                    <PrimaryButton className="px-4 mb-3">
                        <Text className="fs-15 mb-0"><AlignJustify size={20} /> Manage sub-category</Text>
                    </PrimaryButton>
                </Link>
            </Container.Column>

            {loading ? <Loader /> : null}

            {/* Main sub-category card */}
            {!loading && Object.keys(data).length ?
                <Container.Column>
                    <Card.Simple className="border-0">
                        <Card.Header className="bg-white rounded border-0">
                            <div>
                                <Text className="mb-0 ps-1 pt-3 fs-17">Edit E-Sub-Category</Text>
                            </div>
                        </Card.Header>
                        <hr />
                        <Card.Body className="px-20 pb-4 pt-0">

                            {/* E-sub-category Form */}
                            <ESubCategoryForm
                                update={true}
                                loading={updateLoading}
                                // loading={loading}
                                subCategoryData={data}
                                submit={handleESubCategoryUpdate}
                            />
                        </Card.Body>
                    </Card.Simple>
                </Container.Column>
                : null}
        </div>
    );
}

export default Edit;