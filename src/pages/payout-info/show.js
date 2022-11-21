import React from "react";
import { Link } from "react-router-dom";
import { AlignJustify } from "react-feather";
import { PrimaryButton } from "../../components/button";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { PayoutInfoForm } from "../../components/form/PayoutInfo_form";

const Show = () => {
  return (
    <div>
      {/* Title bar */}
      <TitleBar
        mainTitle="Show Payout Info"
        subTitle="Show your payout info"
        tag="Home / Payout Info /"
        pageTag="Show Payout Info"
      />

      {/* Manage payout info button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/payout-info"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">
              <AlignJustify size={20} /> Manage Payout Info
            </Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {/* Main payout info card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Header className="bg-white rounded border-0">
            <div>
              <Text className="mb-0 ps-1 pt-3 fs-17">Show Payout Info</Text>
            </div>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            {/* Payout Info Form */}
            <PayoutInfoForm view={true} />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Show;
