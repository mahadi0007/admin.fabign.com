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
import { EAdditionalInfoCreateForm } from '../../components/form/EAdditionalInfoCreateform';

const EAdditionalInfoStore = () => {

    const [loading, setLoading] = useState(false)
    const history = useHistory();


    // faq create
    const handleEFAQCreate = async (data) => {
        try {
            setLoading(true)
            const response = await Requests.EAdditionalInfo.Store(data);
            if (response && response.status === 200) {
                Toastify.Success(response.data.message)
                history.push("/dashboard/e-AdditionalInfo");
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
    }

    return (
        <div>
            {/* Title bar */}
            <TitleBar
                mainTitle="Add E-AdditionalInfo"
                subTitle="Add new e-AdditionalInfo"
                tag="Home / E-commerce / E-AdditionalInfo /"
                pageTag="Add e-AdditionalInfo"
            />

            {/* Manage e-banner button */}
            <Container.Column className="text-end">
                <Link to={"/dashboard/e-AdditionalInfo"}>
                    <PrimaryButton className="px-4 mb-3">
                        <Text className="fs-15 mb-0"> <AlignJustify size={20} /> Manage e-AdditionalInfo</Text>
                    </PrimaryButton>
                </Link>
            </Container.Column>

            {/* Main e-banner card */}
            <Container.Column>
                <Card.Simple className="border-0">
                    <Card.Header className="bg-white rounded border-0">
                        <div>
                            <Text className="mb-0 ps-1 pt-3 fs-17">Add E-AdditionalInfo</Text>
                        </div>
                    </Card.Header>
                    <hr />
                    <Card.Body className="px-20 pb-4 pt-0">

                        {/* E-Banner Form */}
                        <EAdditionalInfoCreateForm
                            loading={loading}
                            submit={handleEFAQCreate}
                        />
                    </Card.Body>
                </Card.Simple>
            </Container.Column>
        </div>
    );
};

export default EAdditionalInfoStore;
