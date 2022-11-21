import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { Text } from "../text";
import { CreatableSelect } from "../select";
import { Requests } from "../../utils/http";
import { useParams } from "react-router-dom";
import { Toastify } from "../../components/toastify";

export const ODPProductShowForm = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState({});
  const [colors, setColors] = useState([]);
  const { id } = useParams();
  const [defaultSize, setDefaultSize] = useState([]);
  const [defaultColor, setDefaultColor] = useState([]);
  const [fabric, setFabric] = useState();
  const size = [
    {
      label: "S",
      value: "S",
    },
    {
      label: "M",
      value: "M",
    },
    {
      label: "L",
      value: "L",
    },
    {
      label: "XL",
      value: "XL",
    },
    {
      label: "XXL",
      value: "XXL",
    },
  ];

  const fetchSingleODPProduct = useCallback(async (id) => {
    try {
      const response = await Requests.ODPProduct.Show(id);
      setData(response.data.body);
      setValue("product_name", response.data.body.product_name);
      setValue("subtitle", response.data.body.subtitle);
      setDefaultSize(
        response.data.body.size.map((item) => {
          return {
            label: item,
            value: item,
          };
        })
      );
      setDefaultColor(
        response.data.body.colors.map((item) => {
          return {
            label: item.color_name,
            value: item._id,
          };
        })
      );
      setValue("price", response.data.body.price);
      setFabric(response.data.body.fabric);
      setValue("description", response.data.body.description);
    } catch (error) {
      if (error) {
        Toastify.Error(error.message);
      }
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchSingleODPProduct(id);
    }
  }, [fetchSingleODPProduct, id]);

  // fetch colors of odp
  const fetchColor = useCallback(async () => {
    const response = await Requests.ODPColor.Index();
    if (response && response.status === 200) {
      const data = response.data.data.map((item) => {
        return {
          label: item.color_name,
          value: item._id,
        };
      });
      setColors(data);
    }
  }, []);

  // fetch data
  useEffect(() => {
    fetchColor();
  }, [fetchColor]);

  return (
    <form>
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
              readOnly
            />
          </FormGroup>
        </Container.Column>
        <Container.Column className="col-lg-6">
          {/* Subtitle */}
          <FormGroup>
            {errors.subtitle && errors.subtitle.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.subtitle && errors.subtitle.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Subtitle <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="text"
              className={
                errors.subtitle
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter Subtitle"
              {...register("subtitle", { required: "Subtitle is required" })}
              readOnly
            />
          </FormGroup>
        </Container.Column>
        {/* size */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.size && errors.size.message ? (
              <Text className="text-danger fs-13 mb-1">
                {errors.size && errors.size.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">Size</Text>
            )}
            {defaultSize.length > 0 && (
              <CreatableSelect
                placeholder="Size"
                options={size}
                deafult={defaultSize}
                value={(event) => {
                  const val = [];
                  event.map((item) => {
                    val.push(item.value);
                    return val;
                  });
                  setValue("size", val);
                }}
                isDisabled={true}
              />
            )}
          </FormGroup>
        </Container.Column>
        {/* Colors */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.colors && errors.colors.message ? (
              <Text className="text-danger fs-13 mb-1">
                {errors.colors && errors.colors.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">Colors</Text>
            )}
            {defaultColor.length > 0 && (
              <CreatableSelect
                placeholder="colors"
                options={colors}
                deafult={defaultColor}
                value={(event) => {
                  const val = [];
                  event.map((item) => {
                    val.push(item.value);
                    return val;
                  });
                  setValue("colors", val);
                }}
                isDisabled={true}
              />
            )}
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
                Price <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="text"
              className={
                errors.price
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter price"
              {...register("price", { required: "Price is required" })}
              readOnly
            />
          </FormGroup>
        </Container.Column>

        {/* Fabric */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.fabric && errors.fabric.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.fabric && errors.fabric.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Fabric <span className="text-danger">*</span>
              </Text>
            )}
            {fabric && (
              <select
                className="form-control"
                {...register("fabric", { required: "fabric is required" })}
                defaultValue={fabric}
                disabled
              >
                {["100% cotton", "Modal Fabric", "Cotton/Lycra"].map(
                  (item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  }
                )}
              </select>
            )}
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
                Product description <span className="text-danger">*</span>
              </Text>
            )}
            <textarea
              rows={5}
              className={
                errors.description
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter product description"
              {...register("description")}
              readOnly
            />
          </FormGroup>
        </Container.Column>
      </Container.Row>

      <Container.Row>
        {/* title image */}
        <Container.Column className="col-lg-2">
          <div className="img-select-container mr-2">
            <div className="form-group mb-4">
              <small>Icon</small>
              {data.icon && (
                <div className="d-flex">
                  <div className="preview-container text-center mr-2">
                    <div
                      className="image border"
                      style={{
                        width: 90,
                        height: 90,
                      }}
                    >
                      <img
                        src={
                          Requests.HostUrl +
                          "/uploads/odpprod/icons/" +
                          data.icon
                        }
                        className="img-fluid"
                        alt="..."
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container.Column>
        <Container.Column className="col-lg-2">
          <div className="img-select-container mr-2">
            <div className="form-group mb-4">
              <small>Main Image</small>
              {data.main_image && (
                <div className="d-flex">
                  <div className="preview-container text-center mr-2">
                    <div
                      className="image border"
                      style={{
                        width: 90,
                        height: 90,
                      }}
                    >
                      <img
                        src={
                          Requests.HostUrl +
                          "/uploads/odpprod/main_images/" +
                          data.main_image
                        }
                        className="img-fluid"
                        alt="..."
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container.Column>
        <Container.Column className="col-lg-2">
          <div className="img-select-container mr-2">
            <div className="form-group mb-4">
              <small>Right Image</small>
              {data.right_image && (
                <div className="d-flex">
                  <div className="preview-container text-center mr-2">
                    <div
                      className="image border"
                      style={{
                        width: 90,
                        height: 90,
                      }}
                    >
                      <img
                        src={
                          Requests.HostUrl +
                          "/uploads/odpprod/right_images/" +
                          data.right_image
                        }
                        className="img-fluid"
                        alt="..."
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container.Column>
        <Container.Column className="col-lg-2">
          <div className="img-select-container mr-2">
            <div className="form-group mb-4">
              <small>Left Image</small>
              {data.left_image && (
                <div className="d-flex">
                  <div className="preview-container text-center mr-2">
                    <div
                      className="image border"
                      style={{
                        width: 90,
                        height: 90,
                      }}
                    >
                      <img
                        src={
                          Requests.HostUrl +
                          "/uploads/odpprod/left_images/" +
                          data.left_image
                        }
                        className="img-fluid"
                        alt="..."
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container.Column>
        <Container.Column className="col-lg-2">
          <div className="img-select-container mr-2">
            <div className="form-group mb-4">
              <small>Back Image</small>
              {data.back_image && (
                <div className="d-flex">
                  <div className="preview-container text-center mr-2">
                    <div
                      className="image border"
                      style={{
                        width: 90,
                        height: 90,
                      }}
                    >
                      <img
                        src={
                          Requests.HostUrl +
                          "/uploads/odpprod/back_images/" +
                          data.back_image
                        }
                        className="img-fluid"
                        alt="..."
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container.Column>
        <Container.Column className="col-lg-2">
          <div className="img-select-container mr-2">
            <div className="form-group mb-4">
              <small>Size Guide Image</small>
              {data.sizeGuide && (
                <div className="d-flex">
                  <div className="preview-container text-center mr-2">
                    <div
                      className="image border"
                      style={{
                        width: 90,
                        height: 90,
                      }}
                    >
                      <img
                        src={
                          Requests.HostUrl +
                          "/uploads/odpprod/sizeGuide_images/" +
                          data.sizeGuide
                        }
                        className="img-fluid"
                        alt="..."
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container.Column>
      </Container.Row>
    </form>
  );
};
