import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AlignJustify } from "react-feather";
import { PrimaryButton } from "../../components/button";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Toastify } from "../../components/toastify";
import { CustomError } from "../../utils/error";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { Requests } from "../../utils/http";
import { ButtonType2Form } from "../../components/form/ButtonType2Form";

const Store = () => {
  const [loading, setLoading] = useState(false);

  // handle button create
  const handleButtonTypeCreate = async (data) => {
    try {
      setLoading(true);
      const response = await Requests.ButtonType2.Store(data);
      if (response && response.status === 201) {
        Toastify.Success(response.data.message);
      }
      // history.push("/dashboard/buttontype2");
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
        mainTitle="Add Button Type"
        subTitle="Add new button type"
        tag="Home / Button Type /"
        pageTag="Add button type"
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
              <Text className="mb-0 ps-1 pt-3 fs-17">Add Button type</Text>
            </div>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            {/* Button Form */}
            <ButtonType2Form
              loading={loading}
              submit={handleButtonTypeCreate}
            />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Store;
