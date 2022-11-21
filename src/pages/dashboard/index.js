import React, { useCallback, useEffect, useState } from 'react';
import { Container } from '../../components/container';
import { TitleBar } from '../../components/titleBar';
import { Toastify } from '../../components/toastify';
import { CustomError } from '../../utils/error';
import { Text } from '../../components/text';
import { Card } from '../../components/card';
import { Requests } from '../../utils/http';
import { Loader } from '../../components/loading';
import EOrderTable from '../../components/dashboard/eOrderTable';
import TailorOrderTable from '../../components/dashboard/tailorOrderTable';
import FreelancerTable from '../../components/dashboard/freelancerTable';
import ChartComponent from '../../components/chart/Index'
import GroupedChart from '../../components/chart/Grouped'
import LineChart from "../../components/chart/BusketSize";
import OrderCount from "../../components/chart/OrderCount";
import OrderByDay from "../../components/chart/OrderByDay";


const Index = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [orderTable, setOrderTable] = useState(false)
    const [tailorTable, setTailorTable] = useState(false)
    const [freelancerTable, setFreelancerTable] = useState(false)
    const [chartData, setChartData] = useState({
        groupChartData: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthlyDiscount: [77309.70999999998, 24626.86, 0, 0, 0, 10822, 735.75, 17085.25, 13983.149999999998, 17100.71, 32907.5, 65932.16],
            profit: [null, -150070.76, 0, 0, 0, 6246, 1376.25, 17547.75, 14971.850000000002, -11185.21, -56970.500000000015, -727624.6599999999],
            purchasePrice: [154610, 39347, 0, 0, 0, 202275, 4258, 224704, 269809, 486172, 321399, 289841],
            totalSell: [null, 72827, 0, 0, 0, 220348, 6370, 270643, 301954, 539345, 382771, 373169]
        },
        lineChartData: {
            busketSize: [0, 535.6, 0, 0, 0, 16117.4, 804.9, 2756.1, 7199.3, 5676.6, 1393.9, 762.4],
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        },
        orderByDayChartData: {
            days: [
                [53, 25, 0, 0, 0, 6, 0, 28, 14, 33, 33, 34],
                [50, 6, 0, 0, 0, 1, 0, 10, 1, 25, 62, 29],
                [65, 13, 0, 0, 0, 1, 1, 19, 2, 7, 38, 34],
                [32, 17, 0, 0, 0, 0, 2, 17, 3, 6, 9, 36],
                [26, 7, 0, 0, 0, 1, 3, 6, 16, 4, 30, 194],
                [16, 7, 0, 0, 0, 3, 1, 7, 2, 0, 40, 48],
                [52, 15, 0, 0, 0, 1, 0, 5, 2, 17, 39, 28]
            ],
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        },
        orderChartData: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            totalOrder: [294, 90, 0, 0, 0, 13, 7, 92, 40, 92, 251, 403]
        }
    })
    const orderData = {
        canceled: 22,
        confirmed: 30,
        created: 1,
        delivered: 636,
        packed: 0,
        pending: 3,
        picked: 0,
        ready_to_delivered: 13,
        ready_to_refund: 1,
        received: 2,
        refunded: 4
    }
    // fetch e-order data
    const fetchEOrder = useCallback(async (page) => {
        try {
            setLoading(true)
            const response = await Requests.EOrder.AllIndex(page, 10)
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
    }, [])

    useEffect(() => {
        fetchEOrder(1)
        // setChartData(chartDemoData)
        setTimeout(() => {
            setOrderTable(true)
        }, 200);

        setTimeout(() => {
            setTailorTable(true)
        }, 400);

        setTimeout(() => {
            setFreelancerTable(true)
        }, 600);
    }, [fetchEOrder])


    return (
        <div>

            {/* Title bar */}
            <TitleBar
                mainTitle="Manage Dashboard"
                subTitle="Manage your dashboard"
                tag="Home / Dashboard /"
                pageTag="Manage dashboard"
            />

            {/* Order Section */}
            {loading ? <Loader /> : null}
            {!loading ?
                <Container.Row className="mb-3">

                    <div className="col-6 col-md-3 col-xl-2 my-mb-0 my-2">
                        <Card.Simple className="border-0">
                            <Card.Body className="shadow-sm text-center px-0">
                                <Text className="text-muted fs-15 mb-0">Total Order</Text>
                                <Text className="mb-0 text-dark fw-bolder fs-16">{data.totalOrder ? data.totalOrder : 200}</Text>
                            </Card.Body>
                        </Card.Simple>
                    </div>
                    <div className="col-6 col-md-3 col-xl-2 my-mb-0 my-2">
                        <Card.Simple className="border-0">
                            <Card.Body className="shadow-sm text-center px-0">
                                <Text className="text-muted fs-15 mb-0">E-co. Order</Text>
                                <Text className="mb-0 text-dark fw-bolder fs-16">{data.ecOrder ? data.ecOrder : 100}</Text>
                            </Card.Body>
                        </Card.Simple>
                    </div>
                    <div className="col-6 col-md-3 col-xl-2 my-mb-0 my-2">
                        <Card.Simple className="border-0">
                            <Card.Body className="shadow-sm text-center px-0">
                                <Text className="text-muted fs-15 mb-0">Tailor Order</Text>
                                <Text className="mb-0 text-dark fw-bolder fs-16">{data.tailorOrder ? data.tailorOrder : 50}</Text>
                            </Card.Body>
                        </Card.Simple>
                    </div>
                    <div className="col-6 col-md-3 col-xl-2 my-mb-0 my-2">
                        <Card.Simple className="border-0">
                            <Card.Body className="shadow-sm text-center px-0">
                                <Text className="text-muted fs-15 mb-0">On Demand Order</Text>
                                <Text className="mb-0 text-dark fw-bolder fs-16">{data.onDemandOrder ? data.onDemandOrder : 20}</Text>
                            </Card.Body>
                        </Card.Simple>
                    </div>
                    <div className="col-6 col-md-3 col-xl-2 my-mb-0 my-2">
                        <Card.Simple className="border-0">
                            <Card.Body className="shadow-sm text-center px-0">
                                <Text className="text-muted fs-15 mb-0">CFT Order</Text>
                                <Text className="mb-0 text-dark fw-bolder fs-16">{data.totalOrder ? data.totalOrder : 250}</Text>
                            </Card.Body>
                        </Card.Simple>
                    </div>
                    <div className="col-6 col-md-3 col-xl-2 my-mb-0 my-2">
                        <Card.Simple className="border-0">
                            <Card.Body className="shadow-sm text-center px-0">
                                <Text className="text-muted fs-15 mb-0">Total Freelancer</Text>
                                <Text className="mb-0 text-dark fw-bolder fs-16">{data.totalFreelancer ? data.totalFreelancer : 150}</Text>
                            </Card.Body>
                        </Card.Simple>
                    </div>
                    <div className="col-6 col-md-3 col-xl-2 my-mb-0 my-2">
                        <Card.Simple className="border-0">
                            <Card.Body className="shadow-sm text-center px-0">
                                <Text className="text-muted fs-15 mb-0">Total P.O</Text>
                                <Text className="mb-0 text-dark fw-bolder fs-16">{data.totalPendingOrder ? data.totalPendingOrder : 100}</Text>
                            </Card.Body>
                        </Card.Simple>
                    </div>
                    <div className="col-6 col-md-3 col-xl-2 my-mb-0 my-2">
                        <Card.Simple className="border-0">
                            <Card.Body className="shadow-sm text-center px-0">
                                <Text className="text-muted fs-15 mb-0">E-co. P.O</Text>
                                <Text className="mb-0 text-dark fw-bolder fs-16">{data.ePendingOrder ? data.ePendingOrder : 200}</Text>
                            </Card.Body>
                        </Card.Simple>
                    </div>
                    <div className="col-6 col-md-3 col-xl-2 my-mb-0 my-2">
                        <Card.Simple className="border-0">
                            <Card.Body className="shadow-sm text-center px-0">
                                <Text className="text-muted fs-15 mb-0">Tailor P.O</Text>
                                <Text className="mb-0 text-dark fw-bolder fs-16">{data.tailorPendingOrder ? data.tailorPendingOrder : 200}</Text>
                            </Card.Body>
                        </Card.Simple>
                    </div>
                    <div className="col-6 col-md-3 col-xl-2 my-mb-0 my-2">
                        <Card.Simple className="border-0">
                            <Card.Body className="shadow-sm text-center px-0">
                                <Text className="text-muted fs-15 mb-0">On Demand P.O</Text>
                                <Text className="mb-0 text-dark fw-bolder fs-16">{data.onDemandPendingOrder ? data.onDemandPendingOrder : 200}</Text>
                            </Card.Body>
                        </Card.Simple>
                    </div>
                    <div className="col-6 col-md-3 col-xl-2 my-mb-0 my-2">
                        <Card.Simple className="border-0">
                            <Card.Body className="shadow-sm text-center px-0">
                                <Text className="text-muted fs-15 mb-0">CFT P.O</Text>
                                <Text className="mb-0 text-dark fw-bolder fs-16">{data.cftPendingOrder ? data.cftPendingOrder : 200}</Text>
                            </Card.Body>
                        </Card.Simple>
                    </div>
                    <div className="col-6 col-md-3 col-xl-2 my-mb-0 my-2">
                        <Card.Simple className="border-0">
                            <Card.Body className="shadow-sm text-center px-0">
                                <Text className="text-muted fs-15 mb-0">Today User</Text>
                                <Text className="mb-0 text-dark fw-bolder fs-16">{data.todayUser ? data.todayUser : 200}</Text>
                            </Card.Body>
                        </Card.Simple>
                    </div>
                    <div className="col-6 col-md-3 col-xl-2 my-mb-0 my-2">
                        <Card.Simple className="border-0">
                            <Card.Body className="shadow-sm text-center px-0">
                                <Text className="text-muted fs-15 mb-0">Total Delivered Order</Text>
                                <Text className="mb-0 text-dark fw-bolder fs-16">{data.totalDeliveredOrder ? data.totalDeliveredOrder : 200}</Text>
                            </Card.Body>
                        </Card.Simple>
                    </div>
                    <div className="col-6 col-md-3 col-xl-2 my-mb-0 my-2">
                        <Card.Simple className="border-0">
                            <Card.Body className="shadow-sm text-center px-0">
                                <Text className="text-muted fs-15 mb-0">E-co. D.O</Text>
                                <Text className="mb-0 text-dark fw-bolder fs-16">{data.edeliveredOrder ? data.edeliveredOrder : 200}</Text>
                            </Card.Body>
                        </Card.Simple>
                    </div>
                    <div className="col-6 col-md-3 col-xl-2 my-mb-0 my-2">
                        <Card.Simple className="border-0">
                            <Card.Body className="shadow-sm text-center px-0">
                                <Text className="text-muted fs-15 mb-0">Tailor D.O</Text>
                                <Text className="mb-0 text-dark fw-bolder fs-16">{data.tailorDeliveredOrder ? data.tailorDeliveredOrder : 200}</Text>
                            </Card.Body>
                        </Card.Simple>
                    </div>
                    <div className="col-6 col-md-3 col-xl-2 my-mb-0 my-2">
                        <Card.Simple className="border-0">
                            <Card.Body className="shadow-sm text-center px-0">
                                <Text className="text-muted fs-15 mb-0">On Demand D.O</Text>
                                <Text className="mb-0 text-dark fw-bolder fs-16">{data.onDemandDeliveredOrder ? data.onDemandDeliveredOrder : 200}</Text>
                            </Card.Body>
                        </Card.Simple>
                    </div>
                    <div className="col-6 col-md-3 col-xl-2 my-mb-0 my-2">
                        <Card.Simple className="border-0">
                            <Card.Body className="shadow-sm text-center px-0">
                                <Text className="text-muted fs-15 mb-0">CFT D.O</Text>
                                <Text className="mb-0 text-dark fw-bolder fs-16">{data.cftDeliveredOrder ? data.cftDeliveredOrder : 200}</Text>
                            </Card.Body>
                        </Card.Simple>
                    </div>

                </Container.Row>
                : null
            }
            <Container.Row>

                {/* Top 5 Ecommerce Order */}
                <Container.Column className="col-xl-6 mb-4">
                    {orderTable ? <EOrderTable /> : null}
                </Container.Column>

                {/* Top 5 tailor Order */}
                <Container.Column className="col-xl-6 mb-4">
                    {tailorTable ? <TailorOrderTable /> : null}
                </Container.Column>

                {/* Top 5 freelancer */}
                <Container.Column className="col-xl-6 mb-4">
                    {freelancerTable ? <FreelancerTable /> : null}
                </Container.Column>

            </Container.Row>

            {/* Chart container */}
            <Container.Row>

                {/* Sales volume */}
                <Container.Column className="col-xl-6 col-padding pe-xl-2">
                    <Card.Simple className="border-0">
                        <Card.Header className="bg-white rounded border-0">
                            <h6 className="mb-0">Sales volume</h6>
                            <p className="text-muted font-14">Overview of sales volume</p>
                        </Card.Header>
                        <Card.Body>
                            <GroupedChart data={chartData.groupChartData} />
                        </Card.Body>
                    </Card.Simple>
                </Container.Column>

                {/* Average busket size */}
                <Container.Column className="col-xl-6 col-padding ps-xl-2">
                    <Card.Simple className="border-0">
                        <Card.Header className="bg-white rounded border-0">
                            <h6 className="mb-0">Average busket size</h6>
                            <p className="text-muted font-14">Overview of busket size</p>
                        </Card.Header>
                        {/* {console.log(chartData.lineChartData)} */}
                        <Card.Body>
                            <LineChart data={chartData.lineChartData} />
                        </Card.Body>
                    </Card.Simple>
                </Container.Column>

                {/* Order status by month */}
                <Container.Column className="col-xl-6 col-padding pe-xl-2">
                    <Card.Simple className="border-0">
                        <Card.Header className="bg-white rounded border-0">
                            <h6 className="mb-0">Order status by month</h6>
                        </Card.Header>
                        <Card.Body>
                            <OrderCount data={chartData.orderChartData} />
                        </Card.Body>
                    </Card.Simple>
                </Container.Column>

                {/* Order status by day in year */}
                <Container.Column className="col-xl-6 col-padding ps-xl-2">
                    <Card.Simple className="border-0">
                        <Card.Header className="bg-white rounded border-0">
                            <h6 className="mb-0">Order status by day in year</h6>
                        </Card.Header>
                        <Card.Body>
                            <OrderByDay data={chartData.orderByDayChartData} />
                        </Card.Body>
                    </Card.Simple>
                </Container.Column>

                {/* Order status chart */}
                <Container.Column className="col-padding">
                    <Card.Simple className="border-0">
                        <Card.Header className="bg-white rounded border-0">
                            <h6 className="mb-0">Order status</h6>
                        </Card.Header>
                        <Card.Body>
                            <ChartComponent data={orderData} />
                        </Card.Body>
                    </Card.Simple>
                </Container.Column>

            </Container.Row>
        </div>
    );
}

export default Index;