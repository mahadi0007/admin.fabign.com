import React, { useCallback, useEffect, useState } from "react";
import { AlignJustify } from "react-feather";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { TitleBar } from "../../components/titleBar";
import { Container } from "../../components/container";
import { PrimaryButton } from "../../components/button";
import { AdminForm } from "../../components/form/admin_form";
import { Requests } from "../../utils/http";
import { Toastify } from "../../components/toastify";
import { CustomError } from "../../utils/error";

const Store = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch admin data
  const fetchData = useCallback(async () => {
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
    fetchData(1);
  }, [fetchData]);

  // handle admin create
  const handleSubmission = async (data) => {
    try {
      setLoading(true);
      const response = await Requests.Admin.Store(data);
      if (response && response.status === 201) {
        Toastify.Success(response.data.message);
      }
      history.push("/dashboard/admin");
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
    <div className="mb-3">
      <TitleBar
        mainTitle="Add Admin"
        subTitle="Add new admin"
        tag="Home / Admin /"
        pageTag="Add admin"
      />

      {/* Manage category button */}
      <Container.Column className="text-end">
        <Link to="/dashboard/admin">
          <PrimaryButton className="px-3 mb-3">
            <Text className="fs-15 mb-0">
              <AlignJustify size={20} /> Manage admin
            </Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {/* Main category card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Header className="bg-white rounded border-0">
            <Text className="mb-0 ps-1 pt-3 fs-17">Add admin</Text>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            <AdminForm
              loading={loading}
              roles={data}
              submit={handleSubmission}
            />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Store;
