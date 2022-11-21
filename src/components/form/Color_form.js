import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "../button";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { Text } from "../text";
import { SketchPicker } from "react-color";
import { Toastify } from "../toastify";

export const ColorForm = (props) => {
  const [textColor, setTextColor] = useState();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (props.data) {
      setValue("color_name", props.data.color_name);
      setValue("description", props.data.description);
      setTextColor(props.data.color_code);
    }
    if (props.view) {
      document.getElementsByClassName("sketch-picker")[0].style.pointerEvents =
        "none";
    }
  }, [props.view, props.data]);

  const onSubmit = (data) => {
    if (textColor) {
      if (textColor.hex) {
        const formData = {
          color_name: data.color_name,
          color_code: textColor.hex,
          description: data.description,
        };
        props.submit(formData);
      } else {
        const formData = {
          color_name: data.color_name,
          color_code: textColor,
          description: data.description,
        };
        props.submit(formData);
      }
    } else {
      Toastify.Error("Please select a color");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Row>
        <Container.Column className="col-lg-6">
          {/* Name */}
          <FormGroup>
            {errors.color_name && errors.color_name.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.color_name && errors.color_name.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Color name <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="text"
              className={
                errors.color_name
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter Color name"
              {...register("color_name", {
                required: "Color name is required",
              })}
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        <Container.Column className="col-lg-3">
          {/* Name */}
          <FormGroup>
            <Text className="fs-13 mb-0">Color Code</Text>
            <SketchPicker
              color={textColor}
              onChange={setTextColor}
              width="100"
              disableAlpha={true}
            />
          </FormGroup>
        </Container.Column>
      </Container.Row>

      <Container.Column>
        {/* Description */}
        <FormGroup>
          {errors.description && errors.description.message ? (
            <Text className="text-danger fs-13 mb-0">
              {errors.description && errors.description.message}
            </Text>
          ) : (
            <Text className="fs-13 mb-0">
              Color description <span className="text-danger">*</span>
            </Text>
          )}
          <textarea
            rows={5}
            className={
              errors.description
                ? "form-control shadow-none error"
                : "form-control shadow-none"
            }
            placeholder="Enter Color description"
            {...register("description")}
            readOnly={props.view && true}
          />
        </FormGroup>
      </Container.Column>

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
