import React from "react";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Card } from "../../components/card";
import AllOrder from "../../components/all-bulk-order/allOrder";

const Index = () => {
  return (
    <div>
      {/* Title bar */}
      <TitleBar
        mainTitle="Report Bulk-Order"
        subTitle="Manage your bulk-order report"
        tag="Home / Bulk-Order Report/"
        pageTag="Manage bulk-order report"
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
