import React from "react";
import { useCallback, useEffect, useState } from "react";
import { AlignJustify } from "react-feather";
import { ESliderForm } from "../../components/form/ESliderForm";
import { Link, useHistory, useParams } from "react-router-dom";
import { PrimaryButton } from "../../components/button";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Toastify } from "../../components/toastify";
import { Loader } from "../../components/loading";
import { CustomError } from "../../utils/error";
import { Card } from "../../components/card";
import { Text } from "../../components/text";
import { Requests } from "../../utils/http";

const Edit = () => {
  const history = useHistory();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchSingleEBanner = useCallback(async () => {
    try {
      const response = await Requests.ESlider.Show(id);
      if (response?.data?.body && response.status === 200) {
        setLoading(false);
        console.log("response.data.body");
        console.log(response.data.body);
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
    fetchSingleEBanner();
  }, [fetchSingleEBanner]);

  // handle size update
  const handleEBrandUpdate = async (data) => {
    setUpdateLoading(true);
    try {
      const response = await Requests.ESlider.Update(data, id);
      if (response && response.status === 200) {
        setUpdateLoading(false);
        Toastify.Success(response.data.message);
      }
      history.push("/dashboard/e-slider");
    } catch (error) {
      if (error) {
        setUpdateLoading(false);
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
        mainTitle="Edit E-Slider"
        subTitle="Edit your e-slider"
        tag="Home / E-commerce / E-Slider /"
        pageTag="Edit e-slider"
      />

      {/* Manage banner button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/e-slider"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">
              <AlignJustify size={20} /> Manage Slider
            </Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {loading ? <Loader /> : null}

      {/* Main banner card */}
      {!loading && Object.keys(data).length ? (
        <Container.Column>
          <Card.Simple className="border-0">
            <Card.Header className="bg-white rounded border-0">
              <div>
                <Text className="mb-0 ps-1 pt-3 fs-17">Edit Slider</Text>
              </div>
            </Card.Header>
            <hr />
            <Card.Body className="px-20 pb-4 pt-0">
              {/* E-banner Form */}
              <ESliderForm
                update={true}
                loading={updateLoading}
                sliderData={data}
                submit={handleEBrandUpdate}
              />
            </Card.Body>
          </Card.Simple>
        </Container.Column>
      ) : null}
    </div>
  );
};

export default Edit;
