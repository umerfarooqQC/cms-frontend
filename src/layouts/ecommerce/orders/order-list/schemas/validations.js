/**
=========================================================
* Material Dashboard 2 PRO React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import * as Yup from "yup";
import checkout from "../schemas/form";

const {
  formField: {
    name,
    phone_number,
    email,
    password,
    repeatPassword,
    profile_id,
    created_by,
    address1,
    city,
    zip,
    twitter,
  },
} = checkout;

const validations = [
  Yup.object().shape({
    [name.name]: Yup.string().required(name.errorMsg),
    [phone_number.name]: Yup.string().required(phone_number.errorMsg),
    [email.name]: Yup.string().required(email.errorMsg).email(email.invalidMsg),
    // [profile_id.name]: Yup.string()
    //   .required(profile_id.errorMsg)
    //   .email(profile_id.invalidMsg),
    [password.name]: Yup.string()
      .required(password.errorMsg)
      .min(6, password.invalidMsg),
    [password.name]: Yup.string()
      .required(password.errorMsg)
      .min(6, password.invalidMsg),
    [repeatPassword.name]: Yup.string()
      .required(repeatPassword.errorMsg)
      .oneOf([Yup.ref("password"), null], repeatPassword.invalidMsg),
  }),
  Yup.object().shape({
    [address1.name]: Yup.string().required(address1.errorMsg),
    [city.name]: Yup.string().required(city.errorMsg),
    [zip.name]: Yup.string().required(zip.errorMsg).min(6, zip.invalidMsg),
  }),
  Yup.object().shape({
    [twitter.name]: Yup.string().required(twitter.errorMsg),
  }),
];

export default validations;
