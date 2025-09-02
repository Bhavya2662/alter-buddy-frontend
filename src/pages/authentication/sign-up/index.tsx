import React, { useEffect } from "react";
import { SignUpBody } from "../../../component";
import { useRegisterUserMutation } from "../../../redux/rtk-api";
import { toast } from "react-toastify";
import { getUserToken, setUserToken } from "../../../utils";
import { useAppDispatch } from "../../../redux";
import { handleUserAuthentication } from "../../../redux/features";
import { UserRegisterProps } from "../../../interface";
import { useNavigate } from "react-router-dom";

export const SignUpPage = () => {
  const [
    RegisterApi,
    {
      isError: isRegisterError,
      error: registerError,
      isLoading: isRegisterLoading,
      isSuccess: isRegisterSuccess,
      data: registerData,
    },
  ] = useRegisterUserMutation();
  const localStore = getUserToken();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isRegisterError) {
      if ((registerError as any)?.data) {
        toast.error(((registerError as any)?.data as any)?.message as any);
      } else {
        console.log(registerError);
      }
    }
    if (isRegisterSuccess) {
      toast.success(
        `${registerData?.data?.user?.name?.firstName} is registered with AlterBuddy`
      );
      navigate("/", { replace: true });
      setUserToken(registerData?.data.token as string);
      if (localStore) {
        dispatch(
          handleUserAuthentication({
            token: registerData?.data.token as string,
          })
        );
      }
    }
  }, [
    isRegisterError,
    registerError,
    isRegisterSuccess,
    registerData?.data,
    dispatch,
    localStore,
    navigate,
  ]);

  const RegisterFunc = async ({
    email,
    fname,
    lname,
    mobile,
    password,
    c_password,
  }: UserRegisterProps) => {
    if (password !== c_password) {
      toast.warn("both passwords input should be matched");
    } else await RegisterApi({ email, fname, lname, mobile, password });
  };
  return (
    <div className="w-[80%] mx-auto h-screen flex justify-center items-center">
      <SignUpBody loading={isRegisterLoading} registerFunc={RegisterFunc} />
    </div>
  );
};
