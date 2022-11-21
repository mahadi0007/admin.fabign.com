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
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";

const Edit = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  // handle button create
  const handleButtonTypeCreate = async (data) => {
    try {
      setLoading(true);
      const response = await Requests.ButtonType2.Update(data, id);
      if (response && response.status === 200) {
        Toastify.Success(response.data.message);
      }
      history.push("/dashboard/buttontype2");
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
        mainTitle="Edit Button Type"
        subTitle="Edit button type"
        tag="Home / Button Type /"
        pageTag="Edit button type"
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
              <Text className="mb-0 ps-1 pt-3 fs-17">Edit Button type</Text>
            </div>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            {/* Button Form */}
            <ButtonType2Form
              loading={loading}
              submit={handleButtonTypeCreate}
              update={true}
            />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Edit;
