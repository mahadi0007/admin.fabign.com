import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Text } from "../text";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { PrimaryButton } from "../button";
import { FileUploader } from "../fileUploader";
import { SingleSelect } from "../select";

export const AdminForm = (props) => {
  const data = props.data || {};
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (props.data) {
      setValue("name", props.data.name);
      setValue("email", props.data.email);
      setValue("phone", props.data.phone);
      setValue("present_address", props.data.address.present_address);
      setValue("permanent_address", props.data.address.permanent_address);
      setRole(props.data.role._id);
      setValue("image", props.data.image);
    }
  }, [props.data]);

  // data submit
  const onSubmit = async (data) => {
    const formData = new FormData();

    if (!role) {
      setError("role", {
        type: "manual",
        message: "Role is required",
      });
    }

    if (!data.image) {
      setError("image", {
        type: "manual",
        message: "Image is required",
      });
    }

    if (data.image) {
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("present_address", data.present_address);
      formData.append("permanent_address", data.permanent_address);
      formData.append("role", role);
      formData.append("password", data.password);
      formData.append("image", data.image);

      props.submit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Row>
        {/* Name */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.name && errors.name.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.name && errors.name.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Name <span className="text-danger">*</span>
              </Text>
            )}

            <input
              type="text"
              className={
                errors.name
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter name"
              defaultValue={data.name || null}
              {...register("name", { required: "Name is required" })}
              disabled={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* Email */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.email && errors.email.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.email && errors.email.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Email <span className="text-danger">*</span>
              </Text>
            )}

            <input
              type="text"
              className={
                errors.email
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter email"
              defaultValue={data.email || null}
              {...register("email", { required: "Email is required" })}
              disabled={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* Phone */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.phone && errors.phone.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.phone && errors.phone.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Phone <span className="text-danger">*</span>
              </Text>
            )}

            <input
              type="text"
              className={
                errors.phone
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter phone"
              defaultValue={data.phone || null}
              {...register("phone", { required: "Phone is required" })}
              disabled={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* Present address */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.present_address && errors.present_address.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.present_address && errors.present_address.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Present address <span className="text-danger">*</span>
              </Text>
            )}

            <input
              type="text"
              className={
                errors.present_address
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter present address"
              defaultValue={data.address ? data.address.present_address : null}
              {...register("present_address", {
                required: "Present address is required",
              })}
              disabled={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* Permanent address */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.permanent_address && errors.permanent_address.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.permanent_address && errors.permanent_address.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Permanent address <span className="text-danger">*</span>
              </Text>
            )}

            <input
              type="text"
              className={
                errors.permanent_address
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter present address"
              defaultValue={
                data.address ? data.address.permanent_address : null
              }
              {...register("permanent_address", {
                required: "Permanent address is required",
              })}
              disabled={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* Role */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.role && errors.role.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.role && errors.role.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Role <span className="text-danger">*</span>
              </Text>
            )}

            <SingleSelect
              borderRadius={4}
              placeholder="Select role"
              options={props.roles}
              deafult={
                data.role
                  ? { label: data.role.role, value: data.role._id }
                  : null
              }
              value={(data) => {
                setRole(data.value);
                clearErrors("role");
              }}
              isDisabled={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* Password */}
        {!props.view && !props.update ? (
          <Container.Column className="col-lg-6">
            <FormGroup>
              {errors.password && errors.password.message ? (
                <Text className="text-danger fs-13 mb-0">
                  {errors.password && errors.password.message}
                </Text>
              ) : (
                <Text className="fs-13 mb-0">
                  Password <span className="text-danger">*</span>
                </Text>
              )}

              <input
                type="password"
                className={
                  errors.password
                    ? "form-control shadow-none error"
                    : "form-control shadow-none"
                }
                placeholder="Enter password"
                defaultValue={data ? data.password : ""}
                {...register("password", {
                  required: "Password is required",
                })}
              />
            </FormGroup>
          </Container.Column>
        ) : null}

        {props.update ? (
          <Container.Column className="col-lg-6">
            <FormGroup>
              {errors.password && errors.password.message ? (
                <Text className="text-danger fs-13 mb-0">
                  {errors.password && errors.password.message}
                </Text>
              ) : (
                <Text className="fs-13 mb-0">Password</Text>
              )}

              <input
                type="password"
                className={
                  errors.password
                    ? "form-control shadow-none error"
                    : "form-control shadow-none"
                }
                placeholder="Enter password"
                defaultValue={data ? data.password : ""}
                {...register("password")}
              />
            </FormGroup>
          </Container.Column>
        ) : null}

        {/* Image */}
        <Container.Column className="col-lg-6">
          <FileUploader
            imageURL={data && data.image ? data.image : null}
            error={errors.image ? errors.image.message : ""}
            width={90}
            height={90}
            limit={100}
            title="Title image"
            dataHandeller={(data) => {
              if (data.error) {
                setError("image", {
                  type: "manual",
                  message: data.error,
                });
              }

              if (data.image) {
                clearErrors("image");
                setValue("image", data.image);
              }
            }}
            dataClear={() => {
              setValue("image", null);
            }}
            input={!props.view && true}
            removable={!props.view && true}
          />
        </Container.Column>
      </Container.Row>

      {/* Submit button */}
      {!props.view && (
        <div className="text-end">
          <PrimaryButton
            type="submit"
            className="px-4 fw-bolder text-uppercase"
            disabled={props.loading}
          >
            <Text className="fs-14 mb-0">
              {props.loading ? "Submitting ..." : "Submit"}
            </Text>
          </PrimaryButton>
        </div>
      )}
    </form>
  );
};
