import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Text } from "../text";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { PrimaryButton } from "../button";
import { SearchableSelect } from "../select";
import { FileUploader } from "../fileUploader";
import { Requests } from "../../utils/http";

export const BacksideElementForm = (props) => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const elementData = props.elementData ? props.elementData : {};
  const [category, setCategory] = useState(null);

  // Handle category search
  const handleCategorySearch = async (query) => {
    try {
      const items = [];
      const response = await Requests.Search.Category(query);
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

  // Element form Submit
  const onSubmit = async (data) => {
    let isError = false;

    if (!category) {
      setError("category", {
        type: "manual",
        message: "Category is required",
      });
      isError = true;
    }

    if (!data.title_image) {
      setError("title_image", {
        type: "manual",
        message: "Title image is required",
      });
      isError = true;
    }

    if (!data.main_image) {
      setError("main_image", {
        type: "manual",
        message: "Main image is required",
      });
      isError = true;
    }

    if (isError) return;

    const formData = new FormData();
    if (data.title_image && data.main_image) {
      formData.append("title", data.title);
      formData.append("sub_title", data.sub_title);
      formData.append("price", data.price);
      if (category) formData.append("category", category);

      formData.append("priority", data.priority);
      formData.append("title_image", data.title_image);
      formData.append("main_image", data.main_image);
      formData.append("type", data.type);

      props.onSubmit(formData);
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
              defaultValue={elementData ? elementData.title : null}
              {...register("title", { required: "Title is required" })}
            />
          </FormGroup>
        </Container.Column>

        {/* Sub-title */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.sub_title && errors.sub_title.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.sub_title && errors.sub_title.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                {" "}
                Sub title <span className="text-danger">*</span>
              </Text>
            )}

            <input
              type="text"
              className={
                errors.sub_title
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter sub-title"
              defaultValue={elementData ? elementData.sub_title : null}
              {...register("sub_title", { required: "Sub title is required" })}
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
              defaultValue={elementData ? elementData.price : null}
              {...register("price", { required: "Price is required" })}
            />
          </FormGroup>
        </Container.Column>

        {/* Category */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.category && errors.category.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.category && errors.category.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                {" "}
                Category <span className="text-danger">*</span>
              </Text>
            )}

            <SearchableSelect
              placeholder="Search & select category"
              borderRadius={5}
              search={handleCategorySearch}
              values={(data) => {
                setCategory(data.value);
                clearErrors("category");
              }}
            />
          </FormGroup>
        </Container.Column>

        {/* Priority */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.Priority && errors.Priority.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.Priority && errors.Priority.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Element priority <span className="text-danger">*</span>
              </Text>
            )}

            <input
              type="number"
              min={1}
              className={
                errors.priority
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter element priority"
              defaultValue={elementData ? elementData.priority : null}
              {...register("priority", { required: "Priority is required" })}
            />
          </FormGroup>
        </Container.Column>

        {/* type */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.type && errors.type.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.type && errors.type.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">Element Type</Text>
            )}

            <select className="form-control shadow-none" {...register("type")}>
              <option value="">Choose..</option>
              <option value="half">Half Shirt</option>
              <option value="full">Full Shirt</option>
              <option value="waist">Waist Coat</option>
              <option value="pant">Pant</option>
              <option value="blazer">Blazer</option>
              <option value="suit">Suit</option>
            </select>
          </FormGroup>
        </Container.Column>

        {/* title image */}
        <Container.Column className="col-lg-6">
          <FileUploader
            imageURL={
              elementData && elementData.title_image
                ? elementData.title_image
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
            input={true}
            removable={true}
          />
        </Container.Column>

        {/* Main Image */}
        <Container.Column className="col-lg-6">
          <FileUploader
            imageURL={
              elementData && elementData.main_image
                ? elementData.main_image
                : null
            }
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
            input={true}
            removable={true}
          />
        </Container.Column>
      </Container.Row>

      {/* Submit button */}
      <div className="text-end">
        <PrimaryButton
          type="submit"
          className="px-4 fw-bolder"
          disabled={props.loading}
        >
          <Text className="text-uppercase fs-14 mb-0">
            {props.loading ? "Submitting ..." : "Submit"}
          </Text>
        </PrimaryButton>
      </div>
    </form>
  );
};
