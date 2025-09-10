import { Formik } from "formik";
import { AppButton, TextField } from "../../../../component";
import { UserProps } from "../../../../interface";
import { Dispatch, FC, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useMentorSignInMutation } from "../../../../redux/rtk-api";
import { useAppDispatch } from "../../../../redux";
import { handleMentorAuthentication } from "../../../../redux/features";
import { setMentorToken } from "../../../../utils";
import { toast } from "react-toastify";

export interface IUserProfileModuleProps {
  handleSubmit: (props: UserProps) => void;
  setSelectedTab: Dispatch<SetStateAction<number>>;
  profile: UserProps;
  isUpdateLoading: boolean;
}

export const UserProfile: FC<IUserProfileModuleProps> = ({
  handleSubmit,
  setSelectedTab,
  profile,
  isUpdateLoading,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [mentorSignIn, { isLoading: isMentorLoginLoading }] = useMentorSignInMutation();

  const handleMentorLogin = () => {
    // Navigate to mentor login page
    navigate("/mentor/login");
  };
  return (
    <div >
      <div className="flex justify-between items-center mb-6">
        <h6 className="text-2xl">My Profile</h6>
        <AppButton 
          onClick={handleMentorLogin}
          outlined={false}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-none flex items-center gap-2"
        >
          <span className="text-lg">🎓</span>
          <span>Login as Mentor</span>
        </AppButton>
      </div>
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={
          {
            name: {
              firstName: profile?.name?.firstName || "",
              lastName: profile?.name?.lastName || "",
            },
            email: profile?.email || "",
            mobile: profile?.mobile || "",
          } as UserProps
        }
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form className="mt-5 space-y-5" onSubmit={handleSubmit}>
            <div className="flex gap-5 flex-wrap xl:flex-nowrap">
              <TextField
                outlined
                label="First Name"
                value={values.name.firstName}
                onChange={handleChange("name.firstName")}
                onBlur={handleBlur("name.firstName")}
                touched={touched?.name?.firstName as boolean}
                error={errors?.name?.firstName as string}
              />
              <TextField
                outlined
                label="Last Name"
                value={values.name.lastName}
                onChange={handleChange("name.lastName")}
                onBlur={handleBlur("name.lastName")}
                touched={touched?.name?.lastName as boolean}
                error={errors?.name?.lastName as string}
              />
            </div>
            <div>
              <TextField
                outlined
                label="Email Address"
                value={values.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                touched={touched.email as boolean}
                error={errors.email as string}
              />
            </div>
            <div>
              <TextField
                outlined
                label="Mobile Number"
                value={values.mobile}
                onChange={handleChange("mobile")}
                onBlur={handleBlur("mobile")}
                touched={touched.mobile as boolean}
                error={errors.mobile as string}
              />
            </div>
            <div className="flex justify-end gap-5">
              <AppButton onClick={() => setSelectedTab(5)}>
                Update Password
              </AppButton>
              <AppButton type="submit" outlined loading={isUpdateLoading}>
                Save Changes
              </AppButton>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
