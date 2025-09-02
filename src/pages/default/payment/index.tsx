import React, { useEffect, useRef } from "react";
import { MainLayout } from "../../../layout";
import { useValidateWalletMutation } from "../../../redux/rtk-api/buddy-coin.api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export const UserPaymentStatus = () => {
  const [param] = useSearchParams();
  const [ValidateRecharge, { isError, error, data, isLoading, isSuccess }] =
    useValidateWalletMutation();
  const payamentLinkId = param.get("razorpay_payment_id");
  const linkStatus = param.get("razorpay_payment_link_status");
  const navigate = useNavigate();
  const hasValidated = useRef(false);
  const redirection = localStorage.getItem("payment-redirection") ?? null;
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.data.message);
      if (redirection) {
        setTimeout(() => {
          navigate(redirection, { replace: true });
        }, 3000);
      } else {
        setTimeout(() => {
          navigate("/user/my-profile", {
            state: { tabIndex: 1 },
          });
        }, 3000);
      }
    }
  }, [isSuccess, data?.data.message, navigate]);

  useEffect(() => {
    // Only validate recharge if this is actually a wallet recharge, not a session booking
    // Check if there's a payment redirection - if so, this is likely a session booking
    const isSessionBooking = redirection && redirection.includes('mentor/details');
    
    if (payamentLinkId && !hasValidated.current && !isSessionBooking) {
      hasValidated.current = true; // Mark as validated to prevent multiple calls
      (async () => {
        await ValidateRecharge(payamentLinkId);
      })();
    } else if (isSessionBooking) {
      // For session bookings, just redirect without validating recharge
      setTimeout(() => {
        navigate(redirection, { replace: true });
      }, 2000);
    }
  }, [payamentLinkId, ValidateRecharge, redirection, navigate]);

  return (
    <MainLayout hideNav>
      {isLoading && (
        <div className="w-[50%]">Processing your recharge! please wait</div>
      )}
      {!isLoading && (
        <div className="flex h-screen w-screen justify-center items-center">
          <div className="bg-gray-100 w-[50%]">
            <div className="bg-white p-6  md:mx-auto">
              {linkStatus === "paid" && (
                <svg
                  viewBox="0 0 24 24"
                  className="text-green-600 w-16 h-16 mx-auto my-6"
                >
                  <path
                    fill="currentColor"
                    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                  ></path>
                </svg>
              )}
              {linkStatus === "cancelled" && (
                <svg
                  viewBox="0 0 24 24"
                  className="text-red-600 w-16 h-16 mx-auto my-6"
                >
                  <path
                    fill="currentColor"
                    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                  ></path>
                </svg>
              )}
              <div className="text-center">
                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                  Payment {linkStatus === "cancelled" && "Failed"}{" "}
                  {linkStatus === "paid" && "Paid"}!
                </h3>
                <p className="text-gray-600 my-2">
                  Thank you for completing your secure online payment.
                </p>
                <p>
                  {linkStatus === "paid" && "Have a great day!"}{" "}
                  {linkStatus === "cancelled" &&
                    "payment failed reason unknown"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};
