import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { AlignJustify } from "react-feather";
import { SubCategory2Form } from "../../components/form/SubCategory2Form";
import { PrimaryButton } from "../../components/button";
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

  // handle sub category update
  const handleSubCategoryUpdate = async (data) => {
    try {
      setLoading(true);
      const response = await Requests.SubCategory2.Edit(id, data);
      if (response && response.status === 201) {
        Toastify.Success(response.data.message);
      }
      history.push("/dashboard/sub-category2");
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
        mainTitle="Edit Sub Category"
        subTitle="Edit your sub-category"
        tag="Home / Sub category /"
        pageTag="Edit sub category"
      />

      {/* Manaage sub category button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/sub-category2"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">
              {" "}
              <AlignJustify size={20} /> Manage sub-category
            </Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {/* Main sub category card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Header className="bg-white rounded border-0">
            <div>
              <Text className="mb-0 ps-1 pt-3 fs-17">Edit Sub-Category</Text>
            </div>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            {/* Sub Category Form */}
            <SubCategory2Form
              loading={loading}
              submit={handleSubCategoryUpdate}
              update={true}
            />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Edit;
