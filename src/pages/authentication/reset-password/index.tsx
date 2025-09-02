import React, { useEffect, useState } from "react";
import { MainLayout } from "../../../layout";
import { AlterBuddyLogo } from "../../../assets/logo";
import { AppButton, TextField } from "../../../component";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useLazyValidateResetTokenQuery,
  useResetPasswordMutation,
} from "../../../redux/rtk-api";
import { AiOutlineLoading } from "react-icons/ai";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export const ResetPasswordPage = () => {
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const [
    ValidateToken,
    { isError, error, data, isFetching, isLoading, isSuccess },
  ] = useLazyValidateResetTokenQuery();

  const [
    ResetPassword,
    {
      isError: isResetError,
      error: resetError,
      data: resetData,
      isLoading: isResetLoading,
      isSuccess: isResetSuccess,
    },
  ] = useResetPasswordMutation();

  const [param] = useSearchParams();
  const token = param.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      const err = error as any;
      if (err.data) {
        if (err.data.message === "jwt expired") {
          navigate("/forgot-password", { replace: true });
        } else toast.error(err.data.message);
      } else {
        toast.error(err.message);
      }
    }
  }, [isError, error, navigate]);

  useEffect(() => {
    if (isResetError) {
      const err = resetError as any;
      if (err.data) {
        if (err.data.message === "TOKEN_NOT_EXIST") {
          toast.error("something went wrong please try again");
          navigate("/forgot-password", { replace: true });
        }
        if (err.data.message === "Token is expired please request new one!") {
          navigate("/forgot-password", { replace: true });
        } else toast.error(err.data.message);
      } else {
        toast.error(err.message);
      }
    }
  }, [isResetError, resetError, navigate]);

  useEffect(() => {
    if (isResetSuccess) {
      toast.success(resetData?.data);
      navigate("/", { replace: true });
    }
  }, [isResetSuccess, resetData?.data, navigate]);

  useEffect(() => {
    if (token?.length) {
      (async () => {
        await ValidateToken(token);
      })();
    } else {
      toast.error("something went wrong! please try again");
    }
  }, [token, ValidateToken]);

  useEffect(() => {
    if (isSuccess) {
      if (data?.data === "DONE") {
        toast.success("Good to see you here!");
      }
    }
  }, [isSuccess, data?.data]);

  const handleResetPassword = async () => {
    if (!password || !newPassword) {
      toast.warn("missing fields! please enter password");
    } else {
      if (password !== newPassword) {
        toast.warn("both password should be matched first");
      } else {
        await ResetPassword({ newPassword, password, token });
      }
    }
  };

  return (
    <MainLayout>
      <div className="h-[50vh] flex justify-center items-center">
        {!isFetching && !isLoading && (
          <div className="w-[40%] p-3 shadow-lg border rounded-md flex flex-col gap-3 mx-auto">
            <AlterBuddyLogo />
            <h6 className="text-center text-gray-500">
              Reset password! Great to see you here! Enter your new passwords to continue...
            </h6>

            {/* New Password Field */}
            <div className="relative">
              <TextField
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(prop) => setPassword(prop.target.value)}
                label="New Password"
                outlined
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 mt-3"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
              </div>
            </div>

            {/* Confirm New Password Field */}
            <div className="relative">
              <TextField
                type={showConfirmPassword ? "text" : "password"}
                value={newPassword}
                onChange={(prop) => setNewPassword(prop.target.value)}
                label="Confirm New Password"
                outlined
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 mt-3"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
              </div>
            </div>

            {/* Reset Password Button */}
            <AppButton
              filled
              loading={isLoading || isFetching || isResetLoading}
              onClick={handleResetPassword}
            >
              Reset Password
            </AppButton>
          </div>
        )}
        {isFetching && isLoading && (
          <AiOutlineLoading className="animate-spin text-primary-500 w-[100px]" />
        )}
      </div>
    </MainLayout>
  );
};
