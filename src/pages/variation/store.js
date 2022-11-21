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
import { VariationForm } from "../../components/form/VariationForm";

const Store = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  // handle variation create
  const handleVariationCreate = async (data) => {
    try {
      setLoading(true);
      const response = await Requests.Variation.Store(data);
      if (response && response.status === 200) {
        Toastify.Success(response.data.message);
        history.push("/dashboard/variation");
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
        mainTitle="Add Variation"
        subTitle="Add new variation"
        tag="Home / E-commerce / Variation /"
        pageTag="Add variation"
      />

      {/* Manage variation */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/variation"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">
              {" "}
              <AlignJustify size={20} /> Manage variation
            </Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {/* Main variation card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Header className="bg-white rounded border-0">
            <div>
              <Text className="mb-0 ps-1 pt-3 fs-17">Add Variation</Text>
            </div>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            {/* Variation Form */}
            <VariationForm loading={loading} submit={handleVariationCreate} />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Store;
