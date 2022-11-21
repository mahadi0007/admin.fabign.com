import React from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { Text } from "../text/index";

export const MultiDatePicker = (props) => {
  const hangleDateChange = (e) => {
    const items = [];
    e.map((element) => {
      let myDate =
        element.year + "-" + element.month.number + "-" + element.day;

      return items.push(myDate);
    });
    props.selected(items);
  };
  return (
    <div>
      {props.message ? (
        <Text className="fs-13 mb-0">{props.message ?? ""}</Text>
      ) : null}

      <DatePicker
        multiple
        value={props.defaultValue ? props.defaultValue : null}
        onChange={hangleDateChange}
        placeholder={props.placeholder ? props.placeholder : "dd/mm/yyyy"}
        className={`form-control shadow-none ${props.className || ""}`}
        format="YYYY/MM/DD"
        containerClassName="w-100"
        inputClass="form-control shadow-none"
        plugins={[<DatePanel />]}
        disabled={props.disabled}
      />
    </div>
  );
};
