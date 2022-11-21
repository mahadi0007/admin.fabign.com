import React, { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { useForm } from "react-hook-form";
import { ChevronLeft } from "react-feather";
import { Link, useParams } from "react-router-dom";
import { MultiSelect } from "../../components/select/index";
import { Loader } from "../../components/loading/index";
import { Toastify } from "../../components/toastify";
import { CustomError } from "../../utils/error";
import { Requests } from "../../utils/http";
import { Container } from "../../components/container";
import { Card } from "../../components/card";
import { Text } from "../../components/text";
import { GrayButton, PrimaryButton } from "../../components/button";
import { FormGroup } from "../../components/formGroup";

const Edit = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState(null);
  const [isUpdate, setUpdate] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState({ values: [], options: [] });

  // fetch permissions
  const fetchData = useCallback(async () => {
    try {
      let options = [];
      let selectedOptions = [];

      const response = await Requests.Role.Routes();
      const roleResponse = await Requests.Role.Show(id);

      if (roleResponse.status === 200 && roleResponse.status === 200) {
        setData(roleResponse.data.data);

        if (
          roleResponse.data.data.rights &&
          roleResponse.data.data.rights.length
        ) {
          for (let i = 0; i < roleResponse.data.data.rights.length; i++) {
            const element = roleResponse.data.data.rights[i];
            selectedOptions.push({
              label: element,
              value: _.capitalize(element),
            });
          }
        }
      }

      if (response.data.data && response.data.data.length) {
        for (let i = 0; i < response.data.data.length; i++) {
          const element = response.data.data[i];
          options.push({
            label: _.capitalize(element.group),
            value: element.group,
          });
        }
      }

      setPermissions({ options: options, values: selectedOptions });
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
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [id, fetchData]);

  // Handle permission
  const handlePermission = (data) => {
    setPermissions((exPermission) => ({
      ...exPermission,
      values: data.map((item) => ({
        _id: item.value,
        name: _.capitalize(item.label),
      })),
    }));
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
        rights: permissions.values.map((item) => item._id),
      };

      setUpdate(true);
      const response = await Requests.Role.Update(id, formData);
      if (response && response.status === 201) {
        Toastify.Success(response.data.message);
      }
      // await Requests.Role.Update(id, formData)
      setUpdate(false);
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

  if (isLoading) return <Loader />;

  return (
    <Container.Fluid>
      <Container.Row>
        <Container.Column>
          <Card.Simple className="border-0 shadow-sm">
            <Card.Header className="p-3 p-lg-4 bg-white">
              <div className="d-flex">
                <div className="pt-2">
                  <Text className="fs-18 mb-0">Edit Role</Text>
                </div>
                <div className="ms-auto">
                  <Link to="/dashboard/role">
                    <GrayButton
                      type="button"
                      className="btn shadow-none btn-circle"
                    >
                      <ChevronLeft size={20} color="#F6990E" />
                    </GrayButton>
                  </Link>
                </div>
              </div>
            </Card.Header>
            <Card.Body className="p-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Role */}
                <FormGroup>
                  {errors.role && errors.role.message ? (
                    <p className="text-danger">
                      {errors.role && errors.role.message}
                    </p>
                  ) : (
                    <p>Role</p>
                  )}

                  <input
                    type="text"
                    name="role"
                    defaultValue={data && data.role ? data.role : null}
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
                    <p className="text-danger">
                      {errors.permission && errors.permission.message}
                    </p>
                  ) : (
                    <p>Select permission</p>
                  )}

                  <MultiSelect
                    placeholder="permission"
                    options={permissions.options}
                    default={permissions.values}
                    values={(data) => handlePermission(data)}
                  />
                </FormGroup>

                <div className="text-end">
                  <PrimaryButton
                    type="submit"
                    className="btn shadow-none"
                    disabled={isUpdate}
                  >
                    {isUpdate ? "Updating ..." : "Update"}
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

export default Edit;
