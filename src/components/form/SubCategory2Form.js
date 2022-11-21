import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FileUploader } from "../fileUploader";
import { SearchableSelect } from "../select";
import { Requests } from "../../utils/http";
import { PrimaryButton } from "../button";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { Text } from "../text";
import { Toastify } from "../../components/toastify";

export const SubCategory2Form = (props) => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategoryData, setSubCategoryData] = useState();
  const [defaultCategory, setDefaultCategory] = useState();

  const fetchSingleSubCategory = useCallback(async (id) => {
    try {
      const response = await Requests.SubCategory2.Show(id);
      setDefaultCategory({
        label: response.data.body.category.title,
        value: response.data.body.category._id,
      });
      setSelectedCategory(response.data.body.category._id);
      setSubCategoryData(response.data.body);
      setValue("title", response.data.body.title);
      setValue("main_image", response.data.body.main_image);
    } catch (error) {
      if (error) {
        Toastify.Error(error.message);
      }
    }
  }, []);

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

  useEffect(() => {
    if (id && (props.view || props.update)) {
      fetchSingleSubCategory(id);
    }
  }, [fetchSingleSubCategory, id, props.view, props.update]);

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

    if (data.main_image && selectedCategory) {
      formData.append("title", data.title);
      if (selectedCategory !== null) {
        formData.append("category", selectedCategory);
      }
      formData.append("main_image", data.main_image);

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
              defaultValue={subCategoryData ? subCategoryData.title : null}
              {...register("title", { required: "Title is required" })}
              readOnly={props.view && true}
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

            {(props.view || props.update) &&
              defaultCategory &&
              subCategoryData && (
                <SearchableSelect
                  placeholder="Search category"
                  search={handleCategorySearch}
                  defaultValue={defaultCategory}
                  values={(data) => {
                    setSelectedCategory(data.value);
                    if (data.value) {
                      clearErrors("selectedCategory");
                    }
                  }}
                  borderRadius={5}
                  isDisabled={props.view && true}
                />
              )}
            {!props.view && !props.update && (
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
            )}
          </FormGroup>
        </Container.Column>

        {/* Main Image */}
        <Container.Column className="col-lg-6">
          <FileUploader
            imageURL={
              subCategoryData && subCategoryData.main_image
                ? subCategoryData.main_image
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
