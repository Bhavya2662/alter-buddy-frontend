import React, { useEffect, useState } from "react";
import { MainLayout } from "../../../layout";
import {
  useProfileUserQuery,
  useUpdateUserProfileMutation,
} from "../../../redux/rtk-api";
import { useAppDispatch } from "../../../redux";
import { handleError } from "../../../redux/features";
import { AppTabs } from "../../../component";
import { toast } from "react-toastify";
import {
  useGetMyTransactionQuery,
  useGetMyWalletQuery,
  useRechargeWalletMutation,
} from "../../../redux/rtk-api/buddy-coin.api";
import {
  BuddyCoins,
  Security,
  Transactions,
  UserProfile,
  DeactivateAccount,
} from "./modules";
import { useLocation } from "react-router-dom";
import Activity from "./modules/activity";

export const UserProfilePage = () => {
  const dummyData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "moderator",
      status: "Active",
    },
  ];
 
  const [amount, setAmount] = useState<number>();
  const location = useLocation();
  // const initialTab = location.state?.tabIndex ?? 0;
  // const [selectedTab, setSelectedTab] = useState<number>(initialTab);

  const getInitialTab = () => {
    if (location.state?.tabIndex !== undefined) {
      return location.state.tabIndex;
    }
    const savedTab = localStorage.getItem("selectedTab");
    return savedTab !== null ? parseInt(savedTab) : 0;
  };
  
  const [selectedTab, setSelectedTab] = useState<number>(getInitialTab);
  
  useEffect(() => {
    localStorage.setItem("selectedTab", selectedTab.toString());
  }, [selectedTab]);
  
 
  useEffect(() => {
    if (location.state?.tabIndex !== undefined) {
      window.history.replaceState({}, document.title); 
    }
  }, []);

  const {
    data: profile,
    isError: isProfileError,
    isLoading: isProfileLoading,
    error: profileError,
  } = useProfileUserQuery();
  const {
    data: transactions,
    isError: isTransactionError,
    error: transactionError,
  } = useGetMyTransactionQuery();
  const [
    UpdateProfile,
    {
      isError: isUpdateError,
      error: updateError,
      data: updateData,
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
    },
  ] = useUpdateUserProfileMutation();
  const { data: wallet } = useGetMyWalletQuery();
  const [
    RechargeWallet,
    {
      isError: isRechargeError,
      error: rechargeError,
      data: rechargeData,
      isLoading: isRechargeLoading,
      isSuccess: isRechargeSuccess,
    },
  ] = useRechargeWalletMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isProfileError) {
      if ((profileError as any).data) {
        dispatch(handleError((profileError as any).data.message));
      } else {
        console.log(profileError);
      }
    }
  }, [isProfileError, profileError, dispatch]);

  useEffect(() => {
    if (isTransactionError) {
      console.log(transactionError);
    }
  }, [isTransactionError, transactionError]);

  useEffect(() => {
    if (isUpdateError) {
      if ((updateError as any)?.data) {
        dispatch(handleError((updateError as any).data.message));
      } else {
        console.log(updateError);
      }
    }
  }, [isUpdateError, updateError, dispatch]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success(updateData?.data);
    }
  }, [isUpdateSuccess, updateData?.data]);

  useEffect(() => {
    if (isRechargeError) {
      console.log(rechargeError);
      const error = rechargeError as any;
      if (error.data) {
        toast.error(error.data.message);
      } else {
        toast.error(error);
      }
    }
  }, [isRechargeError, rechargeError]);

  const handleSubmit = async (prop: any) => {
    await UpdateProfile({ ...prop });
  };

  const handleUpdatePassword = async ({
    confirmNewPassword,
    newPassword,
  }: {
    newPassword: string;
    confirmNewPassword: string;
  }) => {
    if (newPassword === "" || confirmNewPassword === "") {
      toast.warn("please enter password");
    } else {
      if (newPassword !== confirmNewPassword) {
        toast.warn("both password should be same");
      } else {
        await UpdateProfile({ password: confirmNewPassword });
      }
    }
  };

  const RenewWallet = async () => {
    if (!amount) {
      toast.warn("please enter amount");
    } else {
      await RechargeWallet(amount);
    }
  };

  useEffect(() => {
    if (isRechargeSuccess) {
      toast.success(rechargeData?.data.message);
      window.location.replace(rechargeData.data.razorPay.short_url);
    }
  }, [isRechargeSuccess, rechargeData]);
  useEffect(() => {
    if (selectedTab != 1) {
      localStorage.removeItem("payment-redirection");
    }
  }, [selectedTab]);
  const amountOption = [100, 200, 500, 800, 1000];

  return (
    <MainLayout loading={isProfileLoading} hideNav={false}>
      <div className="p-3 mt-24 xl:container mx-auto">
        <div className="xl:mt-10">
          <AppTabs
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            tabs={[
              {
                Component: (
                  <UserProfile
                    handleSubmit={handleSubmit}
                    isUpdateLoading={isUpdateLoading}
                    profile={profile?.data}
                    setSelectedTab={setSelectedTab}
                  />
                ),
                label: "profile",
              },
              {
                Component: (
                  <BuddyCoins
                    RenewWallet={RenewWallet}
                    lastRecharge={wallet?.data.updatedAt}
                    walletBalance={wallet?.data.balance}
                    amount={amount}
                    setAmount={setAmount}
                    amountOption={amountOption}
                    isRechargeLoading={isRechargeLoading}
                  />
                ),
                label: "Buddy Coins",
              },
              {
                Component: <Activity />,
                label: "Activity",
              },
              {
                Component: <Transactions transactions={transactions?.data} />,
                label: "Transactions",
              },
              {
                Component: <DeactivateAccount />,
                label: "Deactivate Account",
              },
              {
                Component: (
                  <Security
                    isLoading={isUpdateLoading}
                    handleUpdatePassword={handleUpdatePassword}
                    setSelectedTab={setSelectedTab}
                  />
                ),
                label: "Security",
              },
            ]}
          />
        </div>
      </div>
    </MainLayout>
  );
};
