import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { FileUploader } from "../fileUploader";
import { PrimaryButton } from "../button";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { Text } from "../text";
import { Requests } from "../../utils/http";
import JoditEditor from "jodit-react";

export const EBannerForm = (props) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const bannerData = props.bannerData ? props.bannerData : {};
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [subTitle, setSubTitle] = useState();
  const [details, setDetails] = useState();

  const editor = useRef(null);
  const editor2 = useRef(null);
  const editor3 = useRef(null);

  useEffect(() => {
    if (props.bannerData) {
      setImage(props.bannerData.banner);
      setTitle(props.bannerData.title);
      setSubTitle(props.bannerData.subTitle);
      setDetails(props.bannerData.details);
    }
  }, []);

  // Category Submit
  const onSubmit = (data) => {
    if (!image) {
      setError("image", {
        type: "manual",
        message: "Image is required",
      });
    } else {
      const formData = new FormData();
      formData.append("title", title ?? "");
      formData.append("subTitle", subTitle ?? "");
      formData.append("details", details ?? "");
      formData.append("publish", data.publish);
      formData.append("banner", image);
      formData.append("hyperlink", data.hyperlink);
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
              value={title}
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
              <Text className="fs-13 mb-0">Sub Title</Text>
            )}

            <JoditEditor
              ref={editor2}
              config={{ readonly: props.view ? true : false }}
              tabIndex={1}
              value={subTitle}
              onBlur={(event) => setSubTitle(event)}
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
              ref={editor3}
              config={{ readonly: props.view ? true : false }}
              tabIndex={1}
              value={details}
              onBlur={(event) => setDetails(event)}
              onChange={(event) => {}}
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
              <Text className="fs-13 mb-0"> publish </Text>
            )}

            <select
              className={
                errors.publish
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              defaultValue={bannerData ? bannerData.publish : "true"}
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
              defaultValue={bannerData ? bannerData.hyperlink : null}
              {...register("hyperlink")}
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* Banner */}
        <Container.Column className="col-lg-6">
          <FileUploader
            imageURL={
              bannerData && bannerData.banner
                ? Requests.HostUrl + bannerData.banner
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
