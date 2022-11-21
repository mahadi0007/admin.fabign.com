import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FileUploader } from "../fileUploader";
import { PrimaryButton } from "../button";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { Text } from "../text";

export const TopBarForm = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const topBar = props.topBar ? props.topBar : {};
  const [logo, setLogo] = useState(
    props.topBar && props.topBar.icon ? props.topBar.icon : null
  );

  useEffect(() => {
    if (props.topBar) {
      setValue("title", props.topBar.title);
      setValue("link", props.topBar.link);
      setLogo(props.topBar.icon);
    }
  }, [props.topBar]);

  // Topbar Submit
  const onSubmit = async (data) => {
    const formData = new FormData();
    let is_error = false;
    if (!logo) {
      setError("logo", {
        type: "manual",
        message: "Image is required",
      });
      is_error = true;
    }

    if (is_error) return;

    formData.append("title", data.title);
    formData.append("link", data.link);
    formData.append("icon", logo);

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
              defaultValue={topBar ? topBar.title : null}
              {...register("title", { required: "Title is required" })}
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* Redirect Link */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.link && errors.link.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.link && errors.link.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Link <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="text"
              className={
                errors.link
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter redirection link"
              defaultValue={topBar ? topBar.link : null}
              {...register("link", { required: "Link is required" })}
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* Image */}
        <Container.Column className="col-lg-6">
          <FileUploader
            imageURL={topBar && topBar.icon ? topBar.icon : null}
            deafult={topBar && topBar.icon ? topBar.icon : null}
            error={errors.icon ? errors.icon.message : null}
            width={125}
            height={110}
            title="Image"
            dataHandeller={(data) => {
              if (data.error) {
                setError("icon", {
                  type: "manual",
                  message: data.error,
                });
              }

              if (data.image) {
                clearErrors("icon");
                setLogo(data.image);
              }
            }}
            dataClear={() => {
              setLogo(null);
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
      )}
    </form>
  );
};
