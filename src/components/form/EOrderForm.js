import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { PrimaryButton, DangerButton } from "../button";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { Text } from "../text";
import { Requests } from "../../utils/http";
import { Toastify } from "../../components/toastify";
import { CustomError } from "../../utils/error";
import { SingleSelect } from "../../components/select";
import { Plus, X } from "react-feather";
import { Image } from "../../components/image/Index";

export const EOrderForm = (props) => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [zone, setZone] = useState({ value: null, options: [] });
  const [product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cost, setCost] = useState(0);
  const [suggestion, setSuggestion] = useState([]);
  const [query, setQuery] = useState("");
  const [coupon, setCoupon] = useState("");

  // fetch zones data
  const fetchZonesData = useCallback(async (page) => {
    try {
      const items = [];
      const response = await Requests.CallForTailor.AllZones(page);
      if (response && response.status === 200) {
        // setBrandList(response.data.body.brand)
        if (
          response.data &&
          response.data.body &&
          response.data.body.length > 0
        ) {
          for (let i = 0; i < response.data.body.length; i++) {
            const element = response.data.body[i];

            items.push({
              value: element,
              label: element,
            });
          }
        }
      }
      setZone((exData) => ({ ...exData, options: items }));
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

  const handleSuggestion = useCallback(
    async (value) => {
      try {
        const response = await Requests.EProduct.SearchAllIndex(value);
        // console.log("response");
        // console.log(response);
        setSuggestion(response.data.body.product);
      } catch (error) {
        if (error) {
          if (error.response) {
            await CustomError(error.response);
          } else {
            Toastify.Error("Something going wrong.");
          }
        }
      }
    },
    [query]
  );

  useEffect(() => {
    fetchZonesData(1);
  }, [fetchZonesData]);

  // Handle zone
  const handleZone = async (data) => {
    setZone((exData) => ({ ...exData, value: data }));
    clearErrors("zone");
    try {
      const response = await Requests.CallForTailor.ShippingIndex(data);
      if (response && response.data && response.data.body) {
        setCost(response.data.body.deliveryCharge);
      }
    } catch (error) {
      if (error) {
        if (error.response) {
          Toastify.Error(error.response.message);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  };

  // Category Submit
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("deliveryAddress", data.address);
    formData.append("postCode", data.postal_code);
    formData.append("deliveryCharge", 30);
    formData.append("paymentMethod", data.paymentMethod);
    formData.append("isCouponApplied", false);
    formData.append(
      "orderStatus",
      JSON.stringify([
        {
          status: "Order Received",
          time: new Date(),
        },
      ])
    );

    // console.log(data);
    // console.log(product);

    let items = [];
    let price = 0;

    product.map((item, index) => {
      items.push({
        id: item._id,
        productName: item.name,
        thumbnail: item.featuredImage.large,
        quantity: item.quantity,
        purchasePrice: item.sellingPrice,
        subTotal: item.sellingPrice * item.quantity,
        total: item.sellingPrice * item.quantity,
        category: item.category,
        variantion: item.variant,
      });
      price = price + parseInt(item.sellingPrice) * parseInt(item.quantity);
    });
    formData.append("products", JSON.stringify(items));
    formData.append("subTotalPrice", parseInt(price));
    props.submit(formData);
  };

  // Add product
  const addProduct = (item) => {
    if (!product.some((el) => el._id === item._id)) {
      setProduct([...product, { ...item, quantity: 1 }]);
    }
  };

  // Remove product
  const removeProduct = (index) => {
    const temp = [...product];
    temp.splice(index, 1);
    setProduct(temp);
  };

  // Handle input
  const updateProduct = (index, value) => {
    const temp = [...product];
    temp[index].quantity = value;
    setProduct(temp);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Row className="border p-1 m-3">
        <Container.Column className="col-md-12">
          <p className="fw-bolder">Select Product</p>
          <div className="d-flex justify-content-between">
            <input
              type=""
              placeholder="Enter product name/sku"
              className="form-control shadow-none"
              value={query}
              onChange={(event) => {
                const value = event.target.value;
                setQuery(value);
                handleSuggestion(value);
              }}
            />
            <PrimaryButton
              type="button"
              className="btn btn-primary shadow-none ms-2"
              onClick={() => {
                setQuery("");
                handleSuggestion("");
                addProduct(selectedProduct);
              }}
            >
              Add
            </PrimaryButton>
          </div>
          {suggestion.length > 0 &&
            suggestion.map((item, i) => (
              <div
                key={i}
                className="border"
                onClick={() => {
                  setSelectedProduct(item);
                  setQuery(item.name);
                }}
              >
                <p className="text-capitalize m-0 p-2">{item.name}</p>
              </div>
            ))}
          {product.length > 0 && (
            <table className="w-100 table table-bordered mt-5">
              <thead className="table-dark">
                <tr>
                  <th>Product</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {product.map((item, i) => (
                  <tr key={i}>
                    <td>
                      <div className="d-flex">
                        {item.featuredImage.large && (
                          <span>
                            <Image
                              src={Requests.HostUrl + item.featuredImage.large}
                              alt="Product image"
                              x={50}
                              y={50}
                            />
                          </span>
                        )}
                        {item.name}
                      </div>
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                      <input
                        type="number"
                        name="qunatity"
                        min={0}
                        className="form-control shadow-none"
                        placeholder="Enter qunatity"
                        defaultValue={item.quantity ? item.quantity : 0}
                        onChange={(event) => {
                          updateProduct(i, event.target.value);
                        }}
                      />
                    </td>
                    <td>{item.sellingPrice * item.quantity}</td>
                    <td>
                      <DangerButton
                        type="button"
                        className="btn btn-circle"
                        onClick={() => removeProduct(i)}
                      >
                        <X size={20} />
                      </DangerButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Container.Column>
      </Container.Row>

      <Container.Row className="border p-1 m-3">
        <p className="fw-bolder">Billing Details</p>
        <Container.Row className="px-5 py-2">
          {/* Full Name */}
          <Container.Column className="col-md-6">
            <FormGroup>
              {errors.name && errors.name.message ? (
                <Text className="text-danger fs-14 fw-bolder mb-1">
                  {errors.name && errors.name.message}
                </Text>
              ) : (
                <Text className="text-capitalized fs-14 mb-1">
                  Full Name <span className="text-danger"> *</span>
                </Text>
              )}

              <input
                type="text"
                className={
                  errors.name
                    ? "form-control shadow-none error"
                    : "form-control shadow-none"
                }
                placeholder="Enter phone number"
                {...register("name", {
                  required: "Full Name is required",
                  pattern: {
                    message: "Invalid name",
                  },
                })}
              />
            </FormGroup>
          </Container.Column>

          {/* Phone */}
          <Container.Column className="col-md-6">
            <FormGroup>
              {errors.phone && errors.phone.message ? (
                <Text className="text-danger fs-14 fw-bolder mb-1">
                  {errors.phone && errors.phone.message}
                </Text>
              ) : (
                <Text className="text-capitalized fs-14 mb-1">
                  Phone Number <span className="text-danger"> *</span>
                </Text>
              )}

              <input
                type="text"
                className={
                  errors.phone
                    ? "form-control shadow-none error"
                    : "form-control shadow-none"
                }
                placeholder="Enter phone number"
                {...register("phone", {
                  required: "Phone is required",
                })}
              />
            </FormGroup>
          </Container.Column>

          {/* Email */}
          <Container.Column className="col-md-6">
            <FormGroup>
              {errors.email && errors.email.message ? (
                <Text className="text-danger fs-14 fw-bolder mb-1">
                  {errors.email && errors.email.message}
                </Text>
              ) : (
                <Text className="fs-14 mb-1">
                  Email <span className="text-danger"> *</span>
                </Text>
              )}

              <input
                type="text"
                className={
                  errors.email
                    ? "form-control shadow-none error"
                    : "form-control shadow-none"
                }
                placeholder="example@gmail.com"
                {...register("email", {
                  required: "Email is required",
                })}
              />
            </FormGroup>
          </Container.Column>

          {/* Postal Code */}
          <Container.Column className="col-md-6">
            <FormGroup>
              {errors.postal_code && errors.postal_code.message ? (
                <Text className="text-danger fs-14 fw-bolder mb-1">
                  {errors.postal_code && errors.postal_code.message}
                </Text>
              ) : (
                <Text className="fs-14 mb-1">
                  Postal Code <span className="text-danger"> *</span>
                </Text>
              )}

              <input
                type="text"
                className={
                  errors.postal_code
                    ? "form-control shadow-none error"
                    : "form-control shadow-none"
                }
                {...register("postal_code", {
                  required: "Postal Code is required",
                })}
              />
            </FormGroup>
          </Container.Column>

          {/* Zone */}
          <Container.Column className="col-lg-6">
            <FormGroup>
              {errors.zone && errors.zone.message ? (
                <Text className="text-danger fs-14 fw-bolder mb-0">
                  {errors.zone && errors.zone.message}
                </Text>
              ) : (
                <Text className="fs-14 mb-0">
                  Zone <span className="text-danger">*</span>
                </Text>
              )}

              <SingleSelect
                borderRadius={4}
                placeholder="zone"
                options={zone.options}
                value={(data) => {
                  handleZone(data.value);
                  clearErrors("zone");
                }}
              />
            </FormGroup>
          </Container.Column>

          {/* Address */}
          <Container.Column className="col-md-6">
            <FormGroup className="address-form-group">
              {errors.address && errors.address.message ? (
                <Text className="text-danger fs-14 fw-bolder mb-1">
                  {errors.address && errors.address.message}
                </Text>
              ) : (
                <Text className="text-capitalized fs-14 mb-1">
                  Delivery Address<span className="text-danger"> *</span>
                </Text>
              )}
              <input
                type="text"
                className={
                  errors.address
                    ? "form-control shadow-none error"
                    : "form-control shadow-none"
                }
                placeholder="Enter the address"
                {...register("address", {
                  // onBlur: (e) => setShowAddress(e.target.value),
                  required: "Address is required",
                })}
              />
              {/* {errors.address && errors.address.message ?
                                                    <small className="fs-11 text-danger ps-2"> * This service is not available in this area</small>
                                                    : null} */}
            </FormGroup>
          </Container.Column>
        </Container.Row>
      </Container.Row>

      <Container.Row className="border p-1 m-3">
        {/* Full Name */}
        <Container.Column className="col-md-6">
          <FormGroup>
            {errors.name && errors.name.message ? (
              <Text className="text-danger fs-14 fw-bolder mb-1">
                {errors.name && errors.name.message}
              </Text>
            ) : (
              <Text className="text-capitalized fs-14 fw-bolder mb-1">
                Payment Method <span className="text-danger"> *</span>
              </Text>
            )}
            <select
              className="form-control"
              required
              {...register("paymentMethod", {
                required: "Payment Method is required",
              })}
              onChange={(event) => {
                let value = event.target.value;
                setValue("paymentMethod", value);
                // setProductType(value);
              }}
              // defaultValue={productType}
            >
              <option value="cash">Pay With Cash</option>
              {/* <option value="bkash">Pay With Bkash</option> */}
              {/* <option value="card">Pay With Card</option> */}
            </select>
          </FormGroup>
          <Text className="fs-14">Have a coupon?</Text>
          <div className="d-flex justify-content-between">
            <input
              type=""
              placeholder="Coupon"
              className="form-control shadow-none"
              value={coupon}
              onChange={(event) => setCoupon(event.target.value)}
            />
            <button
              className="btn btn-primary shadow-none ms-2"
              onClick={async () => {
                const response = await Requests.Coupon.FindCoupon({
                  coupon_code: coupon,
                });
                if (response.data.message == "Fetched coupon") {
                  if (response.data.body.status !== "apporved") {
                    Toastify.Error("This coupon is not active now.");
                  } else {
                    // for (const key of Object.keys(getDatabaseCart())) {
                    //   const items = JSON.parse(key);
                    //   if (
                    //     response.data.body.products.some(
                    //       (el) => el === items._id
                    //     )
                    //   ) {
                    //     if (couponApplied) {
                    //       setPrice(
                    //         price +
                    //           couponPrice -
                    //           response.data.body.coupon_amount
                    //       );
                    //       setCouponPrice(response.data.body.coupon_amount);
                    //     } else {
                    //       setCouponApplied(true);
                    //       setCouponPrice(response.data.body.coupon_amount);
                    //       setPrice(price - response.data.body.coupon_amount);
                    //     }
                    //     break;
                    //   }
                    // }
                  }
                } else {
                  Toastify.Error("This coupon does not exist.");
                }
              }}
            >
              Apply
            </button>
          </div>
        </Container.Column>
      </Container.Row>

      {/* Submit button */}
      <div className="text-center mt-5">
        <PrimaryButton type="submit" className="px-4" disabled={props.loading}>
          <Text className="mb-0 fw-bolder">
            {props.loading ? "Submitting ..." : "Create Order"}
          </Text>
        </PrimaryButton>
      </div>
    </form>
  );
};
