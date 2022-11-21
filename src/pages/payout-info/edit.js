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
import { PayoutInfoForm } from "../../components/form/PayoutInfo_form";

const Edit = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  // handle payout info update
  const handlePayoutInfoUpdate = async (data) => {
    try {
      setLoading(true);
      const response = await Requests.PayoutInfo.Update(data, id);
      if ((response && response.status === 200) || response.status === 201) {
        Toastify.Success(response.data.message);
        history.push("/dashboard/payout-info");
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
        mainTitle="Edit Payout Info"
        subTitle="Edit your payout info"
        tag="Home / Payout Info /"
        pageTag="Edit Payout Info"
      />

      {/* Manage payout info button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/payout-info"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">
              <AlignJustify size={20} /> Manage Payout Info
            </Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {/* Main payout info card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Header className="bg-white rounded border-0">
            <div>
              <Text className="mb-0 ps-1 pt-3 fs-17">Edit Payout Info</Text>
            </div>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            {/* Payout Info Form */}
            <PayoutInfoForm
              update={true}
              loading={loading}
              submit={handlePayoutInfoUpdate}
            />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Edit;
