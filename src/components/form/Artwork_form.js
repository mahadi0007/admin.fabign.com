import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FileUploader } from "../fileUploader";
import { PrimaryButton } from "../button";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { Text } from "../text";

export const ArtworkForm = (props) => {
  // const [data, setData] = useState({});
  const data = props.data ? props.data : null;
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (props.data) {
      setValue("artwork_name", props.data.artwork_name);
      setValue("artwork_description", props.data.artwork_description);
      setValue("icon", props.data.icon);
    }
  }, [props.view, props.data]);

  // Category Submit
  const onSubmit = async (data) => {
    const formData = new FormData();

    if (!data.icon) {
      setError("icon", {
        type: "manual",
        message: "Title image is required",
      });
    }
    if (data.icon) {
      formData.append("artwork_name", data.artwork_name);
      formData.append("artwork_description", data.artwork_description);
      formData.append("icon", data.icon);

      props.submit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Column>
        {/* Name */}
        <FormGroup>
          {errors.artwork_name && errors.artwork_name.message ? (
            <Text className="text-danger fs-13 mb-0">
              {errors.artwork_name && errors.artwork_name.message}
            </Text>
          ) : (
            <Text className="fs-13 mb-0">
              Artwork name <span className="text-danger">*</span>
            </Text>
          )}
          <input
            type="text"
            className={
              errors.artwork_name
                ? "form-control shadow-none error"
                : "form-control shadow-none"
            }
            placeholder="Enter artwork name"
            {...register("artwork_name", {
              required: "Artwork name is required",
            })}
            readOnly={props.view && true}
          />
        </FormGroup>

        {/* Description */}
        <FormGroup>
          {errors.artwork_description && errors.artwork_description.message ? (
            <Text className="text-danger fs-13 mb-0">
              {errors.artwork_description && errors.artwork_description.message}
            </Text>
          ) : (
            <Text className="fs-13 mb-0">
              Artwork description <span className="text-danger">*</span>
            </Text>
          )}
          <textarea
            rows={5}
            className={
              errors.artwork_description
                ? "form-control shadow-none error"
                : "form-control shadow-none"
            }
            placeholder="Enter artwork description"
            {...register("artwork_description")}
            readOnly={props.view && true}
          />
        </FormGroup>
      </Container.Column>

      <Container.Row>
        {/* title image */}
        <Container.Column className="col-lg-6">
          <FileUploader
            imageURL={(props.view || props.update) && data && data.icon}
            error={errors.icon ? errors.icon.message : ""}
            width={90}
            height={90}
            limit={100}
            title="ArtWork image"
            dataHandeller={(data) => {
              if (data.error) {
                setError("icon", {
                  type: "manual",
                  message: data.error,
                });
              }

              if (data.image) {
                clearErrors("icon");
                setValue("icon", data.image);
              }
            }}
            dataClear={() => {
              setValue("icon", null);
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
