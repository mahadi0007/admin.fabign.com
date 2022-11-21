import React from 'react'
import './style.scss'

// Primary button
const PrimaryButton = (props) => {
    return (
        <button
            type={props.type}
            style={props.style}
            disabled={props.disabled}
            className={`btn custom-btn-primary ${props.className} shadow-none`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

// Secondary button
const SecondaryButton = (props) => {
    return (
        <button
            type={props.type}
            style={props.style}
            disabled={props.disabled}
            className={`btn custom-btn-secondary ${props.className} shadow-none`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

// Secondary small button
const SecondarySMButton = (props) => {
    return (
        <button
            type={props.type}
            style={props.style}
            disabled={props.disabled}
            className={`btn custom-btn-secondary-sm ${props.className} shadow-none`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

// Success button
const SuccessButton = (props) => {
    return (
        <button
            type={props.type}
            style={props.style}
            disabled={props.disabled}
            className={`${props.className} btn btn-custom-success shadow-none`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

// Danger button
const DangerButton = (props) => {
    return (
        <button
            type={props.type}
            style={props.style}
            disabled={props.disabled}
            className={`btn btn-custom-danger ${props.className} shadow-none`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

// Gray button
const GrayButton = (props) => {
    return (
        <button
            type={props.type}
            style={props.style}
            disabled={props.disabled}
            className={`${props.className} btn custom-btn-gray shadow-none`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

export {
    PrimaryButton,
    SecondaryButton,
    SecondarySMButton,
    DangerButton,
    GrayButton,
    SuccessButton
};