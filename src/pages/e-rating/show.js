import React from "react";
import { Link } from "react-router-dom";
import { AlignJustify } from "react-feather";
import { PrimaryButton } from "../../components/button";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { RatingForm } from "../../components/form/Rating_form";

const Store = () => {
  return (
    <div>
      {/* Title bar */}
      <TitleBar
        mainTitle="View Rating"
        subTitle="View your rating"
        tag="Home / Rating /"
        pageTag="View Rating"
      />

      {/* Manage e-banner button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/e-rating"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">
              <AlignJustify size={20} /> Manage Rating
            </Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {/* Main e-banner card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Header className="bg-white rounded border-0">
            <div>
              <Text className="mb-0 ps-1 pt-3 fs-17">View Rating</Text>
            </div>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            {/* Product Form */}
            <RatingForm eRating={true} view={true} />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Store;
