import React, { useEffect, useState, useCallback } from "react";
// import { Form } from 'react-bootstrap'
import { useForm, Controller } from "react-hook-form";
import { Text } from "../text";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { PrimaryButton, SecondaryButton } from "../button";
import { SingleSelect } from "../select";
import { Requests } from "../../utils/http";
import { CustomError } from "../../utils/error";
import { Toastify } from "../../components/toastify";
import { MinusCircle, PlusCircle } from "react-feather";
import { v4 as uuid } from "uuid";

export const EAdditionalInfoCreateForm = (props) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [customfields, setCustomFields] = useState([
    { id: uuid(), title: null, description: null },
  ]);
  const [productList, setProductList] = useState([]);

  // fetch category data
  const fetchProducts = useCallback(async () => {
    try {
      const response =
        await Requests.EAdditionalInfo.getAdditionalInfoWithOutProducts();

      if (response && response.data && response.data.body) {
        const items = response.data.body.map((item) => {
          return {
            label: item.name,
            value: item._id,
          };
        });

        setProductList(items);
      }
    } catch (error) {
      if (error) {
        console.log(error);
        if (error.response) {
          await CustomError(error.response);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Element form Submit
  const onSubmit = async (data) => {
    const formData = {
      product: data.product,
      info: customfields,
    };
    props.submit(formData);
  };

  // custom fields section {from here we will continue variation section}
  const handleAddCustomFields = (id) => {
    setCustomFields([
      ...customfields,
      {
        id: id,
        title: "",
        description: "",
      },
    ]);
  };

  const handleRemoveCustomFields = (id) => {
    const values = [...customfields];
    if (customfields.length !== 1) {
      values.splice(
        values.findIndex((value) => value.id === id),
        1
      );
      setCustomFields(values);
    }
  };

  // adding values to custom fields
  const handleChangeInputCustomField = (id, event, type) => {
    const newInputFIelds = customfields.map((item) => {
      if (id === item.id) {
        if (type === "title") {
          item["title"] = event.target.value;
        }
        if (type === "description") {
          item["description"] = event.target.value;
        }
      }
      return item;
    });
    setCustomFields(newInputFIelds);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Row>
        {/* Category */}
        <Container.Column>
          <FormGroup>
            {errors.product && errors.product.message ? (
              <Text className="text-danger fs-13 mb-1">
                {errors.product && errors.product.message}{" "}
                <span className="text-danger ">*</span>
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Products <span className="text-danger">*</span>{" "}
              </Text>
            )}

            <Controller
              name="product"
              control={control}
              rules={{ required: "Product is Required" }}
              render={({ field }) => (
                <SingleSelect
                  error={errors.category}
                  placeholder="a product"
                  options={productList}
                  value={(event) => {
                    setValue("product", event.value, { shouldValidate: true });
                  }}
                />
              )}
            />
          </FormGroup>
        </Container.Column>
      </Container.Row>

      {/* Extra Information Section */}
      <Container.Basic className="border rounded mb-3">
        <Container.Row className="pt-2">
          {/* Button For Custom Fields */}
          <div className="mb-3">
            <span
              style={{ marginTop: "1.3rem", cursor: "pointer" }}
              className="text-primary"
              onClick={() => handleAddCustomFields(uuid())}
            >
              Add Additional Information <PlusCircle size={18} />
            </span>
          </div>

          {/* Custom Fields */}
          {customfields &&
            customfields.map((item, index) => {
              return (
                <Container.Column className="col-lg-12 mb-3" key={index}>
                  <div className="d-flex justify-content-start">
                    <FormGroup className="w-100">
                      {errors.label && errors.label.message ? (
                        <Text className="text-danger fs-13 mb-0">
                          {errors.label && errors.label.message}
                        </Text>
                      ) : (
                        <Text className="fs-13 mb-0">title </Text>
                      )}

                      <input
                        type="text"
                        className={
                          errors.heighlabel
                            ? "form-control shadow-none error"
                            : "form-control shadow-none"
                        }
                        placeholder="title"
                        onChange={(event) =>
                          handleChangeInputCustomField(item.id, event, "title")
                        }
                      />
                    </FormGroup>
                    <FormGroup className="w-100 ms-3">
                      {errors.value && errors.value.message ? (
                        <Text className="text-danger fs-13 mb-0">
                          {errors.value && errors.value.message}
                        </Text>
                      ) : (
                        <Text className="fs-13 mb-0">description</Text>
                      )}

                      <input
                        type="text"
                        className={
                          errors.value
                            ? "form-control shadow-none error"
                            : "form-control shadow-none"
                        }
                        placeholder="description"
                        onChange={(event) =>
                          handleChangeInputCustomField(
                            item.id,
                            event,
                            "description"
                          )
                        }
                      />
                    </FormGroup>
                    <div
                      className="border rounded ms-2 p-2"
                      style={{ marginTop: "1.3rem", cursor: "pointer" }}
                      onClick={() => handleRemoveCustomFields(uuid())}
                    >
                      <MinusCircle size={22} />
                    </div>
                  </div>
                </Container.Column>
              );
            })}
        </Container.Row>
      </Container.Basic>

      {/* Submit button */}
      <div className="text-end">
        <PrimaryButton
          type="submit"
          className="px-4 fw-bolder"
          disabled={props.loading}
        >
          <Text className="text-uppercase fs-14 mb-0">
            {props.loading
              ? props.update
                ? "Updating ..."
                : "Submitting ..."
              : props.update
              ? "Update"
              : "Save and Add Another"}
          </Text>
        </PrimaryButton>
        {/* button */}
        <SecondaryButton
          type="submit"
          className="px-4 fw-bolder"
          disabled={props.loading}
        >
          <Text className="text-uppercase fs-14 mb-0">
            {props.loading
              ? props.update
                ? "Updating ..."
                : "Submitting ..."
              : props.update
              ? "Update"
              : "Reset"}
          </Text>
        </SecondaryButton>
      </div>
    </form>
  );
};
