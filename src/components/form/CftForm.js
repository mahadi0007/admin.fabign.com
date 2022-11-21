import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "../button";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { Text } from "../text";
import { MultiDatePicker } from "../multiDatePicker/Index";

export const CftForm = (props) => {
  const {
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [dates, setDates] = useState(
    props.cftData &&
      props.cftData.inActiveDates &&
      props.cftData.inActiveDates.length > 0
      ? [
          ...props.cftData.inActiveDates.map((item) => {
            return item;
          }),
        ]
      : []
  );

  // Call for tailor Form Submit
  const onSubmit = async (data) => {
    if (!dates.length > 0) {
      setError("dates", {
        type: "manual",
        message: "Dates is required",
      });
    }

    const formData = {
      existingFitCost: 1,
      measureMentTakingCost: 1,
      isActive: true,
      inActiveDates: dates,
    };
    if (dates.length > 0) {
      props.submit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Row>
        {/* Dates */}
        <Container.Column>
          <FormGroup>
            {errors.dates && errors.dates.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.dates && errors.dates.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Dates <span className="text-danger">*</span>
              </Text>
            )}
            <MultiDatePicker
              defaultValue={dates}
              selected={(e) => {
                setDates(e);
                clearErrors("dates");
              }}
              disabled={props.view && true}
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
      )}
    </form>
  );
};
