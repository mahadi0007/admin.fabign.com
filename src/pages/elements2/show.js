import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { AlignJustify } from "react-feather";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { TitleBar } from "../../components/titleBar";
import { Container } from "../../components/container";
import { PrimaryButton } from "../../components/button";
import { Element2Form } from "../../components/form/element2_form";
import { Toastify } from "../../components/toastify";
import { Requests } from "../../utils/http";
import { useParams } from "react-router-dom";

const Show = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const { id } = useParams();

  const fetchSingleElement = useCallback(async (id) => {
    try {
      setLoading(true);
      const response = await Requests.Element2.Show(id);
      setData(response.data.body);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error) {
        Toastify.Error(error.message);
      }
    }
  }, []);

  useEffect(() => {
    fetchSingleElement(id);
  }, []);

  return (
    <div className="mb-4">
      {/* Title bar */}
      <TitleBar
        mainTitle="Show Element"
        subTitle="Show your element"
        tag="Home / Elements /"
        pageTag="Show element"
      />

      {/* Manage element button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/elements2"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">
              <AlignJustify size={20} /> Manage elements
            </Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {/* Main element card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Header className="bg-white rounded border-0">
            <Text className="mb-0 ps-1 pt-3 fs-17">Show Element</Text>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 py-20">
            <Element2Form loading={loading} view={true} elementData={data} />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Show;
