import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { AlignJustify } from "react-feather";
import { CategoryForm } from "../../components/form/CategoryForm";
import { PrimaryButton } from "../../components/button";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Toastify } from "../../components/toastify";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { Requests } from "../../utils/http";

const Show = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchSingleCategory = useCallback(async () => {
    try {
      const response = await Requests.Category.Show(id);
      if (response?.data?.body && response.status === 200) {
        setLoading(false);
        setData(response.data.body);
      }
    } catch (error) {
      if (error) {
        setLoading(false);
        Toastify.Error(error.message);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchSingleCategory();
  }, [fetchSingleCategory]);

  return (
    <div>
      {/* Title bar */}
      <TitleBar
        mainTitle="Show Category"
        subTitle="Show category"
        tag="Home / Category /"
        pageTag="Show category"
      />

      {/* Manage category button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/category"}>
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
            <CategoryForm loading={loading} categoryData={data} view={true} />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Show;
