import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "../button";
import { FormGroup } from "../formGroup";
import { Container } from "../container";
import { Text } from "../text";
import { Requests } from "../../utils/http";

export const SmsTemplateForm = (props) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const sizeData = props.sizeData ? props.sizeData : {};
  const [module, setModule] = useState();
  const [modules, setModules] = useState([]);
  const [type, setType] = useState();
  const [types, setTypes] = useState([]);
  const [template, setTemplate] = useState();

  const getTemplateData = async () => {
    try {
      const response = await Requests.SMSTemplate.GetTemplate();
      console.log(response);
      
      let data_filter = response.data.body.filter((element) => {
        if (element.type.some((subElement) => subElement.name == "Store")) {
          console.log("if2");
          element.type.some((subElement) => {
            if (subElement.name === "Store") {
              console.log("if");
              console.log(subElement.status);
              // console.log(subElement.status);
              return subElement;
              // return JSON.parse(subElement.status);
              // return subElement.status;
            }
          });
        }
      });

      // TEST CODE
      // let data_filter2 = response.data.body.filter((element) =>{
      //   console.log('df2')
      //   if (element.type.some((subElement) => subElement.name == "Store")) {
      //     console.log('22222222222222222')
      //     // console.log(subElement);
      //     // return subElement.name;
      //     // return element.name;
      //     element.type.some((subElement) => {
      //     console.log('3333333333333333333');
      //     console.log(subElement.name);
      //     return subElement.name;
          
          
      //   });
      // }
      // });
      // console.log("data_filter2");
      // console.log(data_filter2);

      console.log("data_filter");
      console.log(data_filter);
      setTemplate(response.data.body);
      setModules(
        response.data.body.map((element) => {
          return element.module;
        })
      );
      setTypes(
        response.data.body
          .filter((x) => x.module == response.data.body[0].module)[0]
          .type.map((element) => {
            return element.name;
          })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getTypes = useCallback(
    (module) => {
      setTypes(
        template
          .filter((x) => x.module == module)[0]
          .type.map((element) => {
            return element.name;
          })
      );
    },
    [modules]
  );

  const getStatus = useCallback(
    (module) => {
      setTypes(
        template
          .filter((x) => x.module == module)[0]
          .type.map((element) => {
            return element.name;
          })
      );
    },
    [modules]
  );

  useEffect(() => {
    getTemplateData();
  }, []);

  // Size form submit
  const onSubmit = async (data) => {
    props.submit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Row>
        {/* Title */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.module && errors.module.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.module && errors.module.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Module Name <span className="text-danger">*</span>
              </Text>
            )}
            {modules && modules.length > 0 && (
              <select
                className="form-control"
                required
                {...register("module", {
                  required: "Module is required",
                })}
                onChange={(event) => {
                  let value = event.target.value;
                  setValue("product_type", value);
                  setModule(value);
                  getTypes(value);
                }}
                // defaultValue={productType}
                // disabled
              >
                {modules.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            )}
          </FormGroup>
        </Container.Column>

        {/* Neck */}
        <Container.Column className="col-lg-6">
          <FormGroup>
            {errors.type && errors.type.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.type && errors.type.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Type Name <span className="text-danger">*</span>
              </Text>
            )}
            {types && types.length > 0 && (
              <select
                className="form-control"
                required
                {...register("type", {
                  required: "Type is required",
                })}
                onChange={(event) => {
                  let value = event.target.value;
                  setValue("type", value);
                  setType(value);
                }}
                // defaultValue={productType}
                // disabled
              >
                {types.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            )}
          </FormGroup>
        </Container.Column>
        <Container.Column className="col-lg-12">
  
        <FormGroup>
          {errors.artwork_description && errors.artwork_description.message ? (
            <Text className="text-danger fs-13 mb-0">
              {errors.artwork_description && errors.artwork_description.message}
            </Text>
          ) : (
            <Text className="fs-13 mb-0">
              SMS Template <span className="text-danger">*</span>
            </Text>
          )}
          <textarea
            rows={5}
            className={
              errors.artwork_description
                ? "form-control shadow-none error"
                : "form-control shadow-none"
            }
            placeholder="Enter SMS"
            {...register("artwork_description")}
            readOnly={props.view && true}
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
