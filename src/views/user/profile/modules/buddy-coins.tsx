import moment from "moment";
import { Dispatch, FC, SetStateAction } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { TextField } from "../../../../component";
import clsx from "clsx";

export interface IBuddyCoinsModuleProps {
  walletBalance: number;
  RenewWallet: () => void;
  lastRecharge: string;
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  isRechargeLoading: boolean;
  amountOption: number[];
}

export const BuddyCoins: FC<IBuddyCoinsModuleProps> = ({
  RenewWallet,
  walletBalance,
  lastRecharge,
  amount,
  setAmount,
  isRechargeLoading,
  amountOption,
}) => {
  return (
    <div className="space-y-3">
      <div className="mx-auto w-[60%] bg-white overflow-hidden mt-10">
        <div className="px-6 py-4">
          <h1 className="text-2xl text-gray-800">
            BuddyCoin{" "}
            <span className="text-primary-500 font-semibold">Wallet</span>
          </h1>
          <div className="flex items-start justify-between mt-4">
            <div>
              <h2 className="text-lg text-gray-600">Coins</h2>
              <p className="text-3xl font-bold text-black">{walletBalance ? walletBalance : 0}</p>
            </div>
            <p className="text-gray-500 text-sm uppercase flex items-center gap-3">
              <AiOutlineClockCircle size={24} />{" "}
              {moment(lastRecharge).format("LLLL")}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                RenewWallet();
              }}
            >
              <div className="flex justify-end mt-5 gap-10">
                <div className="gap-10 flex items-center">
                  <TextField
                    type="number"
                    outlined
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) =>
                      setAmount(parseInt(e.target.value) as number)
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {isRechargeLoading ? "Redirecting..." : "Recharge"}
                </button>
              </div>
            </form>

            <div className="flex items-center gap-3 mt-5">
              {amountOption.map((selectedAmount) => (
                <button
                  className={clsx(
                    amount === selectedAmount &&
                      "focus:ring-2 focus:ring-primary-500 bg-primary-100 ",
                    "py-2 rounded-md px-5 bg-gray-100"
                  )}
                  onClick={() => setAmount(selectedAmount)}
                >
                  {selectedAmount}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
