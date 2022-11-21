import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { AlignJustify } from "react-feather";
import { TopBarForm } from "../../components/form/topbar_form";
import { PrimaryButton } from "../../components/button";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Toastify } from "../../components/toastify";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { Requests } from "../../utils/http";

const Show = () => {
  const [loading, setLoading] = useState(false);
  const [topBar, setTopBar] = useState({});
  const { id } = useParams();

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
        mainTitle="Show Topbar"
        subTitle="Show your topbar"
        tag="Home / Topbar /"
        pageTag="Show Topbar"
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
            <TopBarForm loading={loading} topBar={topBar} view={true} />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Show;
