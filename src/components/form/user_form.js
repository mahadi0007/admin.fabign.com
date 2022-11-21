import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Text } from "../text";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { PrimaryButton } from "../button";
import { FileUploader } from "../fileUploader";
import { DatePicker } from "../datePicker/Index";

export const UserForm = (props) => {
  const data = props.data || {};
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [dob, setDob] = useState(null);

  useEffect(() => {
    if (props.data) {
      setDob(props.data.dob);
      setValue("name", props.data.name);
      setValue("email", props.data.email);
      setValue("phone", props.data.phone);
      setValue("gender", props.data.gender);
      setValue("maritalStatus", props.data.maritalStatus);
      setValue("shippingAddress", props.data.shippingAddress);
      setValue("deliveryAddress", props.data.deliveryAddress);
      setValue("city", props.data.city);
      setValue("country", props.data.country);
      setValue("postCode", props.data.postCode);
      setValue("postOffice", props.data.postOffice);
      setValue("upazila", props.data.upazila);
      setValue("image", props.data.image);
    }
  }, [props.data]);

  // data submit
  const onSubmit = async (data) => {
    const formData = new FormData();

    if (!data.image) {
      setError("image", {
        type: "manual",
        message: "Image is required",
      });
    }

    if (data.image) {
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("gender", data.gender);
      formData.append("maritalStatus", data.maritalStatus);
      formData.append("dob", dob);
      formData.append("shippingAddress", data.shippingAddress);
      formData.append("deliveryAddress", data.deliveryAddress);
      formData.append("city", data.city);
      formData.append("country", data.country);
      formData.append("postCode", data.postCode);
      formData.append("postOffice", data.postOffice);
      formData.append("upazila", data.upazila);
      formData.append("password", data.password);
      formData.append("image", data.image);

      props.submit(formData);
    }
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
              defaultValue={data.name || null}
              {...register("name", { required: "Name is required" })}
              disabled={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* Email */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.email && errors.email.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.email && errors.email.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Email <span className="text-danger">*</span>
              </Text>
            )}

            <input
              type="text"
              className={
                errors.email
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter email"
              defaultValue={data.email || null}
              {...register("email", { required: "Email is required" })}
              disabled={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* Phone */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.phone && errors.phone.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.phone && errors.phone.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Phone <span className="text-danger">*</span>
              </Text>
            )}

            <input
              type="text"
              className={
                errors.phone
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter phone"
              defaultValue={data.phone || null}
              {...register("phone", { required: "Phone is required" })}
              disabled={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* Gender */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.gender && errors.gender.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.gender && errors.gender.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0"> Gender </Text>
            )}

            <select
              className={
                errors.gender
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              {...register("gender")}
              disabled={props.view && true}
            >
              <option value="Male" selected={data && data.gender === "Male"}>
                Male
              </option>
              <option
                value="Female"
                selected={data && data.gender === "Female"}
              >
                Female
              </option>
              <option value="Other" selected={data && data.gender === "Other"}>
                Other
              </option>
            </select>
          </FormGroup>
        </Container.Column>

        {/* Martial Status */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.maritalStatus && errors.maritalStatus.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.maritalStatus && errors.maritalStatus.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0"> Martial Status </Text>
            )}

            <select
              className={
                errors.maritalStatus
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              {...register("maritalStatus")}
              disabled={props.view && true}
            >
              <option
                value="Single"
                selected={data && data.maritalStatus === "Single"}
              >
                Single
              </option>
              <option
                value="Married"
                selected={data && data.maritalStatus === "Married"}
              >
                Married
              </option>
              <option
                value="Separated"
                selected={data && data.maritalStatus === "Separated"}
              >
                Separated
              </option>
              <option
                value="Divorced"
                selected={data && data.maritalStatus === "Divorced"}
              >
                Divorced
              </option>
              <option
                value="Widowed"
                selected={data && data.maritalStatus === "Widowed"}
              >
                Widowed
              </option>
            </select>
          </FormGroup>
        </Container.Column>

        {/* Date of birth date picker */}
        <Container.Column className="col-lg-6">
          <FormGroup className="mb-0">
            <Text className="text-capitalize fs-13 mb-1">Date of Birth</Text>
            <DatePicker
              id="dob"
              className="rounded"
              selected={(data) => {
                console.log(data);
                setDob(data);
              }}
              deafultValue={dob}
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* Shipping address */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.shippingAddress && errors.shippingAddress.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.shippingAddress && errors.shippingAddress.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">Shipping address</Text>
            )}

            <input
              type="text"
              className={
                errors.shippingAddress
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter shipping address"
              defaultValue={data.shippingAddress && data.shippingAddress}
              disabled={props.view && true}
              {...register("shippingAddress")}
              // {...register("shippingAddress", {
              //   required: "Shipping address is required",
              // })}
            />
          </FormGroup>
        </Container.Column>

        {/* Delivery address */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.deliveryAddress && errors.deliveryAddress.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.deliveryAddress && errors.deliveryAddress.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">Delivery address</Text>
            )}

            <input
              type="text"
              className={
                errors.permanent_address
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter delivery address"
              defaultValue={data.deliveryAddress && data.deliveryAddress}
              disabled={props.view && true}
              {...register("deliveryAddress")}
              // {...register("deliveryAddress", {
              //   required: "Delivery address is required",
              // })}
            />
          </FormGroup>
        </Container.Column>

        {/* City */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.city && errors.city.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.city && errors.city.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">City</Text>
            )}

            <input
              type="text"
              className={
                errors.city
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter city"
              defaultValue={data.city && data.city}
              disabled={props.view && true}
              {...register("city")}
              // {...register("city", {
              //   required: "City is required",
              // })}
            />
          </FormGroup>
        </Container.Column>

        {/* Country */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.country && errors.country.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.country && errors.country.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">Country</Text>
            )}

            <input
              type="text"
              className={
                errors.city
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter country"
              defaultValue={data.country && data.country}
              disabled={props.view && true}
              {...register("country")}
              // {...register("country", {
              //   required: "Country is required",
              // })}
            />
          </FormGroup>
        </Container.Column>

        {/* Post Code */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.postCode && errors.postCode.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.postCode && errors.postCode.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">Post Code</Text>
            )}

            <input
              type="number"
              className={
                errors.postCode
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter post code"
              defaultValue={data.postCode && data.postCode}
              disabled={props.view && true}
              {...register("postCode")}
              // {...register("postCode", {
              //   required: "Post Code is required",
              // })}
            />
          </FormGroup>
        </Container.Column>

        {/* Post Office */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.postOffice && errors.postOffice.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.postOffice && errors.postOffice.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">Post Office</Text>
            )}

            <input
              type="text"
              className={
                errors.postOffice
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter post office"
              defaultValue={data.postOffice && data.postOffice}
              disabled={props.view && true}
              {...register("postOffice")}
              // {...register("postOffice", {
              //   required: "Post Office is required",
              // })}
            />
          </FormGroup>
        </Container.Column>

        {/* Upazila */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.upazila && errors.upazila.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.upazila && errors.upazila.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">Upazila</Text>
            )}

            <input
              type="text"
              className={
                errors.upazila
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter upazila"
              defaultValue={data.upazila && data.upazila}
              disabled={props.view && true}
              {...register("upazila")}
              // {...register("upazila", {
              //   required: "Upazila is required",
              // })}
            />
          </FormGroup>
        </Container.Column>

        {/* Password */}
        {!props.view && !props.update ? (
          <Container.Column className="col-lg-6">
            <FormGroup>
              {errors.password && errors.password.message ? (
                <Text className="text-danger fs-13 mb-0">
                  {errors.password && errors.password.message}
                </Text>
              ) : (
                <Text className="fs-13 mb-0">
                  Password <span className="text-danger">*</span>
                </Text>
              )}

              <input
                type="password"
                className={
                  errors.password
                    ? "form-control shadow-none error"
                    : "form-control shadow-none"
                }
                placeholder="Enter password"
                defaultValue={data ? data.password : ""}
                {...register("password", {
                  required: "Password is required",
                })}
              />
            </FormGroup>
          </Container.Column>
        ) : null}

        {props.update ? (
          <Container.Column className="col-lg-6">
            <FormGroup>
              {errors.password && errors.password.message ? (
                <Text className="text-danger fs-13 mb-0">
                  {errors.password && errors.password.message}
                </Text>
              ) : (
                <Text className="fs-13 mb-0">Password</Text>
              )}

              <input
                type="password"
                className={
                  errors.password
                    ? "form-control shadow-none error"
                    : "form-control shadow-none"
                }
                placeholder="Enter password"
                defaultValue={data ? data.password : ""}
                {...register("password")}
              />
            </FormGroup>
          </Container.Column>
        ) : null}

        {/* Image */}
        <Container.Column className="col-lg-6">
          <FileUploader
            imageURL={data && data.image ? data.image : null}
            error={errors.image ? errors.image.message : ""}
            width={90}
            height={90}
            limit={100}
            title="User image"
            dataHandeller={(data) => {
              if (data.error) {
                setError("image", {
                  type: "manual",
                  message: data.error,
                });
              }

              if (data.image) {
                clearErrors("image");
                setValue("image", data.image);
              }
            }}
            dataClear={() => {
              setValue("image", null);
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
