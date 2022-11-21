import React, { useEffect, useState } from "react";
// import { Form } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { Text } from "../text";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { PrimaryButton, SecondaryButton } from "../button";
import { MinusCircle, PlusCircle } from "react-feather";
import { v4 as uuid } from "uuid";

export const EAdditionalInfoEditForm = (props) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [customfields, setCustomFields] = useState([
    { _id: uuid(), title: null, description: null },
  ]);

  useEffect(() => {
    setCustomFields(props.data);
  }, [props]);

  // Element form Submit
  const onSubmit = async (data) => {
    const formData = {
      info: customfields.map((item) => {
        return {
          title: item.title,
          description: item.description,
        };
      }),
    };
    props.submit(formData);
  };

  // custom fields section {from here we will continue variation section}
  const handleAddCustomFields = (id) => {
    setCustomFields([
      ...customfields,
      {
        _id: id,
        title: "",
        description: "",
      },
    ]);
  };

  const handleRemoveCustomFields = (id) => {
    const values = [...customfields];
    if (customfields.length !== 1) {
      values.splice(
        values.findIndex((value) => value.id === id),
        1
      );
      setCustomFields(values);
    }
  };

  // adding values to custom fields
  const handleChangeInputCustomField = (id, event, type) => {
    const newInputFIelds = customfields.map((item) => {
      if (id === item._id) {
        if (type === "title") {
          item["title"] = event.target.value;
        }
        if (type === "description") {
          item["description"] = event.target.value;
        }
      }
      return item;
    });
    setCustomFields(newInputFIelds);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Extra Information Section */}
      <Container.Basic className="border rounded mb-3">
        <Container.Row className="pt-2">
          {/* Button For Custom Fields */}
          <div className="mb-3">
            <span
              style={{ marginTop: "1.3rem", cursor: "pointer" }}
              className="text-primary"
              onClick={() => handleAddCustomFields(uuid())}
            >
              Edit Additional Information <PlusCircle size={18} />
            </span>
          </div>

          {/* Custom Fields */}
          {customfields &&
            customfields.map((item, index) => {
              return (
                <Container.Column className="col-lg-12 mb-3" key={index}>
                  <div className="d-flex justify-content-start">
                    <FormGroup className="w-100">
                      {errors.label && errors.label.message ? (
                        <Text className="text-danger fs-13 mb-0">
                          {errors.label && errors.label.message}
                        </Text>
                      ) : (
                        <Text className="fs-13 mb-0">title </Text>
                      )}

                      <input
                        type="text"
                        className={
                          errors.heighlabel
                            ? "form-control shadow-none error"
                            : "form-control shadow-none"
                        }
                        placeholder="title"
                        value={item.title}
                        onChange={(event) =>
                          handleChangeInputCustomField(item._id, event, "title")
                        }
                      />
                    </FormGroup>
                    <FormGroup className="w-100 ms-3">
                      {errors.value && errors.value.message ? (
                        <Text className="text-danger fs-13 mb-0">
                          {errors.value && errors.value.message}
                        </Text>
                      ) : (
                        <Text className="fs-13 mb-0">description</Text>
                      )}

                      <input
                        type="text"
                        className={
                          errors.value
                            ? "form-control shadow-none error"
                            : "form-control shadow-none"
                        }
                        placeholder="description"
                        value={item.description}
                        onChange={(event) =>
                          handleChangeInputCustomField(
                            item._id,
                            event,
                            "description"
                          )
                        }
                      />
                    </FormGroup>
                    <div
                      className="border rounded ms-2 p-2"
                      style={{ marginTop: "1.3rem", cursor: "pointer" }}
                      onClick={() => handleRemoveCustomFields(uuid())}
                    >
                      <MinusCircle size={22} />
                    </div>
                  </div>
                </Container.Column>
              );
            })}
        </Container.Row>
      </Container.Basic>

      {/* Submit button */}
      <div className="text-end">
        <PrimaryButton
          type="submit"
          className="px-4 fw-bolder"
          disabled={props.loading}
        >
          <Text className="text-uppercase fs-14 mb-0">
            {props.loading
              ? props.update
                ? "Updating ..."
                : "Submitting ..."
              : props.update
              ? "Update"
              : "Save and Add Another"}
          </Text>
        </PrimaryButton>
        {/* button */}
        <SecondaryButton
          type="submit"
          className="px-4 fw-bolder"
          disabled={props.loading}
        >
          <Text className="text-uppercase fs-14 mb-0">
            {props.loading
              ? props.update
                ? "Updating ..."
                : "Submitting ..."
              : props.update
              ? "Update"
              : "Reset"}
          </Text>
        </SecondaryButton>
      </div>
    </form>
  );
};
