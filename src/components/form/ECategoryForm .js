import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FileUploader } from "../fileUploader";
import { PrimaryButton } from "../button";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { Text } from "../text";
import { Requests } from "../../utils/http";

export const ECategoryForm = (props) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const categoryData = props.categoryData ? props.categoryData : {};
  const [image, setImage] = useState(
    props.categoryData && props.categoryData.banner
      ? props.categoryData.banner
      : null
  );
  const [icon, setIcon] = useState(
    props.categoryData && props.categoryData.icon
      ? props.categoryData.icon
      : null
  );

  // Category Submit
  const onSubmit = async (data) => {
    const formData = new FormData();

    if (!image) {
      setError("image", {
        type: "manual",
        message: "Image is required",
      });
    }
    if (image) {
      formData.append("name", data.name);
      formData.append("indexId", data.indexId);
      formData.append("isActive", data.isActive);
      formData.append("banner", image);
      formData.append("icon", icon);
      props.submit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Row>
        {/* Name */}
        <Container.Column>
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
              defaultValue={categoryData ? categoryData.name : null}
              {...register("name", { required: "Name is required" })}
            />
          </FormGroup>
        </Container.Column>

        {/* Index ID */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.indexId && errors.indexId.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.indexId && errors.indexId.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">Index ID</Text>
            )}
            <input
              type="number"
              min={0}
              className={
                errors.indexId
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter index id"
              defaultValue={categoryData ? categoryData.indexId : null}
              {...register("indexId")}
            />
          </FormGroup>
        </Container.Column>

        {/* Is Active */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.isActive && errors.isActive.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.isActive && errors.isActive.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0"> Active status </Text>
            )}

            <select
              className={
                errors.isActive
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              defaultValue={categoryData ? categoryData.isActive : "true"}
              {...register("isActive")}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </FormGroup>
        </Container.Column>

        {/* Banner */}
        <Container.Column className="col-lg-6">
          <FileUploader
            imageURL={
              categoryData && categoryData.banner
                ? Requests.HostUrl + categoryData.banner
                : null
            }
            error={errors.image ? errors.image.message : null}
            width={125}
            height={110}
            title="Banner"
            dataHandeller={(data) => {
              if (data.error) {
                setError("image", {
                  type: "manual",
                  message: data.error,
                });
              }

              if (data.image) {
                clearErrors("image");
                setImage(data.image);
              }
            }}
            dataClear={() => {
              setImage(null);
            }}
            input={true}
            removable={true}
          />
        </Container.Column>

        {/* Icon */}
        <Container.Column className="col-lg-6">
          <FileUploader
            imageURL={
              categoryData && categoryData.icon
                ? Requests.HostUrl + categoryData.icon
                : null
            }
            error={errors.image ? errors.image.message : null}
            width={125}
            height={110}
            title="Icon"
            dataHandeller={(data) => {
              if (data.error) {
                setError("image", {
                  type: "manual",
                  message: data.error,
                });
              }

              if (data.image) {
                clearErrors("image");
                setIcon(data.image);
              }
            }}
            dataClear={() => {
              setIcon(null);
            }}
            input={true}
            removable={true}
          />
        </Container.Column>
      </Container.Row>

      {/* Submit button */}
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
    </form>
  );
};
