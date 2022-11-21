import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { AlignJustify } from "react-feather";
import { SmsTemplateForm } from "../../components/form/SmsTemplateForm";
import { PrimaryButton } from "../../components/button";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Toastify } from "../../components/toastify";
import { CustomError } from "../../utils/error";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { Requests } from "../../utils/http";

const Store = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  // handle size create
  const handleSizeCreate = async (data) => {
    try {
      setLoading(true);
      const response = await Requests.Size.Store(data);
      if (response && response.status === 201) {
        Toastify.Success(response.data.message);
      }
      history.push("/dashboard/size");
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
        mainTitle="Add SMS Template"
        subTitle="Add new sms template"
        tag="Home / SMS Template /"
        pageTag="Add sms template"
      />

      {/* Manage SMS Template button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/sms/sms-template"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">
              <AlignJustify size={20} /> Manage sms template
            </Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {/* Main size card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Header className="bg-white rounded border-0">
            <div>
              <Text className="mb-0 ps-1 pt-3 fs-17">Add Size</Text>
            </div>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            {/* SMS Template Form */}
            <SmsTemplateForm loading={loading} submit={handleSizeCreate} />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Store;
