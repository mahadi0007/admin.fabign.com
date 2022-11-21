import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FileUploader } from "../fileUploader";
import { PrimaryButton } from "../button";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { Text } from "../text";

export const EBrandForm = (props) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const brandData = props.brandData ? props.brandData : {};
  const [logo, setLogo] = useState(
    props.brandData && props.brandData.logo ? props.brandData.logo : null
  );

  // Category Submit
  const onSubmit = async (data) => {
    const formData = new FormData();
    let is_error = false;
    console.log(logo);
    if (!logo) {
      setError("logo", {
        type: "manual",
        message: "Image is required",
      });
      is_error = true;
    }

    if (is_error) return;

    formData.append("title", data.title);
    formData.append("productCount", data.productCount);
    formData.append("logo", logo);

    // for (var pair of formData.entries()) {
    //     console.log(pair[0] + ', ' + pair[1]);
    // }
    props.submit(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Row>
        {/* Title */}
        <Container.Column className="col-lg-6">
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
              defaultValue={brandData ? brandData.title : null}
              {...register("title", { required: "Title is required" })}
            />
          </FormGroup>
        </Container.Column>

        {/* Product Count */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.productCount && errors.productCount.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.productCount && errors.productCount.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Product count <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="number"
              min={0}
              className={
                errors.productCount
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter product count"
              defaultValue={brandData ? brandData.productCount : null}
              {...register("productCount", {
                required: "Product count is required",
              })}
            />
          </FormGroup>
        </Container.Column>

        {/* Image */}
        <Container.Column className="col-lg-6">
          <FileUploader
            imageURL={brandData && brandData.logo ? brandData.logo : null}
            deafult={brandData && brandData.logo ? brandData.logo : null}
            error={errors.logo ? errors.logo.message : null}
            width={125}
            height={110}
            title="Image"
            dataHandeller={(data) => {
              if (data.error) {
                setError("logo", {
                  type: "manual",
                  message: data.error,
                });
              }

              if (data.image) {
                clearErrors("logo");
                setLogo(data.image);
              }
            }}
            dataClear={() => {
              setLogo(null);
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
            {props.loading
              ? props.update
                ? "Updating ..."
                : "Submitting ..."
              : props.update
              ? "Update"
              : "Submit"}
          </Text>
        </PrimaryButton>
      </div>
    </form>
  );
};
