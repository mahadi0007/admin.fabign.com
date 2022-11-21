import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PrimaryButton } from '../../components/button';
import { Container } from '../../components/container';
import { TitleBar } from '../../components/titleBar';

import { Text } from '../../components/text';
import { Card } from '../../components/card';
import { Requests } from '../../utils/http';
import { useParams } from 'react-router-dom';


const EAdditionalInfoShow = () => {
    const [data, setData] = useState([])

    const query = useParams()

    const fetchSingleAdditionalInfo = useCallback(async (id) => {
        try {
            const response = await Requests.EAdditionalInfo.getSingleAdditionalInfo(id)
            setData(response.data.body.info)
        } catch (error) {
            if (error) {
                console.log(error.response.message)
            }
        }

    }, [])
    // fetch data
    useEffect(() => {
        if (query && query.id) {

            fetchSingleAdditionalInfo(query.id)
        }
    }, [query, fetchSingleAdditionalInfo])

    return (
        <div>
            <div>

                {/* Title bar */}
                <TitleBar
                    mainTitle="Manage E-AdditionalInfo"
                    subTitle="Manage your e-AdditionalInfo"
                    tag="Home / E-AdditionalInfo /"
                    pageTag="Manage FAQ"
                />

                {/* Add e-AdditionalInfo button */}
                <Container.Column className="text-end">
                    <Link to={"/dashboard/e-AdditionalInfo"}>
                        <PrimaryButton className="px-4 mb-3">
                            <Text className="fs-15 mb-0">Manage e-AdditionalInfo</Text>
                        </PrimaryButton>
                    </Link>
                </Container.Column>
                {/* Main e-slider card */}
                <Container.Column>
                    <Card.Simple className="border-0">
                        <Card.Body>
                            
                            {data && Object.keys(data).length ? (
                                <div>
                                    <Text className='mb-2'>Product Name: {data.product.name} Specification</Text>
                                    
                                    <table className="table">
                                        <tbody>
                                        {data.info.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td width={250}>{item.title.toUpperCase()}</td>
                                                    <td>{item.description}</td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            ) : null}
                        </Card.Body>
                    </Card.Simple>
                </Container.Column>
            </div>
        </div>
    );
};

export default EAdditionalInfoShow;