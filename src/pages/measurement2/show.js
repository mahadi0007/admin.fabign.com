import React from "react";
import { Link } from "react-router-dom";
import { AlignJustify } from "react-feather";
import { PrimaryButton } from "../../components/button";
import { Measurement2Form } from "../../components/form/Measurement2Form";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Text } from "../../components/text";
import { Card } from "../../components/card";

const Show = () => {
  return (
    <div>
      {/* Title bar */}
      <TitleBar
        mainTitle="Show Measurement"
        subTitle="Show Measurement"
        tag="Home / Measurement /"
        pageTag="Show Measurement"
      />

      {/* Manage Size button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/measurement2"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">
              <AlignJustify size={20} /> Manage Measurement 2
            </Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {/* Main size card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Header className="bg-white rounded border-0">
            <div>
              <Text className="mb-0 ps-1 pt-3 fs-17">Show Measurement</Text>
            </div>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            {/* Size Form */}
            <Measurement2Form view={true} />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Show;
