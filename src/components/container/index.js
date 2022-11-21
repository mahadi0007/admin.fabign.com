import React from "react";
import "./style.scss";

// Basic Container
const Basic = (props) => {
  return (
    <div
      className={props.className ? props.className + " container" : "container"}
    >
      {props.children}
    </div>
  );
};

// Fluid Container
const Fluid = (props) => {
  return (
    <div
      className={
        props.className
          ? props.className + " container-fluid"
          : "container-fluid"
      }
      id={props.id && props.id}
      style={props.style ?? null}
    >
      {props.children}
    </div>
  );
};

// Row
const Row = (props) => {
  return (
    <div
      className={props.className ? props.className + " row" : "row"}
      style={props.style}
      onClick={props?.onClick}
    >
      {props.children}
    </div>
  );
};

// Column
const Column = (props) => {
  return (
    <div
      className={props.className ? props.className + " col-12" : "col-12"}
      style={props.style ?? null}
      onClick={props?.onClick}
    >
      {props.children}
    </div>
  );
};

export const Container = { Basic, Fluid, Row, Column };
