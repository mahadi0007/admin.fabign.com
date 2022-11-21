import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { AlignJustify } from 'react-feather'
import { Text } from '../../components/text'
import { Card } from '../../components/card'
import { TitleBar } from '../../components/titleBar'
import { Container } from '../../components/container'
import { PrimaryButton } from '../../components/button'
import { ElementForm } from '../../components/form/element_form'
import { Toastify } from '../../components/toastify'
import { CustomError } from '../../utils/error'
import { Requests } from '../../utils/http'

const Store = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(false)

    // Handle submit
    const handleSubmit = async data => {
        try {
            setLoading(true)
            const response = await Requests.Element.Store(data)
            if (response && response.status === 201) {
                Toastify.Success(response.data.message)
            }
            history.push("/dashboard/elements")
            setLoading(false)
        } catch (error) {
            if (error) {
                setLoading(false)
                if (error.response) {
                    await CustomError(error.response)
                } else {
                    Toastify.Error("Something going wrong.")
                }
            }
        }
    }

    return (
        <div className="mb-4">

            {/* Title bar */}
            <TitleBar
                mainTitle="Add Element"
                subTitle="Add new element"
                tag="Home / Elements /"
                pageTag="Add element"
            />

            {/* Manage element button */}
            <Container.Column className="text-end">
                <Link to={"/dashboard/elements"}>
                    <PrimaryButton className="px-4 mb-3">
                        <Text className="fs-15 mb-0"><AlignJustify size={20} /> Manage elements</Text>
                    </PrimaryButton>
                </Link>
            </Container.Column>

            {/* Main element card */}
            <Container.Column>
                <Card.Simple className="border-0">
                    <Card.Header className="bg-white rounded border-0">
                        <Text className="mb-0 ps-1 pt-3 fs-17">Add Element</Text>
                    </Card.Header>
                    <hr />
                    <Card.Body className="px-20 py-20">
                        <ElementForm
                            loading={loading}
                            onSubmit={handleSubmit}
                        />
                    </Card.Body>
                </Card.Simple>
            </Container.Column>
        </div>
    );
}

export default Store;