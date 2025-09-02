import React, { useState } from "react";
import { MentorLayout } from "../../../layout";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import moment from "moment";
import { AppButton } from "../../../component";
import {
  AiOutlineLoading,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import {
  useMentorProfileQuery,
  useGetMentorGroupSessionsQuery,
  useCreateGroupSessionMutation,
  useUpdateGroupSessionMutation,
  useDeleteGroupSessionMutation,
} from "../../../redux/rtk-api";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Select,
  Input,
  Textarea,
  Button,
  useDisclosure,
  Spinner,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";

export const MentorGroupSessionPage = () => {
  const toast = useToast();
  const { data: profileData, isLoading: isLoadingProfile } =
    useMentorProfileQuery();
  const mentorId = profileData?.data?._id;

  const {
    data: groupSessionData,
    isLoading: isLoadingSessions,
    refetch,
  } = useGetMentorGroupSessionsQuery(mentorId, { skip: !mentorId });

  const [createGroupSession] = useCreateGroupSessionMutation();
  const [updateGroupSession] = useUpdateGroupSessionMutation();
  const [deleteGroupSession] = useDeleteGroupSessionMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    sessionType: "",
    price: "",
    capacity: "",
    scheduledAt: "",
    categoryId: "",
    joinLink: "",
  });

  const resetForm = () =>
    setForm({
      title: "",
      description: "",
      sessionType: "",
      price: "",
      capacity: "",
      scheduledAt: "",
      categoryId: "",
      joinLink: "",
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!mentorId) return;

    // Validate sessionType
    const validSessionTypes = ["chat", "video", "audio"] as const;
    const sessionType = validSessionTypes.includes(form.sessionType as any) 
      ? form.sessionType as "chat" | "video" | "audio"
      : "video"; // default to video if invalid

    const payload = {
      ...form,
      sessionType,
      mentorId,
      price: Number(form.price),
      capacity: Number(form.capacity),
    };

    try {
      if (isEdit) {
        await updateGroupSession({ id: editingId, body: payload });
        toast({ title: "Session updated", status: "success" });
      } else {
        await createGroupSession(payload);
        toast({ title: "Session created", status: "success" });
      }

      onClose();
      resetForm();
      setIsEdit(false);
      setEditingId(null);
      refetch();
    } catch (error) {
      toast({ title: "Error saving session", status: "error" });
    }
  };

  const handleEdit = (session) => {
    setForm({
      title: session.title,
      description: session.description,
      sessionType: session.sessionType,
      price: session.price,
      capacity: session.capacity,
      scheduledAt: session.scheduledAt?.slice(0, 16),
      categoryId: session.categoryId?._id || "",
      joinLink: session.joinLink || "",
    });
    setIsEdit(true);
    setEditingId(session._id);
    onOpen();
  };

  const handleDelete = async (id) => {
    try {
      await deleteGroupSession(id);
      toast({ title: "Session deleted", status: "info" });
      refetch();
    } catch {
      toast({ title: "Failed to delete session", status: "error" });
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      header: "Sr",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      header: "Title",
      cell: ({ row }) => row.original.title,
    },
    {
      header: "Type",
      cell: ({ row }) => row.original.sessionType,
    },
    {
      header: "Category",
      cell: ({ row }) => row.original.categoryId?.title || "-",
    },
    {
      header: "Date",
      cell: ({ row }) => moment(row.original.scheduledAt).format("lll"),
    },
    {
      header: "Capacity",
      cell: ({ row }) => {
        const booked = row.original.bookedUsers?.length || 0;
        const total = row.original.capacity;
        const slotsLeft = total - booked;
        return (
          <div className="text-sm">
            <div className="font-semibold">{slotsLeft} slots left</div>
            <div className="text-gray-500">{booked}/{total} booked</div>
          </div>
        );
      },
    },
    {
      header: "Price",
      cell: ({ row }) => `₹${row.original.price}`,
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-3">
          <AiOutlineEdit
            className="cursor-pointer text-blue-500"
            onClick={() => handleEdit(row.original)}
          />
          <AiOutlineDelete
            className="cursor-pointer text-red-500"
            onClick={() => handleDelete(row.original._id)}
          />
        </div>
      ),
    },
  ];

  const [columnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: groupSessionData?.data || [],
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <MentorLayout>
      <div>
        <div className="flex items-center justify-between py-3">
          <h1 className="text-3xl font-libre capitalize">Group Sessions</h1>
          <AppButton
            outlined
            onClick={() => {
              resetForm();
              setIsEdit(false);
              setEditingId(null);
              onOpen();
            }}
          >
            + Create Session
          </AppButton>
        </div>

        {isLoadingSessions || isLoadingProfile ? (
          <div className="flex justify-center py-10">
            <AiOutlineLoading size={80} className="animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto bg-white px-3 pb-3 mt-5 rounded-lg font-libre">
            <table className="w-full caption-top text-sm">
              <thead className="bg-primary-200">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) =>
                      columnVisibility[header.column.id] !== false ? (
                        <th
                          key={header.id}
                          className="px-4 py-3 text-left font-semibold text-sm text-primary-800"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      ) : null
                    )}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b">
                    {row.getVisibleCells().map((cell) =>
                      columnVisibility[cell.column.id] !== false ? (
                        <td key={cell.id} className="px-4 py-2 text-left">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ) : null
                    )}
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
                className="px-4 py-1 bg-primary-500 text-white rounded"
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
                className="px-4 py-1 bg-primary-500 text-white rounded"
                disabled={pagination.pageIndex === table.getPageCount() - 1}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Redesigned Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent borderRadius="lg" px={4}>
          <ModalHeader fontSize="lg" fontWeight="bold">
            {isEdit ? "Edit Group Session" : "Add Group Session"}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Career Guidance"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                {isLoadingProfile ? (
                  <Spinner />
                ) : (
                  <Select
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleChange}
                    placeholder="Select category"
                  >
                    {profileData?.data?.category?.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.title}
                      </option>
                    ))}
                  </Select>
                )}
              </FormControl>
            </SimpleGrid>

            <FormControl isRequired mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Brief overview of the session"
              />
            </FormControl>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={4}>
              <FormControl isRequired>
                <FormLabel>Session Type</FormLabel>
                <Select
                  name="sessionType"
                  value={form.sessionType}
                  onChange={handleChange}
                  placeholder="Select type"
                >
                  <option value="audio">Audio</option>
                  <option value="video">Video</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Price per session</FormLabel>
                <Input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="e.g. 500"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Capacity</FormLabel>
                <Input
                  name="capacity"
                  type="number"
                  value={form.capacity}
                  onChange={handleChange}
                  placeholder="e.g. 10"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Schedule Date & Time</FormLabel>
                <Input
                  name="scheduledAt"
                  type="datetime-local"
                  value={form.scheduledAt}
                  onChange={handleChange}
                />
              </FormControl>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              w="full"
              size="lg"
              borderRadius="full"
              fontWeight="semibold"
            >
              {isEdit ? "Update Session" : "Add and Invite Person"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </MentorLayout>
  );
};
