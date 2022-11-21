import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import SubCategoryPrices from "../fabric/SubCategoryPrices";
import { FileUploader } from "../fileUploader";
import { SearchableSelect } from "../select";
import { Requests } from "../../utils/http";
import { PrimaryButton } from "../button";
import { FormGroup } from "../formGroup";
import { Container } from "../container";
import { Text } from "../text";
import { useEffect } from "react";

export const FabricForm = (props) => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const elementData = props.elementData ? props.elementData : {};
  const [colors, setColors] = useState([]);
  const [types, setTypes] = useState([]);

  // Handle Category search
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
      const items = [];
      // Need to give correct api. It is a category api.
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

  // Handle company search
  const handleCompanySearch = async (query) => {
    try {
      const items = [];
      // Need to give correct api. It is a category api.
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

  // get additional data
  const getSubCategories = (data) => setSubCategories(data);

  // Element form Submit
  const onSubmit = async (data) => {
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

    if (data.title_image && data.main_image && selectedCategory) {
      formData.append("title", data.title);
      formData.append("sub_title", data.sub_title);
      formData.append("original_price", data.original_price);
      if (selectedCategory !== null) {
        formData.append("category", selectedCategory);
      }
      if (selectedCompany !== null) {
        formData.append("company", selectedCompany);
      }
      if (selectedBrand !== null) {
        formData.append("brand", selectedBrand);
      }
      formData.append("color", data.color);
      formData.append("type", data.type);
      formData.append("pattern", data.pattern);
      formData.append("weave", data.weave);
      formData.append("weight", data.weight);
      formData.append("composition", data.composition);
      formData.append("description", data.description);
      formData.append("quality", data.quality);
      if (subCategories !== null) {
        formData.append("sub_category_prices", JSON.stringify(subCategories));
      }
      if (data.title_image != null && data.title_image !== "undefined") {
        formData.append("title_image", data.title_image);
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
  const fetchColors = useCallback(async () => {
    try {
      const response = await Requests.Colors.Index();
      if (response && response.status === 200) {
        console.log(response);
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
        console.log(response);
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
  }, [fetchColors, fetchTypes]);

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
              defaultValue={elementData ? elementData.sub_title : null}
              {...register("sub_title", {
                required: "Fabric sub-title is required",
              })}
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
              step=".01"
              className={
                errors.original_price
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter original price"
              defaultValue={elementData ? elementData.original_price : null}
              {...register("original_price", {
                required: "Fabric price is required",
              })}
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
            >
              {colors.map((item, i) => (
                <option key={i} value={item.value}>
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
            >
              {types.map((item, i) => (
                <option key={i} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
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

        {/* Company */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.selectedCompany && errors.selectedCompany.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.selectedCompany && errors.selectedCompany.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0"> Company name </Text>
            )}

            <SearchableSelect
              placeholder="Search company"
              search={handleCompanySearch}
              values={(data) => setSelectedCompany(data.value)}
              borderRadius={5}
            />
          </FormGroup>
        </Container.Column>

        {/* Brand */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.selectedBrand && errors.selectedBrand.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.selectedBrand && errors.selectedBrand.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0"> Brand name </Text>
            )}

            <SearchableSelect
              placeholder="Search company"
              search={handleBrandSearch}
              values={(data) => setSelectedBrand(data.value)}
              borderRadius={5}
            />
          </FormGroup>
        </Container.Column>

        {/* Color */}
        {/* <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.color && errors.color.message ?
              <Text className="text-danger fs-13 mb-0">{errors.color && errors.color.message}</Text>
              : <Text className="fs-13 mb-0"> Fabric color <span className="text-danger">*</span></Text>}
            <input
              type="text"
              className={errors.color ? "form-control shadow-none error" : "form-control shadow-none"}
              placeholder="Enter color"
              defaultValue={elementData ? elementData.color : null}
              {...register("color", { required: "Fabric color is required" })}
            />
          </FormGroup>
        </Container.Column> */}

        {/* Pattern */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.pattern && errors.pattern.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.pattern && errors.pattern.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                {" "}
                Fabric pattern <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="text"
              className={
                errors.pattern
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter pattern"
              defaultValue={elementData ? elementData.pattern : null}
              {...register("pattern", {
                required: "Fabric pattern is required",
              })}
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
              {...register("weave", { required: "Fabric weave is required" })}
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
              {...register("weight", { required: "Fabric weight is required" })}
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
                required: "Fabric composition is required",
              })}
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
              defaultValue={elementData ? elementData.description : null}
              {...register("description")}
            />
          </FormGroup>
        </Container.Column>

        {/* Dynamic sub categories */}
        <Container.Column>
          <SubCategoryPrices data={getSubCategories} />
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
