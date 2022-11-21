import React from "react";
import { Link } from "react-router-dom";
import { AlignJustify } from "react-feather";
import { PrimaryButton } from "../../components/button";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { ButtonType2Form } from "../../components/form/ButtonType2Form";

const Show = () => {
  return (
    <div>
      {/* Title bar */}
      <TitleBar
        mainTitle="Show Button Type"
        subTitle="Show button type"
        tag="Home / Button Type /"
        pageTag="Show button type"
      />

      {/* Manage button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/buttontype2"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">
              {" "}
              <AlignJustify size={20} /> Manage button type
            </Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {/* Main button card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Header className="bg-white rounded border-0">
            <div>
              <Text className="mb-0 ps-1 pt-3 fs-17">Show Button type</Text>
            </div>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            {/* Button Form */}
            <ButtonType2Form view={true} />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Show;
