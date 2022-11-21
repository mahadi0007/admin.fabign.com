import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { SearchableSelect } from "../select";
import { Requests } from "../../utils/http";
import { PrimaryButton } from "../button";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { Text } from "../text";
import { FileUploader } from "../fileUploader";
import Element2Images from "../button-type/Element2Images";
import { Toastify } from "../toastify";
import { useParams } from "react-router-dom";

export const ButtonType2Form = (props) => {
  const {
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [elements, setElements] = useState(null);
  const [data, setData] = useState(null);
  // get additional data
  const getElements = (data) => setElements(data);

  const fetchSingleButtonType = useCallback(async (id) => {
    try {
      const response = await Requests.ButtonType2.Show(id);
      console.log("response");
      console.log(response);
      setData(response.data.body);
      setValue("category", response.data.body.category.value);
      setSelectedCategory(response.data.body.category.value);
      setValue("icon", response.data.body.icon);
      setElements(response.data.body.element_images);
    } catch (error) {
      if (error) {
        Toastify.Error(error.message);
      }
    }
  }, []);

  useEffect(() => {
    if (id && (props.view || props.update)) {
      fetchSingleButtonType(id);
    }
  }, [fetchSingleButtonType, id, props.view, props.update]);

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

  const hasNull = (element, index, array) => {
    return element.element === null || element.image === null;
  };

  // Sub category submit
  const onSubmit = async (data) => {
    const formData = new FormData();

    if (!data.icon) {
      setError("icon", {
        type: "manual",
        message: "Icon image is required",
      });
    }

    if (!selectedCategory) {
      setError("selectedCategory", {
        type: "manual",
        message: "Category is required",
      });
    }

    if (elements.some(hasNull)) {
      Toastify.Error("Element must have image.");
    }
    if (!elements.some(hasNull) && selectedCategory) {
      if (!props.update) {
        formData.append("icon", data.icon);
        formData.append("category", selectedCategory);
        if (elements !== null) {
          for (let i = 0; i < elements.length; i++) {
            formData.append("elements", elements[i].element);
            formData.append("elements_images", elements[i].image.image);
          }
        }
      } else {
        console.log("data.icon");
        console.log(data.icon);
        formData.append("icon", data.icon);
        formData.append("category", selectedCategory);
        formData.append("elements", JSON.stringify(elements));
        for (let i = 0; i < elements.length; i++) {
          if (typeof elements[i].image === "object") {
            formData.append("elements_images", elements[i].image.image);
          }
        }
      }

      props.submit(formData);
      // console.log(form);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Row>
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

            {data && (
              <SearchableSelect
                placeholder="Search category"
                search={handleCategorySearch}
                defaultValue={data.category}
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

            {!data && (
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
                isDisabled={props.view && true}
              />
            )}
          </FormGroup>
        </Container.Column>

        {/* Dynamic sub categories */}
        <Container.Column>
          <Element2Images elements={elements} data={getElements} view={true} />
        </Container.Column>

        {/* Icon */}
        <Container.Column className="col-lg-6">
          <FileUploader
            error={errors.icon ? errors.icon.message : ""}
            imageURL={data && (props.view || props.update) && data.icon}
            width={125}
            height={110}
            title="Icon"
            dataHandeller={(data) => {
              if (data.error) {
                setError("icon", {
                  type: "manual",
                  message: data.error,
                });
              }
              if (data.image) {
                clearErrors("icon");
                setValue("icon", data.image);
              }
            }}
            dataClear={() => {
              setValue("icon", null);
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
