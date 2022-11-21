import React from 'react'
import { Text } from '../../components/text'
import { FourOFour } from '../../components/404'
import { PrimaryButton } from '../../components/button'
import { Link } from 'react-router-dom'

const Index = () => {
    return (
        <div className="flex-center flex-column w-100" style={{ height: "100vh" }}>
            <FourOFour message={"What are you looking for? Page not found."} />
            <Link to="/dashboard">
                <PrimaryButton>
                    <Text className="fs-14 mb-0">Back to Dashboard</Text>
                </PrimaryButton>
            </Link>
        </div>
    )
}

export default Index;