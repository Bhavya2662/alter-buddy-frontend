import React, { FC, ReactNode, useEffect, useState } from "react";
import { MdLogout, MdMessage, MdOutlineHome } from "react-icons/md";
import { IoMdCalendar } from "react-icons/io";
import { AiOutlineLoading, AiOutlineSetting } from "react-icons/ai";
import { BiPackage } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";
import { GoPackage } from "react-icons/go";
import { FiPhoneIncoming } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { FaMoneyBillAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import { IconLinkButton } from "../../../component";
import {
  useMentorSignOutMutation,
  useLazyMentorProfileQuery,
} from "../../../redux/rtk-api";
import { useAppDispatch } from "../../../redux";
import { handleMentorLogout } from "../../../redux/features";
import { removeMentorToken } from "../../../utils";
import { socket } from "../../../service";

interface MentorLayoutProps {
  children: ReactNode;
  loading?: boolean;
  hideNavs?: boolean;
}

const isProfileComplete = (profileData: any): boolean => {
  return !!(profileData?.name && profileData?.description);
};

export const MentorLayout: FC<MentorLayoutProps> = ({
  children,
  loading,
  hideNavs,
}) => {
  const [notification, setNotification] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [
    SignOut,
    { isError, error, data: signOutData, isLoading: isSigningOut, isSuccess },
  ] = useMentorSignOutMutation();

  const [
    triggerGetMentorProfile,
    { data: profile, isLoading: isProfileLoading },
  ] = useLazyMentorProfileQuery();

  useEffect(() => {
    triggerGetMentorProfile();
  }, []);

  useEffect(() => {
    if (!profile?.data) return;

    const complete = isProfileComplete(profile.data);
    if (!complete && location.pathname !== "/mentor/settings") {
      navigate("/mentor/settings", { replace: true });
    }
  }, [profile, location.pathname, navigate]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(signOutData?.data || "Logged out successfully");
      removeMentorToken();
      dispatch(handleMentorLogout());
      navigate("/mentor/login", { replace: true });
    } else if (isError) {
      console.error("Signout error:", error);
      toast.error("Failed to log out. Please try again.");
    }
  }, [isSuccess, isError]);

  const onSignOut = async () => {
    try {
      await SignOut();
    } catch (err) {
      console.error("Error during sign out:", err);
    }
  };

  useEffect(() => {
    const handleChatRequest = (data: any) => {
      if (data) {
        localStorage.setItem("chatRequestData", JSON.stringify(data));
        setNotification(true);
      }
    };

    socket.on("receiveChatRequest", handleChatRequest);
    return () => {
      socket.off("receiveChatRequest", handleChatRequest);
    };
  }, []);

  const isLoadingState = loading || isSigningOut || isProfileLoading;

  return (
    <div className="flex xl:flex-row lg:flex-row flex-col h-screen bg-primary-500 py-3 relative">
      {!hideNavs && (
        <div className="px-5 flex xl:flex-col xl:items-center xl:justify-center">
          <div className="flex xl:my-0 mb-5 lg:flex-row xl:flex-col md:flex-row w-full justify-center gap-3 items-center">
            <IconLinkButton
              Icon={MdOutlineHome}
              path="/mentor/dashboard"
              title="Dashboard"
            />
            <IconLinkButton
              Icon={FiPhoneIncoming}
              path="/mentor/call-history"
              title="Call History"
            />
            <IconLinkButton
              Icon={IoMdCalendar}
              path="/mentor/schedules"
              title="Schedules"
            />
            <IconLinkButton
              Icon={GoPackage}
              path="/mentor/packages"
              title="Packages"
            />
            <IconLinkButton
              Icon={BiPackage}
              path="/mentor/session-package"
              title="Session package"
            />
            <IconLinkButton
              Icon={HiUsers}
              path="/mentor/group-session"
              title="Group session"
            />

            <IconLinkButton
              Icon={MdMessage}
              path="/mentor/rant"
              isHighlighted={notification}
              title="Rant"
            />
            <IconLinkButton
              Icon={FaMoneyBillAlt}
              path="/mentor/payment-history"
              title="Payment history"

            />
            <IconLinkButton Icon={CgProfile} path="/mentor/settings" 
              title="Update profile"
            />
            <IconLinkButton
              Icon={AiOutlineSetting}
              path="/mentor/change-password"
              title="Change password"

            />
            <button type="button" onClick={onSignOut}>
              <MdLogout size={32} className="text-white" />
            </button>
          </div>
        </div>
      )}

      <main className="bg-primary-50 overflow-y-scroll p-5 rounded-tl-3xl z-10 rounded-bl-3xl flex-1 relative">
        {isLoadingState ? (
          <div className="flex justify-center items-center h-full w-full flex-col gap-10">
            <AiOutlineLoading
              size={150}
              className="fill-primary-500 animate-spin"
            />
            <p className="text-gray-500 text-2xl">Loading...</p>
          </div>
        ) : (
          <section className="bg-primary-50 h-full p-3">{children}</section>
        )}
      </main>
    </div>
  );
};
