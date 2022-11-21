import React from "react";
import { Home, List } from "react-feather";
import { Container } from "../container";
import { Text } from "../text";
import "./style.scss";

export const TitleBar = (props) => {

  return (
    <div>
      <Container.Column className="bg-white mb-3">
        <div className="d-flex flex-wrap py-3 px-4">
          <div className="pt-1">
            <List size={33} color="#F6990E" strokeWidth={3} />
          </div>
          <div className="ps-2 flex-fill">
            <Text className="fs-15 mb-0">{props.mainTitle}</Text>
            <Text className="fs-13 text-muted mb-0">{props.subTitle}</Text>
          </div>
          <div className="border my-1 rounded">
            <div className="d-flex p-2">
              <div>
                <Home size={18} color="#d5d5d5" />
              </div>
              <Text className="fs-14 mb-0 ps-2 text-muted manage-button-text">{props.tag} <span className="text-category-color"> {props.pageTag} </span></Text>
            </div>
          </div>
        </div>
      </Container.Column>
    </div>
  )
}