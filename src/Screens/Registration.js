import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  DialogActions,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addUserInfo } from "../Redux/authentication/action";
import { toast } from "react-toastify";

const Registration = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state);

  let isUserAlreadyLogin = localStorage.getItem("TEST_TOKEN_KEY");

  if (isUserAlreadyLogin) {
    history.push("/home");
  }

  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    gender: "",
    hobby: [],
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email().required("Required"),
    password: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    phoneNumber: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    const { email } = values;
    let isUserExist = false;

    for (let i = 0; i < userInfo.length; i++) {
      if (userInfo[i].email === email) {
        isUserExist = true;
      }
    }

    if (isUserExist) {
      toast.error("User already exist");
      isUserExist = false;
    } else {
      dispatch(addUserInfo(values));
      history.push("/");
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
            dirty,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <FormControl>
                <TextField
                  error={errors.name && touched.name}
                  label="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.name && touched.name && errors.name}
                  margin="normal"
                />

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

                <TextField
                  error={errors.address && touched.address}
                  label="address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.address && touched.address && errors.address
                  }
                  margin="normal"
                />

                <TextField
                  error={errors.phoneNumber && touched.phoneNumber}
                  label="phoneNumber"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.phoneNumber &&
                    touched.phoneNumber &&
                    errors.phoneNumber
                  }
                  margin="normal"
                />

                <RadioGroup
                  aria-label="gender"
                  name="gender"
                  value={values.gender}
                  onChange={handleChange}
                  error={errors.gender && touched.gender}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio required={true} />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio required={true} />}
                    label="Male"
                  />
                </RadioGroup>

                {/* <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.hobby.includes("reading")}
                      onChange={handleCheckboxChanges}
                      name="reading"
                    />
                  }
                  label="I 💓 Reading"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.hobby.includes("swimming")}
                      onChange={handleCheckboxChanges}
                      name="swimming"
                    />
                  }
                  label="I like swimming 🏊‍♂️"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.hobby.includes("coding")}
                      onChange={handleCheckboxChanges}
                      name="coding"
                    />
                  }
                  label="I ❤️‍🔥 👨‍💻"
                /> */}
                <div role="group" aria-labelledby="checkbox-group">
                  <div className="form-check">
                    <label>
                      <Field
                        className="form-check-input"
                        type="checkbox"
                        name="hobby"
                        value="reading"
                      />
                      I 💓 📖
                    </label>
                  </div>
                  <div className="form-check">
                    <label>
                      <Field
                        className="form-check-input"
                        type="checkbox"
                        name="hobby"
                        value="swimimng"
                      />
                      I 💓 🏊‍♂️
                    </label>
                  </div>
                  <div className="form-check">
                    <label>
                      <Field
                        className="form-check-input"
                        type="checkbox"
                        name="hobby"
                        value="coding"
                      />
                      I 💓 👨‍💻
                    </label>
                  </div>
                </div>

                <DialogActions>
                  <Button
                    type="button"
                    className="outline"
                    onClick={handleReset}
                    disabled={!dirty}
                  >
                    Reset
                  </Button>
                  <Button type="submit">Submit</Button>
                </DialogActions>
              </FormControl>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Registration;
