import * as yup from 'yup'
const validationSchema = {
  firstname: yup
    .string()
    .required("Firstname is required")
    .min(2, "At least 2 characters required")
    .max(30, "At most 30 characters allowed")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Only alphanumeric allowed."
    ),
  lastname: yup
    .string()
    .required("Lastname is required")
    .min(2, "At least 2 characters required")
    .max(30, "At most 30 characters allowed")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Only alphanumeric allowed."
    ),
  email: yup
    .string()
    .email("Invalid email address.")
    .required("Email is required"),
  username: yup
    .string()
    .required("Username is required")
    .min(6, "Username must be at least 6 characters")
    .max(30, "Username must be at most 30 characters")
    .matches(
      /^[a-zA-Z0-9-_@.]+$/,
      "Username must contain only alphanumeric characters and/or the following special characters: -, _, @, and ."
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "The password must be at least 8 characters")
    .max(15, "The password can be at most 15 characters"),
  confirmPassword: yup.string().required("Confirm password is required").oneOf([yup.ref('password'), null], "Passwords doesn't match"),
  isPrivate: yup.boolean().required("Private or not is required."),
  title: yup.string().required("Post title is required."),
  description: yup.string(),

};

export default validationSchema