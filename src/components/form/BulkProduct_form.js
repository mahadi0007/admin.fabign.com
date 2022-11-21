import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FileUploader } from "../fileUploader";
import { PrimaryButton } from "../button";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { Text } from "../text";
import { CreatableSelect } from "../select";
import { Requests } from "../../utils/http";
import { useParams } from "react-router-dom";
import { Toastify } from "../../components/toastify";

export const BulkProductForm = (props) => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const [fabrics, setFabrics] = useState([]);
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [productType, setProductType] = useState();
  const [defaultFabric, setDefaultFabric] = useState([]);
  const [data, setData] = useState({});

  const fetchSingleBulkProduct = useCallback(async (id) => {
    try {
      const response = await Requests.BulkProduct.Show(id);
      setData(response.data.body);
      setValue("product_name", response.data.body.product_name);
      setProductType(response.data.body.product_type);
      setDefaultFabric(
        response.data.body.fabrics.map((item) => {
          return {
            label: item.fabric_name,
            value: item._id,
          };
        })
      );
      setValue(
        "fabrics",
        response.data.body.fabrics.map((item) => {
          return item._id;
        })
      );
      setWidth(response.data.body.width);
      setHeight(response.data.body.height);
      if (response.data.body.main_image) {
        setValue("main_image", response.data.body.main_image);
      }
      if (response.data.body.shadow_image) {
        setValue("shadow_image", response.data.body.shadow_image);
      }
      if (response.data.body.body_image) {
        setValue("body_image", response.data.body.body_image);
      }
      if (response.data.body.collor_image) {
        setValue("collor_image", response.data.body.collor_image);
      }
      if (response.data.body.cuff_image) {
        setValue("cuff_image", response.data.body.cuff_image);
      }
      if (response.data.body.front_placket_image) {
        setValue("front_placket_image", response.data.body.front_placket_image);
      }
      if (response.data.body.back_placket_image) {
        setValue("back_placket_image", response.data.body.back_placket_image);
      }
      if (response.data.body.button_image) {
        setValue("button_image", response.data.body.button_image);
      }
      if (response.data.body.sizeGuide) {
        setValue("sizeGuide", response.data.body.sizeGuide);
      }
    } catch (error) {
      if (error) {
        Toastify.Error(error.message);
      }
    }
  }, []);

  useEffect(() => {
    if (id && (props.view || props.update)) {
      fetchSingleBulkProduct(id);
    }
  }, [fetchSingleBulkProduct, id, props.view, props.update]);

  // Bulk Product Submit
  const onSubmit = async (data) => {
    const formData = new FormData();

    if (!data.main_image) {
      setError("main_image", {
        type: "manual",
        message: "Main image is required",
      });
    } else if (!data.shadow_image) {
      setError("shadow_image", {
        type: "manual",
        message: "Shadow image is required",
      });
    } else if (!data.body_image) {
      setError("body_image", {
        type: "manual",
        message: "Body image is required",
      });
    } else if (!data.collor_image) {
      setError("collor_image", {
        type: "manual",
        message: "Collor image is required",
      });
    } else if (!data.sizeGuide) {
      setError("sizeGuide", {
        type: "manual",
        message: "Size Guide image is required",
      });
    } else if (
      data.main_image &&
      data.shadow_image &&
      data.body_image &&
      data.collor_image &&
      data.sizeGuide
    ) {
      formData.append("product_name", data.product_name);
      formData.append("product_type", data.product_type);
      for (let i = 0; i < data.fabrics.length; i++) {
        formData.append("fabrics", data.fabrics[i]);
      }
      formData.append("main_image", data.main_image);
      formData.append("shadow_image", data.shadow_image);
      formData.append("body_image", data.body_image);
      formData.append("collor_image", data.collor_image);
      formData.append("cuff_image", data.cuff_image);
      formData.append("front_placket_image", data.front_placket_image);
      formData.append("back_placket_image", data.back_placket_image);
      formData.append("button_image", data.button_image);
      formData.append("sizeGuide", data.sizeGuide);
      formData.append("width", width);
      formData.append("height", height);
      props.submit(formData);
    }
  };

  // fetch fabrics of bulk
  const fetchFabric = useCallback(async () => {
    const response = await Requests.BulkFabric.Index();
    if (response && response.status === 200) {
      const data = response.data.data.map((item) => {
        return {
          label: item.fabric_name,
          value: item._id,
        };
      });
      setFabrics(data);
    }
  }, []);

  // fetch data
  useEffect(() => {
    fetchFabric();
  }, [fetchFabric]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Row>
        <Container.Column className="col-lg-6">
          {/* Product Name */}
          <FormGroup>
            {errors.product_name && errors.product_name.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.product_name && errors.product_name.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Product name <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="text"
              className={
                errors.product_name
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter Product name"
              {...register("product_name", {
                required: "Product name is required",
              })}
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>
        <Container.Column className="col-lg-6">
          {/* Type */}
          <FormGroup>
            {errors.product_type && errors.product_type.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.product_type && errors.fabric.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Type <span className="text-danger">*</span>
              </Text>
            )}
            {props.view && productType && (
              <select
                className="form-control"
                required
                {...register("product_type", {
                  required: "Product Type is required",
                })}
                onChange={(event) => {
                  let value = event.target.value;
                  setValue("product_type", value);
                  setProductType(value);
                }}
                defaultValue={productType}
                disabled
              >
                {["Crew-neck", "Polo"].map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            )}
            {!props.view && (
              <select
                className="form-control"
                required
                {...register("product_type", {
                  required: "Product Type is required",
                })}
                onChange={(event) => {
                  let value = event.target.value;
                  setValue("product_type", value);
                  setProductType(value);
                }}
              >
                {["Crew-neck", "Polo"].map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            )}
          </FormGroup>
        </Container.Column>
        {/* Fabric */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.fabrics && errors.fabrics.message ? (
              <Text className="text-danger fs-13 mb-1">
                {errors.fabrics && errors.fabrics.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">Fabrics</Text>
            )}
            {(props.view || props.update) && defaultFabric.length > 0 && (
              <CreatableSelect
                placeholder="fabrics"
                options={fabrics}
                deafult={defaultFabric}
                value={(event) => {
                  const val = [];
                  event.map((item) => {
                    val.push(item.value);
                    return val;
                  });
                  setValue("fabrics", val);
                }}
                isDisabled={props.view && true}
              />
            )}
            {!(props.view || props.update) && (
              <CreatableSelect
                placeholder="fabrics"
                options={fabrics}
                value={(event) => {
                  const val = [];
                  event.map((item) => {
                    val.push(item.value);
                    return val;
                  });
                  setValue("fabrics", val);
                }}
              />
            )}
          </FormGroup>
        </Container.Column>
      </Container.Row>

      <Container.Row>
        {/* title image */}
        <Container.Column className="col-md-2">
          <FileUploader
            imageURL={
              (props.view || props.update) &&
              Requests.HostUrl +
                "/uploads/bulkprod/main_images/" +
                data.main_image
            }
            error={errors.main_image ? errors.main_image.message : ""}
            width={90}
            height={90}
            limit={1000}
            title="Main Image"
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
            removable={!props.view && true}
            input={!props.view && true}
          />
        </Container.Column>
        <Container.Column className="col-md-2">
          <FileUploader
            imageURL={
              (props.view || props.update) &&
              Requests.HostUrl +
                "/uploads/bulkprod/shadow_images/" +
                data.shadow_image
            }
            error={errors.shadow_image ? errors.shadow_image.message : ""}
            width={90}
            height={90}
            limit={10000}
            title="Shadow Image"
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
            removable={!props.view && true}
            shadowImage={true}
            input={!props.view && true}
          />
        </Container.Column>
        <Container.Column className="col-md-2">
          <FileUploader
            imageURL={
              (props.view || props.update) &&
              Requests.HostUrl +
                "/uploads/bulkprod/body_images/" +
                data.body_image
            }
            error={errors.body_image ? errors.body_image.message : ""}
            width={90}
            height={90}
            limit={1000}
            title="Body Image"
            dataHandeller={(data) => {
              if (data.error) {
                setError("body_image", {
                  type: "manual",
                  message: data.error,
                });
              }

              if (data.image) {
                clearErrors("body_image");
                setValue("body_image", data.image);
              }
            }}
            dataClear={() => {
              setValue("body_image", null);
            }}
            removable={!props.view && true}
            input={!props.view && true}
          />
        </Container.Column>
        <Container.Column className="col-md-2">
          <FileUploader
            imageURL={
              (props.view || props.update) &&
              Requests.HostUrl +
                "/uploads/bulkprod/collor_images/" +
                data.collor_image
            }
            error={errors.collor_image ? errors.collor_image.message : ""}
            width={90}
            height={90}
            limit={1000}
            title="Collor Image"
            dataHandeller={(data) => {
              if (data.error) {
                setError("collor_image", {
                  type: "manual",
                  message: data.error,
                });
              }

              if (data.image) {
                clearErrors("collor_image");
                setValue("collor_image", data.image);
              }
            }}
            dataClear={() => {
              setValue("collor_image", null);
            }}
            removable={!props.view && true}
            input={!props.view && true}
          />
        </Container.Column>
        {(getValues("product_type") === "Polo" || productType === "Polo") && (
          <>
            <Container.Column className="col-md-2">
              <FileUploader
                imageURL={
                  (props.view || props.update) &&
                  Requests.HostUrl +
                    "/uploads/bulkprod/cuff_images/" +
                    data.cuff_image
                }
                error={errors.cuff_image ? errors.cuff_image.message : ""}
                width={90}
                height={90}
                limit={1000}
                title="Cuff Image"
                dataHandeller={(data) => {
                  if (data.error) {
                    setError("cuff_image", {
                      type: "manual",
                      message: data.error,
                    });
                  }

                  if (data.image) {
                    clearErrors("cuff_image");
                    setValue("cuff_image", data.image);
                  }
                }}
                dataClear={() => {
                  setValue("cuff_image", null);
                }}
                removable={!props.view && true}
                input={!props.view && true}
              />
            </Container.Column>
            <Container.Column className="col-md-2">
              <FileUploader
                imageURL={
                  (props.view || props.update) &&
                  Requests.HostUrl +
                    "/uploads/bulkprod/front_placket_images/" +
                    data.front_placket_image
                }
                error={
                  errors.front_placket_image
                    ? errors.front_placket_image.message
                    : ""
                }
                width={90}
                height={90}
                limit={1000}
                title="Front Placket Image"
                dataHandeller={(data) => {
                  if (data.error) {
                    setError("front_placket_image", {
                      type: "manual",
                      message: data.error,
                    });
                  }

                  if (data.image) {
                    clearErrors("front_placket_image");
                    setValue("front_placket_image", data.image);
                  }
                }}
                dataClear={() => {
                  setValue("front_placket_image", null);
                }}
                removable={!props.view && true}
                input={!props.view && true}
              />
            </Container.Column>
            <Container.Column className="col-md-2">
              <FileUploader
                imageURL={
                  (props.view || props.update) &&
                  Requests.HostUrl +
                    "/uploads/bulkprod/back_placket_images/" +
                    data.back_placket_image
                }
                error={
                  errors.back_placket_image
                    ? errors.back_placket_image.message
                    : ""
                }
                width={90}
                height={90}
                limit={1000}
                title="Back placket Image"
                dataHandeller={(data) => {
                  if (data.error) {
                    setError("back_placket_image", {
                      type: "manual",
                      message: data.error,
                    });
                  }

                  if (data.image) {
                    clearErrors("back_placket_image");
                    setValue("back_placket_image", data.image);
                  }
                }}
                dataClear={() => {
                  setValue("back_placket_image", null);
                }}
                removable={!props.view && true}
                input={!props.view && true}
              />
            </Container.Column>
            <Container.Column className="col-md-2">
              <FileUploader
                imageURL={
                  (props.view || props.update) &&
                  Requests.HostUrl +
                    "/uploads/bulkprod/button_images/" +
                    data.button_image
                }
                error={errors.button_image ? errors.button_image.message : ""}
                width={90}
                height={90}
                limit={1000}
                title="Button Image"
                dataHandeller={(data) => {
                  if (data.error) {
                    setError("button_image", {
                      type: "manual",
                      message: data.error,
                    });
                  }

                  if (data.image) {
                    clearErrors("button_image");
                    setValue("button_image", data.image);
                  }
                }}
                dataClear={() => {
                  setValue("button_image", null);
                }}
                removable={!props.view && true}
                input={!props.view && true}
              />
            </Container.Column>
          </>
        )}
        <Container.Column className="col-lg-2">
          <FileUploader
            imageURL={
              (props.view || props.update) &&
              data.sizeGuide &&
              Requests.HostUrl +
                "/uploads/bulkprod/sizeGuide_images/" +
                data.sizeGuide
            }
            error={errors.sizeGuide ? errors.sizeGuide.message : ""}
            width={90}
            height={90}
            limit={1000}
            title="Size Guide Image"
            dataHandeller={(data) => {
              if (data.error) {
                setError("sizeGuide", {
                  type: "manual",
                  message: data.error,
                });
              }

              if (data.image) {
                clearErrors("sizeGuide");
                setValue("sizeGuide", data.image);
              }
            }}
            dataClear={() => {
              setValue("sizeGuide", null);
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
