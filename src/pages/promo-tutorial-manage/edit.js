import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { AlignJustify } from "react-feather";
import { PrimaryButton } from "../../components/button";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { Toastify } from "../../components/toastify";
import { CustomError } from "../../utils/error";
import { Requests } from "../../utils/http";
import { PromoTutorialForm } from "../../components/form/PromoTutorial_form";

const Edit = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  // handle promo tutorial update
  const handlePromoTutorialUpdate = async (data) => {
    try {
      setLoading(true);
      const response = await Requests.PromoTutorial.Update(data, id);
      if ((response && response.status === 200) || response.status === 201) {
        Toastify.Success(response.data.message);
        history.push("/dashboard/promo-tutorial-manage");
      }
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
        mainTitle="Edit Promo Tutorial"
        subTitle="Edit your promo tutorial"
        tag="Home / Promo Tutorial /"
        pageTag="Edit Promo Tutorial"
      />

      {/* Manage e-banner button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/promo-tutorial-manage"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">
              <AlignJustify size={20} /> Manage Promo Tutorial
            </Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {/* Main e-banner card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Header className="bg-white rounded border-0">
            <div>
              <Text className="mb-0 ps-1 pt-3 fs-17">Edit Promo Tutorial</Text>
            </div>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            {/* Product Form */}
            <PromoTutorialForm
              update={true}
              loading={loading}
              submit={handlePromoTutorialUpdate}
            />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Edit;
