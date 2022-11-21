import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MultiFileUploader } from "../fileUploader";
import { PrimaryButton } from "../button";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { Text } from "../text";
import { Requests } from "../../utils/http";
import { useParams } from "react-router-dom";
import { Toastify } from "../../components/toastify";

export const RatingForm = (props) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const [ratingImage, setRatingImage] = useState([]);

  const fetchSingleRating = useCallback(async (id) => {
    try {
      if (props.eRating) {
        const response = await Requests.Rating.Show(id);
        console.log("response");
        console.log(response);
        setValue("review", response.data.body.review);
        setValue("name", response.data.body.user.name);
        setValue("rating", response.data.body.rating);
        setRatingImage(response.data.body.images);
      } else {
        const response = await Requests.CampaignRating.Show(id);
        console.log("response");
        console.log(response);
        setValue("review", response.data.body.review);
        setValue("name", response.data.body.user.name);
        setValue("rating", response.data.body.rating);
      }
    } catch (error) {
      if (error) {
        Toastify.Error(error.message);
      }
    }
  }, []);

  useEffect(() => {
    if (id && (props.view || props.update)) {
      fetchSingleRating(id);
    }
  }, [fetchSingleRating, id, props.view, props.update]);

  return (
    <form>
      <Container.Row>
        <Container.Column className="col-lg-6">
          {/* Product Name */}
          <FormGroup>
            {errors.review && errors.review.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.review && errors.review.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">Review</Text>
            )}
            <input
              type="text"
              className={
                errors.review
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter Review"
              {...register("review", {
                required: "Review is required",
              })}
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.name && errors.name.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.name && errors.name.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">Name</Text>
            )}
            <input
              type="text"
              className={
                errors.name
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter Name"
              {...register("name", {
                required: "Name is required",
              })}
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>
        {/* Fabric */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.rating && errors.rating.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.rating && errors.rating.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">Rating</Text>
            )}
            <input
              type="text"
              className={
                errors.rating
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter Rating"
              {...register("rating", {
                required: "Rating is required",
              })}
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>
      </Container.Row>
      {ratingImage.length > 0 && (
        <Container.Row>
          <Container.Column className="col-md-12">
            <MultiFileUploader
              images={ratingImage}
              width={80}
              height={60}
              removable={false}
              title={"Photo"}
              rating={true}
            />
          </Container.Column>
        </Container.Row>
      )}

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
