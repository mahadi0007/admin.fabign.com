import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AlignJustify } from 'react-feather';
import { PrimaryButton } from '../../components/button';
import { Container } from '../../components/container';
import { TitleBar } from '../../components/titleBar';
import { Toastify } from '../../components/toastify';
import { CustomError } from '../../utils/error';
import { Text } from '../../components/text';
import { Card } from '../../components/card';
import { ESubCategoryForm } from '../../components/form/ESubCategoryForm';
import { Requests } from '../../utils/http';

const Store = () => {
    // const history = useHistory()
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    // handle sub-category create
    const handleESubCategoryCreate = async (data) => {
        try {
            setLoading(true)
            const response = await Requests.ESubCategory.Store(data);
            if (response && response.status === 200) {
                Toastify.Success(response.data.message)
            }
            history.push("/dashboard/e-sub-category");
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
    }

    return (
        <div>

            {/* Title bar */}
            <TitleBar
                mainTitle="Add E-Sub-Category"
                subTitle="Add new e-sub-category"
                tag="Home / E-commerce / E-Sub-Category /"
                pageTag="Add e-sub-category"
            />

            {/* Manage e-sub-category button */}
            <Container.Column className="text-end">
                <Link to={"/dashboard/e-sub-category"}>
                    <PrimaryButton className="px-4 mb-3">
                            <Text className="fs-15 mb-0"> <AlignJustify size={20}/> Manage e-sub-category</Text>
                    </PrimaryButton>
                </Link>
            </Container.Column>

            {/* Main e-sub-category card */}
            <Container.Column>
                <Card.Simple className="border-0">
                    <Card.Header className="bg-white rounded border-0">
                        <div>
                            <Text className="mb-0 ps-1 pt-3 fs-17">Add E-Sub-Category</Text>
                        </div>
                    </Card.Header>
                    <hr />
                    <Card.Body className="px-20 pb-4 pt-0">

                        {/* E-Sub-Category Form */}
                        <ESubCategoryForm
                            loading={loading}
                            submit={handleESubCategoryCreate}
                        />
                    </Card.Body>
                </Card.Simple>
            </Container.Column>
        </div>
    );
}

export default Store;