import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "../button";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { Text } from "../text";
import { MultiSelect } from "../select";
import { Requests } from "../../utils/http";
import { CustomError } from "../../utils/error";
import { Toastify } from "../toastify";

export const ShippingChargeForm = (props) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [zoneInsideDhaka, setZoneInsideDhaka] = useState({
    values: [],
    options: [],
  });
  const [zoneOutsideDhaka, setZoneOutsideDhaka] = useState({
    values: [],
    options: [],
  });

  // fetch zones data
  const fetchZonesData = useCallback(async (page) => {
    try {
      const items = [];
      const response = await Requests.ShippingCharge.AllZones(page);
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
              label: element,
              value: element,
            });
          }
        }
      }
      setZoneInsideDhaka((exData) => ({ ...exData, options: items }));
      setZoneOutsideDhaka((exData) => ({ ...exData, options: items }));
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
    fetchZonesData(1);
  }, [fetchZonesData]);

  // Handle inside dhaka zones
  const handleZoneInsideDhaka = (data) => {
    setZoneInsideDhaka((exData) => ({ ...exData, values: data }));
    clearErrors("zoneInsideDhaka");
  };

  // Handle outside dhaka zones
  const handleZoneOutsideDhaka = (data) => {
    setZoneOutsideDhaka((exData) => ({ ...exData, values: data }));
    clearErrors("zoneOutsideDhaka");
  };

  // Shipping charge Form Submit
  const onSubmit = async (data) => {
    let is_error = false;
    if (!zoneInsideDhaka.values.length > 0) {
      setError("zoneInsideDhaka", {
        type: "manual",
        message: "Inside dhaka is required",
      });
      is_error = true;
    }

    if (!zoneOutsideDhaka.values.length > 0) {
      setError("zoneOutsideDhaka", {
        type: "manual",
        message: "Outside dhaka is required",
      });
      is_error = true;
    }

    if (is_error) return;

    const formData = {
      ...data,
      zoneInsideDhaka: JSON.stringify(zoneInsideDhaka.values),
      zoneOutsideDhaka: JSON.stringify(zoneOutsideDhaka.values),
    };

    props.submit(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Row>
        {/* Inside dhaka zone */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.zoneInsideDhaka && errors.zoneInsideDhaka.message ? (
              <Text className="fs-13 mb-0 text-danger">
                {errors.zoneInsideDhaka && errors.zoneInsideDhaka.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Select inside dhaka zones <span className="text-danger">*</span>
              </Text>
            )}

            <MultiSelect
              placeholder="inside dhaka zones"
              options={zoneInsideDhaka.options}
              values={(data) =>
                handleZoneInsideDhaka([
                  data.map((item) => {
                    return item.value;
                  }),
                ])
              }
            />
          </FormGroup>
        </Container.Column>

        {/* Inside dhaka charge */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.zoneInsideDhakaCharge &&
            errors.zoneInsideDhakaCharge.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.zoneInsideDhakaCharge &&
                  errors.zoneInsideDhakaCharge.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Inside dhaka charge <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="number"
              min={0}
              className={
                errors.zoneInsideDhakaCharge
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter inside dhaka charge"
              {...register("zoneInsideDhakaCharge", {
                required: "Inside dhaka charge is required",
              })}
            />
          </FormGroup>
        </Container.Column>

        {/* Outside dhaka zone */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.zoneOutsideDhaka && errors.zoneOutsideDhaka.message ? (
              <Text className="fs-13 mb-0 text-danger">
                {errors.zoneOutsideDhaka && errors.zoneOutsideDhaka.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Select outside dhaka zones{" "}
                <span className="text-danger">*</span>
              </Text>
            )}

            <MultiSelect
              placeholder="outside dhaka zones"
              options={zoneOutsideDhaka.options}
              values={(data) =>
                handleZoneOutsideDhaka([
                  data.map((item) => {
                    return item.value;
                  }),
                ])
              }
            />
          </FormGroup>
        </Container.Column>

        {/* Outside dhaka charge */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.zoneOutsideDhakaCharge &&
            errors.zoneOutsideDhakaCharge.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.zoneOutsideDhakaCharge &&
                  errors.zoneOutsideDhakaCharge.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Outside dhaka charge <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="number"
              min={0}
              className={
                errors.zoneOutsideDhakaCharge
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter taking measurement cost"
              // defaultValue={cftData ? cftData.zoneOutsideDhakaCharge : null}
              {...register("zoneOutsideDhakaCharge", {
                required: "Outside dhaka charge is required",
              })}
            />
          </FormGroup>
        </Container.Column>

        {/* Origin */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.origin && errors.origin.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.origin && errors.origin.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                {" "}
                Origin <span className="text-danger">*</span>
              </Text>
            )}

            <select
              className={
                errors.origin
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              {...register("origin", { required: "Origin is required" })}
            >
              <option value="">Select origin</option>
              <option value="cft">CFT</option>
              <option value="ecom">Ecommerce</option>
            </select>
          </FormGroup>
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
            {props.loading
              ? props.update
                ? "Updating ..."
                : "Submitting ..."
              : props.update
              ? "Update"
              : "Submit"}
          </Text>
        </PrimaryButton>
      </div>
    </form>
  );
};
