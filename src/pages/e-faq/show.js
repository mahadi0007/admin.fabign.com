import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PrimaryButton } from '../../components/button';
import { Container } from '../../components/container';
import { TitleBar } from '../../components/titleBar';

import { Text } from '../../components/text';
import { Card } from '../../components/card';
import { Requests } from '../../utils/http';
import { useParams } from 'react-router-dom';


const EFAQSHOW = () => {
    const [data, setData] = useState([])

    const query = useParams()

    const fetchSingleProduct = useCallback(async(id) => {
        try {
            const response = await Requests.EFAQ.getSingleFAQ(id)
            setData(response.data.body.faq)
        } catch (error) {
            if(error){
                console.log(error.response.message)
            }
        }
        
    },[]) 
    // fetch data
    useEffect(() => {
        if(query && query.id){

            fetchSingleProduct(query.id)
        }
    }, [query,fetchSingleProduct])

    return (
        <div>
            <div>

                {/* Title bar */}
                <TitleBar
                    mainTitle="Manage E-FAQ"
                    subTitle="Manage your e-FAQ"
                    tag="Home / E-FAQ /"
                    pageTag="Manage FAQ"
                />

                {/* Add e-FAQ button */}
                <Container.Column className="text-end">
                    <Link to={"/dashboard/e-FAQ"}>
                        <PrimaryButton className="px-4 mb-3">
                            <Text className="fs-15 mb-0">Manage e-FAQ</Text>
                        </PrimaryButton>
                    </Link>
                </Container.Column>
                {/* Main e-slider card */}
                <Container.Column>
                    <Card.Simple className="border-0">
                        <Card.Body>
                            {data && Object.keys(data).length ? (
                                <div>
                                    <div className='mb-2'>Product Name: {data.product.name}</div>
                                    {data.faq.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <div>Question no: {index + 1}</div>
                                                <Text className="mb-0">Question: {item.question}</Text>
                                                <Text>Answer: {item.answer}</Text>
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : null}
                        </Card.Body>
                    </Card.Simple>
                </Container.Column>
            </div>
        </div>
    );
};

export default EFAQSHOW;