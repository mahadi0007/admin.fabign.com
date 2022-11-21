import React from 'react'
import { useForm } from 'react-hook-form'
import { PrimaryButton } from '../button'
import { FormGroup } from '../formGroup'
import { Container } from '../container'
import { Text } from '../text'

export const SizeForm = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const sizeData = props.sizeData ? props.sizeData : {}

  // Size form submit
  const onSubmit = async data => {
      props.submit(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Row>

        {/* Title */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.title && errors.title.message ?
              <Text className="text-danger fs-13 mb-0">{errors.title && errors.title.message}</Text>
              : <Text className="fs-13 mb-0">Size title <span className="text-danger">*</span></Text>}
            <input
              type="text"
              className={errors.title ? "form-control shadow-none error" : "form-control shadow-none"}
              placeholder="Enter title"
              defaultValue={sizeData ? sizeData.title : null}
              {...register("title", { required: "Title is required" })}
            />
          </FormGroup>
        </Container.Column>

        {/* Neck */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.neck && errors.neck.message ?
              <Text className="text-danger fs-13 mb-0">{errors.neck && errors.neck.message}</Text>
              : <Text className="fs-13 mb-0"> Neck <span className="text-danger">*</span></Text>}
            <input
              type="number"
              min={0}
              step={.01}
              className={errors.neck ? "form-control shadow-none error" : "form-control shadow-none"}
              placeholder="Enter neck"
              defaultValue={sizeData ? sizeData.neck : null}
              {...register("neck", { required: "Neck is required" })}
            />
          </FormGroup>
        </Container.Column>

        {/* Chest */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.chest && errors.chest.message ?
              <Text className="text-danger fs-13 mb-0">{errors.chest && errors.chest.message}</Text>
              : <Text className="fs-13 mb-0"> Chest <span className="text-danger">*</span></Text>}
            <input
              type="number"
              min={0}
              step={.01}
              className={errors.chest ? "form-control shadow-none error" : "form-control shadow-none"}
              placeholder="Enter chest"
              defaultValue={sizeData ? sizeData.chest : null}
              {...register("chest", { required: "Chest is required" })}
            />
          </FormGroup>
        </Container.Column>

        {/* Waist */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.waist && errors.waist.message ?
              <Text className="text-danger fs-13 mb-0">{errors.waist && errors.waist.message}</Text>
              : <Text className="fs-13 mb-0"> Waist <span className="text-danger">*</span></Text>}
            <input
              type="number"
              min={0}
              step={.01}
              className={errors.waist ? "form-control shadow-none error" : "form-control shadow-none"}
              placeholder="Enter waist"
              defaultValue={sizeData ? sizeData.waist : null}
              {...register("waist", { required: "Waist is required" })}
            />
          </FormGroup>
        </Container.Column>

        {/* Hip */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.hip && errors.hip.message ?
              <Text className="text-danger fs-13 mb-0">{errors.hip && errors.hip.message}</Text>
              : <Text className="fs-13 mb-0"> Hip <span className="text-danger">*</span></Text>}
            <input
              type="number"
              min={0}
              step={.01}
              className={errors.hip ? "form-control shadow-none error" : "form-control shadow-none"}
              placeholder="Enter hip"
              defaultValue={sizeData ? sizeData.hip : null}
              {...register("hip", { required: "Hip is required" })}
            />
          </FormGroup>
        </Container.Column>

        {/* Shirt length */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.shirt_length && errors.shirt_length.message ?
              <Text className="text-danger fs-13 mb-0">{errors.shirt_length && errors.shirt_length.message}</Text>
              : <Text className="fs-13 mb-0"> Shirt width <span className="text-danger">*</span></Text>}
            <input
              type="number"
              min={0}
              step={.01}
              className={errors.shirt_length ? "form-control shadow-none error" : "form-control shadow-none"}
              placeholder="Enter shirt width"
              defaultValue={sizeData ? sizeData.shirt_length : null}
              {...register("shirt_length", { required: "Shirt width is required" })}
            />
          </FormGroup>
        </Container.Column>

        {/* Shoulder width */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.shoulder_width && errors.shoulder_width.message ?
              <Text className="text-danger fs-13 mb-0">{errors.shoulder_width && errors.shoulder_width.message}</Text>
              : <Text className="fs-13 mb-0"> Shoulder width <span className="text-danger">*</span></Text>}
            <input
              type="number"
              min={0}
              step={.01}
              className={errors.shoulder_width ? "form-control shadow-none error" : "form-control shadow-none"}
              placeholder="Enter shoulder width"
              defaultValue={sizeData ? sizeData.shoulder_width : null}
              {...register("shoulder_width", { required: "Shoulder width is required" })}
            />
          </FormGroup>
        </Container.Column>

        {/* Arm length */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.arm_length && errors.arm_length.message ?
              <Text className="text-danger fs-13 mb-0">{errors.arm_length && errors.arm_length.message}</Text>
              : <Text className="fs-13 mb-0"> Arm length <span className="text-danger">*</span></Text>}
            <input
              type="number"
              min={0}
              step={.01}
              className={errors.arm_length ? "form-control shadow-none error" : "form-control shadow-none"}
              placeholder="Enter arm length"
              defaultValue={sizeData ? sizeData.arm_length : null}
              {...register("arm_length", { required: "Arm length is required" })}
            />
          </FormGroup>
        </Container.Column>

        {/* Sleeve length */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.sleeve_length && errors.sleeve_length.message ?
              <Text className="text-danger fs-13 mb-0">{errors.sleeve_length && errors.sleeve_length.message}</Text>
              : <Text className="fs-13 mb-0"> Sleeve length <span className="text-danger">*</span></Text>}
            <input
              type="number"
              min={0}
              step={.01}
              className={errors.sleeve_length ? "form-control shadow-none error" : "form-control shadow-none"}
              placeholder="Enter sleeve length"
              defaultValue={sizeData ? sizeData.sleeve_length : null}
              {...register("sleeve_length", { required: "Sleeve length is required" })}
            />
          </FormGroup>
        </Container.Column>

        {/* Wrist */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.wrist && errors.wrist.message ?
              <Text className="text-danger fs-13 mb-0">{errors.wrist && errors.wrist.message}</Text>
              : <Text className="fs-13 mb-0"> Wrist <span className="text-danger">*</span></Text>}
            <input
              type="number"
              min={0}
              step={.01}
              className={errors.wrist ? "form-control shadow-none error" : "form-control shadow-none"}
              placeholder="Enter wrist"
              defaultValue={sizeData ? sizeData.wrist : null}
              {...register("wrist", { required: "Wrist is required" })}
            />
          </FormGroup>
        </Container.Column>

        {/* Biceps */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.biceps && errors.biceps.message ?
              <Text className="text-danger fs-13 mb-0">{errors.biceps && errors.biceps.message}</Text>
              : <Text className="fs-13 mb-0"> Biceps <span className="text-danger">*</span></Text>}
            <input
              type="number"
              min={0}
              step={.01}
              className={errors.biceps ? "form-control shadow-none error" : "form-control shadow-none"}
              placeholder="Enter biceps"
              defaultValue={sizeData ? sizeData.biceps : null}
              {...register("biceps", { required: "Biceps is required" })}
            />
          </FormGroup>
        </Container.Column>

        {/* Description */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.description && errors.description.message ?
              <Text className="text-danger fs-13 mb-0">{errors.description && errors.description.message}</Text>
              : <Text className="fs-13 mb-0"> Description </Text>}
            <textarea
              rows={3}
              className={errors.description ? "form-control shadow-none error" : "form-control shadow-none"}
              placeholder="Enter description"
              defaultValue={sizeData ? sizeData.description : null}
              {...register("description")}
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
        ><Text className="fs-14 mb-0">
            {props.loading
              ? props.update
                ? "Updating ..."
                : "Submitting ..."
              : props.update
                ? "Update"
                : "Submit"}
          </Text></PrimaryButton>
      </div>
    </form>
  );
}
