import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
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
import { Button2Form } from "../../components/form/Button2Form";

const Edit = () => {
  const [button, setButton] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  const fetchButton = useCallback(async (id) => {
    try {
      const response = await Requests.Button2.Show(id);
      if (response && response.status === 200) {
        setButton(response.data.body);
      }
    } catch (error) {
      if (error) {
        setLoading(false);
        Toastify.Error(error.message);
      }
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchButton(id);
    }
  }, [fetchButton, id]);

  // handle button update
  const handleButtonUpdate = async (data) => {
    try {
      setLoading(true);
      const response = await Requests.Button2.Update(data, id);
      if (response && response.status === 200) {
        Toastify.Success(response.data.message);
      }
      history.push("/dashboard/button2");
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
        mainTitle="Edit Button"
        subTitle="Edit new button"
        tag="Home / Button /"
        pageTag="Edit button"
      />

      {/* Manage button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/button2"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">
              {" "}
              <AlignJustify size={20} /> Manage button
            </Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {/* Main button card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Header className="bg-white rounded border-0">
            <div>
              <Text className="mb-0 ps-1 pt-3 fs-17">Edit Button</Text>
            </div>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            {/* Button Form */}
            <Button2Form
              loading={loading}
              submit={handleButtonUpdate}
              data={button}
              update={true}
            />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Edit;
