import React from "react";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Card } from "../../components/card";
import AllOrder from "../../components/all-order/allOrder";

const Index = () => {
  return (
    <div>
      {/* Title bar */}
      <TitleBar
        mainTitle="Report E-Order"
        subTitle="Manage your e-order report"
        tag="Home / E-Order Report/"
        pageTag="Manage e-order report"
      />

      {/* Main e-order card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Body>
            <AllOrder report={true} />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Index;
