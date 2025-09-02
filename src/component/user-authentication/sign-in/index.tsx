import React, { FC, useState } from "react";
import { AuthModalBody } from "../../modal-components";
import { AppButton, TextField } from "../../UI";
import { UserLoginProps } from "../../../interface";
import { Formik } from "formik";
import {
  SignInInitialState,
  SignInValidationSchema,
} from "../../../validation";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Box, Button, Flex, HStack, VStack } from "@chakra-ui/react";

interface SignInBodyProps {
  loginFunc: ({ mobile, password }: UserLoginProps) => void;
  loading?: boolean;
}
export const SignInBody: FC<SignInBodyProps> = ({ loginFunc, loading }) => {
  const [accept, setAccept] = useState<boolean>(false);

  const handlePrivacyAccept = () => {
    setAccept(!accept);
  };

  const navigate = useNavigate();
  const [password, showPassword] = useState<boolean>(false);

  const [showLinks, setShowLinks] = useState(false);

  const toggleLinks = () => setShowLinks(!showLinks);

  return (
    <div className="flex flex-col items-center gap-5 mx-auto xl:lg:md:px-0 px-5 xl:lg:md:w-[60%] h-full justify-center">
      <AuthModalBody
        modalTitle="Continue with sign in"
        
      >
        {/* {error?.length && <p className="text-red-500 uppercase text-center">{error}</p>} */}
        <Formik
          initialValues={SignInInitialState}
          validationSchema={SignInValidationSchema}
          onSubmit={loginFunc}
        >
          {({
            errors,
            values,
            handleBlur,
            touched,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="p-3 w-full flex flex-col gap-5">
                <TextField
                  value={values.mobile}
                  onChange={handleChange("mobile")}
                  onBlur={handleBlur("mobile")}
                  placeholder="Mobile Number / Email Address"
                  label="Enter email / mobile"
                  error={errors.mobile}
                  touched={touched.mobile}
                />
                <div className="flex items-center">
                  <TextField
                    placeholder="choose secure password"
                    label="enter password"
                    type={!password ? "password" : "text"}
                    value={values.password}
                    onChange={handleChange("password")}
                    onBlur={handleBlur("password")}
                    error={errors.password}
                    touched={touched.password}
                  />
                  <button type="button" onClick={() => showPassword(!password)}>
                    {password ? (
                      <AiOutlineEyeInvisible size={24} />
                    ) : (
                      <AiOutlineEye size={24} />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-primary-500">
                  Reset Password?
                </Link>
              </div>
               <div className="flex gap-3  pl-3 py-3">
                <input
                  type="checkbox"
                  className="w-4 mt-1 rounded-full h-4"
                  name="privacy"
                  id="privacy"
                  checked={accept}
                  onChange={handlePrivacyAccept}
                />
                <Box className="select-none">
                I have read and agreed all the documents and have consented to this{" "}
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
        <Box as="span" pl={1}>
          <Link  to="/refund-policy" className="underline mx-2 font-normal text-primary-500 cursor-pointer" >
            Refund Policy
          </Link>
          <Link to="/shipping-policy" className="underline mx-2 font-normal text-primary-500 cursor-pointer" >
            Shipping Policy
          </Link>
          <Link to="/tripartite-service" className="underline mx-2 font-normal text-primary-500 cursor-pointer" >
            Tri-Partite Service Agreement
          </Link>
          <a href="https://alterbuddy.s3.ap-south-1.amazonaws.com/Annexure-C.pdf" className="underline mx-2 font-normal text-primary-500 cursor-pointer" >
            Annexure C{" "}
          </a>
          
        </Box>
      )}
                  <Box as="span" className=" ml-2 font-semibold text-md text-primary-500 cursor-pointer" onClick={toggleLinks}>
        {showLinks ? "Less" : "More"}
      </Box>
                </Box>
                </div>  
              <div className="mt-4">
                <AppButton
                  disabled={!accept}
                  loading={loading}
                  type="submit"
                  filled
                  flexed
                >
                  Continue to login
                </AppButton>
              </div>
              <div className="mt-6 text-center text-[16px]">
  Don’t have an account?{" "}
  <span
    onClick={() => navigate("/sign-up")}
    className="text-primary-500 underline cursor-pointer"
  >
    Sign Up
  </span>
</div>
              <div className="mt-4">
                <AppButton flexed type="button" onClick={() => navigate("/")}>
                  Back to Home
                </AppButton>
              </div>
            </form>
          )}
        </Formik>
      </AuthModalBody>
    </div>
  );
};
