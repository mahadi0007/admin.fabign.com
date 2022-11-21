import React, { useState } from "react";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Toastify } from "../../components/toastify";
import { CustomError } from "../../utils/error";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { Requests } from "../../utils/http";
import { ShippingChargeForm } from "../../components/form/ShippingChargeForm";

const Store = () => {
  const [loading, setLoading] = useState(false);

  // handle shipping charge create or update
  const handleShippingAddUpdate = async (data) => {
    try {
      setLoading(true);
      const response = await Requests.ShippingCharge.AddUpdate(data);
      if (response && response.status === 200) {
        Toastify.Success(response.data.message);
      }
      // console.log(data);
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
        mainTitle="Add or Update Shipping-Charge"
        subTitle="Add or update shipping-charge"
        tag="Home / "
        pageTag="Shipping-Charge"
      />

      {/* Main add or update shipping-charge card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Header className="bg-white rounded border-0">
            <div>
              <Text className="mb-0 ps-1 pt-3 fs-17">
                Add or update shipping charge
              </Text>
            </div>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            {/* Shipping charge Form */}
            <ShippingChargeForm
              loading={loading}
              submit={handleShippingAddUpdate}
            />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Store;
