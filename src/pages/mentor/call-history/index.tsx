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
import { FiMessageSquare, FiPhone, FiVideo, FiDownload } from "react-icons/fi";
import moment from "moment";
import { useMentorGetMyCallsQuery } from "../../../redux/rtk-api";
import { IChatProps } from "../../../interface";
import { AiOutlineLoading } from "react-icons/ai";
import { saveAs } from "file-saver";
import axios from "axios";

const groupCallsByYearMonth = (calls: IChatProps[] = []) => {
  const grouped: Record<string, Record<string, IChatProps[]>> = {};
  calls.forEach((call) => {
    const year = moment(call.sessionDetails.startTime).format("YYYY");
    const month = moment(call.sessionDetails.startTime).format("MMMM");
    if (!grouped[year]) grouped[year] = {};
    if (!grouped[year][month]) grouped[year][month] = [];
    grouped[year][month].push(call);
  });
  return grouped;
};

function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

const highlightMatch = (text: string, query: string) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, i) => (
    <span
      key={i}
      className={
        part.toLowerCase() === query.toLowerCase() ? "bg-yellow-200" : ""
      }
    >
      {part}
    </span>
  ));
};

const exportToCSV = (data: IChatProps[], fileName = "call-history.csv") => {
  const header = [
    "Sr.No",
    "User Name",
    "Call Type",
    "Start Time",
    "End Time",
    "Duration",
    "Status",
  ];
  const rows = data.map((row, index) => {
    const srNo = index + 1;
    const name = `${row?.users?.user?.name?.firstName ?? ""} ${
      row?.users?.user?.name?.lastName ?? ""
    }`;
    const type = row.sessionDetails.callType;
    const start = row.sessionDetails.startTime;
    const end = row.sessionDetails.endTime;
    const duration = row.sessionDetails.duration;
    const now = new Date();
    const status =
      now < new Date(start)
        ? "Upcoming"
        : now > new Date(end)
        ? "Completed"
        : "Ongoing";
    return [srNo, name, type, start, end, duration, status];
  });
  const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, fileName);
};

