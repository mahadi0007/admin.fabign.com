import React, { useState } from 'react';
import { AlignJustify } from 'react-feather';
import { Text } from '../../components/text';
import { Card } from '../../components/card';
import { TitleBar } from '../../components/titleBar';
import { Container } from '../../components/container';
import { PrimaryButton } from '../../components/button';
import { LeafCategoryForm } from '../../components/form/leaf_category_form';
import { Requests } from '../../utils/http';
import { Toastify } from '../../components/toastify';
import { CustomError } from '../../utils/error';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const Store = () => {
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    // handle employee create
    const handleCategoryCreate = async (data) => {
        try {
            setLoading(true)
            const response = await Requests.LeafCategory.Store(data)
            if (response && response.status === 201) {
                Toastify.Success(response.data.message)
            }
            history.push("/dashboard/leaf-category")
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
        <div className="mb-3">
            <TitleBar
                mainTitle="Add Leaf Category"
                subTitle="Add new leaf-category"
                tag="Home / Leaf category /"
                pageTag="Add new leaf category"
            />

            {/* Manage category button */}
            <Container.Column className="text-end">
                <Link to="/dashboard/leaf-category">
                    <PrimaryButton className="px-3 mb-3">
                        <Text className="fs-15 mb-0"><AlignJustify size={20} /> Manage leaf category</Text>
                    </PrimaryButton>
                </Link>
            </Container.Column>

            {/* Main category card */}
            <Container.Column>
                <Card.Simple className="border-0">
                    <Card.Header className="bg-white rounded border-0">
                        <Text className="mb-0 ps-1 pt-3 fs-17">Add leaf category</Text>
                    </Card.Header>
                    <hr />
                    <Card.Body className="px-20 pb-4 pt-0">
                        <LeafCategoryForm
                            loading={loading}
                            submit={handleCategoryCreate}
                        />
                    </Card.Body>
                </Card.Simple>
            </Container.Column>
        </div>
    );
}

export default Store;