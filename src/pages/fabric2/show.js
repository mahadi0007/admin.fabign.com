import React, { useState, useCallback, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { AlignJustify } from "react-feather";
import { Fabric2Form } from "../../components/form/Fabric2Form";
import { PrimaryButton } from "../../components/button";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Toastify } from "../../components/toastify";
import { CustomError } from "../../utils/error";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { Requests } from "../../utils/http";

const Show = () => {
  const [loading, setLoading] = useState(false);
  const [fabirc, setFabirc] = useState(null);
  const history = useHistory();
  const { id } = useParams();

  // handle fabric update
  const handleFabricUpdate = async (data) => {
    try {
      setLoading(true);
      // const response = await Requests.Fabric2.Store(data);
      // if (response && response.status === 201) {
      //   Toastify.Success(response.data.message);
      // }
      history.push("/dashboard/fabric2");
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

  const fetchFabric = useCallback(async (id) => {
    try {
      const response = await Requests.Fabric2.Show(id);
      console.log(response);
      if (response && response.status === 200) {
        setFabirc(response.data.body);
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
      fetchFabric(id);
    }
  }, [fetchFabric, id]);
  return (
    <div>
      {/* Title bar */}
      <TitleBar
        mainTitle="Show Fabric"
        subTitle="Show your Fabric"
        tag="Home / Fabric /"
        pageTag="Show Fabric"
      />

      {/* Manage fabric button */}
      <Container.Column className="text-end">
        <Link to={`/dashboard/fabric2`}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">
              {" "}
              <AlignJustify size={20} /> Manage fabrics
            </Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {/* Main fabric card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Header className="bg-white rounded border-0">
            <div>
              <Text className="mb-0 ps-1 pt-3 fs-17">Show Fabric</Text>
            </div>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            {/* Fabric Form */}
            <Fabric2Form
              loading={loading}
              submit={handleFabricUpdate}
              view={true}
              elementData={fabirc}
            />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Show;
