import React, { useState } from "react";
import { AlignJustify } from "react-feather";
import { Link, useHistory, useParams } from "react-router-dom";
import { ProductUpdateForm } from "../../components/form/ProductUpdateForm";
import { PrimaryButton } from "../../components/button";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Toastify } from "../../components/toastify";
import { CustomError } from "../../utils/error";
import { Card } from "../../components/card";
import { Text } from "../../components/text";
import { Requests } from "../../utils/http";

const Edit = () => {
  const history = useHistory();
  const { id } = useParams();
  const [updateLoading, setUpdateLoading] = useState(false);

  // handle size update
  const handleEProductUpdate = async (data) => {
    setUpdateLoading(true);
    try {
      const response = await Requests.EProduct.Update(data, id);
      if (response && response.status === 200) {
        setUpdateLoading(false);
        Toastify.Success(response.data.message);
      }
      history.push("/dashboard/e-products");
    } catch (error) {
      if (error) {
        setUpdateLoading(false);
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
        mainTitle="Edit Product"
        subTitle="Edit your product"
        tag="Home / E-commerce / Product /"
        pageTag="Edit product"
      />

      {/* Manage e-product button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/e-products"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">
              <AlignJustify size={20} /> Manage products
            </Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {/* Main e-product card */}

      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Header className="bg-white rounded border-0">
            <div>
              <Text className="mb-0 ps-1 pt-3 fs-17">Edit Product</Text>
            </div>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            {/* E-product Form */}
            <ProductUpdateForm
              update={true}
              loading={updateLoading}
              // loading={loading}
              onSubmit={handleEProductUpdate}
            />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Edit;
