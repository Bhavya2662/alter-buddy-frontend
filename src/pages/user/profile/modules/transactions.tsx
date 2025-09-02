import { FC, useState } from "react";
import { ITransactionProps } from "../../../../interface";
import moment from "moment";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export interface ITransactionsModuleProps {
  transactions: ITransactionProps[];
}

export const Transactions: FC<ITransactionsModuleProps> = ({
  transactions,
}) => {
  const [seleceted, setSelected] = useState<ITransactionProps | null>(null);
  return (
    <div>
      <h6 className="text-2xl font-semibold">
        Buddy Coin <span className="text-primary-500">Transactions</span>
      </h6>
      <h6 className="text-xl text-gray-500">
        Hey! Your BuddyCoins Transactions are here
      </h6>
      {!transactions?.length && (
        <div>
          <p>No transaction found</p>
        </div>
      )}
      {transactions?.length && (
        <div className="space-y-5 pr-3 mt-10 h-[60vh] overflow-y-scroll">
          {transactions?.map((props, i) => {
            const {
              transactionId,
              transactionType,
              createdAt,
              creditAmt,
              debitAmt,
              status,
            } = props;
            return (
              <div className="bg-white rounded-md p-3 flex justify-between items-center">
                <div>
                  <p
                    onClick={() => setSelected(props)}
                    key={i}
                    className="text-lg capitalize cursor-pointer"
                  >
                    {transactionType ? transactionType : "N/A"}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {moment(createdAt).format("LLL")} - {transactionId}
                  </p>
                </div>
                <div>
                  {creditAmt && (
                    <p className="text-green-500 text-xl text-right">
                      +{creditAmt/100}
                    </p>
                  )}
                  {debitAmt && (
                    <p className="text-red-500 text-xl text-right">
                      -{debitAmt}
                    </p>
                  )}
                  {status === "success" && debitAmt && (
                    <p className="text-sm bg-red-500 text-white px-3 py-1 uppercase rounded-lg">
                      Debit
                    </p>
                  )}
                  {status === "success" && creditAmt && (
                    <p className="text-sm bg-green-500 text-white px-3 py-1 uppercase rounded-lg">
                      Credit
                    </p>
                  )}
                  {status === "failed" && (
                    <p className="bg-red-500 text-sm">{status}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Dialog
        open={seleceted?._id?.length ? true : false}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setSelected(null)}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-950 bg-opacity-50">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-2xl capitalize font-medium text-gray-950"
              >
                Payment {seleceted?.status}
              </DialogTitle>
              <div className="mt-2 w-full space-y-3">
                <div className="flex justify-between items-center">
                  <h6 className="">Transaction Status</h6>
                  <h6>{seleceted?.status}</h6>
                </div>
                <div className="flex justify-between items-center">
                  <h6 className="">Coins Credited </h6>
                  <h6 className="text-green-500">
                    {seleceted?.creditAmt ? seleceted?.creditAmt : 0}
                  </h6>
                </div>
                <div className="flex justify-between items-center">
                  <h6>Coins Debited</h6>
                  <h6 className="text-red-500">
                    {seleceted?.debitAmt ? seleceted?.debitAmt : 0}
                  </h6>
                </div>
                <div className="flex justify-between items-center">
                  <h6>Date & Time</h6>
                  <h6 className="text-sm text-gray-500">
                    {moment(seleceted?.createdAt).format("LLL")}
                  </h6>
                </div>
                <div className="flex justify-between items-center">
                  <h6>Coins Debited</h6>
                  <h6 className="text-primary-500">
                    {seleceted?.transactionId
                      ? seleceted?.transactionId
                      : "N/A"}
                  </h6>
                </div>
                <div className="flex justify-between items-center">
                  <h6>Action Type</h6>
                  <h6 className="capitalize text-gray-500">
                    {seleceted?.transactionType}
                  </h6>
                </div>
                <div className="flex justify-between items-center">
                  <h6>Closure Balance</h6>
                  <h6 className="capitalize text-gray-500">
                    {seleceted?.walletId.balance}
                  </h6>
                </div>
              </div>
              <div className="mt-4 gap-3 flex justify-between">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-950 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-primary-500 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={() => setSelected(null)}
                >
                  Close
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-gray-500 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={() => setSelected(null)}
                >
                  Report
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-red-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-primary-500 focus:outline-none data-[hover]:bg-primary-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-primary-700"
                  onClick={() => setSelected(null)}
                >
                  Share
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
