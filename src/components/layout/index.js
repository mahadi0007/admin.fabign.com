import React, { useState } from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";
import { ChevronRight } from "react-feather";
import { CustomNavbar } from "../navbar";
import { Images } from "../../utils/images";
import { Image } from "../image/Index";
import { Text } from "../text";

const MenuItems = (props) => {
  const [isMenu, setMenu] = useState(false);

  // Toggle menu
  const toggleMenu = (event) => {
    if (isMenu === event) {
      setMenu(false);
    } else {
      setMenu(false);
      setMenu(event);
    }
  };

  return (
    <div>
      <ul>
        {props.path ? (
          <li>
            <NavLink
              to={props.path}
              exact={props.exact}
              activeClassName="isActive"
              type="button"
              className="btn shadow-none"
            >
              <span className="icon">{props.icon}</span>
              <span className="text">{props.title}</span>
            </NavLink>
          </li>
        ) : (
          <li>
            <div className="sidebar-dropdown-container">
              <button
                type="button"
                className="btn shadow-none"
                onClick={() => toggleMenu(props.name)}
              >
                <span className="icon">{props.icon}</span>
                <span className="text">{props.title}</span>
                {props.children ? (
                  <ChevronRight
                    size={18}
                    className={isMenu === props.name ? "arrow down" : "arrow"}
                  />
                ) : null}
              </button>

              <div
                className={
                  isMenu === props.name
                    ? "sidebar-dropdown-menu"
                    : "sidebar-dropdown-menu menu-hide"
                }
              >
                {props.children &&
                  props.children.map((item, i) =>
                    item.inDrawer ? (
                      <MenuItems
                        key={i}
                        icon={item.icon}
                        path={item.path}
                        name={item.name}
                        title={item.title}
                        exact={item.exact ? item.exact : false}
                        children={item.children}
                      />
                    ) : null
                  )}
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export const Layout = (props) => {
  const [show, setShow] = useState(false);

  return (
    <div className="layout">
      {/* Navbar */}
      <div className="navbar-container print-hidden">
        <CustomNavbar toggle={() => setShow(!show)} />
      </div>

      {/* Sidebar */}
      <div className="sidebar-container print-hidden">
        {/* Backdrop */}
        <div
          className={
            show ? "backdrop d-lg-none open-backdrop" : "backdrop d-lg-none"
          }
          onClick={() => setShow(false)}
        />

        <div
          className={show ? "sidebar shadow open-sidebar" : "sidebar shadow"}
        >
          <div className="logo py-1">
            <Image src={Images.Logo} alt="Fabign Logo" x={300} y={60} />
          </div>
          <div className="main-menu-bar">
            <div className="text-center pb-3">
              <Image src={Images.Person} alt="Super Admin Logo" x={75} y={75} />
              <Text className="fs-14 text-white mb-0">SUPER ADMIN</Text>
            </div>
            {props.routes && props.routes.length
              ? props.routes.map((item, i) => {
                  if (item.name && item.inDrawer) {
                    return (
                      <MenuItems
                        key={i}
                        icon={item.icon}
                        path={item.path}
                        name={item.name}
                        title={item.title}
                        exact={item.exact ? item.exact : false}
                        children={item.children}
                      />
                    );
                  } else {
                    return null;
                  }
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};
