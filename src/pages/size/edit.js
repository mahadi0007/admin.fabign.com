import React from "react";
import { useCallback, useEffect, useState } from "react";
import { AlignJustify } from "react-feather";
import { Link, useHistory, useParams } from "react-router-dom";
import { PrimaryButton } from "../../components/button";
import { Card } from "../../components/card";
import { Container } from "../../components/container";
import { SizeForm } from "../../components/form/SizeForm";
import { Loader } from "../../components/loading";
import { Text } from "../../components/text";
import { TitleBar } from "../../components/titleBar";
import { Toastify } from "../../components/toastify";
import { CustomError } from "../../utils/error";
import { Requests } from "../../utils/http";

const Edit = () => {
  const history = useHistory();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchSingleSize = useCallback(async () => {
    try {
      const response = await Requests.Size.Show(id);
      console.log(response);
      if (response && response.status === 200) {
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
    fetchSingleSize(1);
  }, [fetchSingleSize]);

  // handle size update
  const handleSizeUpdate = async (data) => {
    setUpdateLoading(true);
    try {
      const response = await Requests.Size.Update(data, id);
      if (response && response.status === 201) {
        setUpdateLoading(false);
        Toastify.Success(response.data.message);
      }
      history.push("/dashboard/size");
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
        mainTitle="Edit Size"
        subTitle="Edit size"
        tag="Home / Size /"
        pageTag="Edit size"
      />

      {/* Manage Size button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/size"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">
              <AlignJustify size={20} /> Manage size
            </Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {loading ? <Loader /> : null}

      {/* Main size card */}
      {!loading && Object.keys(data).length ? (
        <Container.Column>
          <Card.Simple className="border-0">
            <Card.Header className="bg-white rounded border-0">
              <div>
                <Text className="mb-0 ps-1 pt-3 fs-17">Edit Size</Text>
              </div>
            </Card.Header>
            <hr />
            <Card.Body className="px-20 pb-4 pt-0">
              {/* Size Form */}
              <SizeForm
                update={true}
                loading={updateLoading}
                sizeData={data}
                submit={handleSizeUpdate}
              />
            </Card.Body>
          </Card.Simple>
        </Container.Column>
      ) : null}
    </div>
  );
};

export default Edit;
