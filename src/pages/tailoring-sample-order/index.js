import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../../components/button";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { Image } from "../../components/image/Index";
import lineLogo from "../../assets/lineLogo.png";
import { Tab, Tabs } from "react-bootstrap";
import AllOrder from "../../components/all-tailoring-sample-order/allOrder";
import PendingOrder from "../../components/all-tailoring-sample-order/pendingOrder";
import DeliveryOrder from "../../components/all-tailoring-sample-order/deliveryOrder";
import BookedOrder from "../../components/all-tailoring-sample-order/bookedOrder";
import CancelOrder from "../../components/all-tailoring-sample-order/cancelOrder";
import { Requests } from "../../utils/http";
import { Toastify } from "../../components/toastify";
import { CustomError } from "../../utils/error";

const Index = () => {
  const [data, setData] = useState([]);
  const [key, setKey] = useState("allOrder");
  const allOrderRef = useRef(null);
  const pendingOrderRef = useRef(null);
  const deliveryOrderRef = useRef(null);
  const bookedOrderRef = useRef(null);
  const cancelOrderRef = useRef(null);

  const setDataValue = (
    newOrder,
    pendingOrder,
    deliveryOrder,
    cancelledOrder,
    confirmedOrder
  ) => {
    setData({
      newOrder,
      pendingOrder,
      deliveryOrder,
      cancelledOrder,
      confirmedOrder,
    });
  };

  const setDefaultDataValue = async () => {
    try {
      const response = await Requests.TailoringSampleOrder.AllIndex();
      if (response && response.data && response.data.body) {
        setData({
          newOrder: response.data.body.order.filter((val) => {
            return val.status === "created";
          }).length,
          pendingOrder: response.data.body.order.filter((val) => {
            return val.status === "pending";
          }).length,
          deliveryOrder: response.data.body.order.filter((val) => {
            return val.status === "delivered";
          }).length,
          cancelledOrder: response.data.body.order.filter((val) => {
            return val.status === "cancelled";
          }).length,
          confirmedOrder: response.data.body.order.filter((val) => {
            return val.status === "confirmed";
          }).length,
        });
      }
    } catch (error) {
      if (error) {
        if (error.response) {
          await CustomError(error.response);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  };

  useEffect(() => {
    setDefaultDataValue();
  }, []);

  return (
    <div>
      {/* Title bar */}
      <TitleBar
        mainTitle="Manage Tailoring-Order"
        subTitle="Manage your tailoring-order"
        tag="Home / Tailoring-Order /"
        pageTag="Manage tailoring-order"
      />
      {/* Order Section */}
      <Container.Row className="mb-3">
        <Container.Column className="col-md-4 my-mb-0 my-2">
          <Card.Simple className="border-0">
            <Card.Body className="shadow-sm">
              <Container.Row>
                <div className="col-8 col-md-7 col-lg-8">
                  <Text className="text-muted fs-16 mb-0">New Order</Text>
                  <Text className="mb-0 text-dark fw-bolder fs-25">
                    {data.newOrder ? data.newOrder : 0}
                  </Text>
                </div>
                <div className="col-4 col-md-5 col-lg-4 text-end">
                  <Image src={lineLogo} x={100} y={60} alt="..." />
                </div>
              </Container.Row>
            </Card.Body>
          </Card.Simple>
        </Container.Column>

        <Container.Column className="col-md-4 my-mb-0 my-2">
          <Card.Simple className="border-0">
            <Card.Body className="shadow-sm">
              <Container.Row>
                <div className="col-8 col-md-7 col-lg-8">
                  <Text className="text-muted fs-16 mb-0">Pending Order</Text>
                  <Text className="mb-0 text-dark fw-bolder fs-25">
                    {data.pendingOrder ? data.pendingOrder : 0}
                  </Text>
                </div>
                <div className="col-4 col-md-5 col-lg-4 text-end">
                  <Image src={lineLogo} x={100} y={60} alt="..." />
                </div>
              </Container.Row>
            </Card.Body>
          </Card.Simple>
        </Container.Column>

        <Container.Column className="col-md-4 my-mb-0 my-2">
          <Card.Simple className="border-0">
            <Card.Body className="shadow-sm">
              <Container.Row>
                <div className="col-8 col-md-7 col-lg-8">
                  <Text className="text-muted fs-16 mb-0">Delivery Order</Text>
                  <Text className="mb-0 text-dark fw-bolder fs-25">
                    {data.deliveryOrder ? data.deliveryOrder : 0}
                  </Text>
                </div>
                <div className="col-4 col-md-5 col-lg-4 text-end">
                  <Image src={lineLogo} x={100} y={60} alt="..." />
                </div>
              </Container.Row>
            </Card.Body>
          </Card.Simple>
        </Container.Column>
      </Container.Row>

      {/* Main e-order card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Body>
            <Tabs
              defaultActiveKey="allOrder"
              id="uncontrolled-tab-example"
              className="mb-3"
              activeKey={key}
              onSelect={(k) => {
                setDefaultDataValue();
                allOrderRef.current.dateClear();
                pendingOrderRef.current.dateClear();
                deliveryOrderRef.current.dateClear();
                bookedOrderRef.current.dateClear();
                cancelOrderRef.current.dateClear();
                setKey(k);
              }}
            >
              <Tab eventKey="allOrder" title="All Order">
                <AllOrder ref={allOrderRef} setDataValue={setDataValue} />
              </Tab>
              <Tab eventKey="pendingOrder" title="Pending Order">
                <PendingOrder
                  ref={pendingOrderRef}
                  setDataValue={setDataValue}
                />
              </Tab>
              <Tab eventKey="deliveryOrder" title="Delivery Order">
                <DeliveryOrder
                  ref={deliveryOrderRef}
                  setDataValue={setDataValue}
                />
              </Tab>
              <Tab eventKey="bookedOrder" title="Booked Order">
                <BookedOrder ref={bookedOrderRef} setDataValue={setDataValue} />
              </Tab>
              <Tab eventKey="cancelOrder" title="Cancel Order">
                <CancelOrder ref={cancelOrderRef} setDataValue={setDataValue} />
              </Tab>
            </Tabs>
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Index;
