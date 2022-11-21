import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FileUploader } from "../fileUploader";
import { SearchableSelect, SingleSelect } from "../select";
import { Requests } from "../../utils/http";
import { PrimaryButton } from "../button";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { Text } from "../text";

export const ButtonForm = (props) => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [assignTo, setAssignTo] = useState(null);
  const assignOptions = [
    { label: "shirt", value: "shirt" },
    { label: "pant", value: "pant" },
    { label: "suit", value: "suit" },
    { label: "blazer", value: "blazer" },
    { label: "waist coat", value: "waist coat" },
  ];

  // Handle Category search
  const handleCategorySearch = async (inputValue) => {
    try {
      const items = [];
      const response = await Requests.Search.Category(inputValue);
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

  // Sub category submit
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

    if (!assignTo) {
      setError("assign_to", {
        type: "manual",
        message: "Assiging is required",
      });
    }

    if (data.main_image && selectedCategory) {
      formData.append("title", data.title);
      if (selectedCategory !== null) {
        formData.append("category", selectedCategory);
      }
      if (assignTo !== null) {
        formData.append("assign_to", assignTo);
      }
      formData.append("sub_title", data.sub_title);
      formData.append("price", data.price);
      formData.append("color", data.color);
      formData.append("description", data.description);
      formData.append("file", data.main_image);

      props.submit(formData);
      // console.log(form);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Row>
        {/* Assign To */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.assign_to && errors.assign_to.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.assign_to && errors.assign_to.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Assign To <span className="text-danger">*</span>
              </Text>
            )}

            <SingleSelect
              borderRadius={4}
              placeholder=""
              options={assignOptions}
              value={(data) => {
                setAssignTo(data.value);
                clearErrors("assign_to");
              }}
            />
          </FormGroup>
        </Container.Column>

        {/* Category */}
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
              borderRadius={5}
            />
          </FormGroup>
        </Container.Column>

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
              // defaultValue={elementData ? elementData.title : null}
              {...register("title", { required: "Button title is required" })}
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
                Sub-title <span className="text-danger">*</span>
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
              // defaultValue={elementData ? elementData.sub_title : null}
              {...register("sub_title", {
                required: "Button sub-title is required",
              })}
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
              // defaultValue={elementData ? elementData.price : null}
              {...register("price", { required: "Button price is required" })}
            />
          </FormGroup>
        </Container.Column>

        {/* Color */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.color && errors.color.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.color && errors.color.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                {" "}
                Button color <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="text"
              className={
                errors.color
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter color"
              // defaultValue={elementData ? elementData.color : null}
              {...register("color", { required: "Button color is required" })}
            />
          </FormGroup>
        </Container.Column>

        {/* Description */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.description && errors.description.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.description && errors.description.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Description <span className="text-danger">*</span>{" "}
              </Text>
            )}
            <textarea
              rows={3}
              className={
                errors.description
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter description"
              // defaultValue={elementData ? elementData.description : null}
              {...register("description", {
                required: "Description is required",
              })}
            />
          </FormGroup>
        </Container.Column>

        {/* Main Image */}
        <Container.Column className="col-lg-6">
          <FileUploader
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
