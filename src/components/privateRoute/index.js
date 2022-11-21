
import React from 'react'
import { isAuthenticate } from '../../utils/authenticate'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ props, children, ...rest }) => {
    const loggedIn = isAuthenticate()

    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedIn ?
                    children
                    :
                    <Redirect
                        to={{
                            pathname: "/",
                            from: location
                        }}
                    />
            }
        />
    )
}

export default PrivateRoute;