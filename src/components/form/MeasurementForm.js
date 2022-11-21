import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { PrimaryButton } from "../button";
import { FormGroup } from "../formGroup";
import { Container } from "../container";
import { Text } from "../text";
import { Requests } from "../../utils/http";
import { SingleSelect } from "../select";
import { FileUploader } from "../fileUploader";

export const MeasurementForm = (props) => {
  const { id } = useParams();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  // const sizeData = props.sizeData ? props.sizeData : {};
  const [sizeData, setSizeData] = useState();
  const [data, setData] = useState([]);
  const [defaultCategory, setDefaultCategory] = useState();

  const fetchData = useCallback(async () => {
    const response = await Requests.Category.Index(0, 10);
    if (response.data.data && response.status === 200) {
      const categories = response.data.data.map((item) => {
        return { label: item.title, value: item._id };
      });
      setData(categories);
    }
    if (props.view) {
      const response = await Requests.Measurement.Show(id);
      if (response?.data?.body && response.status === 200) {
        setSizeData(response.data.body);
      }
      setDefaultCategory({
        label: response.data.body.category.title,
        value: response.data.body.category._id,
      });
    }
  }, []);

  // fetch data
  useEffect(() => {
    fetchData();
  }, [fetchData, props.view]);

  // Size form submit
  const onSubmit = async (data) => {
    if (!data.measurementIcon) {
      setError("measurementIcon", {
        type: "manual",
        message: "Measurement Icon image is required",
      });
    }

    const formData = new FormData();
    formData.append("measurement_name", data.measurement_name);
    formData.append("measurementIcon", data.measurementIcon);
    formData.append("category", data.category);
    formData.append("measurementVideo", data.measurementVideo);
    formData.append("variable_name", data.variable_name);
    formData.append("size_xs", data.size_xs);
    formData.append("size_s", data.size_s);
    formData.append("size_m", data.size_m);
    formData.append("size_l", data.size_l);
    formData.append("size_xl", data.size_xl);
    formData.append("size_xxl", data.size_xxl);

    props.submit(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Row>
        {/* Category */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            <Text className="fs-13 mb-0">{"Category"}</Text>
            {props.view && sizeData && defaultCategory && (
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <SingleSelect
                    error={errors.category}
                    placeholder="a category"
                    deafult={defaultCategory}
                    options={data}
                    value={(event) =>
                      setValue("category", event.value, {
                        shouldValidate: true,
                      })
                    }
                    isDisabled={props.view && true}
                  />
                )}
              />
            )}
            {!props.view && (
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <SingleSelect
                    error={errors.category}
                    placeholder="a category"
                    options={data}
                    value={(event) =>
                      setValue("category", event.value, {
                        shouldValidate: true,
                      })
                    }
                  />
                )}
              />
            )}
          </FormGroup>
        </Container.Column>

        {/* name */}
        <Container.Column className="col-lg-3">
          <FormGroup>
            {errors.measurement_name && errors.measurement_name.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.measurement_name && errors.measurement_name.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                {" "}
                Measurement name <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="text"
              className={
                errors.measurement_name
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter measurement name"
              defaultValue={sizeData ? sizeData.measurement_name : null}
              {...register("measurement_name", {
                required: "Name is required",
              })}
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>
        {/* variable name */}
        <Container.Column className="col-lg-3">
          <FormGroup>
            {errors.variable_name && errors.variable_name.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.variable_name && errors.variable_name.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                {" "}
                Variable name <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="text"
              className={
                errors.variable_name
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Must be like snake case(variable_name)"
              defaultValue={sizeData ? sizeData.variable_name : null}
              {...register("variable_name", {
                required: "Variable name is required",
              })}
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* title image */}
        <Container.Column className="col-lg-6">
          <FileUploader
            imageURL={
              sizeData && sizeData.measurementIcon
                ? sizeData.measurementIcon
                : null
            }
            error={errors.title_image ? errors.title_image.message : ""}
            width={90}
            height={90}
            limit={100}
            title="Measurement Icon"
            dataHandeller={(data) => {
              if (data.error) {
                setError("measurementIcon", {
                  type: "manual",
                  message: data.error,
                });
              }

              if (data.image) {
                clearErrors("measurementIcon");
                setValue("measurementIcon", data.image);
              }
            }}
            dataClear={() => {
              setValue("measurementIcon", null);
            }}
            input={!props.view && true}
            removable={!props.view && true}
          />
        </Container.Column>
        {/* Video */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.measurementVideo && errors.measurementVideo.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.measurementVideo && errors.measurementVideo.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                {" "}
                Video Link <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="text"
              className={
                errors.measurementVideo
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter Video Link"
              defaultValue={sizeData ? sizeData.measurementVideo : null}
              {...register("measurementVideo", {
                required: "Video Link is required",
              })}
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* Size XS */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.size_xs && errors.size_xs.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.size_xs && errors.size_xs.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                {" "}
                Size for XS <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="text"
              className={
                errors.size_xs
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter Size for XS"
              defaultValue={sizeData ? sizeData.size_xs : null}
              {...register("size_xs", {
                required: "Size for XS is required",
              })}
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* Size S */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.size_s && errors.size_s.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.size_s && errors.size_s.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                {" "}
                Size for S <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="text"
              className={
                errors.size_s
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter Size for S"
              defaultValue={sizeData ? sizeData.size_s : null}
              {...register("size_s", { required: "Size for S is required" })}
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* Size M */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.size_m && errors.size_m.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.size_m && errors.size_m.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                {" "}
                Size for M <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="text"
              className={
                errors.size_m
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter Size for M"
              defaultValue={sizeData ? sizeData.size_m : null}
              {...register("size_m", { required: "Size for M is required" })}
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* Size L */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.size_l && errors.size_l.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.size_l && errors.size_l.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                {" "}
                Size for L <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="text"
              className={
                errors.size_l
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter Size for L"
              defaultValue={sizeData ? sizeData.size_l : null}
              {...register("size_l", { required: "Size for L is required" })}
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* Size XL */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.size_xl && errors.size_xl.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.size_xl && errors.size_xl.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                {" "}
                Size for XL <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="text"
              className={
                errors.size_xl
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter Size for XL"
              defaultValue={sizeData ? sizeData.size_xl : null}
              {...register("size_xl", {
                required: "Size for XL is required",
              })}
              readOnly={props.view && true}
            />
          </FormGroup>
        </Container.Column>

        {/* Size XXL */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.size_xll && errors.size_xll.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.size_xll && errors.size_xll.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                {" "}
                Size for XXL <span className="text-danger">*</span>
              </Text>
            )}
            <input
              type="text"
              className={
                errors.size_xll
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter Size for XXL"
              defaultValue={sizeData ? sizeData.size_xll : null}
              {...register("size_xll", {
                required: "Size for XXL is required",
              })}
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
