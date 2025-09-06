import React, { useState, useEffect } from "react";
import { MentorLayout } from "../../../layout";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { AppButton } from "../../../component";
import moment from "moment";
import { AiOutlineLoading } from "react-icons/ai";
import { useMentorWalletHistoryQuery } from "../../../redux/rtk-api";

// Group transactions by year and month
const groupTransactionsByYearMonth = (transactions = []) => {
  const grouped = {};
  transactions.forEach((tx) => {
    const year = moment(tx.createdAt).format("YYYY");
    const month = moment(tx.createdAt).format("MMMM");
    if (!grouped[year]) grouped[year] = {};
    if (!grouped[year][month]) grouped[year][month] = [];
    grouped[year][month].push(tx);
  });
  return grouped;
};

const MentorWalletTable = ({ data }: { data: any[] }) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns: ColumnDef<any>[] = [
    {
      header: "Sr",
      cell: ({ row }) => row.index + 1,
    },
    {
      header: "Date",
      cell: ({ row }) => moment(row.original.createdAt).format("lll"),
    },
    {
      header: "User",
      cell: ({ row }) =>
        `${row.original.userId?.name?.firstName ?? ""} ${row.original.userId?.name?.lastName ?? ""}`,
    },
    {
      header: "Description",
      cell: ({ row }) => row.original.description || "-",
    },
    {
      header: "Type",
      cell: ({ row }) => <span className="capitalize">{row.original.type}</span>,
    },
    {
      header: "Status",
      cell: ({ row }) => <span className="capitalize font-medium">{row.original.status}</span>,
    },
    {
      header: "Total Amount",
      cell: ({ row }) => `₹${parseFloat(row.original.amount).toFixed(2)}`,
    },
    {
      header: "Gateway Charges (2.36%)",
      cell: ({ row }) => `₹${(parseFloat(row.original.amount) * 0.0236).toFixed(2)}`,
    },
    {
      header: "Alter Buddy Share (30%)",
      cell: ({ row }) => `₹${(parseFloat(row.original.amount) * 0.3).toFixed(2)}`,
    },
    {
      header: "Reviced By Alter Buddy",
      cell: ({ row }) => {
        const amount = parseFloat(row.original.amount);
        const pg = amount * 0.0236;
        const share = amount * 0.3;
        return <span className="text-green-600 font-medium">₹{(share - pg).toFixed(2)}</span>;
      },
    },
    {
      header: "Mentor Share (70%)",
      cell: ({ row }) => `₹${(parseFloat(row.original.amount) * 0.7).toFixed(2)}`,
    },
    {
      header: "TDS (10%)",
      cell: ({ row }) => {
        const mentorShare = parseFloat(row.original.amount) * 0.7;
        const tds = mentorShare * 0.1;
        return <span className="text-green-600 font-medium">₹{tds.toFixed(2)}</span>;
      },
    },
    {
      header: "Mentor Payment",
      cell: ({ row }) => {
        const mentorShare = parseFloat(row.original.amount) * 0.7;
        const tds = mentorShare * 0.1;
        return <span className="text-green-600 font-medium">₹{(mentorShare - tds).toFixed(2)}</span>;
      },
    },
  ];

  const table = useReactTable({
    data: data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="overflow-x-auto bg-white px-3 pb-3 mt-5 rounded-lg font-libre">
      <table className="w-full caption-top text-sm">
        <thead className="bg-primary-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4 py-3 text-left font-semibold text-sm text-primary-800">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 text-left text-sm">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setPagination(prev => ({ ...prev, pageIndex: Math.max(prev.pageIndex - 1, 0) }))}
          disabled={pagination.pageIndex === 0}
          className="px-4 py-1 bg-primary-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-gray-500 text-sm">
          Page {pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          onClick={() =>
            setPagination(prev => ({
              ...prev,
              pageIndex: Math.min(prev.pageIndex + 1, table.getPageCount() - 1),
            }))
          }
          disabled={pagination.pageIndex === table.getPageCount() - 1}
          className="px-4 py-1 bg-primary-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export const MentorPaymentHistoryPage = () => {
  const { data, isLoading } = useMentorWalletHistoryQuery();
  const transactions = data?.data?.transactions || [];

  const grouped = groupTransactionsByYearMonth(transactions);
  const years = Object.keys(grouped);

  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const currentMonthData =
    selectedYear && selectedMonth
      ? grouped[selectedYear][selectedMonth] || []
      : [];

  return (
    <MentorLayout>
      <div>
        <div className="flex items-center justify-between py-3">
          <h1 className="text-3xl font-libre capitalize">Payment History</h1>
          <AppButton outlined>Export history</AppButton>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <AiOutlineLoading size={80} className="animate-spin" />
          </div>
        ) : (
          <>
            {/* Breadcrumbs */}
            {selectedYear && !selectedMonth && (
              <div className="text-sm text-gray-500 mb-2">
                <span
                  className="text-primary-600 font-semibold cursor-pointer"
                  onClick={() => {
                    setSelectedMonth(null);
                    setSelectedYear(null);
                  }}
                >
                  Home
                </span>{" > "}
                <span className="font-semibold">{selectedYear}</span>
              </div>
            )}

            {selectedYear && selectedMonth && (
              <div className="text-sm text-gray-500 mb-2">
                <span
                  className="text-primary-600 font-semibold cursor-pointer"
                  onClick={() => {
                    setSelectedMonth(null);
                    setSelectedYear(null);
                  }}
                >
                  Home
                </span>
                {" >  "}
                <span
                  className="text-primary-600 font-semibold cursor-pointer"
                  onClick={() => setSelectedMonth(null)}
                >
                  {selectedYear}
                </span>
                {" >  "}
                <span className="font-semibold">{selectedMonth}</span>
              </div>
            )}

            {/* Year Selection */}
            {!selectedYear && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                {years.map((year) => (
                  <div
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className="cursor-pointer p-4 border rounded-lg shadow hover:bg-primary-100 text-center font-medium"
                  >
                    {year}
                  </div>
                ))}
              </div>
            )}

            {/* Month Selection */}
            {selectedYear && !selectedMonth && (
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">Months in {selectedYear}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {Object.keys(grouped[selectedYear]).map((month) => (
                    <div
                      key={month}
                      onClick={() => setSelectedMonth(month)}
                      className="cursor-pointer p-4 border rounded-lg shadow hover:bg-primary-100 text-center font-medium"
                    >
                      {month}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Table */}
            {selectedYear && selectedMonth && (
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-2">
                  {selectedMonth}, {selectedYear}
                </h2>
                <MentorWalletTable data={currentMonthData} />
              </div>
            )}
          </>
        )}
      </div>
    </MentorLayout>
  );
};
