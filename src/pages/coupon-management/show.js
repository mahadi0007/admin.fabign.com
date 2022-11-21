import React from "react";
import { Link } from "react-router-dom";
import { AlignJustify } from "react-feather";
import { PrimaryButton } from "../../components/button";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { CouponForm } from "../../components/form/CouponForm";

const Store = () => {
  return (
    <div>
      {/* Title bar */}
      <TitleBar
        mainTitle="View Coupon"
        subTitle="View your coupon"
        tag="Home / Coupon /"
        pageTag="View Coupon"
      />

      {/* Manage e-banner button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/coupon-management"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">
              <AlignJustify size={20} /> Manage Coupon
            </Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {/* Main e-banner card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Header className="bg-white rounded border-0">
            <div>
              <Text className="mb-0 ps-1 pt-3 fs-17">View Coupon</Text>
            </div>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            {/* Product Form */}
            <CouponForm view={true} />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Store;
