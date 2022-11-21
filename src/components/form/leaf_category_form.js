import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Text } from "../text";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { PrimaryButton } from "../button";
import { FileUploader } from "../fileUploader";
import { SearchableSelect, SingleSelect } from "../select";
import { Requests } from "../../utils/http";

export const LeafCategoryForm = (props) => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const categoryData = props.categoryData ? props.categoryData : {};
  const [category, setCategory] = useState({});
  const [subCategory, setSubCategory] = useState(null);

  // Handle search
  const handleSearch = async (inputValue) => {
    try {
      const items = [];
      const response = await Requests.Search.Category(inputValue);
      if (response && response.status === 200) {
        if (response.data.data && response.data.data.length > 0) {
          for (let i = 0; i < response.data.data.length; i++) {
            const element = response.data.data[i];
            const sub_items = [];

            if (element.sub_categories && element.sub_categories.length > 0) {
              for (let i = 0; i < element.sub_categories.length; i++) {
                const sub_element = element.sub_categories[i];

                sub_items.push({
                  label: sub_element.title,
                  value: sub_element._id,
                });
              }
            }

            items.push({
              label: element.title,
              value: element._id,
              sub_categories: sub_items,
            });
          }
        }
      }

      return items;
    } catch (error) {
      if (error) return [];
    }
  };

  // Category Submit
  const onSubmit = async (data) => {
    const formData = new FormData();

    if (!category.value) {
      setError("category", {
        type: "manual",
        message: "Category is required",
      });
    }

    if (!subCategory) {
      setError("sub_category", {
        type: "manual",
        message: "Sub category is required",
      });
    }

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
      formData.append("category", category.value);
      formData.append("sub_category", subCategory);
      formData.append("title_image", data.title_image);
      formData.append("main_image", data.main_image);

      props.submit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Row>
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
              placeholder="Enter category title"
              defaultValue={categoryData ? categoryData.title : ""}
              {...register("title", { required: "Title is required" })}
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
              placeholder="Enter Category description"
              defaultValue={categoryData ? categoryData.description : ""}
              {...register("description", {
                required: "Description is required",
              })}
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
                Category <span className="text-danger">*</span>
              </Text>
            )}

            <SearchableSelect
              borderRadius={4}
              placeholder="Search & select category"
              search={(inputValue) => handleSearch(inputValue)}
              values={(data) => {
                setCategory(data);
                clearErrors("category");
              }}
            />
          </FormGroup>
        </Container.Column>

        {/* Sub category */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.sub_category && errors.sub_category.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.sub_category && errors.sub_category.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Sub category <span className="text-danger">*</span>
              </Text>
            )}

            <SingleSelect
              borderRadius={4}
              placeholder="Search & select sub-category"
              options={category.sub_categories}
              value={(data) => {
                setSubCategory(data.value);
                clearErrors("sub_category");
              }}
            />
          </FormGroup>
        </Container.Column>
      </Container.Row>

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
            input={true}
            removable={true}
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
