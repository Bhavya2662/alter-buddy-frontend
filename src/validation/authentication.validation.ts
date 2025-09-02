import * as yup from "yup";
import { IMentorAuthProps } from "../interface";

interface SignInProps {
  mobile: string;
  password: string;
}

interface SignUpProps {
  email: string;
  username: string;
  password: string;
  fname: string;
  lname: string;
}

export const SignInInitialState: SignInProps = {
  mobile: "",
  password: "",
};

export const SignInValidationSchema = yup.object().shape({
  mobile: yup.string().required("email / mobile is required to sign in"),
  password: yup.string().required("password is required for sign in").min(6),
});

export const SignUpInitialState: SignUpProps = {
  email: "",
  password: "",
  fname: "",
  lname: "",
  username: "",
};

export const SignUpValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("email is required to sign up")
    .email("email is not valid email"),
  password: yup
    .string()
    .required("password is required for sign up")
    .min(6)
    .max(40),
  mobile: yup.string().min(10).max(10),
  fname: yup.string().required("first name is required"),
  lname: yup.string().required("last name is required"),
});

export const MentorSignInProps: IMentorAuthProps = {
  password: "",
  username: "",
};

export const MentorSignInValidationSchema = yup.object().shape({
  username: yup.string().required("username is required for login"),
  password: yup.string().required("password is required for login"),
});
