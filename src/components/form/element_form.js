import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Text } from "../text";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { PrimaryButton } from "../button";
import { SearchableSelect } from "../select";
import { FileUploader } from "../fileUploader";
import { Requests } from "../../utils/http";

export const ElementForm = (props) => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const elementData = props.elementData ? props.elementData : {};
  const [size, setSize] = useState(null);
  const [brand, setBrand] = useState(null);
  const [company, setCompany] = useState(null);
  const [category, setCategory] = useState(null);
  const [categoryType, setCategoryType] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [leafCategory, setLeafCategory] = useState(null);
  // const [backside,setBackSide] = useState(false)

  // hande size search
  const handleSizeSearch = async (query) => {
    try {
      const items = [];
      const response = await Requests.Search.Size(query);
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

  // Handle brand search
  const handleBrandSearch = async (query) => {
    try {
      const results = [
        { label: "Ocean", value: 1 },
        { label: "Sea", value: 2 },
      ];

      return results;
    } catch (error) {
      if (error) return [];
    }
  };

  // Handle company search
  const handleCompanySearch = async (query) => {
    try {
      const results = [
        { label: "Aci", value: "Aci" },
        { label: "Honda", value: "Honda" },
      ];

      return results;
    } catch (error) {
      if (error) return [];
    }
  };
  // Handle search sub category or leaf category
  const handleSearchSubCategoryOrLeafCategory = async (query, type) => {
    try {
      const items = [];
      const response = await Requests.Element.SearchInSubCategoryOrLeafCategory(
        query,
        type,
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
    let isError = false;

    if (!size) {
      setError("size", {
        type: "manual",
        message: "Size is required",
      });
      isError = true;
    }

    if (!category) {
      setError("category", {
        type: "manual",
        message: "Category is required",
      });
      isError = true;
    }

    if (!categoryType) {
      setError("category_type", {
        type: "manual",
        message: "Category type is required",
      });
      isError = true;
    }

    if (categoryType && categoryType === "Sub category" && !subCategory) {
      setError("sub_category", {
        type: "manual",
        message: "Sub category is required",
      });
      isError = true;
    }

    if (categoryType && categoryType === "Leaf category" && !leafCategory) {
      setError("leaf_category", {
        type: "manual",
        message: "Leaf category is required",
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
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("quality", data.quality);
      formData.append("color", data.color);
      formData.append("weave", data.weave);
      formData.append("weight", data.weight);
      formData.append("composition", data.composition);

      if (size) formData.append("size", size);
      if (brand) formData.append("brand", brand);
      if (company) formData.append("company", company);
      if (category) formData.append("main_category", category);
      if (subCategory) formData.append("sub_category", subCategory);
      if (leafCategory) formData.append("leaf_category", leafCategory);

      formData.append("title_image", data.title_image);
      formData.append("main_image", data.main_image);
      formData.append("priority", data.priority);
      // formData.append("is_backside", backside)

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
            >
              {[
                "All",
                "Featured",
                "Essentials",
                "Premium",
                "Luxury",
                "Non-Iron",
              ].map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
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
                Element color <span className="text-danger">*</span>
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
              defaultValue={elementData ? elementData.color : null}
              {...register("color", { required: "Color is required" })}
            />
          </FormGroup>
        </Container.Column>

        {/* Weave */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.weave && errors.weave.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.weave && errors.weave.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                {" "}
                Element weave <span className="text-danger">*</span>
              </Text>
            )}

            <input
              type="text"
              className={
                errors.weave
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter weave"
              defaultValue={elementData ? elementData.weave : null}
              {...register("weave", { required: "Weave is required" })}
            />
          </FormGroup>
        </Container.Column>

        {/* Weight */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.weight && errors.weight.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.weight && errors.weight.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                {" "}
                Element weight <span className="text-danger">*</span>
              </Text>
            )}

            <input
              type="number"
              min={0}
              step=".01"
              className={
                errors.weight
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter weight"
              defaultValue={elementData ? elementData.weight : null}
              {...register("weight", { required: "Weight is required" })}
            />
          </FormGroup>
        </Container.Column>

        {/* Composition */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.composition && errors.composition.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.composition && errors.composition.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                {" "}
                Element composition <span className="text-danger">*</span>
              </Text>
            )}

            <input
              type="text"
              className={
                errors.composition
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter composition"
              defaultValue={elementData ? elementData.composition : null}
              {...register("composition", {
                required: "Composition is required",
              })}
            />
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
                Description <span className="text-danger">*</span>
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
              {...register("description", {
                required: "Description is required",
              })}
            />
          </FormGroup>
        </Container.Column>

        {/* Size */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.size && errors.size.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.size && errors.size.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                {" "}
                Size <span className="text-danger">*</span>
              </Text>
            )}

            <SearchableSelect
              placeholder="Select size"
              borderRadius={5}
              search={handleSizeSearch}
              values={(data) => {
                setSize(data.value);
                clearErrors("size");
              }}
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

        {/* Brand */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            <Text className="fs-13 mb-0"> Brand</Text>

            <SearchableSelect
              borderRadius={5}
              placeholder="Search brand"
              search={handleBrandSearch}
              values={(data) => setBrand(data.value)}
            />
          </FormGroup>
        </Container.Column>

        {/* Company */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            <Text className="fs-13 mb-0"> Company</Text>

            <SearchableSelect
              borderRadius={5}
              placeholder="Search company"
              search={handleCompanySearch}
              values={(data) => setCompany(data.value)}
            />
          </FormGroup>
        </Container.Column>

        {/* Checkbox */}
        <Container.Column>
          {errors.category_type && errors.category_type.message ? (
            <Text className="text-danger fs-13">
              {errors.category_type && errors.category_type.message}
            </Text>
          ) : (
            <Text className="fs-13">
              Select category type <span className="text-danger">*</span>
            </Text>
          )}

          {["Sub category", "Leaf category"].map((item) => {
            return (
              <FormGroup key={item}>
                <Form.Check
                  type="checkbox"
                  id={`checkbox-control-${item}`}
                  label={<Text className="fs-14 mb-0">{item}</Text>}
                  checked={categoryType && categoryType === item}
                  onChange={() => {
                    setSubCategory(null);
                    setLeafCategory(null);
                    setCategoryType(item);
                    clearErrors("category_type");
                    clearErrors("sub_category");
                    clearErrors("leaf_category");
                  }}
                />
              </FormGroup>
            );
          })}
        </Container.Column>

        {/* Sub category */}
        {categoryType && categoryType === "Sub category" ? (
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
                  handleSearchSubCategoryOrLeafCategory(
                    inputValue,
                    "sub",
                    category
                  )
                }
                values={(event) => {
                  setSubCategory(event.value);
                  clearErrors("sub_category");
                }}
              />
            </FormGroup>
          </Container.Column>
        ) : null}

        {/* Leaf category */}
        {categoryType && categoryType === "Leaf category" ? (
          <Container.Column>
            <FormGroup>
              {errors.leaf_category && errors.leaf_category.message ? (
                <Text className="text-danger fs-13 mb-0">
                  {errors.leaf_category && errors.leaf_category.message}
                </Text>
              ) : (
                <Text className="fs-13 mb-0">
                  Leaf Category <span className="text-danger">*</span>
                </Text>
              )}

              <SearchableSelect
                borderRadius={4}
                placeholder="Select leaf category"
                search={(inputValue) =>
                  handleSearchSubCategoryOrLeafCategory(
                    inputValue,
                    "leaf",
                    category
                  )
                }
                values={(event) => {
                  setLeafCategory(event.value);
                  clearErrors("leaf_category");
                }}
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
            />
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
