import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { AlignJustify } from "react-feather";
import { PrimaryButton } from "../../components/button";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Toastify } from "../../components/toastify";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { Requests } from "../../utils/http";
import { Button2Form } from "../../components/form/Button2Form";

const Show = () => {
  const [button, setButton] = useState();
  const [loading, setLoading] = useState(false);
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

  return (
    <div>
      {/* Title bar */}
      <TitleBar
        mainTitle="Show Button"
        subTitle="Show your button"
        tag="Home / Button /"
        pageTag="Show button"
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
              <Text className="mb-0 ps-1 pt-3 fs-17">Show Button</Text>
            </div>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            {/* Button Form */}
            <Button2Form loading={loading} data={button} view={true} />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Show;
