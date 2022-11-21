import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { AlignJustify } from 'react-feather';
import { SubCategoryForm } from '../../components/form/SubCategoryForm';
import { PrimaryButton } from '../../components/button';
import { Container } from '../../components/container';
import { TitleBar } from '../../components/titleBar';
import { Toastify } from '../../components/toastify';
import { CustomError } from '../../utils/error';
import { Text } from '../../components/text';
import { Card } from '../../components/card';
import { Requests } from '../../utils/http';

const Store = () => {
    const [loading, setLoading] = useState(false)
    const history = useHistory();

    // handle sub category create
    const handleSubCategoryCreate = async (data) => {
        try {
            setLoading(true)
            const response = await Requests.SubCategory.Store(data);
            if (response && response.status === 201) {
                Toastify.Success(response.data.message)
            }
            history.push("/dashboard/sub-category");
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
                mainTitle="Add Sub Category"
                subTitle="Add new sub-category"
                tag="Home / Sub category /"
                pageTag="Add sub category"
            />

            {/* Manaage category button */}
            <Container.Column className="text-end">
                <Link to={"/dashboard/sub-category"}>
                    <PrimaryButton className="px-4 mb-3">
                        <Text className="fs-15 mb-0"> <AlignJustify size={20} /> Manage sub-category</Text>
                    </PrimaryButton>
                </Link>
            </Container.Column>

            {/* Main category card */}
            <Container.Column>
                <Card.Simple className="border-0">
                    <Card.Header className="bg-white rounded border-0">
                        <div>
                            <Text className="mb-0 ps-1 pt-3 fs-17">Add Sub-Category</Text>
                        </div>
                    </Card.Header>
                    <hr />
                    <Card.Body className="px-20 pb-4 pt-0">

                        {/* Category Form */}
                        <SubCategoryForm
                            loading={loading}
                            submit={handleSubCategoryCreate}
                        />
                    </Card.Body>
                </Card.Simple>
            </Container.Column>
        </div>
    );
}

export default Store;