import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Text } from "../text";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { PrimaryButton, SecondaryButton } from "../button";
import { MinusCircle, PlusCircle } from "react-feather";
import { v4 as uuid } from "uuid";

export const EFAQEditForm = (props) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [customfields, setCustomFields] = useState([
    { _id: uuid(), question: null, answer: null },
  ]);

  useEffect(() => {
    setCustomFields(props.data);
  }, [props]);

  // Element form Submit
  const onSubmit = async (data) => {
    const formData = {
      faq: customfields.map((item) => {
        return {
          question: item.question,
          answer: item.answer,
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
        question: "",
        answer: "",
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
        if (type === "question") {
          item["question"] = event.target.value;
        }
        if (type === "answer") {
          item["answer"] = event.target.value;
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
              Add FAQ <PlusCircle size={18} />
            </span>
          </div>

          {/* Custom Fields */}
          {customfields &&
            customfields.map((item, index) => {
              return (
                <>
                  <Container.Column className="col-lg-12 mb-3" key={index}>
                    <div className="d-flex justify-content-start">
                      <FormGroup className="w-100">
                        {errors.label && errors.label.message ? (
                          <Text className="text-danger fs-13 mb-0">
                            {errors.label && errors.label.message}
                          </Text>
                        ) : (
                          <Text className="fs-13 mb-0">Question </Text>
                        )}

                        <input
                          type="text"
                          className={
                            errors.heighlabel
                              ? "form-control shadow-none error"
                              : "form-control shadow-none"
                          }
                          placeholder="Question"
                          value={item.question}
                          onChange={(event) =>
                            handleChangeInputCustomField(
                              item._id,
                              event,
                              "question"
                            )
                          }
                        />
                      </FormGroup>
                      <FormGroup className="w-100 ms-3">
                        {errors.value && errors.value.message ? (
                          <Text className="text-danger fs-13 mb-0">
                            {errors.value && errors.value.message}
                          </Text>
                        ) : (
                          <Text className="fs-13 mb-0">Answer</Text>
                        )}

                        <input
                          type="text"
                          className={
                            errors.value
                              ? "form-control shadow-none error"
                              : "form-control shadow-none"
                          }
                          placeholder="Answer"
                          value={item.answer}
                          onChange={(event) =>
                            handleChangeInputCustomField(
                              item._id,
                              event,
                              "answer"
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
                </>
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
