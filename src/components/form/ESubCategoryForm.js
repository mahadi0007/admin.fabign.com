import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FileUploader } from "../fileUploader";
import { PrimaryButton } from "../button";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { Text } from "../text";
import { Requests } from "../../utils/http";
import { CustomError } from "../../utils/error";
import { Toastify } from "../toastify";
import { SingleSelect } from "../select";

export const ESubCategoryForm = (props) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const subCategoryData = props.subCategoryData ? props.subCategoryData : {};
  // const [image, setImage] = useState(props.subCategoryData && props.subCategoryData.banner ? props.subCategoryData.banner : null)
  const [category, setCategory] = useState(
    props.subCategoryData &&
      props.subCategoryData.category &&
      props.subCategoryData.category._id
      ? props.subCategoryData.category._id
      : null
  );
  const [categoryList, setCategoryList] = useState([]);
  const [icon, setIcon] = useState(
    props.subCategoryData && props.subCategoryData.icon
      ? props.subCategoryData.icon
      : null
  );
  const [sizeGuide, setsizeGuide] = useState(
    props.subCategoryData && props.subCategoryData.sizeGuide
      ? props.subCategoryData.sizeGuide
      : null
  );

  // fetch category data
  const fetchCategory = useCallback(async (page) => {
    try {
      const items = [];
      const response = await Requests.ECategory.Index(page);
      if (response && response.status === 200) {
        // setData(response.data.body)
        if (
          response.data &&
          response.data.body &&
          response.data.body.category &&
          response.data.body.category.length > 0
        ) {
          for (let i = 0; i < response.data.body.category.length; i++) {
            const element = response.data.body.category[i];

            items.push({
              label: element.name,
              value: element._id,
            });
          }
        }
      }
      setCategoryList(items);
    } catch (error) {
      if (error) {
        if (error.response) {
          await CustomError(error.response);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  }, []);

  useEffect(() => {
    fetchCategory(1);
  }, [fetchCategory]);

  // Category Submit
  const onSubmit = async (data) => {
    let isError = false;

    const formData = new FormData();

    if (!category) {
      setError("category", {
        type: "manual",
        message: "Category is required",
      });
      isError = true;
    }

    if (!icon) {
      setError("icon", {
        type: "manual",
        message: "Image is required",
      });
      isError = true;
    }

    if (isError) return;

    formData.append("name", data.name);
    formData.append("category", category);
    formData.append("indexId", data.indexId);
    formData.append("isActive", data.isActive);
    // formData.append("banner", image)
    formData.append("icon", icon);
    formData.append("sizeGuide", sizeGuide);
    props.submit(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Row>
        {/* Name */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.name && errors.name.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.name && errors.name.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Name <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="text"
              className={
                errors.name
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter name"
              defaultValue={subCategoryData ? subCategoryData.name : null}
              {...register("name", { required: "Name is required" })}
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

            <SingleSelect
              borderRadius={4}
              placeholder="category"
              deafult={
                subCategoryData && subCategoryData.category
                  ? {
                      value: subCategoryData.category._id
                        ? subCategoryData.category._id
                        : null,
                      label: subCategoryData.category.name
                        ? subCategoryData.category.name
                        : null,
                    }
                  : null
              }
              options={categoryList}
              value={(data) => {
                setCategory(data.value);
                clearErrors("category");
              }}
            />
          </FormGroup>
        </Container.Column>

        {/* Index ID */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.indexId && errors.indexId.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.indexId && errors.indexId.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">Index ID</Text>
            )}
            <input
              type="number"
              min={0}
              className={
                errors.indexId
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter index id"
              defaultValue={subCategoryData ? subCategoryData.indexId : null}
              {...register("indexId")}
            />
          </FormGroup>
        </Container.Column>

        {/* Is Active */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.isActive && errors.isActive.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.isActive && errors.isActive.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0"> Active status </Text>
            )}

            <select
              className={
                errors.isActive
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              defaultValue={subCategoryData ? subCategoryData.isActive : "true"}
              {...register("isActive")}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </FormGroup>
        </Container.Column>

        {/* Icon */}
        <Container.Column className="col-lg-6">
          <FileUploader
            imageURL={
              subCategoryData && subCategoryData.icon
                ? Requests.HostUrl + subCategoryData.icon
                : null
            }
            error={errors.icon ? errors.icon.message : null}
            width={125}
            height={110}
            title="Image"
            dataHandeller={(data) => {
              if (data.error) {
                setError("icon", {
                  type: "manual",
                  message: data.error,
                });
              }

              if (data.image) {
                clearErrors("icon");
                setIcon(data.image);
              }
            }}
            dataClear={() => {
              setIcon(null);
            }}
            input={true}
            removable={true}
          />
        </Container.Column>
        {/* Size Guide */}
        <Container.Column className="col-lg-6">
          <FileUploader
            imageURL={
              subCategoryData && subCategoryData.sizeGuide
                ? Requests.HostUrl + subCategoryData.sizeGuide
                : null
            }
            error={errors.sizeGuide ? errors.sizeGuide.message : null}
            width={125}
            height={110}
            title="Size Guide"
            dataHandeller={(data) => {
              if (data.error) {
                setError("sizeGuide", {
                  type: "manual",
                  message: data.error,
                });
              }

              if (data.image) {
                clearErrors("sizeGuide");
                setsizeGuide(data.image);
              }
            }}
            dataClear={() => {
              setsizeGuide(null);
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
