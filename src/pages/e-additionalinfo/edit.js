import React, { useState, useCallback, useEffect } from 'react';
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
import { useParams } from 'react-router-dom';
import { EAdditionalInfoEditForm } from '../../components/form/EAdditionalInfoEditForm';

const EAdditionalInfoEdit = () => {

    const [additionalInfo, setAdditionalInfo] = useState([])
    const [loading, setLoading] = useState(false)
    const history = useHistory();


    const query = useParams()

    const fetchSingleProduct = useCallback(async (id) => {
        try {
            const response = await Requests.EAdditionalInfo.getSingleAdditionalInfo(id)
            setAdditionalInfo(response.data.body.info)
        } catch (error) {
            if (error) {
                console.log(error.response.message)
            }
        }

    }, [])
    // fetch data
    useEffect(() => {
        if (query && query.id) {

            fetchSingleProduct(query.id)
        }
    }, [query, fetchSingleProduct])

    // faq create
    const handleEAdditionalInfoEdit = async (data) => {
        try {
            setLoading(true)
            const formData = {
                ...data,
                product: additionalInfo.product && additionalInfo.product._id
            }
            const response = await Requests.EAdditionalInfo.Edit(additionalInfo._id, formData);
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
                mainTitle="Edit E-AdditionalInfo"
                subTitle="Edit new e-AdditionalInfo"
                tag="Home / E-commerce / E-AdditionalInfo /"
                pageTag="Edit e-AdditionalInfo"
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
                            <Text className="mb-0 ps-1 pt-3 fs-17">Edit E-AdditionalInfo</Text>
                        </div>
                    </Card.Header>
                    <hr />
                    <Card.Body className="px-20 pb-4 pt-0">

                        {/* E-Banner Form */}
                        <EAdditionalInfoEditForm
                            data={additionalInfo && additionalInfo.info}
                            loading={loading}
                            submit={handleEAdditionalInfoEdit}
                        />
                    </Card.Body>
                </Card.Simple>
            </Container.Column>
        </div>
    );
};

export default EAdditionalInfoEdit;
