import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SubCategory2Prices from "../fabric/SubCategory2Prices";
import { FileUploader } from "../fileUploader";
import { SearchableSelect } from "../select";
import { Requests } from "../../utils/http";
import { PrimaryButton } from "../button";
import { FormGroup } from "../formGroup";
import { Container } from "../container";
import { Text } from "../text";

export const Fabric2Form = (props) => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const elementData = props.elementData ? props.elementData : {};
  const [qualities, setQualities] = useState([]);
  const [colors, setColors] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    if (props.elementData) {
      setValue("title", props.elementData.title);
      setValue("original_price", props.elementData.original_price);
      setValue("sample_price", props.elementData.sample_price);
      setValue("color", props.elementData.color);
      setValue("type", props.elementData.type);
      setValue("description", props.elementData.description);
      setValue("quality", props.elementData.quality);
      setValue("main_image", props.elementData.main_image);
      setValue("cover_image", props?.elementData?.cover_image);
      setSelectedCategory(props.elementData.category._id);
      setSubCategories(props.elementData.sub_category_prices);
    }
  }, [props.elementData]);

  // Handle Category search
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

  // get additional data
  const getSubCategories = (data) => setSubCategories(data);

  // Element form Submit
  const onSubmit = async (data) => {
    if (!data.main_image) {
      setError("main_image", {
        type: "manual",
        message: "Main image is required",
      });
    }

    if (!data.cover_image) {
      setError("cover_image", {
        type: "manual",
        message: "Cover image is required",
      });
    }

    if (!selectedCategory) {
      setError("selectedCategory", {
        type: "manual",
        message: "Category is required",
      });
    }
    const formData = new FormData();

    if (data.main_image && selectedCategory) {
      formData.append("title", data.title);
      formData.append("original_price", data.original_price);
      formData.append("sample_price", data.sample_price);
      if (selectedCategory !== null) {
        formData.append("category", selectedCategory);
      }
      formData.append("color", data.color);
      formData.append("type", data.type);
      formData.append("description", data.description);
      formData.append("quality", data.quality);
      if (subCategories !== null) {
        formData.append("sub_category_prices", JSON.stringify(subCategories));
      }
      if (data.main_image != null && data.main_image !== "undefined") {
        formData.append("main_image", data.main_image);
      }
      if (data.cover_image != null && data.cover_image !== "undefined") {
        formData.append("cover_image", data.cover_image);
      }

      props.submit(formData);
    }
  };

  // fetch colors
  const fetchQualities = useCallback(async () => {
    try {
      const response = await Requests.Qualities.Index();
      if (response && response.status === 200) {
        const data = response.data.data.map((item) => {
          return {
            label: item.quality,
            value: item._id,
          };
        });
        setQualities(data);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }, []);

  // fetch colors
  const fetchColors = useCallback(async () => {
    try {
      const response = await Requests.Colors.Index();
      if (response && response.status === 200) {
        const data = response.data.data.map((item) => {
          return {
            label: item.color,
            value: item._id,
          };
        });
        setColors(data);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }, []);

  // fetch types
  const fetchTypes = useCallback(async () => {
    try {
      const response = await Requests.Types.Index();
      if (response && response.status === 200) {
        const data = response.data.data.map((item) => {
          return {
            label: item.type,
            value: item._id,
          };
        });
        setTypes(data);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    fetchColors();
    fetchTypes();
    fetchQualities();
  }, [fetchColors, fetchTypes, fetchQualities]);

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
              {...register("title", { required: "Fabric title is required" })}
              disabled={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* Original price */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.original_price && errors.original_price.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.original_price && errors.original_price.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                {" "}
                Original price <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="number"
              min={0}
              className={
                errors.original_price
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter original price"
              defaultValue={elementData ? elementData.original_price : null}
              {...register("original_price", {
                required: "Fabric original price is required",
              })}
              disabled={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* Sample price */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.sample_price && errors.sample_price.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.sample_price && errors.sample_price.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                {" "}
                Sample price <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="number"
              min={0}
              className={
                errors.sample_price
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter sample price"
              defaultValue={elementData ? elementData.original_price : null}
              {...register("sample_price", {
                required: "Fabric sample price is required",
              })}
              disabled={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* Quality */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.quality && errors.quality.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.quality && errors.quality.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                {" "}
                Quality <span className="text-danger">*</span>
              </Text>
            )}

            <select
              className={
                errors.quality
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              {...register("quality", { required: "Quality is required" })}
              disabled={props.view && true}
            >
              {qualities.map((item, i) => (
                <option
                  key={i}
                  selected={elementData && item.value === elementData.quality}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
            </select>
          </FormGroup>
        </Container.Column>

        {/* Colors */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.color && errors.color.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.color && errors.color.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                {" "}
                Color <span className="text-danger">*</span>
              </Text>
            )}

            <select
              className={
                errors.color
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              {...register("color", { required: "Color is required" })}
              disabled={props.view && true}
            >
              {colors.map((item, i) => (
                <option
                  key={i}
                  selected={elementData && item.value === elementData.color}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
            </select>
          </FormGroup>
        </Container.Column>

        {/* Types */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.type && errors.type.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.type && errors.type.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                {" "}
                Type <span className="text-danger">*</span>
              </Text>
            )}

            <select
              className={
                errors.type
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              {...register("type", { required: "Type is required" })}
              disabled={props.view && true}
            >
              {types.map((item, i) => (
                <option
                  key={i}
                  selected={elementData && item.value === elementData.type}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
            </select>
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
                defaultValue={
                  elementData.category && {
                    label: elementData.category.title,
                    value: elementData.category._id,
                  }
                }
                borderRadius={5}
                isDisabled={props.view && true}
              />
            </FormGroup>
          </Container.Column>
        )}

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
              defaultValue={elementData ? elementData.description : null}
              {...register("description")}
              disabled={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* Dynamic sub categories */}
        <Container.Column>
          <SubCategory2Prices
            subCategories={subCategories}
            data={getSubCategories}
            update={props.update}
            view={props.view}
          />
        </Container.Column>

        {/* Main Image */}
        <Container.Column className="col-lg-4">
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
            input={!props.view && true}
            removable={!props.view && true}
          />
        </Container.Column>

        {/* Cover Image */}
        <Container.Column className="col-lg-6">
          <FileUploader
            imageURL={
              elementData && elementData.cover_image
                ? elementData.cover_image
                : null
            }
            error={errors.cover_image ? errors.cover_image.message : ""}
            width={125}
            height={110}
            title="Cover image"
            dataHandeller={(data) => {
              if (data.error) {
                setError("cover_image", {
                  type: "manual",
                  message: data.error,
                });
              }

              if (data.image) {
                clearErrors("cover_image");
                setValue("cover_image", data.image);
              }
            }}
            dataClear={() => {
              setValue("cover_image", null);
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
