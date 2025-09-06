import React, { useEffect, useState } from "react";
import { MainLayout } from "../../../layout";
import { AlterBuddyLogo } from "../../../assets/logo";
import { AppButton, TextField } from "../../../component";
import { toast } from "react-toastify";
import { useForgotPasswordMailMutation } from "../../../redux/rtk-api";
import { useNavigate } from "react-router-dom";

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [SendResetMail, { isError, error, isLoading, isSuccess, data }] =
    useForgotPasswordMailMutation();

  useEffect(() => {
    if (isError) {
      const err = error as any;
      if (err.data) {
        toast.error(err.data.message);
      } else {
        toast.error(err.message);
      }
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      navigate('/')
      toast.success(data?.data);
    }
  }, [isSuccess, data?.data]);

  const handleSendMail = async () => {
    if (!email) {
      toast.warn("Please enter email address first!");
    } else {
      await SendResetMail(email);
    }
  };
  return (
    <MainLayout>
      <div className="flex h-[50vh] items-center justify-center">
        <div className="w-[40%] p-3 shadow-lg border rounded-md flex flex-col gap-3 mx-auto">
          <AlterBuddyLogo />
          <h6 className="text-center text-gray-500">
            Forgot password? don't worry! enter your email address to reset...
          </h6>
          <TextField
            outlined
            placeholder="Enter email address"
            value={email}
            onChange={(prop) => setEmail(prop.target.value)}
            label="Email address"
          />
          <AppButton loading={isLoading} onClick={handleSendMail} filled>
            Send Reset Mail
          </AppButton>
          <div >
                          <AppButton flexed type="button" onClick={() => navigate("/")}>
                            Back to Home
                          </AppButton>
                        </div>
        </div>
      </div>
    </MainLayout>
  );
};
