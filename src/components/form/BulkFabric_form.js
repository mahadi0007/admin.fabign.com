import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "../button";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { Text } from "../text";
import { CreatableSelect } from "../select";
import { Requests } from "../../utils/http";

export const BulkFabricForm = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [colors, setColors] = useState([]);
  const [defaultColor, setDefaultColor] = useState([]);

  // Category Submit
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("fabric_name", data.fabric_name);
    formData.append("size", data.size);
    formData.append("moq", data.moq);
    formData.append("description", data.description);
    for (let i = 0; i < data.colors.length; i++) {
      formData.append("colors", data.colors[i]);
    }
    props.submit(formData);
  };

  // fetch colors of odp
  const fetchColor = useCallback(async () => {
    const response = await Requests.BulkColor.Index();
    if (response && response.status === 200) {
      const data = response.data.data.map((item) => {
        return {
          label: item.color_name,
          value: item._id,
        };
      });
      setColors(data);
    }
  }, []);

  // fetch data
  useEffect(() => {
    fetchColor();
  }, [fetchColor]);

  useEffect(() => {
    if (props.data) {
      setValue("fabric_name", props.data.fabric_name);
      setValue("size", props.data.size);
      setValue("moq", props.data.moq);
      setValue("description", props.data.description);
      setValue(
        "colors",
        props.data.colors.map((item) => {
          return item._id;
        })
      );
      setDefaultColor(
        props.data.colors.map((item) => {
          return {
            label: item.color_name,
            value: item._id,
          };
        })
      );
    }
  }, [props.view, props.data]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Row>
        <Container.Column className="col-lg-6">
          {/* Product Name */}
          <FormGroup>
            {errors.fabric_name && errors.fabric_name.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.fabric_name && errors.fabric_name.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Fabric name <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="text"
              className={
                errors.fabric_name
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter Fabric name"
              {...register("fabric_name", {
                required: "Fabric name is required",
              })}
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>
        {/* size */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.size && errors.size.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.size && errors.size.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Size <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="text"
              className={
                errors.product_name
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter size"
              {...register("size", {
                required: "Size is required",
              })}
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>
        {/* MOQ */}
        <Container.Column className="col-lg-6">
          {/* Subtitle */}
          <FormGroup>
            {errors.moq && errors.moq.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.moq && errors.moq.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                MOQ <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="number"
              min="0"
              className={
                errors.moq
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter MOQ"
              {...register("moq", { required: "MOQ is required" })}
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* Colors */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.colors && errors.colors.message ? (
              <Text className="text-danger fs-13 mb-1">
                {errors.colors && errors.colors.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">Colors</Text>
            )}
            {(props.view || props.update) && defaultColor.length > 0 && (
              <CreatableSelect
                placeholder="colors"
                options={colors}
                deafult={defaultColor}
                value={(event) => {
                  const val = [];
                  event.map((item) => {
                    val.push(item.value);
                    return val;
                  });
                  setValue("colors", val);
                }}
                isDisabled={props.view && true}
              />
            )}
            {!(props.view || props.update) && (
              <CreatableSelect
                placeholder="colors"
                options={colors}
                value={(event) => {
                  const val = [];
                  event.map((item) => {
                    val.push(item.value);
                    return val;
                  });
                  setValue("colors", val);
                }}
              />
            )}
          </FormGroup>
        </Container.Column>

        {/* Description */}
        <Container.Column>
          <FormGroup>
            {errors.description && errors.description.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.description && errors.description.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Fabric description <span className="text-danger">*</span>
              </Text>
            )}
            <textarea
              rows={5}
              className={
                errors.description
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter fabric description"
              {...register("description")}
              readOnly={props.view && true}
            />
          </FormGroup>
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
