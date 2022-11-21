import React, { useState } from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Card } from '../../components/card'
import { Text } from '../../components/text'
import { FormGroup } from '../../components/formGroup'
import { PrimaryButton } from '../../components/button'

const Index = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [isLoading, setLoading] = useState(false)

    // Submit Form
    const onSubmit = async (data) => {
        console.log(data)
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 2000)
        // const response = await Requests.Auth.Login(data)
        // if (response && response.token) {
        //     setLogging(false)
        //     const path = handleRedirect(response.token)

        //     if (path) {
        //         localStorage.setItem('token', response.token)
        //         return history.push(path)
        //     }
        // }
        // setLogging(false)
    }

    return (
        <div className="auth-container">
            <div className="skew-section-1" />

            <div className="card-section flex-center flex-column">
                <Card.Simple className="border-0 shadow">
                    <Card.Header className="text-center px-30 py-30 bg-white border-0 rounded">
                        <Text className="mb-2 fs-20 fw-bolder">Reset Password</Text>
                        <Text className="mb-0 fs-14 text-muted">Just enter e-mail instruction will send.</Text>
                    </Card.Header>
                    <Card.Body className="px-30 py-30">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            {/* E-mail */}
                            <FormGroup className="mb-2">
                                <input
                                    type="text"
                                    className={errors.email ? "form-control shadow-none error" : "form-control shadow-none"}
                                    placeholder="example@gmail.com"
                                    {...register("email", {
                                        required: "E-mail is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                />
                            </FormGroup>

                            {/* Page link */}
                            <div className="text-end mb-4">
                                <Link to="/" className="text-decoration-none text-dark">
                                    <Text className="mb-0 fs-15">Back to login</Text>
                                </Link>
                            </div>

                            {/* Submit button */}
                            <div className="text-end">
                                <PrimaryButton
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    <Text className="fs-13 mb-0 fw-bolder">{isLoading ? "LOADING..." : "SEND"}</Text>
                                </PrimaryButton>
                            </div>
                        </form>
                    </Card.Body>
                </Card.Simple>
            </div>
        </div>
    );
}

export default Index;