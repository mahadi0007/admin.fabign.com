import React, { useState, useEffect } from "react";
import "./style.scss";
import jwtDecode from "jwt-decode";
import { Switch, Route } from "react-router-dom";
import { routes } from "../../routes";
import { Layout } from "../../components/layout";
import { Container } from "../../components/container";
import FourOFour from "../404";

const Index = () => {
  const [permitted, setPermitted] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decode = jwtDecode(token);
      const permissions = decode.permissions;
      // Filter permitted routes from given permissions
      if (routes && routes.length) {
        const isAll = permissions.find((item) => item === "all");

        if (isAll) {
          // console.log("routes");
          // console.log(routes);
          return setPermitted(routes);
        } else {
          let permittedRoutes = [];
          routes.forEach((item) => {
            if (permissions.some((x) => x === item.name)) {
              permittedRoutes.push(item);
            }
            if (item.children) {
              item.children.forEach((child) => {
                if (permissions.some((x) => x === child.name)) {
                  let found = false;
                  permittedRoutes.forEach((permittedItem) => {
                    if (permittedItem.children) {
                      permittedItem.children.forEach((permittedChild) => {
                        if (permittedChild === child) {
                          found = true;
                        }
                      });
                    }
                  });
                  if (!found) {
                    permittedRoutes.push(child);
                  }
                }
              });
            }
          });
          // console.log("permittedRoutes");
          // console.log(permittedRoutes);
          setPermitted(permittedRoutes);
        }
      }
    }
  }, []);

  return (
    <div className="master">
      <Layout routes={permitted} />
      <div className="main">
        <Container.Fluid>
          <Container.Row>
            <Switch>
              {permitted &&
                permitted.map((item, i) =>
                  item.name && item.path ? (
                    <Route
                      key={i}
                      exact={item.exact}
                      path={item.path}
                      component={item.component}
                    />
                  ) : item.children && item.children.length ? (
                    item.children.map((child, j) =>
                      child.children ? (
                        child.children.map((nestedChild, j) => (
                          <Route
                            key={j}
                            exact={nestedChild.exact}
                            path={nestedChild.path}
                            component={nestedChild.component}
                          />
                        ))
                      ) : (
                        <Route
                          key={j}
                          exact={child.exact}
                          path={child.path}
                          component={child.component}
                        />
                      )
                    )
                  ) : null
                )}
              <Route path="*" component={FourOFour} />
            </Switch>
          </Container.Row>
        </Container.Fluid>
      </div>
    </div>
  );
};

export default Index;
