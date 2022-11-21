import React from 'react';
import { useCallback, useEffect, useState } from "react";
import { AlignJustify } from 'react-feather';
import { Link, useHistory, useParams } from "react-router-dom";
import { PrimaryButton } from '../../components/button';
import { Container } from '../../components/container';
import { TitleBar } from '../../components/titleBar';
import { Toastify } from '../../components/toastify';
import { Loader } from '../../components/loading';
import { CustomError } from '../../utils/error';
import { Card } from '../../components/card';
import { Text } from '../../components/text';
import { Requests } from '../../utils/http';
import { VariationForm } from '../../components/form/VariationForm';

const Edit = () => {
    const history = useHistory()
    const { id } = useParams()
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [valuesData, setValuesData] = useState(null)
    const [updateLoading, setUpdateLoading] = useState(false)

    // fetcha single variation data
    const fetchSingleVariation = useCallback(
        async () => {
            try {
                let items = []
                const response = await Requests.Variation.Show(id);
                if (response && response.data && response.data.body && response.status === 200) {
                    setData(response.data.body)
                    if (response.data && response.data.body && response.data.body.values && response.data.body.values.length > 0) {
                        for (let i = 0; i < response.data.body.values.length; i++) {
                            const element = response.data.body.values[i]
                            items.push({
                                value: element
                            })
                        }
                    }
                }
                setValuesData(items)
                setLoading(false);
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
        fetchSingleVariation();
    }, [fetchSingleVariation]);

    // handle variation update
    const handleVariationUpdate = async (data) => {
        setUpdateLoading(true)
        try {
            const response = await Requests.Variation.Update(data, id);
            if (response && response.status === 200) {
                setUpdateLoading(false)
                Toastify.Success(response.data.message)
            }
            history.push("/dashboard/variation")
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
                mainTitle="Edit Variation"
                subTitle="Edit your variation"
                tag="Home / E-commerce / Variation /"
                pageTag="Edit variation"
            />

            {/* Manage variation button */}
            <Container.Column className="text-end">
                <Link to={"/dashboard/variation"}>
                    <PrimaryButton className="px-4 mb-3">
                        <Text className="fs-15 mb-0"><AlignJustify size={20} /> Manage variation</Text>
                    </PrimaryButton>
                </Link>
            </Container.Column>

            {loading ? <Loader /> : null}

            {/* Main variation card */}
            {!loading && Object.keys(data).length ?
                <Container.Column>
                    <Card.Simple className="border-0">
                        <Card.Header className="bg-white rounded border-0">
                            <div>
                                <Text className="mb-0 ps-1 pt-3 fs-17">Edit Variation</Text>
                            </div>
                        </Card.Header>
                        <hr />
                        <Card.Body className="px-20 pb-4 pt-0">
                            {/* Variation Form */}
                            <VariationForm
                                update={true}
                                loading={updateLoading}
                                value={valuesData}
                                // loading={loading}
                                variationData={data}
                                submit={handleVariationUpdate}
                            />
                        </Card.Body>
                    </Card.Simple>
                </Container.Column>
                : null}
        </div>
    );
}

export default Edit;