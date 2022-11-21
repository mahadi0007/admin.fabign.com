import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FileUploader } from "../fileUploader";
import { PrimaryButton } from "../button";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { Text } from "../text";
import { CreatableSelect } from "../select";
import { Requests } from "../../utils/http";

export const ODPProductForm = (props) => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [colors, setColors] = useState([]);

  // ODP Product Submit
  const onSubmit = async (data) => {
    const formData = new FormData();

    if (!data.icon) {
      setError("icon", {
        type: "manual",
        message: "Title image is required",
      });
    } else if (!data.main_image) {
      setError("main_image", {
        type: "manual",
        message: "Main image is required",
      });
    } else if (!data.right_image) {
      setError("right_image", {
        type: "manual",
        message: "Right image is required",
      });
    } else if (!data.left_image) {
      setError("left_image", {
        type: "manual",
        message: "Left image is required",
      });
    } else if (!data.back_image) {
      setError("back_image", {
        type: "manual",
        message: "Back image is required",
      });
    } else if (!data.sizeGuide) {
      setError("sizeGuide", {
        type: "manual",
        message: "Size Guide image is required",
      });
    } else if (
      data.icon &&
      data.main_image &&
      data.right_image &&
      data.left_image &&
      data.back_image &&
      data.sizeGuide
    ) {
      formData.append("product_name", data.product_name);
      formData.append("subtitle", data.subtitle);
      formData.append("description", data.description);
      for (const size of data.size) {
        formData.append("size", size);
      }
      for (let i = 0; i < data.colors.length; i++) {
        formData.append("colors", data.colors[i]);
      }
      formData.append("price", data.price);
      formData.append("fabric", data.fabric);
      formData.append("icon", data.icon);
      formData.append("main_image", data.main_image);
      formData.append("right_image", data.right_image);
      formData.append("left_image", data.left_image);
      formData.append("back_image", data.back_image);
      formData.append("sizeGuide", data.sizeGuide);
      props.submit(formData);
    }
  };

  const size = [
    {
      label: "S",
      value: "S",
    },
    {
      label: "M",
      value: "M",
    },
    {
      label: "L",
      value: "L",
    },
    {
      label: "XL",
      value: "XL",
    },
    {
      label: "XXL",
      value: "XXL",
    },
  ];

  // fetch colors of odp
  const fetchColor = useCallback(async () => {
    const response = await Requests.ODPColor.Index();
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Row>
        <Container.Column className="col-lg-6">
          {/* Product Name */}
          <FormGroup>
            {errors.product_name && errors.product_name.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.product_name && errors.product_name.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Product name <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="text"
              className={
                errors.product_name
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter Product name"
              {...register("product_name", {
                required: "Product name is required",
              })}
            />
          </FormGroup>
        </Container.Column>
        <Container.Column className="col-lg-6">
          {/* Subtitle */}
          <FormGroup>
            {errors.subtitle && errors.subtitle.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.subtitle && errors.subtitle.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Subtitle <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="text"
              className={
                errors.subtitle
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter Subtitle"
              {...register("subtitle", { required: "Subtitle is required" })}
            />
          </FormGroup>
        </Container.Column>
        {/* size */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.size && errors.size.message ? (
              <Text className="text-danger fs-13 mb-1">
                {errors.size && errors.size.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">Size</Text>
            )}
            <CreatableSelect
              placeholder="Size"
              options={size}
              value={(event) => {
                const val = [];
                event.map((item) => {
                  val.push(item.value);
                  return val;
                });
                setValue("size", val);
              }}
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
          </FormGroup>
        </Container.Column>

        {/* Price */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.price && errors.price.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.price && errors.price.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Price <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="text"
              className={
                errors.price
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter price"
              {...register("price", { required: "Price is required" })}
            />
          </FormGroup>
        </Container.Column>

        {/* Fabric */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.fabric && errors.fabric.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.fabric && errors.fabric.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Fabric <span className="text-danger">*</span>
              </Text>
            )}
            <select
              className="form-control"
              {...register("fabric", { required: "fabric is required" })}
            >
              {["100% cotton", "Modal Fabric", "Cotton/Lycra"].map(
                (item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                }
              )}
            </select>
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
                Product description <span className="text-danger">*</span>
              </Text>
            )}
            <textarea
              rows={5}
              className={
                errors.description
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter product description"
              {...register("description")}
            />
          </FormGroup>
        </Container.Column>
      </Container.Row>

      <Container.Row>
        {/* title image */}
        <Container.Column className="col-lg-2">
          <FileUploader
            error={errors.icon ? errors.icon.message : ""}
            width={90}
            height={90}
            limit={1000}
            title="Icon"
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
            input={true}
            removable={true}
          />
        </Container.Column>
        <Container.Column className="col-lg-2">
          <FileUploader
            error={errors.main_image ? errors.main_image.message : ""}
            width={90}
            height={90}
            limit={10000}
            title="Main Image"
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
            input={true}
            removable={true}
          />
        </Container.Column>
        <Container.Column className="col-lg-2">
          <FileUploader
            error={errors.right_image ? errors.right_image.message : ""}
            width={90}
            height={90}
            limit={1000}
            title="Right Image"
            dataHandeller={(data) => {
              if (data.error) {
                setError("right_image", {
                  type: "manual",
                  message: data.error,
                });
              }

              if (data.image) {
                clearErrors("right_image");
                setValue("right_image", data.image);
              }
            }}
            dataClear={() => {
              setValue("right_image", null);
            }}
            input={true}
            removable={true}
          />
        </Container.Column>
        <Container.Column className="col-lg-2">
          <FileUploader
            error={errors.left_image ? errors.left_image.message : ""}
            width={90}
            height={90}
            limit={1000}
            title="Left Image"
            dataHandeller={(data) => {
              if (data.error) {
                setError("left_image", {
                  type: "manual",
                  message: data.error,
                });
              }

              if (data.image) {
                clearErrors("left_image");
                setValue("left_image", data.image);
              }
            }}
            dataClear={() => {
              setValue("left_image", null);
            }}
            input={true}
            removable={true}
          />
        </Container.Column>
        <Container.Column className="col-lg-2">
          <FileUploader
            error={errors.back_image ? errors.back_image.message : ""}
            width={90}
            height={90}
            limit={1000}
            title="Back Image"
            dataHandeller={(data) => {
              if (data.error) {
                setError("back_image", {
                  type: "manual",
                  message: data.error,
                });
              }

              if (data.image) {
                clearErrors("back_image");
                setValue("back_image", data.image);
              }
            }}
            dataClear={() => {
              setValue("back_image", null);
            }}
            input={true}
            removable={true}
          />
        </Container.Column>
        <Container.Column className="col-lg-2">
          <FileUploader
            error={errors.sizeGuide ? errors.sizeGuide.message : ""}
            width={90}
            height={90}
            limit={1000}
            title="Size Guide Image"
            dataHandeller={(data) => {
              if (data.error) {
                setError("sizeGuide", {
                  type: "manual",
                  message: data.error,
                });
              }

              if (data.image) {
                clearErrors("sizeGuide");
                setValue("sizeGuide", data.image);
              }
            }}
            dataClear={() => {
              setValue("sizeGuide", null);
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