export const CallTable = ({
  data,
  searchText,
}: {
  data: IChatProps[];
  searchText: string;
}) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [downloadingRecording, setDownloadingRecording] = useState<string | null>(null);

  useEffect(() => {
    setPagination({ pageIndex: 0, pageSize: 10 });
  }, [searchText]);

  const handleDownloadRecording = async (callId: string) => {
    try {
      setDownloadingRecording(callId);
      const response = await axios.get(`/api/call/recording/${callId}`);
      
      if (response.data.success && response.data.data.recordingUrl) {
        window.open(response.data.data.recordingUrl, '_blank');
      } else if (response.data.data.recordingStatus === 'processing') {
        alert('Recording is still being processed. Please try again later.');
      } else {
        alert('Recording not available for this call.');
      }
    } catch (error) {
      console.error('Error fetching recording:', error);
      alert('Failed to fetch recording. Please try again.');
    } finally {
      setDownloadingRecording(null);
    }
  };

  const columns: ColumnDef<IChatProps>[] = [
    {
      header: "Sr",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      header: "User Name ",
      accessorKey: "userId",
      cell: ({ row }) => {
        const fullName = `${row.original?.users?.user?.name?.firstName ?? ""} ${
          row.original?.users?.user?.name?.lastName ?? ""
        }`;
        return (
          <p className="capitalize">{highlightMatch(fullName, searchText)}</p>
        );
      },
    },
    {
      accessorKey: "call Type",
      cell: ({ row }) => {
        const type = row.original.sessionDetails.callType;
        return (
          <div>
            {type === "audio" && <FiPhone size={24} />}
            {type === "video" && <FiVideo size={24} />}
            {type === "chat" && <FiMessageSquare size={24} />}
          </div>
        );
      },
    },
    {
      header: "Start Time",
      accessorKey: "startTime",
      cell: ({ row }) => {
        const start = row.original.sessionDetails?.startTime;
        return (
          <p>
            {start ? (
              moment(start).format("lll")
            ) : (
              <span className="text-gray-500">N/A</span>
            )}
          </p>
        );
      },
    },
    {
      header: "End Time",
      accessorKey: "endTime",
      cell: ({ row }) => {
        const end = row.original.sessionDetails?.endTime;
        return (
          <p>
            {end ? (
              moment(end).format("lll")
            ) : (
              <span className="text-gray-500">N/A</span>
            )}
          </p>
        );
      },
    },
    {
      accessorKey: "duration",
      cell: ({ row }) => (
        <p>
          {row.original.sessionDetails.duration ? (
            row.original.sessionDetails.duration.toString()
          ) : (
            <span className="text-gray-500">N/A</span>
          )}
        </p>
      ),
    },
    {
      header: "Status",
      cell: ({ row }) => {
        const now = new Date();
        const start = new Date(row.original.sessionDetails.startTime);
        const end = new Date(row.original.sessionDetails.endTime);
        let status = "Upcoming";
        if (now >= start && now <= end) status = "Ongoing";
        else if (now > end) status = "Completed";
        return <span className="capitalize font-medium">{status}</span>;
      },
    },
    {
      header: "Action",
      cell: ({ row }) => {
        const now = new Date();
        const start = new Date(row.original.sessionDetails.startTime);
        const end = new Date(row.original.sessionDetails.endTime);
        const isOngoing = now >= start && now <= end;
        const isCompleted = now > end;
        const callType = row.original.sessionDetails.callType;
        const callId = row.original._id;
        
        if (isOngoing) {
          return (
            <a
              href={`https://alter-videoconf-1123.app.100ms.live/meeting/${row.original.sessionDetails.roomId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Join Room
            </a>
          );
        }
        
        if (isCompleted && (callType === 'audio' || callType === 'video')) {
          return (
            <button
              onClick={() => handleDownloadRecording(callId)}
              disabled={downloadingRecording === callId}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:bg-gray-400 flex items-center gap-1"
            >
              {downloadingRecording === callId ? (
                <AiOutlineLoading className="animate-spin" size={16} />
              ) : (
                <FiDownload size={16} />
              )}
              Recording
            </button>
          );
        }
        
        return <span className="text-gray-400">N/A</span>;
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="bg-[#fdeeee] px-3 pb-3 mt-5 rounded-lg font-libre">
      {data.length === 0 ? (
        <div className="text-center py-10 text-gray-600">No results found.</div>
      ) : (
        <>
          <table className="w-full caption-top text-sm">
            <thead className="bg-primary-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="h-14 px-4 text-left uppercase font-semibold text-sm text-primary-800"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b border-default-300">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: Math.max(prev.pageIndex - 1, 0),
                }))
              }
              className="px-4 py-1 bg-gray-300 text-gray-700 rounded disabled:bg-gray-100"
              disabled={pagination.pageIndex === 0}
            >
              Previous
            </button>
            <span className="text-gray-500 text-sm">
              Page {pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <button
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: Math.min(
                    prev.pageIndex + 1,
                    table.getPageCount() - 1
                  ),
                }))
              }
              className="px-4 py-1 bg-red-500 text-white rounded disabled:bg-gray-100"
              disabled={pagination.pageIndex === table.getPageCount() - 1}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export const MentorCallHistoryPage = () => {
  const { data: calls, isLoading } = useMentorGetMyCallsQuery();
  const rawData = calls?.data || [];
  const groupedCalls = groupCallsByYearMonth(rawData);
  const years = Object.keys(groupedCalls);

  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 300);

  const currentMonthData =
    selectedYear && selectedMonth
      ? groupedCalls[selectedYear][selectedMonth] || []
      : [];

  const filteredData = currentMonthData.filter((item) => {
    const name = `${item?.users?.user?.name?.firstName ?? ""} ${
      item?.users?.user?.name?.lastName ?? ""
    }`.toLowerCase();
    return name.includes(debouncedSearchText.toLowerCase());
  });

  return (
    <MentorLayout>
      <div>
        <div className="flex items-center justify-between py-3">
          <h1 className="text-3xl font-libre capitalize">Call History</h1>
          <AppButton onClick={() => exportToCSV(filteredData)} outlined>
            Export History
          </AppButton>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <AiOutlineLoading size={100} className="animate-spin" />
          </div>
        ) : (
          <div>
            {selectedYear && !selectedMonth && (
              <div className="text-sm text-gray-500 mb-2 sm:mb-0">
                <span
                  className="text-primary-600 font-semibold cursor-pointer"
                  onClick={() => {
                    setSelectedMonth(null);
                    setSelectedYear(null);
                  }}
                >
                  Home
                </span>
                {" > "}
                <span
                  className="text-primary-600 font-semibold cursor-pointer"
                  onClick={() => setSelectedMonth(null)}
                >
                  {selectedYear}
                </span>
              </div>
            )}

            {selectedYear && selectedMonth && (
              <div className="text-sm text-gray-500 mb-2 sm:mb-0">
                <span
                  className="text-primary-600 font-semibold cursor-pointer"
                  onClick={() => {
                    setSelectedMonth(null);
                    setSelectedYear(null);
                  }}
                >
                  Home
                </span>
                {" > "}
                <span
                  className="text-primary-600 font-semibold cursor-pointer"
                  onClick={() => setSelectedMonth(null)}
                >
                  {selectedYear}
                </span>
                {" > "}
                <span className="font-semibold">{selectedMonth}</span>
              </div>
            )}

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

            {selectedYear && !selectedMonth && (
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">
                  Months in {selectedYear}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {Object.keys(groupedCalls[selectedYear]).map((month) => (
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

            {selectedYear && selectedMonth && (
              <div className="mt-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <input
                    type="text"
                    placeholder="Search by name..."
                    className="border rounded px-3 py-1 w-full sm:w-64"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
                <h2 className="text-xl font-bold mb-2">
                  {selectedMonth}, {selectedYear}
                </h2>
                <CallTable
                  data={filteredData}
                  searchText={debouncedSearchText}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </MentorLayout>
  );
};
