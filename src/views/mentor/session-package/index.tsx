import React, { useState } from "react";
import { MentorLayout } from "../../../layout";
import {
  AiOutlineLoading,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import moment from "moment";
import {
  useGetMentorSessionPackagesQuery,
  useCreateMentorSessionPackageMutation,
  useUpdateMentorSessionPackageMutation,
  useDeleteMentorSessionPackageMutation,
  useMentorProfileQuery,
} from "../../../redux/rtk-api";
import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Select,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { AppButton } from "../../../component";

export const MentorSessionPackagePage = () => {
  const toast = useToast();
  const { data: profileData, isLoading: isProfileLoading } = useMentorProfileQuery();
  const mentorId = profileData?.data?._id;

  const {
    data: packageData,
    isLoading: isLoadingPackages,
    refetch,
  } = useGetMentorSessionPackagesQuery(mentorId);

  const [createPackage] = useCreateMentorSessionPackageMutation();
  const [updatePackage] = useUpdateMentorSessionPackageMutation();
  const [deletePackage] = useDeleteMentorSessionPackageMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchText, setSearchText] = useState("");

  const [form, setForm] = useState({
    type: "", // Changed from sessionType to match backend
    price: "",
    packagePrice: "",
    totalSessions: "", // Changed from totalSession to match backend
    categoryId: "",
    duration: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    // Validation
    if (!form.type || !form.price || !form.totalSessions || !form.categoryId) {
      toast({ 
        title: "Validation Error", 
        description: "Please fill in all required fields: Session Type, Price, Total Sessions, and Category",
        status: "error" 
      });
      return;
    }

    if (Number(form.price) <= 0) {
      toast({ 
        title: "Validation Error", 
        description: "Price must be greater than 0",
        status: "error" 
      });
      return;
    }

    if (Number(form.totalSessions) <= 0) {
      toast({ 
        title: "Validation Error", 
        description: "Total sessions must be greater than 0",
        status: "error" 
      });
      return;
    }

    try {
      const payload = {
        mentorId,
        type: form.type as "chat" | "audio" | "video", // Changed from sessionType
        price: Number(form.price),
        totalSessions: Number(form.totalSessions), // Changed from totalSession
        remainingSessions: Number(form.totalSessions), // Set initial remaining sessions
        duration: form.duration ? Number(form.duration) : undefined,
        categoryId: form.categoryId,
      };

      if (isEdit) {
        await updatePackage({ id: editingId, body: payload });
        toast({ title: "Package updated", status: "success" });
      } else {
        await createPackage(payload);
        toast({ title: "Package created", status: "success" });
      }

      onClose();
      setIsEdit(false);
      setForm({ type: "", price: "", packagePrice: "", totalSessions: "", categoryId: "", duration: "" });
      refetch();
    } catch (error) {
      console.error("Failed to submit package", error);
      toast({ 
        title: "Error", 
        description: "Failed to save package. Please try again.",
        status: "error" 
      });
    }
  };

  const handleEdit = (pkg) => {
    setForm({
      type: pkg.type || pkg.sessionType, // Support both field names for backward compatibility
      price: pkg.price,
      packagePrice: pkg.packagePrice,
      totalSessions: pkg.totalSessions || pkg.totalSession, // Support both field names
      categoryId: pkg.categoryId,
      duration: pkg.duration || "",
    });
    setEditingId(pkg._id);
    setIsEdit(true);
    onOpen();
  };

  const handleDelete = async (id) => {
    try {
      await deletePackage(id);
      toast({ title: "Package deleted", status: "info" });
      refetch();
    } catch (error) {
      toast({ title: "Failed to delete", status: "error" });
    }
  };

  return (
    <MentorLayout>
      <div>
        <div className="flex items-center justify-between py-3">
          <h1 className="text-3xl font-libre capitalize">Package Session</h1>
          <AppButton
            outlined
            onClick={() => {
              onOpen();
              setIsEdit(false);
              setForm({ type: "", price: "", packagePrice: "", totalSessions: "", categoryId: "", duration: "" });
            }}
          >
            Add Session Package
          </AppButton>
        </div>

        <div className="mb-4">
          <Input
            placeholder="Search by session type (e.g., audio, video)..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full md:w-1/3 bg-white"
          />
        </div>

        {isLoadingPackages ? (
          <div className="flex justify-center">
            <AiOutlineLoading size={100} className="animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {packageData?.data?.map((pkg) => (
              <div
                key={pkg._id}
                className="bg-white shadow-md rounded-lg p-4 border relative"
              >
                <div className="absolute top-2 right-2 flex gap-2">
                  <AiOutlineEdit
                    className="cursor-pointer text-blue-600"
                    onClick={() => handleEdit(pkg)}
                    size={20}
                  />
                  <AiOutlineDelete
                    className="cursor-pointer text-red-600"
                    onClick={() => handleDelete(pkg._id)}
                    size={20}
                  />
                </div>
                <h3 className="text-lg font-semibold">
                  {pkg.type || pkg.sessionType} Session
                </h3>
                <p className="text-sm text-gray-500">₹{pkg.price} per session</p>
                <p className="text-sm">Total Sessions: {pkg.totalSessions || pkg.totalSession}</p>
                <p className="text-sm">Remaining Sessions: {pkg.remainingSessions || pkg.remainingSession}</p>
                <p className="text-sm text-gray-400">
                  Created at: {moment(pkg.createdAt).format("lll")}
                </p>
              </div>
            ))}
          </div>
        )}

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {isEdit ? "Edit" : "Add"} Session Package
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody className="flex flex-col gap-4">
              <FormControl>
                <FormLabel>Session Type</FormLabel>
                <Select
                  placeholder="Select session type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                >
                  <option value="chat">Chat</option>
                  <option value="audio">Audio</option>
                  <option value="video">Video</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Price per session</FormLabel>
                <Input
                  type="number"
                  placeholder="e.g., 999"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Total Sessions</FormLabel>
                <Input
                  type="number"
                  placeholder="e.g., 5"
                  name="totalSessions"
                  value={form.totalSessions}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>
                  Package Price (Actual Price: ₹
                  {form.price && form.totalSessions
                    ? Number(form.price) * Number(form.totalSessions)
                    : 0})
                </FormLabel>
                <Input
                  type="number"
                  placeholder="e.g., 3999"
                  name="packagePrice"
                  value={form.packagePrice}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Discount Amount (₹)</FormLabel>
                <Input
                  isDisabled
                  value={
                    form.price && form.totalSessions && form.packagePrice
                      ? (
                          Number(form.price) * Number(form.totalSessions) -
                          Number(form.packagePrice)
                        ).toFixed(2)
                      : "0.00"
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                {isProfileLoading ? (
                  <Spinner />
                ) : (
                  <Select
                    placeholder="Select category"
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleChange}
                  >
                    {profileData?.data?.category?.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.title}
                      </option>
                    ))}
                  </Select>
                )}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <AppButton outlined onClick={handleSubmit}>
                {isEdit ? "Update" : "Submit"}
              </AppButton>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </MentorLayout>
  );
};
