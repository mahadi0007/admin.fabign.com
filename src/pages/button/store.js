import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { AlignJustify } from 'react-feather';
import { PrimaryButton } from '../../components/button';
import { Container } from '../../components/container';
import { TitleBar } from '../../components/titleBar';
import { Toastify } from '../../components/toastify';
import { CustomError } from '../../utils/error';
import { Text } from '../../components/text';
import { Card } from '../../components/card';
import { Requests } from '../../utils/http';
import { ButtonForm } from '../../components/form/ButtonForm';

const Store = () => {
    const [loading, setLoading] = useState(false)
    const history = useHistory();

    // handle sub category create
    const handleSubCategoryCreate = async (data) => {
        try {
            setLoading(true)
            const response = await Requests.Button.Store(data);
            if (response && response.status === 201) {
                Toastify.Success(response.data.message)
            }
            history.push("/dashboard/button");
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
                mainTitle="Add Button"
                subTitle="Add new button"
                tag="Home / Button /"
                pageTag="Add button"
            />

            {/* Manage button */}
            <Container.Column className="text-end">
                <Link to={"/dashboard/button"}>
                    <PrimaryButton className="px-4 mb-3">
                        <Text className="fs-15 mb-0"> <AlignJustify size={20} /> Manage button</Text>
                    </PrimaryButton>
                </Link>
            </Container.Column>

            {/* Main button card */}
            <Container.Column>
                <Card.Simple className="border-0">
                    <Card.Header className="bg-white rounded border-0">
                        <div>
                            <Text className="mb-0 ps-1 pt-3 fs-17">Add Button</Text>
                        </div>
                    </Card.Header>
                    <hr />
                    <Card.Body className="px-20 pb-4 pt-0">

                        {/* Button Form */}
                        <ButtonForm
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