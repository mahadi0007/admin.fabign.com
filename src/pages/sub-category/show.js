import React from "react";
import { Link } from "react-router-dom";
import { AlignJustify } from "react-feather";
import { SubCategoryForm } from "../../components/form/SubCategoryForm";
import { PrimaryButton } from "../../components/button";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Text } from "../../components/text";
import { Card } from "../../components/card";

const Show = () => {
  return (
    <div>
      {/* Title bar */}
      <TitleBar
        mainTitle="Show Sub Category"
        subTitle="Show sub-category"
        tag="Home / Sub category /"
        pageTag="Show sub category"
      />

      {/* Manaage category button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/sub-category"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">
              {" "}
              <AlignJustify size={20} /> Manage sub-category
            </Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {/* Main category card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Header className="bg-white rounded border-0">
            <div>
              <Text className="mb-0 ps-1 pt-3 fs-17">Show Sub-Category</Text>
            </div>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            {/* Category Form */}
            <SubCategoryForm view={true} />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Show;
