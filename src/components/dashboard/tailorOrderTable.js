import React, { useCallback, useEffect, useState } from 'react';
import { Toastify } from '../toastify';
import { Loader } from '../loading';
import { CustomError } from '../../utils/error';
import { Text } from '../text';
import { Card } from '../card';
import { Requests } from '../../utils/http';

const TailorOrderTable = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [limit, setLimit] = useState(10)

    const tailorData = [
        {
            name: "tailor 1",
            productCount: 5,
            productPrice: 100
        },
        {
            name: "tailor 2",
            productCount: 7,
            productPrice: 140
        },
        {
            name: "tailor 3",
            productCount: 3,
            productPrice: 60
        },
        {
            name: "tailor 4",
            productCount: 14,
            productPrice: 280
        },
        {
            name: "tailor 5",
            productCount: 11,
            productPrice: 220
        }
    ]

    // fetch rop 5 tailor order data
    const fetchTailorOrder = useCallback(async (page) => {
        try {
            setLoading(true)
            const response = await Requests.EOrder.AllIndex(page, limit)
            if (response && response.data && response.data.body && response.status === 200) {
                setData(response.data.body.order)
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
    }, [limit])

    useEffect(() => {
        fetchTailorOrder(1)
    }, [fetchTailorOrder])

    return (
        <div>
            {/* Main top 5 e-order card */}
            <Card.Simple className="border-0">
                <Card.Body className="p-0">
                    <Text className="fs-18 fw-bolder text-center mb-0 pt-2"> Top 5 Tailor Order</Text>

                    {loading && !tailorData.length > 0 ? <Loader /> : null}
                    {!loading && tailorData.length > 0 ?
                        <div className='table-responsive p-3'>
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col" width={150}>Name</th>
                                        <th scope="col" className='text-center'>Product count</th>
                                        <th scope="col" className='text-center'>Product price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tailorData && tailorData.length > 0 ?
                                        tailorData.map((data, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td className='py-2' >
                                                        <div data-bs-toggle="tooltip" data-bs-placement="top" title={data.name} style={{ cursor: "pointer" }}>
                                                            {data.name.length > 18 ? data.name.slice(0, 16) : data.name}
                                                        </div>
                                                    </td>
                                                    <td className='py-2 text-center'>{data.productCount}</td>
                                                    <td className='py-2 text-center'>{data.productPrice}</td>
                                                </tr>
                                            )
                                        })

                                        : null}
                                </tbody>
                            </table>
                        </div>
                        : null
                    }
                </Card.Body>
            </Card.Simple>
        </div>
    );
}

export default TailorOrderTable;