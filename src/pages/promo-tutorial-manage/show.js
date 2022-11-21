import React from "react";
import { Link } from "react-router-dom";
import { AlignJustify } from "react-feather";
import { PrimaryButton } from "../../components/button";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { PromoTutorialForm } from "../../components/form/PromoTutorial_form";

const Show = () => {
  return (
    <div>
      {/* Title bar */}
      <TitleBar
        mainTitle="Show Promo Tutorial"
        subTitle="Show your promo tutorial"
        tag="Home / Promo Tutorial /"
        pageTag="Show Promo Tutorial"
      />

      {/* Manage promo tutorial button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/promo-tutorial-manage"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">
              <AlignJustify size={20} /> Manage Promo Tutorial
            </Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {/* Main promo tutorial card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Header className="bg-white rounded border-0">
            <div>
              <Text className="mb-0 ps-1 pt-3 fs-17">Show Promo Tutorial</Text>
            </div>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            {/* Product Form */}
            <PromoTutorialForm view={true} />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Show;
