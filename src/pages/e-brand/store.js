import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { AlignJustify } from 'react-feather';
import { EBrandForm } from '../../components/form/EBrandForm';
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

    // handle category create
    const handleEBrandCreate = async (data) => {
        try {
            setLoading(true)
            const response = await Requests.EBrand.Store(data);
            if (response && response.status === 200) {
                Toastify.Success(response.data.message)
            }
            history.push("/dashboard/e-brand");
            // for (var pair of data.entries()) {
            //     console.log(pair[0]+ ', ' + pair[1]); 
            // }
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
                mainTitle="Add E-Brand"
                subTitle="Add new e-brand"
                tag="Home / E-commerce / E-Brand /"
                pageTag="Add e-brand"
            />

            {/* Manage e-brand button */}
            <Container.Column className="text-end">
                <Link to={"/dashboard/e-brand"}>
                    <PrimaryButton className="px-4 mb-3">
                            <Text className="fs-15 mb-0"> <AlignJustify size={20}/> Manage e-brand</Text>
                    </PrimaryButton>
                </Link>
            </Container.Column>

            {/* Main e-brand card */}
            <Container.Column>
                <Card.Simple className="border-0">
                    <Card.Header className="bg-white rounded border-0">
                        <div>
                            <Text className="mb-0 ps-1 pt-3 fs-17">Add E-Brand</Text>
                        </div>
                    </Card.Header>
                    <hr />
                    <Card.Body className="px-20 pb-4 pt-0">

                        {/* E-Brand Form */}
                        <EBrandForm
                            loading={loading}
                            submit={handleEBrandCreate}
                        />
                    </Card.Body>
                </Card.Simple>
            </Container.Column>
        </div>
    );
}

export default Store;