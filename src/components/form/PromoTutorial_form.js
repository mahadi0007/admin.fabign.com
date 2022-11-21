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

export const PromoTutorialForm = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { id } = useParams();

  const fetchSinglePromoTutorial = useCallback(async (id) => {
    try {
      const response = await Requests.PromoTutorial.Show(id);
      setValue("url", response.data.body.url);
    } catch (error) {
      if (error) {
        Toastify.Error(error.message);
      }
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchSinglePromoTutorial(id);
    }
  }, [fetchSinglePromoTutorial, id]);

  // Bulk Product Submit
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("url", data.url);
    props.submit(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Row>
        <Container.Column className="col-lg-6">
          {/* Product Name */}
          <FormGroup>
            {errors.url && errors.url.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.url && errors.url.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                URL <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="text"
              className={
                errors.url
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter URL"
              {...register("url", {
                required: "URL is required",
              })}
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
              {props.loading ? "Submitting ..." : "Submit"}
            </Text>
          </PrimaryButton>
        </div>
      )}
    </form>
  );
};
