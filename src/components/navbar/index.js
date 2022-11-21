import React, { useEffect, useState } from 'react'
import './style.scss'
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { LogOut, Menu, User } from 'react-feather'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { Images } from '../../utils/images'

export const CustomNavbar = ({ toggle }) => {
    const history = useHistory()
    const [loggedUser, setLoggedUser] = useState(null)
    const [token] = useState(localStorage.getItem('token'))

    useEffect(() => {
        if (token) {
            const logged = jwt_decode(token)
            setLoggedUser(logged)
        }
    }, [token])

    // Logout
    const doLogout = () => {
        localStorage.clear()
        history.push('/')
    }

    return (
        <div className="custom-navbar">
            <div className="d-flex">
                <div>
                    <ul>
                        <li className="d-lg-none">
                            <button type="button" className="btn btn-sm shadow-none" onClick={toggle}>
                                <Menu color="black" size={20} />
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="ms-auto">
                    <ul>
                        <li><p className="mb-0 text-capitalize">{loggedUser ? loggedUser.name : null}</p></li>
                        <li>
                            <DropdownButton
                                title={<img src={Images.Person} className="img-fluid rounded-circle" alt="..." />}>
                                <Dropdown.Item
                                    as={Link}
                                    to="/dashboard/profile"
                                >
                                    <User size={18} className="icon" />
                                    <span>Profile</span>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={doLogout}>
                                    <LogOut size={18} className="icon" />
                                    <span>Logout</span>
                                </Dropdown.Item>
                            </DropdownButton>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
