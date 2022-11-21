import React, { useCallback, useEffect, useState } from "react";
import { AlignJustify } from "react-feather";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { TitleBar } from "../../components/titleBar";
import { Container } from "../../components/container";
import { PrimaryButton } from "../../components/button";
import { AdminForm } from "../../components/form/admin_form";
import { NoContent } from "../../components/204";
import { Loader } from "../../components/loading";
import { Toastify } from "../../components/toastify";
import { Requests } from "../../utils/http";
import { CustomError } from "../../utils/error";

const Edit = () => {
  const { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState([]);
  const [admin, setAdmin] = useState({});
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [serverError, setServerError] = useState(false);

  // Fetch data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await Requests.Admin.Show(id);
      if (response && response.status === 200) {
        setAdmin(response.data.data || {});
      }
      setLoading(false);
    } catch (error) {
      if (error) {
        setLoading(false);
        setServerError(true);
      }
    }
  }, [id]);

  // fetch role
  const fetchRole = useCallback(async () => {
    try {
      const response = await Requests.Role.Index();
      if (response && response.status === 200) {
        const items = [];
        if (response.data.data && response.data.data.length > 0) {
          for (let i = 0; i < response.data.data.length; i++) {
            const element = response.data.data[i];
            items.push({
              label: element.role,
              value: element._id,
            });
          }
        }
        setData(items);
      }
    } catch (error) {
      if (error) {
        if (error.response) {
          await CustomError(error.response);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchRole();
  }, [fetchRole]);

  // handle admin update
  const handleSubmission = async (data) => {
    try {
      setUpdating(true);
      const response = await Requests.Admin.Edit(id, data);
      if (response && response.status === 201) {
        Toastify.Success(response.data.message);
      }
      history.push("/dashboard/admin");
      setUpdating(false);
    } catch (error) {
      if (error) {
        setUpdating(false);
        if (error.response) {
          await CustomError(error.response);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  };

  return (
    <div className="mb-3">
      <TitleBar
        mainTitle="Edit Admin"
        subTitle="Edit admin"
        tag="Home / Admin /"
        pageTag="Edit admin"
      />

      {/* Manage admin button */}
      <Container.Column className="text-end">
        <Link to="/dashboard/admin">
          <PrimaryButton className="px-3 mb-3">
            <Text className="fs-15 mb-0">
              <AlignJustify size={20} /> Manage admin
            </Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {loading && !serverError && !Object.keys(admin).length ? (
        <Loader />
      ) : null}
      {!loading && !Object.keys(admin).length && !serverError ? (
        <NoContent message="No data available." />
      ) : null}
      {!loading && !Object.keys(admin).length && serverError ? (
        <NoContent message="No data available." />
      ) : null}

      {/* Main admin card */}
      {!loading && Object.keys(admin).length && !serverError ? (
        <Container.Column>
          <Card.Simple className="border-0">
            <Card.Header className="bg-white rounded border-0">
              <Text className="mb-0 ps-1 pt-3 fs-17">Edit admin</Text>
            </Card.Header>
            <hr />
            <Card.Body className="px-20 pb-4 pt-0">
              <AdminForm
                loading={updating}
                roles={data}
                data={admin}
                submit={handleSubmission}
                update={true}
              />
            </Card.Body>
          </Card.Simple>
        </Container.Column>
      ) : null}
    </div>
  );
};

export default Edit;
