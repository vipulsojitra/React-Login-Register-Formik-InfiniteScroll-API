import React from "react";

import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextField, Button, FormControl } from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../utils";

const Login = () => {
  const history = useHistory();

  let isUserAlreadyLogin = localStorage.getItem("TEST_TOKEN_KEY");

  if (isUserAlreadyLogin) {
    history.push("/home");
  }

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    const { email, password } = values;
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const user = userInfo
      ? userInfo.find((user) => (user.email === email ? user : null))
      : null;
    if (user) {
      if (email === user.email) {
        if (password === user.password) {
          login();
          toast("You have Successfully Logged in to your world 🌎");
          history.push("/home");
        } else {
          toast.error("Invalid credentials. Please try again. 😡");
        }
      } else {
        toast.error("Invalid credentials. Please try again. 😔");
      }
    } else {
      toast.error("Invalid credentials. Please try again. 😔");
    }
  };

  return (
    <div className="container mt-5" style={{ width: "max-content" }}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <FormControl>
                <TextField
                  error={errors.email && touched.email}
                  label="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.email && touched.email && errors.email}
                  margin="normal"
                />

                <TextField
                  type="password"
                  error={errors.password && touched.password}
                  label="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.password && touched.password && errors.password
                  }
                  margin="normal"
                />

                <Button type="submit">Submit</Button>
                <Button onClick={(e) => history.push("/registration")}>
                  Registration
                </Button>
              </FormControl>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
