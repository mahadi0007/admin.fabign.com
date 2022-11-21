import React, { useState, forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "../button";
import { FormGroup } from "../formGroup";
import { Container } from "../container";
import { Text } from "../text";
import { Requests } from "../../utils/http";

export const SmsForm = forwardRef((props, ref) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [includeAllCustomer, setIncludeAllCustomer] = useState(false);

  useImperativeHandle(ref, () => ({
    formReset() {
      reset();
      setIncludeAllCustomer(false);
    },
  }));

  // Sms form submit
  const onSubmit = async (data) => {
    const formData = {};
    formData.msg = data.smsContent;
    if (includeAllCustomer) {
      const response = await Requests.User.Index();
      console.log("response");
      console.log(response.data.data);
      const phoneNumbers = response.data.data.map((x) => x.phone);
      console.log(phoneNumbers.join(","));
      formData.to = phoneNumbers.join(",");
    } else {
      formData.to = data.phoneNumbers;
    }
    props.submit(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Row>
        {/* Title */}
        {!includeAllCustomer && (
          <Container.Column className="col-lg-12">
            <FormGroup>
              {errors.phoneNumbers && errors.phoneNumbers.message ? (
                <Text className="text-danger fs-13 mb-0">
                  {errors.phoneNumbers && errors.phoneNumbers.message}
                </Text>
              ) : (
                <Text className="fs-13 mb-0">
                  Enter Phone Numbers <span className="text-danger">*</span>
                </Text>
              )}
              <input
                type="text"
                className={
                  errors.phoneNumbers
                    ? "form-control shadow-none error"
                    : "form-control shadow-none"
                }
                placeholder="Enter phone numbers"
                {...register("phoneNumbers", {
                  required: "Phone number is required",
                })}
              />
            </FormGroup>
          </Container.Column>
        )}

        <Container.Column className="col-lg-12">
          <FormGroup>
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                checked={includeAllCustomer ? true : false}
                onChange={() => {
                  setIncludeAllCustomer(!includeAllCustomer);
                }}
                style={{ cursor: "pointer" }}
                id="includeAllCustomer"
              />
              <label
                className="form-check-label"
                htmlFor="includeAllCustomer"
                style={{ cursor: "pointer" }}
              >
                Include all customers
              </label>
            </div>
          </FormGroup>
        </Container.Column>

        {/* Description */}
        <Container.Column className="col-lg-12">
          <FormGroup>
            {errors.smsContent && errors.smsContent.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.smsContent && errors.smsContent.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Enter SMS Content <span className="text-danger">*</span>
              </Text>
            )}
            <textarea
              rows={5}
              className={
                errors.smsContent
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter sms content"
              {...register("smsContent")}
            />
          </FormGroup>
        </Container.Column>
      </Container.Row>

      {/* Submit button */}
      <div className="text-end">
        <PrimaryButton
          type="submit"
          className="px-4 fw-bolder"
          disabled={props.loading}
        >
          <Text className="fs-14 mb-0">
            {props.loading
              ? props.update
                ? "Updating ..."
                : "Sendiog SMS ..."
              : props.update
              ? "Update"
              : "Send SMS"}
          </Text>
        </PrimaryButton>
      </div>
    </form>
  );
});
