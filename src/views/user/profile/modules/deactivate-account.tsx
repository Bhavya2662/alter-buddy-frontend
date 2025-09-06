import { useToast } from "@chakra-ui/react";
import {  useState } from "react";
import { useGetAllCategoryQuery, useLogoutUserMutation } from "../../../../redux/rtk-api";
import { useAppDispatch } from "../../../../redux";
import { handleError, handleUserLogout } from "../../../../redux/features";
import { removeUserToken } from "../../../../utils";
import { useNavigate } from "react-router-dom";


export const DeactivateAccount = () => {
    const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");

  const reasons = [
    "I have a privacy concern",
    "I receive too many emails",
    "I have another account",
    "I don't find it useful",
    "Other",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalReason = selectedReason === "Other" ? otherReason : selectedReason;
    console.log("Submitted reason:", finalReason);
    // Add API call or logic here
  };

  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(false);
    console.log("User logged out"); 
    // Add your logout logic here (e.g., API call, redirect)
  };

  const toast = useToast();

  const {
          data: category,
          isError: isCategoryError,
          isLoading: isCategoryLoading,
          error: categoryError,
      } = useGetAllCategoryQuery();
      const [
          LogoutApi,
          {
              isError: isLogoutError,
              isLoading: isLogoutLoading,
              isSuccess: isLogoutSuccess,
              error: logoutError,
          },
      ] = useLogoutUserMutation();

       const dispatch = useAppDispatch();
       const navigate = useNavigate();

      if (isLogoutSuccess) {
                  dispatch(handleUserLogout());
                  dispatch(handleError(null));
                  removeUserToken();
                  navigate("/", { replace: true });
              }

  const LogoutFunc = async () => {
    toast({
        title: 'Account Deactivated successfully.',
        description: 'Your account has been deactivated.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
    });
    return LogoutApi();
};

  return (
    <div className="space-y-3">
      <div className="bg-gray-100 flex px-4">
      <div className="p-8 w-full">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Deactivate Account</h2>
        <p className="mb-6 text-lg text-gray-600">Please let us know why you're deactivating your account:</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {reasons.map((reason, index) => (
            <div key={index} className="flex items-center">
              <input
                type="radio"
                id={`reason-${index}`}
                name="deactivation-reason"
                value={reason}
                checked={selectedReason === reason}
                onChange={() => setSelectedReason(reason)}
                className="mr-3 h-4 w-4  text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor={`reason-${index}`} className="text-lg text-gray-700">
                {reason}
              </label>
            </div>
          ))}

          {selectedReason === "Other" && (
            <textarea
              className="mt-2 w-full border border-gray-300 rounded-lg p-3 text-lg resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
              rows={4}
              placeholder="Please specify your reason..."
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              required
            />
          )}

          <button
            type="submit"
            onClick={() => {
              if (selectedReason && (selectedReason !== "Other" || otherReason.trim() !== "")) {
                setShowModal(true)
              } else {
                
              }
            }}
           
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Submit Reason
          </button>
        </form>
       
      </div>
    </div>
    {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Confirmation</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to deactivate account?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={ LogoutFunc}
                className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-700 transition"
              >
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
