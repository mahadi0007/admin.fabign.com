// imported moduels
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FileUploader } from "../fileUploader";
import { PrimaryButton } from "../button";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { Text } from "../text";
import { Requests } from "../../utils/http";
import JoditEditor from "jodit-react";

// coding section
export const ESliderForm = (props) => {
  // states
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const sliderData = props.sliderData ? props.sliderData : {};
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [details, setDetails] = useState();
  const editor = useRef(null);
  const editor2 = useRef(null);

  useEffect(() => {
    if (props.sliderData) {
      setImage(props.sliderData.banner);
      setTitle(props.sliderData.title);
      setDetails(props.sliderData.details);
    }
  }, []);

  // Category Submit
  const onSubmit = async (data) => {
    const formData = new FormData();

    if (!image) {
      setError("image", {
        type: "manual",
        message: "Image is required",
      });
      setImage(null);
    } else {
      formData.append("title", title ?? "");
      formData.append("details", details ?? "");
      formData.append("name", data.name ?? "");
      formData.append("publish", data.publish);
      formData.append("hyperlink", data.hyperlink);
      formData.append("banner", image);
      props.submit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Row>
        {/* Title */}
        <Container.Column>
          <FormGroup>
            {errors.title && errors.title.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.title && errors.title.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">Title</Text>
            )}

            <JoditEditor
              ref={editor}
              config={{ readonly: props.view ? true : false }}
              tabIndex={1}
              // value={title}
              value={sliderData.title ? sliderData.title : title}
              onBlur={(event) => setTitle(event)}
              onChange={(event) => {}}
            />
          </FormGroup>
        </Container.Column>

        {/* Details */}
        <Container.Column>
          <FormGroup>
            {errors.details && errors.details.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.details && errors.details.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">Details</Text>
            )}

            <JoditEditor
              ref={editor2}
              config={{ readonly: props.view ? true : false }}
              tabIndex={1}
              // value={details}
              value={sliderData.details ? sliderData.details : details}
              onBlur={(event) => setDetails(event)}
              onChange={(event) => {}}
            />
          </FormGroup>
        </Container.Column>

        {/* Name */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.name && errors.name.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.name && errors.name.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">Name </Text>
            )}
            <input
              type="text"
              className={
                errors.name
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter name"
              defaultValue={sliderData ? sliderData.name : null}
              {...register("name")}
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>
        {/* Publish */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.publish && errors.publish.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.publish && errors.publish.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0"> Publish </Text>
            )}

            <select
              className={
                errors.publish
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              defaultValue={sliderData ? sliderData.publish : "true"}
              {...register("publish")}
              disabled={props.view && true}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </FormGroup>
        </Container.Column>

        {/* Hyper LInk */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.hyperlink && errors.hyperlink.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.hyperlink && errors.hyperlink.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">hyperlink </Text>
            )}
            <input
              type="text"
              className={
                errors.hyperlink
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter hyperlink"
              defaultValue={sliderData ? sliderData.hyperlink : null}
              {...register("hyperlink")}
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* Banner */}
        <Container.Column className="col-lg-6">
          <FileUploader
            imageURL={
              sliderData && sliderData.banner
                ? Requests.HostUrl + sliderData.banner
                : null
            }
            error={errors.image ? errors.image.message : null}
            width={125}
            height={110}
            title="Image"
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
            {props.loading
              ? props.update
                ? "Updating ..."
                : "Submitting ..."
              : props.update
              ? "Update"
              : "Submit"}
          </PrimaryButton>
        </div>
      )}
    </form>
  );
};
