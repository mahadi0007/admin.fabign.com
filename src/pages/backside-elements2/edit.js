import React, { useState, useCallback, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { AlignJustify } from "react-feather";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { TitleBar } from "../../components/titleBar";
import { Container } from "../../components/container";
import { PrimaryButton } from "../../components/button";
import { Toastify } from "../../components/toastify";
import { CustomError } from "../../utils/error";
import { Requests } from "../../utils/http";
import { BacksideElement2Form } from "../../components/form/backside_element2_form";

const Edit = () => {
  const [backsideElement, setBacksideElement] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  const fetchBacksideElement = useCallback(async (id) => {
    try {
      const response = await Requests.BacksideElement2.Show(id);
      console.log(response);
      if (response && response.status === 200) {
        setBacksideElement(response.data.body);
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
      fetchBacksideElement(id);
    }
  }, [fetchBacksideElement, id]);

  // Handle submit
  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await Requests.BacksideElement2.Update(data, id);
      console.log(response);
      if (response && response.status === 201) {
        Toastify.Success(response.data.message);
      }
      history.push("/dashboard/backside-elements2");
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
    <div className="mb-4">
      {/* Title bar */}
      <TitleBar
        mainTitle="Edit Backside Element"
        subTitle="Edit your backside element"
        tag="Home / Backside elements /"
        pageTag="Edit backside element"
      />

      {/* Manage backside element button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/backside-elements2"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">
              <AlignJustify size={20} /> Manage backside elements
            </Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {/* Main element card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Header className="bg-white rounded border-0">
            <Text className="mb-0 ps-1 pt-3 fs-17">Edit Backside Element</Text>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 py-20">
            <BacksideElement2Form
              loading={loading}
              elementData={backsideElement}
              onSubmit={handleSubmit}
              update={true}
            />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Edit;
