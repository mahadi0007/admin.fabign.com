import React, { useState, useEffect } from "react";
import "./style.scss";
import jwtDecode from "jwt-decode";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { routes } from "../../routes";
import { Card } from "../../components/card";
import { Text } from "../../components/text";
import { FormGroup } from "../../components/formGroup";
import { PrimaryButton } from "../../components/button";
import { Toastify } from "../../components/toastify";
import { CustomError } from "../../utils/error";
import { Requests } from "../../utils/http";

const Index = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setLoading] = useState(false);

  // Handle redirect
  const handleRedirect = (token) => {
    let redirecPath = null;
    const decode = jwtDecode(token);
    const permissions = decode.permissions;

    // Filter permitted routes from given permissions
    if (routes && routes.length) {
      const isAll = permissions.find((item) => item === "all");

      if (isAll) {
        redirecPath = "/dashboard/";
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

        const redirec = permittedRoutes[0];

        if (redirec.path) {
          redirecPath = redirec.path;
        } else {
          redirecPath = redirec.children[0].path;
        }
      }
    }
    return redirecPath;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const path = handleRedirect(token);
      if (path) return history.push(path);
    }
  }, [history]);

  // Submit Form
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // const loginData = {
      //     email: "admin@gmail.com",
      //     password: "admin"
      // }

      const response = await Requests.Auth.Login(data);
      if (response && response.status === 200) {
        setLoading(false);
        const path = handleRedirect(response.data.token);
        if (path) {
          localStorage.setItem("token", response.data.token);
          return history.push(path);
        }
      }
      setLoading(false);
    } catch (error) {
      if (error) {
        setLoading(false);
        if (error.response) {
          await CustomError(error.response);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="skew-section-1" />

      <div className="card-section flex-center flex-column">
        <Card.Simple className="border-0 shadow">
          <Card.Header className="text-center px-30 py-30 bg-white border-0 rounded">
            <Text className="mb-2 fs-20 fw-bolder">Welcome!</Text>
            <Text className="mb-0 fs-14 text-muted">
              Login your employee account.
            </Text>
          </Card.Header>
          <Card.Body className="px-30 py-30">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Employee Email */}
              <FormGroup>
                {errors.email && errors.email.message ? (
                  <Text className="text-danger mb-0 fs-12">
                    {errors.email.message}
                  </Text>
                ) : (
                  <Text className="mb-0 fs-12">Employee email</Text>
                )}

                <input
                  type="text"
                  className={
                    errors.employeeId
                      ? "form-control shadow-none error"
                      : "form-control shadow-none"
                  }
                  placeholder="example@gmail.com"
                  {...register("email", { required: "E-mail is required" })}
                />
              </FormGroup>

              {/* Password */}
              <FormGroup className="mb-2">
                {errors.password && errors.password.message ? (
                  <Text className="text-danger mb-0 fs-12">
                    {errors.password.message}
                  </Text>
                ) : (
                  <Text className="mb-0 fs-12">Password</Text>
                )}

                <input
                  type="password"
                  className={
                    errors.password
                      ? "form-control shadow-none error"
                      : "form-control shadow-none"
                  }
                  placeholder="*****"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </FormGroup>

              {/* Page link */}
              <div className="text-end mb-4">
                <Link to="/reset" className="text-decoration-none text-dark">
                  <Text className="mb-0 fs-15">Forgot password?</Text>
                </Link>
              </div>

              {/* Submit button */}
              <div className="text-end">
                <PrimaryButton type="submit" disabled={isLoading}>
                  <Text className="fs-13 mb-0 fw-bolder">
                    {isLoading ? "LOADING..." : "LOGIN"}
                  </Text>
                </PrimaryButton>
              </div>
            </form>
          </Card.Body>
        </Card.Simple>
      </div>
    </div>
  );
};

export default Index;
