import React from "react";
import { Modal } from "react-bootstrap";
import { DangerButton, SuccessButton } from "../button";
import { X } from "react-feather";

export const StatusModal = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      centered
      className="custom-modal"
    >
      <Modal.Header>
        <div className="d-flex w-100">
          <div>
            <h6 className="mt-2 mb-0">Are you sure?</h6>
          </div>
          <div className="ms-auto">
            <DangerButton
              onClick={props.onHide}
              className="btn-danger rounded-circle border-0"
              style={{ padding: "7px 10px" }}
            >
              <X size={18} />
            </DangerButton>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="pt-4">
          <SuccessButton
            type="submit"
            disabled={props.loading}
            className="border-0 me-2"
            style={{ padding: "7px 20px", fontSize: 14 }}
            onClick={props.handleAction}
          >
            {props.loading ? "Loading ..." : "Yes"}
          </SuccessButton>
          <DangerButton
            style={{ padding: "7px 20px", fontSize: 14 }}
            className="border-0 me-2"
            onClick={props.onHide}
          >
            No
          </DangerButton>
        </div>
      </Modal.Body>
    </Modal>
  );
};
