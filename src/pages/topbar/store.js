import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { AlignJustify } from "react-feather";
import { TopBarForm } from "../../components/form/topbar_form";
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

  // handle topbar create
  const handleTopBarCreate = async (data) => {
    try {
      setLoading(true);
      const response = await Requests.TopBar.Store(data);
      if (response && response.status === 200) {
        Toastify.Success(response.data.message);
      }
      history.push("/dashboard/topbar");
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
        mainTitle="Add Topbar"
        subTitle="Add new Topbar"
        tag="Home / Topbar /"
        pageTag="Add Topbar"
      />

      {/* Manage Topbar button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/Topbar"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">
              {" "}
              <AlignJustify size={20} /> Manage Topbar
            </Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {/* Main Topbar card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Header className="bg-white rounded border-0">
            <div>
              <Text className="mb-0 ps-1 pt-3 fs-17">Add Topbar</Text>
            </div>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            {/* Topbar Form */}
            <TopBarForm loading={loading} submit={handleTopBarCreate} />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Store;
