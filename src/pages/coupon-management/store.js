import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { AlignJustify } from "react-feather";
import { PrimaryButton } from "../../components/button";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Toastify } from "../../components/toastify";
import { CustomError } from "../../utils/error";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { Requests } from "../../utils/http";
import { CouponForm } from "../../components/form/CouponForm";

const Store = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  // handle product create
  const handleCouponCreate = async (data) => {
    try {
      setLoading(true);
      const response = await Requests.Coupon.Store(data);
      if (response && response.status === 201) {
        Toastify.Success(response.data.message);
        history.push("/dashboard/coupon-management");
      }
      setLoading(false);
    } catch (error) {
      if (error) {
        setLoading(false);
        if (error.response) {
          await CustomError(error.response);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  };

  return (
    <div>
      {/* Title bar */}
      <TitleBar
        mainTitle="Add Coupon"
        subTitle="Add new Coupon"
        tag="Home / Coupon / Store /"
        pageTag="Add Coupon"
      />

      {/* Manage e-banner button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/coupon-management"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">
              {" "}
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
              <Text className="mb-0 ps-1 pt-3 fs-17">Add Coupon</Text>
            </div>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            {/* Product Form */}
            <CouponForm loading={loading} submit={handleCouponCreate} />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Store;
