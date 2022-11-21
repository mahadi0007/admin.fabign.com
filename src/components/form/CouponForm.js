import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "../button";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { Text } from "../text";
import { CreatableSelect } from "../select";
import { Requests } from "../../utils/http";
import { useParams } from "react-router-dom";
import { Toastify } from "../../components/toastify";
import { DatePicker } from "../datePicker/Index";
import moment from "moment";

export const CouponForm = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [defaultProduct, setDefaultProduct] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const fetchSingleCoupon = useCallback(async (id) => {
    try {
      const response = await Requests.Coupon.Show(id);
      setValue("coupon_code", response.data.body.coupon_code);
      setValue("coupon_amount", response.data.body.coupon_amount);
      setDefaultProduct(
        response.data.body.products.map((item) => {
          return {
            label: item.name,
            value: item._id,
          };
        })
      );
      setValue(
        "products",
        response.data.body.products.map((item) => {
          return item._id;
        })
      );
      setValue("startDate", response.data.body.startDate);
      setValue("endDate", response.data.body.endDate);
      setStartDate(response.data.body.startDate);
      setEndDate(response.data.body.endDate);
    } catch (error) {
      if (error) {
        Toastify.Error(error.message);
      }
    }
  }, []);

  useEffect(() => {
    if (id && (props.view || props.update)) {
      fetchSingleCoupon(id);
    }
  }, [fetchSingleCoupon, id, props.view, props.update]);

  // Bulk Product Submit
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("coupon_code", data.coupon_code);
    formData.append("coupon_amount", data.coupon_amount);
    for (let i = 0; i < data.products.length; i++) {
      formData.append("products", data.products[i]);
    }
    formData.append("startDate", moment(data.startDate).format("MM/DD/YYYY"));
    formData.append("endDate", moment(data.endDate).format("MM/DD/YYYY"));
    props.submit(formData);
  };

  // fetch products
  const fetchProduct = useCallback(async () => {
    const response = await Requests.EProduct.Index();
    if (response && response.status === 200) {
      const data = response.data.body.product.map((item) => {
        return {
          label: item.name,
          value: item._id,
        };
      });
      setProducts(data);
    }
  }, []);

  // fetch data
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Row>
        <Container.Column className="col-lg-6">
          {/* Coupon Code */}
          <FormGroup>
            {errors.coupon_code && errors.coupon_code.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.coupon_code && errors.coupon_code.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Coupon Code <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="text"
              className={
                errors.coupon_code
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter Coupon code"
              {...register("coupon_code", {
                required: "Coupon Code is required",
              })}
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>
        <Container.Column className="col-lg-6">
          {/* Coupon Amount */}
          <FormGroup>
            {errors.coupon_amount && errors.coupon_amount.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.coupon_amount && errors.coupon_amount.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Coupon Amount <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="number"
              className={
                errors.coupon_amount
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter Coupon amount"
              {...register("coupon_amount", {
                required: "Coupon Amount is required",
              })}
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>
        {/* Fabric */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.products && errors.products.message ? (
              <Text className="text-danger fs-13 mb-1">
                {errors.products && errors.products.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">Products</Text>
            )}
            {(props.view || props.update) && defaultProduct.length > 0 && (
              <CreatableSelect
                placeholder="products"
                options={products}
                deafult={defaultProduct}
                value={(event) => {
                  const val = [];
                  event.map((item) => {
                    val.push(item.value);
                    return val;
                  });
                  setValue("products", val);
                }}
                isDisabled={props.view && true}
              />
            )}
            {!(props.view || props.update) && (
              <CreatableSelect
                placeholder="products"
                options={products}
                value={(event) => {
                  const val = [];
                  event.map((item) => {
                    val.push(item.value);
                    return val;
                  });
                  setValue("products", val);
                }}
              />
            )}
          </FormGroup>
        </Container.Column>
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.startDate && errors.startDate.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.startDate && errors.startDate.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Start Date <span className="text-danger">*</span>
              </Text>
            )}
            <DatePicker
              id="startDate"
              className="rounded"
              selected={(data) => {
                setStartDate(data);
                setValue("startDate", data);
              }}
              deafultValue={startDate}
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.endDate && errors.endDate.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.endDate && errors.endDate.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                End Date <span className="text-danger">*</span>
              </Text>
            )}
            <DatePicker
              id="endDate"
              className="rounded"
              selected={(data) => {
                setEndDate(data);
                setValue("endDate", data);
              }}
              deafultValue={endDate}
              readOnly={props.view && true}
            />
          </FormGroup>
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
