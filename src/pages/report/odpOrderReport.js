import React from "react";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Card } from "../../components/card";
import AllOrder from "../../components/all-odp-order/allOrder";

const Index = () => {
  return (
    <div>
      {/* Title bar */}
      <TitleBar
        mainTitle="Report ODP-Order"
        subTitle="Manage your odp-order report"
        tag="Home / ODP-Order Report/"
        pageTag="Manage odp-order report"
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
