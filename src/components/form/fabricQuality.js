import { useForm } from "react-hook-form";
import { Container } from "../container";
import { PrimaryButton } from "../button";
import { FormGroup } from "../formGroup/index";
import { Text } from "../text";

export const FabricQualityForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    props.handleCreate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Row>
        <Container.Column>
          <FormGroup>
            {errors.quality && errors.quality.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.quality && errors.quality.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Quality Name <span className="text-danger">*</span>
              </Text>
            )}

            <input
              type="text"
              className={
                errors.quality
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter name"
              defaultValue={props.quality || null}
              {...register("quality", { required: "Quality is required" })}
            />
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
            {props.loading ? "Submitting ..." : "Submit"}
          </Text>
        </PrimaryButton>
      </div>
    </form>
  );
};
