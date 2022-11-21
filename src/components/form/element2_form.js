import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Text } from "../text";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { PrimaryButton } from "../button";
import { SearchableSelect } from "../select";
import { FileUploader } from "../fileUploader";
import { Requests } from "../../utils/http";

export const Element2Form = (props) => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const elementData = props.elementData ? props.elementData : {};
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);

  useEffect(() => {
    if (props.elementData) {
      setValue("title", props.elementData.title);
      setValue("priority", props.elementData.priority);
      setValue("title_image", props.elementData.title_image);
      setValue("element_image", props.elementData.element_image);
      setValue("shadow_image", props.elementData.shadow_image);
      setValue("category", props.elementData.category._id);
      setValue("sub_category", props.elementData.sub_category._id);
      setCategory(props.elementData.category._id);
      setSubCategory(props.elementData.sub_category._id);
      setWidth(props.elementData.width);
      setHeight(props.elementData.height);
    }
  }, [props.elementData]);

  // Handle category search
  const handleCategorySearch = async (query) => {
    try {
      const items = [];
      const response = await Requests.Search.Category2(query);
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

  // Handle search sub category
  const handleSearchSubCategory = async (query, category) => {
    try {
      const items = [];
      const response = await Requests.Element2.SearchInSubCategory(
        query,
        category
      );
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
    console.log(data);
    let isError = false;

    if (!category) {
      setError("category", {
        type: "manual",
        message: "Category is required",
      });
      isError = true;
    }

    if (!subCategory) {
      setError("sub_category", {
        type: "manual",
        message: "Sub Category is required",
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

    if (!data.element_image) {
      setError("element_image", {
        type: "manual",
        message: "Element image is required",
      });
      isError = true;
    }

    if (!data.shadow_image) {
      setError("shadow_image", {
        type: "manual",
        message: "Shadow image is required",
      });
      isError = true;
    }

    if (isError) return;

    const formData = new FormData();
    if (data.title_image && data.shadow_image) {
      formData.append("title", data.title);

      if (category) formData.append("category", category);
      if (subCategory) formData.append("sub_category", subCategory);

      formData.append("title_image", data.title_image);
      formData.append("element_image", data.element_image);
      formData.append("shadow_image", data.shadow_image);
      formData.append("priority", data.priority);
      formData.append("width", width);
      formData.append("height", height);
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
              readOnly={props.view && true}
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

            {(props.view || props.update) && elementData.category && (
              <SearchableSelect
                placeholder="Search & select category"
                borderRadius={5}
                search={handleCategorySearch}
                defaultValue={
                  elementData.category && {
                    label: elementData.category.title,
                    value: elementData.category._id,
                  }
                }
                values={(data) => {
                  setCategory(data.value);
                  setSubCategory(null);
                  clearErrors("category");
                }}
                isDisabled={props.view && true}
              />
            )}
            {!(props.view || props.update) && (
              <SearchableSelect
                placeholder="Search & select category"
                borderRadius={5}
                search={handleCategorySearch}
                values={(data) => {
                  setCategory(data.value);
                  setSubCategory(null);
                  clearErrors("category");
                }}
                isDisabled={props.view && true}
              />
            )}
          </FormGroup>
        </Container.Column>

        {/* Sub category */}
        {!(props.view || props.update) && category ? (
          <Container.Column>
            <FormGroup>
              {errors.sub_category && errors.sub_category.message ? (
                <Text className="text-danger fs-13 mb-0">
                  {errors.sub_category && errors.sub_category.message}
                </Text>
              ) : (
                <Text className="fs-13 mb-0">
                  Sub Category <span className="text-danger">*</span>
                </Text>
              )}

              <SearchableSelect
                borderRadius={4}
                placeholder="Select sub category"
                search={(inputValue) =>
                  handleSearchSubCategory(inputValue, category)
                }
                values={(event) => {
                  setSubCategory(event.value);
                  clearErrors("sub_category");
                }}
                isDisabled={props.view && true}
              />
            </FormGroup>
          </Container.Column>
        ) : null}

        {(props.view || props.update) && elementData.sub_category ? (
          <Container.Column>
            <FormGroup>
              {errors.sub_category && errors.sub_category.message ? (
                <Text className="text-danger fs-13 mb-0">
                  {errors.sub_category && errors.sub_category.message}
                </Text>
              ) : (
                <Text className="fs-13 mb-0">
                  Sub Category <span className="text-danger">*</span>
                </Text>
              )}

              <SearchableSelect
                borderRadius={4}
                placeholder="Select sub category"
                search={(inputValue) =>
                  handleSearchSubCategory(inputValue, category)
                }
                defaultValue={
                  elementData.sub_category && {
                    label: elementData.sub_category.title,
                    value: elementData.sub_category._id,
                  }
                }
                values={(event) => {
                  setSubCategory(event.value);
                  clearErrors("sub_category");
                }}
                isDisabled={props.view && true}
              />
            </FormGroup>
          </Container.Column>
        ) : null}

        {/* Priority */}
        <Container.Column>
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
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* title image */}
        <Container.Column className="col-lg-4">
          <FileUploader
            imageURL={
              elementData && elementData.title_image
                ? elementData.title_image
                : null
            }
            error={errors.title_image ? errors.title_image.message : ""}
            width={125}
            height={110}
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
            removable={!props.view && true}
            input={!props.view && true}
          />
        </Container.Column>

        {/* Element Image */}
        <Container.Column className="col-lg-4">
          <FileUploader
            imageURL={
              elementData && elementData.element_image
                ? elementData.element_image
                : null
            }
            error={errors.element_image ? errors.element_image.message : ""}
            width={125}
            height={110}
            title="Element image"
            dataHandeller={(data) => {
              if (data.error) {
                setError("element_image", {
                  type: "manual",
                  message: data.error,
                });
              }

              if (data.image) {
                clearErrors("element_image");
                setValue("element_image", data.image);
              }
            }}
            dataClear={() => {
              setValue("element_image", null);
            }}
            removable={!props.view && true}
            input={!props.view && true}
          />
        </Container.Column>

        {/* Shadow Image */}
        <Container.Column className="col-lg-4">
          <FileUploader
            imageURL={
              elementData && elementData.shadow_image
                ? elementData.shadow_image
                : null
            }
            error={errors.shadow_image ? errors.shadow_image.message : ""}
            width={125}
            height={110}
            title="Shadow image"
            dataHandeller={(data) => {
              if (data.error) {
                setError("shadow_image", {
                  type: "manual",
                  message: data.error,
                });
              }

              if (data.image) {
                clearErrors("shadow_image");
                setValue("shadow_image", data.image);
              }

              if (data.width) {
                setWidth(data.width);
              }
              if (data.height) {
                setHeight(data.height);
              }
            }}
            dataClear={() => {
              setValue("shadow_image", null);
            }}
            shadowImage={true}
            removable={!props.view && true}
            input={!props.view && true}
          />
        </Container.Column>
      </Container.Row>

      {/* Submit button */}
      {!props.view && (
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
      )}
    </form>
  );
};
