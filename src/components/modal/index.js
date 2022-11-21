import React from 'react'
import { X } from 'react-feather'
import { Modal } from 'react-bootstrap'
import { DangerButton, PrimaryButton, SecondaryButton } from '../button'
import { Text } from '../text'


// Delete confirmation modal
export const DeleteModal = (props) => {
    const { show, onHide, loading, message, doDelete } = props

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            centered
        >
            <Modal.Header className="border-0 px-20 py-20">
                <div className="d-flex w-100">
                    <div><Text className="fs-17 fw-bolder mt-2 mb-0">Are you sure?</Text></div>
                    <div className="ms-auto">
                        <DangerButton
                            onClick={onHide}
                            className="btn-circle"
                        >
                            <X size={18} />
                        </DangerButton>
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body className="px-20 pb-4 pt-0">
                <div>{message}</div>
                <div className="pt-4">
                    <SecondaryButton
                        disabled={loading}
                        className="me-2"
                        onClick={doDelete}
                    >
                        <Text className="fs-15 mb-0">{loading ? "Deleting ..." : "Yes"}</Text>
                    </SecondaryButton>

                    <PrimaryButton onClick={onHide}>
                        <Text className="fs-15 mb-0">No</Text>
                    </PrimaryButton>
                </div>
            </Modal.Body>
        </Modal>
    );
}


// Primary modal
export const PrimaryModal = (props) => {
    const { title, show, size, onHide } = props

    return (
        <Modal
            show={show}
            size={size}
            centered
            onHide={onHide}
        >
            <Modal.Header className="border-0 px-20 py-20">
                <div className="d-flex w-100">
                    <div><Text className="fs-17 fw-bolder mt-2 mb-0">{title}</Text></div>
                    <div className="ms-auto">
                        <DangerButton
                            onClick={onHide}
                            className="btn-circle"
                        >
                            <X size={18} />
                        </DangerButton>
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body className="px-20 pb-4 pt-0">
                {props.children}
            </Modal.Body>
        </Modal>
    );
};