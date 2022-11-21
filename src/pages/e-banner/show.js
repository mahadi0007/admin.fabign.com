import React from "react";
import { useCallback, useEffect, useState } from "react";
import { AlignJustify } from "react-feather";
import { EBannerForm } from "../../components/form/EBannerForm";
import { Link, useParams } from "react-router-dom";
import { PrimaryButton } from "../../components/button";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Toastify } from "../../components/toastify";
import { Loader } from "../../components/loading";
import { Card } from "../../components/card";
import { Text } from "../../components/text";
import { Requests } from "../../utils/http";

const Show = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchSingleEBanner = useCallback(async () => {
    try {
      const response = await Requests.EBanner.Show(id);
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
    fetchSingleEBanner();
  }, [fetchSingleEBanner]);

  return (
    <div>
      {/* Title bar */}
      <TitleBar
        mainTitle="Show E-banner"
        subTitle="Show your e-banner"
        tag="Home / E-commerce / E-banner /"
        pageTag="Show e-banner"
      />

      {/* Manage slider button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/e-banner"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">
              <AlignJustify size={20} /> Manage Banner
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
                <Text className="mb-0 ps-1 pt-3 fs-17">Show Banner</Text>
              </div>
            </Card.Header>
            <hr />
            <Card.Body className="px-20 pb-4 pt-0">
              {/* E-slider Form */}
              <EBannerForm loading={loading} bannerData={data} view={true} />
            </Card.Body>
          </Card.Simple>
        </Container.Column>
      ) : null}
    </div>
  );
};

export default Show;
