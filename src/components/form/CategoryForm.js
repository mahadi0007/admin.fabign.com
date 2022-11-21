import React from "react";
import { useForm } from "react-hook-form";
import { FileUploader } from "../fileUploader";
import { PrimaryButton } from "../button";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { Text } from "../text";

export const CategoryForm = (props) => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const categoryData = props.categoryData ? props.categoryData : {};

  // Category Submit
  const onSubmit = async (data) => {
    const formData = new FormData();

    if (!data.title_image) {
      setError("title_image", {
        type: "manual",
        message: "Title image is required",
      });
    }
    if (!data.main_image) {
      setError("main_image", {
        type: "manual",
        message: "Main image is required",
      });
    }
    if (data.title_image && data.main_image) {
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("title_image", data.title_image);
      formData.append("main_image", data.main_image);

      props.submit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Column>
        {/* Name */}
        <FormGroup>
          {errors.title && errors.title.message ? (
            <Text className="text-danger fs-13 mb-0">
              {errors.title && errors.title.message}
            </Text>
          ) : (
            <Text className="fs-13 mb-0">
              Title <span className="text-danger">*</span>
            </Text>
          )}
          <input
            type="text"
            className={
              errors.title
                ? "form-control shadow-none error"
                : "form-control shadow-none"
            }
            placeholder="Enter title"
            defaultValue={categoryData ? categoryData.title : null}
            {...register("title", { required: "Title is required" })}
            readOnly={props.view && true}
          />
        </FormGroup>

        {/* Description */}
        <FormGroup>
          {errors.description && errors.description.message ? (
            <Text className="text-danger fs-13 mb-0">
              {errors.description && errors.description.message}
            </Text>
          ) : (
            <Text className="fs-13 mb-0">
              Description <span className="text-danger">*</span>
            </Text>
          )}
          <textarea
            rows={5}
            className={
              errors.description
                ? "form-control shadow-none error"
                : "form-control shadow-none"
            }
            placeholder="Enter description"
            defaultValue={categoryData ? categoryData.description : null}
            {...register("description", {
              required: "Description is required",
            })}
            readOnly={props.view && true}
          />
        </FormGroup>
      </Container.Column>

      <Container.Row>
        {/* title image */}
        <Container.Column className="col-lg-6">
          <FileUploader
            imageURL={
              categoryData && categoryData.title_image
                ? categoryData.title_image
                : null
            }
            error={errors.title_image ? errors.title_image.message : ""}
            width={90}
            height={90}
            limit={100}
            title="Title image"
            dataHandeller={(data) => {
              if (data.error) {
                setError("title_image", {
                  type: "manual",
                  message: data.error,
                });
              }

              if (data.image) {
                clearErrors("title_image");
                setValue("title_image", data.image);
              }
            }}
            dataClear={() => {
              setValue("title_image", null);
            }}
            input={!props.view && true}
            removable={!props.view && true}
          />
        </Container.Column>

        {/* Main Image */}
        <Container.Column className="col-lg-6">
          <FileUploader
            imageURL={
              categoryData && categoryData.main_image
                ? categoryData.main_image
                : null
            }
            error={errors.main_image ? errors.main_image.message : null}
            width={125}
            height={110}
            title="Main image"
            dataHandeller={(data) => {
              if (data.error) {
                setError("main_image", {
                  type: "manual",
                  message: data.error,
                });
              }

              if (data.image) {
                clearErrors("main_image");
                setValue("main_image", data.image);
              }
            }}
            dataClear={() => {
              setValue("main_image", null);
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
