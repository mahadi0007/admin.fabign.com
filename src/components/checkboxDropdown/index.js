import React from "react";
import "./styles.css";

import { ButtonGroup, Dropdown, Form } from "react-bootstrap";
import { SecondaryButton } from "../button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const CheckboxMenu = React.forwardRef(
  (
    {
      children,
      style,
      className,
      "aria-labelledby": labeledBy,
      onSelectAll,
      onSelectNone,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={style}
        className={`${className} CheckboxMenu`}
        aria-labelledby={labeledBy}
      >
        <div
          className="d-flex flex-column"
          style={{ maxHeight: "calc(100vh)", overflow: "none" }}
        >
          <ul
            className="list-unstyled flex-shrink mb-0"
            style={{ overflow: "auto" }}
          >
            {children}
          </ul>
          <div className="dropdown-item border-top pt-2 pb-0">
            <ButtonGroup size="sm">
              <SecondaryButton variant="link" onClick={onSelectAll}>
                Select All
              </SecondaryButton>
              <SecondaryButton variant="link" onClick={onSelectNone}>
                Select None
              </SecondaryButton>
            </ButtonGroup>
          </div>
        </div>
      </div>
    );
  }
);

const CheckDropdownItem = React.forwardRef(
  ({ children, id, checked, onChange }, ref) => {
    return (
      <Form.Group ref={ref} className="dropdown-item mb-0" controlId={id}>
        <Form.Check
          type="checkbox"
          label={children}
          checked={checked}
          onChange={onChange && onChange.bind(onChange, id)}
        />
      </Form.Group>
    );
  }
);

export const CheckboxDropdown = (props) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="dark" id="dropdown-basic">
        <span className="me-1">
          <FontAwesomeIcon icon={faFilter} />
        </span>
        Filter
      </Dropdown.Toggle>
      <Dropdown.Menu
        as={CheckboxMenu}
        onSelectAll={() => {
          props.handleSelectAll();
        }}
        onSelectNone={() => {
          props.handleSelectNone();
        }}
      >
        {props.items.map((i) => (
          <Dropdown.Item
            key={i.id}
            as={CheckDropdownItem}
            id={i.id}
            checked={i.checked}
            onChange={(key, event) => {
              props.handleChecked(key, event);
            }}
          >
            {i.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
