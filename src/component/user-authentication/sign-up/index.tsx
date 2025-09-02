import React, { FC, useState } from "react";
import { AuthModalHeader } from "../../modal-components";
import { AppButton, TextField } from "../../UI";
import { UserRegisterProps } from "../../../interface";
import { Formik } from "formik";
import { SignUpValidationSchema } from "../../../validation";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AlterBuddyLogo } from "../../../assets/logo";
import { Box, HStack, VStack } from "@chakra-ui/react";

interface SignUpBodyProps {
  registerFunc: ({
    email,
    fname,
    lname,
    mobile,
    password,
    c_password,
  }: UserRegisterProps) => void;
  loading?: boolean;
}

export const SignUpBody: FC<SignUpBodyProps> = ({ registerFunc, loading }) => {

  const [showLinks, setShowLinks] = useState(false);
  
    const toggleLinks = () => setShowLinks(!showLinks);

  const [accept, setAccept] = useState<boolean>(false);
  const [password, showPassword] = useState<boolean>(false);

  const navigate = useNavigate();
  const handlePrivacyAccept = () => {
    setAccept(!accept);
  };
  return (
    <div className="flex flex-col items-center gap-3 xl:lg:md:mx-auto xl:lg:md:w-[70%] w-full shadow-lg border py-10 rounded-lg">
      <AlterBuddyLogo />
      <h1 className="xl:lg:md:text-3xl text-xl font-semibold text-center capitalize">
        Create New Account
      </h1>
      <AuthModalHeader
        action={() => navigate("/sign-in")}
        btnText="Sign In"
        title="Already Have Account?"
      />
      {/* {error} */}
      <Formik
        validationSchema={SignUpValidationSchema}
        initialValues={{
          email: "",
          fname: "",
          lname: "",
          mobile: "",
          password: "",
          c_password: "",
        }}
        onSubmit={registerFunc}
      >
        {({
          values,
          touched,
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} className="w-full">
            <div className="p-3 w-full flex flex-col gap-5 px-5">
              <div className="flex w-full gap-5 flex-wrap xl:md:lg:flex-nowrap">
                <TextField
                  placeholder="Jhon"
                  label="First Name"
                  type="text"
                  onChange={handleChange("fname")}
                  onBlur={handleBlur("fname")}
                  error={errors.fname}
                  touched={touched.fname}
                  value={values.fname}
                />
                <TextField
                  placeholder="Doe"
                  label="Last Name"
                  type="text"
                  onChange={handleChange("lname")}
                  onBlur={handleBlur("lname")}
                  error={errors.lname}
                  touched={touched.lname}
                  value={values.lname}
                />
              </div>
              <TextField
                value={values.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                placeholder="abc123@gmail.com"
                label="Enter email address"
                type="email"
                error={errors.email}
                touched={touched.email}
              />
              <TextField
                type="number"
                value={values.mobile}
                onChange={handleChange("mobile")}
                onBlur={handleBlur("mobile")}
                placeholder="8669026895"
                label="Enter mobile"
                maxLength={10}
                minLength={10}
                error={errors.mobile}
                touched={touched.mobile}
              />
              <div className="flex items-center gap-5 xl:lg:md:flex-nowrap flex-wrap">
                <TextField
                  placeholder="Choose secure password"
                  label="enter password"
                  type={!password && "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  onBlur={handleBlur("password")}
                  error={errors.password}
                  touched={touched.password}
                />
                <div className="flex gap-3 items-center w-full">
                  <div className="flex-1">
                    <TextField
                      width="100%"
                      placeholder="Matched entered password"
                      label="Confirm Password"
                      type={password ? "text" : "password"}
                      value={values.c_password}
                      onChange={handleChange("c_password")}
                      onBlur={handleBlur("c_password")}
                      error={errors.c_password}
                      touched={touched.c_password}
                    />
                  </div>
                  <div className="w-[8%]">
                    <button
                      type="button"
                      onClick={() => {
                        showPassword(!password);
                      }}
                    >
                      {password ? (
                        <AiOutlineEyeInvisible size={24} />
                      ) : (
                        <AiOutlineEye size={24} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 pl-5 py-3">
              <input
                type="checkbox"
                className="w-4 mt-1 rounded-full h-4"
                name="privacy"
                id="privacy"
                checked={accept}
                onChange={handlePrivacyAccept}
              />
              <Box className="select-none">
                Accept{" "}
                <span
                  onClick={() => {
                    navigate("/terms-and-condition");
                  }}
                  className="underline text-primary-500 cursor-pointer"
                >
                  Terms & Condition
                </span>{" "}
                &{" "}
                <span
                  onClick={() => {
                    navigate("/privacy-policy");
                  }}
                  className="underline text-primary-500 cursor-pointer"
                >
                  Privacy Policy
                </span>
                {showLinks && (
                    <Box as="span" pl={2}>
                      <Link  to="/refund-policy" className="underline mx-2 text-primary-500 cursor-pointer" >
                        Refund Policy
                      </Link>
                      <Link to="/shipping-policy" className="underline mx-2 text-primary-500 cursor-pointer" >
                        Shipping Policy
                      </Link>
                      <Link to="/tripartite-service" className="underline mx-2 text-primary-500 cursor-pointer" >
                        Tri-Partite Service Agreement
                      </Link>
                      <a href="/Annexure-C.pdf" className="underline mx-2 text-primary-500 cursor-pointer" >
                        Annexure C{" "}
                      </a>
                      
                    </Box>
                  )}
                   <Box as="span" className="font-semibold ml-2 text-md text-primary-500 cursor-pointer" onClick={toggleLinks}>
                      {showLinks ? "Less" : "More"}
                    </Box>
              </Box>
            </div>
             
            <div className="flex justify-end px-5 gap-5 mt-5">
              <div>
                <AppButton
                  flexed
                  type="button"
                  outlined
                  onClick={() => navigate("/")}
                >
                  Back to Home
                </AppButton>
              </div>
              <AppButton
                disabled={!accept}
                loading={loading}
                type="submit"
                filled
              >
                Sign up account
              </AppButton>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
