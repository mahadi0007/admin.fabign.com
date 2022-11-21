import React, { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AlignJustify } from "react-feather";
import { PrimaryButton } from "../../components/button";
import { MultiSelect } from "../../components/select/index";
import { Container } from "../../components/container";
import { FormGroup } from "../../components/formGroup";
import { Toastify } from "../../components/toastify";
import { CustomError } from "../../utils/error";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { Requests } from "../../utils/http";
import { TitleBar } from "../../components/titleBar";

const Store = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState({ values: [], options: [] });

  // fetch permissions
  const fetchData = useCallback(async () => {
    try {
      let options = [];

      const response = await Requests.Role.Routes();
      if (response && response.status === 200) {
        if (response.data.data && response.data.data.length > 0)
          for (let i = 0; i < response.data.data.length; i++) {
            const element = response.data.data[i];
            options.push({
              label: _.capitalize(element.group),
              value: element.group,
            });
          }
      }

      setPermissions((exPermission) => ({ ...exPermission, options: options }));
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
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle permission
  const handlePermission = (data) => {
    setPermissions((exPermission) => ({ ...exPermission, values: data }));
    clearErrors(["permission"]);
  };

  // Submit Form
  const onSubmit = async (data) => {
    try {
      if (!permissions.values.length) {
        return setError("permission", {
          type: "manual",
          message: "Permission is required!",
        });
      }

      const formData = {
        ...data,
        rights: permissions.values.map((item) => item.value),
      };

      setLoading(true);
      const response = await Requests.Role.Store(formData);
      if (response && response.status === 201) {
        Toastify.Success(response.data.message);
      }
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
    <Container.Fluid>
      <Container.Row>
        {/* Title bar */}
        <Container.Column>
          <TitleBar
            mainTitle="Add Role"
            subTitle="Add new Role"
            tag="Home / Role & Permission /"
            pageTag="Add Role"
          />
        </Container.Column>

        {/* Manage role button */}
        <Container.Column className="text-end">
          <Link to={`/dashboard/role`}>
            <PrimaryButton className="px-4 mb-3">
              <Text className="fs-15 mb-0">
                {" "}
                <AlignJustify size={20} /> Manage roles
              </Text>
            </PrimaryButton>
          </Link>
        </Container.Column>

        {/* Create role card */}
        <Container.Column>
          <Card.Simple className="border-0 shadow-sm">
            <Card.Header className="bg-white rounded border-0">
              <div>
                <Text className="mb-0 ps-1 pt-3 fs-17">Create role</Text>
              </div>
            </Card.Header>
            <hr />
            <Card.Body className="p-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Role */}
                <FormGroup>
                  {errors.role && errors.role.message ? (
                    <Text className="fs-14 mb-0 text-danger">
                      {errors.role && errors.role.message}
                    </Text>
                  ) : (
                    <Text className="fs-14 mb-0">Role</Text>
                  )}

                  <input
                    type="text"
                    className="form-control shadow-none"
                    placeholder="Enter role title"
                    {...register("role", {
                      required: "Role title is required",
                    })}
                  />
                </FormGroup>

                {/* Permission */}
                <FormGroup>
                  {errors.permission && errors.permission.message ? (
                    <Text className="fs-14 mb-0 text-danger">
                      {errors.permission && errors.permission.message}
                    </Text>
                  ) : (
                    <Text className="fs-14 mb-0">Select permission</Text>
                  )}

                  <MultiSelect
                    placeholder="permission"
                    options={permissions.options}
                    values={(data) => handlePermission(data)}
                  />
                </FormGroup>

                <div className="text-end">
                  <PrimaryButton
                    type="submit"
                    className="btn shadow-none"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating ..." : "Create"}
                  </PrimaryButton>
                </div>
              </form>
            </Card.Body>
          </Card.Simple>
        </Container.Column>
      </Container.Row>
    </Container.Fluid>
  );
};

export default Store;
