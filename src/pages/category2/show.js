import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { AlignJustify } from "react-feather";
import { Category2Form } from "../../components/form/Category2Form";
import { PrimaryButton } from "../../components/button";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Toastify } from "../../components/toastify";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { Requests } from "../../utils/http";

const Show = () => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState({});
  const { id } = useParams();

  const fetchCategory = useCallback(async (id) => {
    try {
      const response = await Requests.Category2.Show(id);
      console.log(response);
      if (response && response.status === 200) {
        setCategory(response.data.body);
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
      fetchCategory(id);
    }
  }, [fetchCategory, id]);

  return (
    <div>
      {/* Title bar */}
      <TitleBar
        mainTitle="Show Category"
        subTitle="Show your category"
        tag="Home / Category /"
        pageTag="Show category"
      />

      {/* Manage category button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/category2"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">
              {" "}
              <AlignJustify size={20} /> Manage category
            </Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {/* Main category card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Header className="bg-white rounded border-0">
            <div>
              <Text className="mb-0 ps-1 pt-3 fs-17">Show Category</Text>
            </div>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            {/* Category Form */}
            <Category2Form
              loading={loading}
              categoryData={category}
              view={true}
            />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Show;
