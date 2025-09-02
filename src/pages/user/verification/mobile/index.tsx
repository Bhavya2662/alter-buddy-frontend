import React, { useEffect, useState } from "react";
import { MainLayout } from "../../../../layout";
import { AppButton, TextField } from "../../../../component";
import { useProfileUserQuery, useSendVerificationCodeMutation, useVerifyCodeMutation } from "../../../../redux/rtk-api";
import {
     handleError,
     handleOtpInput,
     handleVerificationMode,
     useInputSlice,
     useLayoutSlice,
} from "../../../../redux/features";
import { useAppDispatch } from "../../../../redux";
import { useNavigate } from "react-router-dom";

export const MobileVerificationPage = () => {
     const { data } = useProfileUserQuery();
     const [counter, setCounter] = useState(30);
     const [sent, setSent] = useState("");
     const { otp } = useInputSlice();
     const { verificationMode } = useLayoutSlice();
     const navigate = useNavigate();
     const [
          GetOtpApi,
          { isError: isGetOtpError, error: getOtpError, isLoading: isGetOtpLoading, isSuccess: isGetOtpSuccess },
     ] = useSendVerificationCodeMutation();
     const [VerifyCodeApi, { isError: isOtpError, isLoading: isOtpLoading, isSuccess: isOtpSuccess, error: otpError }] =
          useVerifyCodeMutation();

     const dispatch = useAppDispatch();

     useEffect(() => {
          if (isGetOtpError) {
               dispatch(handleError((getOtpError as any).data.message));
          }
          if (isOtpError) {
               dispatch(handleError((otpError as any).data.message));
          }
          if (isGetOtpSuccess) {
               dispatch(handleVerificationMode());
               setSent("Otp has been sent successfully");
          }
          if (isOtpSuccess) {
               navigate("/", { replace: true });
          }
     }, [isGetOtpError, getOtpError, dispatch, isOtpError, otpError, isGetOtpSuccess, isOtpSuccess, navigate]);

     React.useEffect(() => {
          verificationMode === "otp" && counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
     }, [counter, verificationMode]);

     const GetOTPFunc = async () => {
          if (verificationMode === "mobile") {
               await GetOtpApi(data?.data.mobile as string);
          } else {
               await VerifyCodeApi({ mobile: data?.data.mobile as string, code: otp as string });
          }
     };

     return (
          <MainLayout hideNav>
               <div className="h-screen flex justify-center items-center">
                    <div className="container mx-auto w-[50%] rounded-lg p-10  h-[50%] gap-10 flex flex-col">
                         <h6 className="text-3xl capitalize text-center">Verify your mobile number?</h6>
                         {sent && <p className="text-green-500">{sent}</p>}
                         {verificationMode === "mobile" && (
                              <TextField value={`+91 ${data?.data.mobile}`} label="Your mobile number" />
                         )}
                         {verificationMode === "otp" && (
                              <TextField
                                   value={otp}
                                   onChange={(e) => dispatch(handleOtpInput(e.target.value))}
                                   placeholder="* * * * * *"
                                   label="Enter received OTP"
                              />
                         )}
                         {verificationMode === "otp" && counter > 0 && (
                              <button className="text-left">Resend in {counter}</button>
                         )}
                         {counter === 0 && (
                              <button
                                   onClick={() => dispatch(handleVerificationMode())}
                                   className="text-primary-500 text-left"
                              >
                                   Resend now
                              </button>
                         )}
                         <div className="flex justify-between items-center gap-20">
                              {verificationMode === "mobile" && (
                                   <AppButton outlined onClick={() => navigate("/", { replace: true })}>
                                        Go back
                                   </AppButton>
                              )}
                              <AppButton
                                   loading={isGetOtpLoading || isOtpLoading}
                                   outlined
                                   disabled={verificationMode === "otp" && !otp?.length}
                                   flexed
                                   onClick={GetOTPFunc}
                              >
                                   {verificationMode === "mobile" ? "Get OTP" : "Verify now"}
                              </AppButton>
                         </div>
                    </div>
               </div>
          </MainLayout>
     );
};
