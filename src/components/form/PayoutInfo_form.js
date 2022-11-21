import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "../button";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { Text } from "../text";
import { Requests } from "../../utils/http";
import { useParams } from "react-router-dom";
import { Toastify } from "../../components/toastify";
import { DatePicker } from "../datePicker/Index";
import moment from "moment";

export const PayoutInfoForm = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const [payoutDate, setPayoutDate] = useState(null);

  const fetchSinglePayoutInfo = useCallback(async (id) => {
    try {
      const response = await Requests.PayoutInfo.Show(id);
      setValue("minimumBalance", response.data.body.minimumBalance);
      setPayoutDate(response.data.body.payoutDate);
    } catch (error) {
      if (error) {
        Toastify.Error(error.message);
      }
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchSinglePayoutInfo(id);
    }
  }, [fetchSinglePayoutInfo, id]);

  // Bulk Product Submit
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("minimumBalance", data.minimumBalance);
    formData.append("payoutDate", moment(payoutDate).format("MM/DD/YYYY"));
    props.submit(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Row>
        <Container.Column className="col-lg-6">
          {/* Product Name */}
          <FormGroup>
            {errors.minimumBalance && errors.minimumBalance.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.minimumBalance && errors.minimumBalance.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Minimum Balance <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="number"
              className={
                errors.minimumBalance
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter Minimum Balance"
              {...register("minimumBalance", {
                required: "Minimum Balance is required",
              })}
              disabled={props.view && true}
            />
          </FormGroup>
        </Container.Column>
        <Container.Column className="col-lg-6">
          {/* Product Name */}
          {payoutDate && (
            <FormGroup>
              <Text className="text-capitalize fs-13 mb-1">Payout Date</Text>
              <DatePicker
                id="payoutDate"
                className="rounded"
                selected={(data) => {
                  setPayoutDate(data);
                }}
                deafultValue={payoutDate}
                readOnly={props.view && true}
              />
            </FormGroup>
          )}
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
