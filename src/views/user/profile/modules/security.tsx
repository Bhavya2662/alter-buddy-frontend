import { Formik } from "formik";
import { AppButton, TextField } from "../../../../component";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export interface IUserSecurityProps {
  handleUpdatePassword: ({
    oldPassword,
    confirmNewPassword,
    newPassword,
  }: {
    oldPassword: string,
    newPassword: string;
    confirmNewPassword: string;
  }) => void;
  setSelectedTab: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
}

export const 
Security: FC<IUserSecurityProps> = ({
  handleUpdatePassword,
  setSelectedTab,
  isLoading,
}) => {
  const [toggle, setToggle] = useState<boolean>(true);
  const [toggle2, setToggle2] = useState<boolean>(true);
  const [toggle3, setToggle3] = useState<boolean>(true);

  return (
    <div>
      <Formik
        onSubmit={handleUpdatePassword}
        initialValues={{ oldPassword: "", confirmNewPassword: "", newPassword: "" }}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <h6 className="text-3xl">
                Account <span className="text-primary-500">Security</span>
              </h6>
              <p className="text-gray-500">
                We are encrypt your password so no one misuse even they got the
                password
              </p>
            </div>
            <div className="flex items-end gap-3 mt-5">
              <TextField
                outlined
                type={toggle3 ? "password" : "text"}
                value={values.oldPassword}
                onChange={handleChange("oldPassword")}
                onBlur={handleBlur("oldPassword")}
                touched={touched.oldPassword}
                error={errors.oldPassword}
                label="Enter Old Password"
                placeholder="Enter Old Password"
                required
              />
              <AppButton
                filled
                type="button"
                onClick={() => setToggle3(!toggle)}
              >
                {toggle ? (
                  <AiOutlineEye size={26} />
                ) : (
                  <AiOutlineEyeInvisible size={26} />
                )}
              </AppButton>
            </div>
            <div className="flex items-end gap-3 mt-5">
              <TextField
                outlined
                type={toggle ? "password" : "text"}
                value={values.newPassword}
                onChange={handleChange("newPassword")}
                onBlur={handleBlur("newPassword")}
                touched={touched.newPassword}
                error={errors.newPassword}
                label="Enter New Password"
                placeholder="Enter New Password"
                required
              />
              <AppButton
                filled
                type="button"
                onClick={() => setToggle(!toggle)}
              >
                {toggle ? (
                  <AiOutlineEye size={26} />
                ) : (
                  <AiOutlineEyeInvisible size={26} />
                )}
              </AppButton>
            </div>
            <div className="flex items-end gap-3 mt-5">
              <TextField
                type={toggle2 ? "password" : "text"}
                outlined
                value={values.confirmNewPassword}
                onChange={handleChange("confirmNewPassword")}
                onBlur={handleBlur("confirmNewPassword")}
                touched={touched.confirmNewPassword}
                error={errors.confirmNewPassword}
                label="Confirm New Password"
                placeholder="Type your new password again"
                required
              />
              <AppButton
                filled
                type="button"
                onClick={() => setToggle2(!toggle2)}
              >
                {toggle2 ? (
                  <AiOutlineEye size={26} />
                ) : (
                  <AiOutlineEyeInvisible size={26} />
                )}
              </AppButton>
            </div>
            <div className="flex justify-end">
              <AppButton onClick={() => setSelectedTab(0)} type="button">
                Change Profile Details
              </AppButton>
              <AppButton
                disabled={isLoading}
                type="submit"
                filled
                loading={isLoading}
              >
                Change Password
              </AppButton>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
