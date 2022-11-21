import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
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

const Edit = () => {
  const [loading, setLoading] = useState(false);
  const [topBar, setTopBar] = useState({});
  const history = useHistory();
  const { id } = useParams();

  // handle topbar update
  const handleTopBarUpdate = async (data) => {
    try {
      setLoading(true);
      const response = await Requests.TopBar.Edit(id, data);
      if (response && response.status === 201) {
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

  const fetchTopbar = useCallback(async (id) => {
    try {
      const response = await Requests.TopBar.Show(id);
      if (response && response.status === 200) {
        setTopBar(response.data.body);
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
      fetchTopbar(id);
    }
  }, [fetchTopbar, id]);

  return (
    <div>
      {/* Title bar */}
      <TitleBar
        mainTitle="Edit Topbar"
        subTitle="Edit your topbar"
        tag="Home / Topbar /"
        pageTag="Edit Topbar"
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
              <Text className="mb-0 ps-1 pt-3 fs-17">Edit Topbar</Text>
            </div>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            {/* Topbar Form */}
            <TopBarForm
              loading={loading}
              submit={handleTopBarUpdate}
              topBar={topBar}
              update={true}
            />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Edit;
