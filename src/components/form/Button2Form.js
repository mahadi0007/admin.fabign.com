import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FileUploader } from "../fileUploader";
import { SearchableSelect } from "../select";
import { Requests } from "../../utils/http";
import { PrimaryButton } from "../button";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { Text } from "../text";

export const Button2Form = (props) => {
  const data = props.data || {};
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (props.data) {
      setValue("title", props.data.title);
      setValue("price", props.data.price);
      setValue("main_image", props.data.main_image);
      setSelectedCategory(props.data.category.value);
    }
  }, [props.data]);

  // Handle Category search
  const handleCategorySearch = async (inputValue) => {
    try {
      const items = [];
      const response = await Requests.Search.Category2(inputValue);
      if (response && response.status === 200) {
        if (response.data.data && response.data.data.length > 0) {
          for (let i = 0; i < response.data.data.length; i++) {
            const element = response.data.data[i];
            items.push({
              label: element.title,
              value: element._id,
            });
          }
        }
      }
      return items;
    } catch (error) {
      if (error) return [];
    }
  };

  // Button type submit
  const onSubmit = async (data) => {
    const formData = new FormData();

    if (!data.main_image) {
      setError("main_image", {
        type: "manual",
        message: "Main image is required",
      });
    }

    if (!selectedCategory) {
      setError("selectedCategory", {
        type: "manual",
        message: "Category is required",
      });
    }

    if (data.main_image && selectedCategory) {
      formData.append("category", selectedCategory);
      formData.append("title", data.title);
      formData.append("price", data.price);
      formData.append("file", data.main_image);

      props.submit(formData);
    }
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
                {" "}
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
              defaultValue={data.title || null}
              {...register("title", { required: "Button title is required" })}
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* Category */}
        {(props.view || props.update) && selectedCategory && (
          <Container.Column className="col-lg-6">
            <FormGroup>
              {errors.selectedCategory && errors.selectedCategory.message ? (
                <Text className="text-danger fs-13 mb-0">
                  {errors.selectedCategory && errors.selectedCategory.message}
                </Text>
              ) : (
                <Text className="fs-13 mb-0">
                  {" "}
                  Category <span className="text-danger">*</span>
                </Text>
              )}

              <SearchableSelect
                placeholder="Search category"
                search={handleCategorySearch}
                values={(data) => {
                  setSelectedCategory(data.value);
                  if (data.value) {
                    clearErrors("selectedCategory");
                  }
                }}
                defaultValue={data.category && data.category}
                borderRadius={5}
                isDisabled={props.view && true}
              />
            </FormGroup>
          </Container.Column>
        )}

        {/* Price */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.price && errors.price.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.price && errors.price.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                {" "}
                Price <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="number"
              min={0}
              step=".01"
              className={
                errors.price
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter price"
              defaultValue={data.price || null}
              {...register("price", { required: "Button price is required" })}
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* Main Image */}
        <Container.Column className="col-lg-6">
          <FileUploader
            imageURL={data && data.main_image ? data.main_image : null}
            error={errors.main_image ? errors.main_image.message : ""}
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
