import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { AlignJustify } from "react-feather";
import { PrimaryButton } from "../../components/button";
import { Measurement2Form } from "../../components/form/Measurement2Form";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Toastify } from "../../components/toastify";
import { CustomError } from "../../utils/error";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { Requests } from "../../utils/http";

const Edit = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  // handle size update
  const handleMeasurementUpdate = async (data) => {
    try {
      setLoading(true);
      const response = await Requests.Measurement2.Edit(id, data);
      if (response && response.status === 200) {
        Toastify.Success(response.data.message);
      }
      history.push("/dashboard/measurement2");
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
        mainTitle="Edit Measurement"
        subTitle="Edit Measurement"
        tag="Home / Measurement /"
        pageTag="Edit Measurement"
      />

      {/* Manage Size button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/measurement2"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">
              <AlignJustify size={20} /> Manage Measurement 2
            </Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {/* Main size card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Header className="bg-white rounded border-0">
            <div>
              <Text className="mb-0 ps-1 pt-3 fs-17">Edit Measurement</Text>
            </div>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            {/* Size Form */}
            <Measurement2Form
              loading={loading}
              submit={handleMeasurementUpdate}
              update={true}
            />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Edit;
