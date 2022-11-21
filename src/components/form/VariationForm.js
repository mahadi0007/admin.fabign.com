import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { PrimaryButton } from '../button'
import { Container } from '../container'
import { FormGroup } from '../formGroup'
import { Text } from '../text'
import "./style.scss"
import { Plus, X } from 'react-feather'

export const VariationForm = (props) => {
    const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm()
    const variationData = props.variationData ? props.variationData : {}
    const [variationValues, setVariationValues] = useState(props.value ? [...props.value] : [{ value: null }])
    
    // Add field
    const addvariationValues = () => setVariationValues([...variationValues, { value: null }])

    // Remove field
    const removevariationValues = (index) => {
        const fields = [...variationValues]
        fields.splice(index, 1)
        setVariationValues(fields)
    }

    // Handle input
    const handlevariationValuesInputChange = (index, event) => {
        const fields = [...variationValues]
        if (event.target && event.target.name === "value") {
            fields[index].value = event.target.value
        }

        setVariationValues(fields)
        clearErrors("variationValues")
        // props.data(variationValues)
    }

    // Category Submit
    const onSubmit = async data => {

        if (variationValues[0].value === null) {
            setError("variationValues", {
                type: "manual",
                message: "Minimum first variation value is required"
            })
        }

        let values = []
        if (variationValues.length > 0 && variationValues[0].value !== null) {
            for (let i = 0; i < variationValues.length; i++) {
                const element = variationValues[i];
                if (element.value !== null) {
                    values.push(element.value)
                }
            }
        }

        if (variationValues[0].value === null) return

        const formData = {
            ...data,
            values: values
        }
        // console.log(formData);
        props.submit(formData)

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container.Row>

                {/* Name */}
                <Container.Column >
                    <FormGroup>
                        {errors.name && errors.name.message ?
                            <Text className="text-danger fs-13 mb-0">{errors.name && errors.name.message}</Text>
                            : <Text className="fs-13 mb-0">Variation name <span className="text-danger">*</span></Text>}
                        <input
                            type="text"
                            className={errors.name ? "form-control shadow-none error" : "form-control shadow-none"}
                            placeholder="Enter variation"
                            defaultValue={variationData ? variationData.name : null}
                            {...register("name", { required: "Variation name is required" })}
                        />
                    </FormGroup>
                </Container.Column>

                <Container.Column>
                    {variationValues && variationValues.map((item, i) =>
                        <div className="col-12" key={i}>
                            <div className="d-flex">
                                {/* Value */}
                                <div className={"flex-fill"}>
                                    <FormGroup>
                                        {errors.variationValues && errors.variationValues.message ?
                                            <Text className="text-danger fs-13 mb-0">{errors.variationValues && errors.variationValues.message}</Text>
                                            : <Text className="fs-13 mb-0">{i === 0 ?
                                                <>Variation Values <span className="text-danger">*</span></>
                                                : "Variation Values"}</Text>}
                                        <input
                                            type="text"
                                            name='value'
                                            className="form-control shadow-none"
                                            placeholder="Enter value"
                                            defaultValue={item.value}
                                            onChange={event => handlevariationValuesInputChange(i, event)}
                                        />
                                    </FormGroup>
                                </div>
                                {i === 0 ?
                                    <div className="ms-2 mt-1">
                                        <button
                                            type="button"
                                            className="btn shadow-none rounded-circle plus-btn mt-3"
                                            onClick={addvariationValues}
                                        >
                                            <Plus size={22} />
                                        </button>
                                    </div>
                                    : null}

                                {i !== 0 ?
                                    <div className="ms-2 mt-1">
                                        <button type="button"
                                            className="btn shadow-none rounded-circle close-btn mt-3"
                                            onClick={() => removevariationValues(i)}
                                        >
                                            <X size={22} />
                                        </button>
                                    </div>
                                    : null}
                            </div>
                        </div>
                    )}
                </Container.Column>

            </Container.Row>

            {/* Submit button */}
            <div className='text-end'>
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
