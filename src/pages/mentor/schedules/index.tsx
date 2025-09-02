import React, { Fragment, useEffect, useState } from "react";
import { MentorLayout } from "../../../layout";
import {
  useCancelSlotMutation,
  useConfirmSlotMutation,
  useMentorCreateScheduleMutation,
  useMentorGetMySchedulesQuery,
  useMentorProfileQuery,
  useUpdateSlotMutation,
  useDeleteSlotAsMentorByIdMutation,
} from "../../../redux/rtk-api";
import { AppButton, TextField } from "../../../component";
import { AiOutlineClose, AiOutlineLoading } from "react-icons/ai";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { IConfirmSlotProps, ISlotProps } from "../../../interface";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { FiChevronDown, FiPlus, FiTrash2 } from "react-icons/fi";
import clsx from "clsx";
import { toast } from "react-toastify";
import moment from "moment";

export const SchedulesMentorPage = () => {
  const [noteModel, setNoteModel] = useState<ISlotProps | null>(null);
  const [noteField, setNoteField] = useState<string>("");
  const [date, setDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState<ISlotProps[]>([]);
  const [newDate, setNewDate] = useState("");
  const [newSlots, setNewSlots] = useState([
    { time: "", booked: false, status: "available" },
  ]);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  let [isOpen, setIsOpen] = useState(false);

  const { data: profile } = useMentorProfileQuery();
  const { data, isLoading } = useMentorGetMySchedulesQuery();
  const [
    CreateSlot,
    {
      isError: isNewError,
      error: newError,
      isLoading: isNewLoading,
      isSuccess: isNewSuccess,
      data: newData,
    },
  ] = useMentorCreateScheduleMutation();
  const [
    confirmSlot,
    {
      isSuccess: isConfirmed,
      isError: isConfirmError,
      error: confirmError,
      isLoading: isConfirmLoading,
      data: confirmData,
    },
  ] = useConfirmSlotMutation();
  const [
    cancelSlot,
    {
      isError: isCancelError,
      error: cancelError,
      data: cancelData,
      isLoading: isCancelLoading,
      isSuccess: isCancelSuccess,
    },
  ] = useCancelSlotMutation();
  const [
    updateSlot,
    {
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      error: updateError,
      data: updateData,
      isError: isUpdateError,
    },
  ] = useUpdateSlotMutation();
  const [
    deleteSlot,
    {
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      error: deleteError,
      data: deleteData,
    },
  ] = useDeleteSlotAsMentorByIdMutation();

  useEffect(() => {
    if (isNewError) console.log(newError);
    if (isNewSuccess) {
      setIsOpen(false);
      toast.success(newData?.data);
      setNewDate("");
      setNewSlots([{ time: "", booked: false, status: "available" }]);
    }
  }, [isNewError, newError, isNewSuccess, newData?.data]);

  useEffect(() => {
    if (noteModel?.note.length !== 0) setNoteField(noteModel?.note);
    if (isUpdateError) console.log(updateError);
  }, [isUpdateError, updateError, noteModel?.note]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success(updateData?.data);
      setNoteModel(null);
      setNoteField("");
    }
  }, [isUpdateSuccess, updateData?.data]);

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success(deleteData?.data || "Schedule deleted successfully");
    }
  }, [isDeleteSuccess, deleteData?.data]);

  useEffect(() => {
    if (deleteError) {
      console.log(deleteError);
      toast.error("Failed to delete schedule");
    }
  }, [deleteError]);

  useEffect(() => {
    if (isConfirmError) console.log(confirmError);
    if (isConfirmed) toast.success(confirmData?.data);
  }, [isConfirmError, confirmError, confirmData?.data, isConfirmed]);

  useEffect(() => {
    if (isCancelError) console.log(cancelError);
    if (isCancelSuccess) toast.success(cancelData?.data);
  }, [isCancelError, cancelError, cancelData?.data, isCancelSuccess]);

  const onCancel = async (slotId: string) => {
    try {
      await cancelSlot(slotId).unwrap();
      toast.success("Slot cancelled successfully.");
    } catch (err) {
      console.error("Cancel slot failed:", err);
      toast.error("Failed to cancel slot.");
    }
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    const selectedDate = moment(newDate).format("YYYY-MM-DD");
    const slotsForDate = data?.data.find(
      (day) => day.slotsDate === selectedDate
    );
    setSelectedSlots(slotsForDate ? slotsForDate.slots : []);
  };

  const getTileClassName = ({ date }) => {
    const dateString = moment(date).format("YYYY-MM-DD");
    const hasSlots = data?.data.some((day) => day.slotsDate === dateString);
    return hasSlots ? "has-slot-tile" : "";
  };

  const handleNewDateChange = (event) => {
    setNewDate(event.target.value.toString());
  };

  const isTimeGapValid = (newTime, index) => {
    const currentTime = moment(newTime, "HH:mm");
    const prevSlot =
      index > 0 ? moment(newSlots[index - 1].time, "HH:mm") : null;
    const nextSlot =
      index < newSlots.length - 1 && newSlots[index + 1].time
        ? moment(newSlots[index + 1].time, "HH:mm")
        : null;

    if (prevSlot) {
      const gap = currentTime.diff(prevSlot, "minutes");
      if (profile.data.maxSlotTime == 45) {
        if (gap < 50) return false;
      }

      if (profile.data.maxSlotTime == 60) {
        if (gap < 65) return false;
      }
    }
    if (nextSlot) {
      const gap = nextSlot.diff(currentTime, "minutes");
      if (profile.data.maxSlotTime == 45) {
        if (gap < 50) return false;
      }

      if (profile.data.maxSlotTime == 60) {
        if (gap < 65) return false;
      }
    }
    return true;
  };

  const handleTimeChange = (index, event) => {
    const selectedTime = event.target.value;
    
    // Check if selected date is today and time is in the past
    if (newDate) {
      const selectedDate = new Date(newDate);
      const currentDate = new Date();
      
      if (selectedDate.toDateString() === currentDate.toDateString()) {
        const [hours, minutes] = selectedTime.split(':').map(Number);
        const selectedDateTime = new Date(selectedDate);
        selectedDateTime.setHours(hours, minutes, 0, 0);
        
        if (selectedDateTime <= currentDate) {
          toast.error("Cannot select a time in the past");
          return;
        }
      }
    }
    
    const updatedSlots = [...newSlots];
    const newTime = selectedTime;
    if (!isTimeGapValid(newTime, index)) {
       if (profile.data.maxSlotTime == 45) {
      toast.error("Each slot must be 50 apart");

      }

      if (profile.data.maxSlotTime == 60) {
      toast.error("Each slot must be 65 apart");
      }
      return;
    }
    updatedSlots[index].time = newTime;
    setNewSlots(updatedSlots);
  };

  const addTimeSlot = () => {
    setNewSlots([...newSlots, { time: "", booked: false, status: "available" }]);
  };

  const removeTimeSlot = (index) => {
    const updatedSlots = newSlots.filter((_, i) => i !== index);
    setNewSlots(updatedSlots);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validation: Check if date is selected
    if (!newDate) {
      toast.error("Please select a date");
      return;
    }
    
    // Validation: Check if at least one time slot is filled
    const validSlots = newSlots.filter(slot => slot.time !== "");
    if (validSlots.length === 0) {
      toast.error("Please add at least one time slot");
      return;
    }
    
    const slotData = { slots: validSlots, slotsDate: newDate };
    try {
      await CreateSlot({
        slots: slotData.slots as any,
        slotsDate: moment(slotData.slotsDate).format("YYYY-MM-DD"),
        mentorId: profile?.data._id as string,
      });
    } catch (error) {
      console.error("Error creating slot:", error);
      toast.error("Failed to create schedule");
    }
  };

  const onUpdate = async () => {
    if (!noteField) return;
    updateSlot({ slotId: noteModel._id, payload: { note: noteField } });
    setNoteField("");
    setNoteModel(null);
  };

  const onConfirm = async ({ mentorId, slotId, userId }: IConfirmSlotProps) => {
    try {
      await confirmSlot({ mentorId, slotId, userId });
    } catch (error) {
      console.error("Error confirming slot:", error);
      toast.error("Failed to confirm slot");
    }
  };

  const onDelete = async (scheduleId: string) => {
    if (window.confirm("Are you sure you want to delete this slot?")) {
      try {
        await cancelSlot(scheduleId).unwrap();
        toast.success("Slot deleted successfully");
      } catch (error) {
        console.error("Delete slot failed:", error);
        toast.error("Failed to delete slot");
      }
    }
  };



  useEffect(() => {
    if (date) {
      const selectedDate = moment(date).format("YYYY-MM-DD");
      const slotsForDate = data?.data.find(
        (day) => day.slotsDate === selectedDate
      );
      setSelectedSlots(slotsForDate ? slotsForDate.slots : []);
    }
  }, [date, data]);

  return (
    <MentorLayout>
      {isLoading && isConfirmLoading && isCancelLoading && (
        <div className="h-[300px] flex justify-center">
          <AiOutlineLoading className="animate-spin" size={30} />
        </div>
      )}
      {!isLoading && !isConfirmLoading && !isCancelLoading && (
        <>
          <div>
            <div className="flex justify-between items-center xl:lg:md:gap-10  flex-wrap">
              <div className="xl:md:lg:flex-1">
                <h5 className="text-3xl font-semibold">
                  Manage your{" "}
                  <span className="text-primary-500">
                    AlterBuddy's Schedule
                  </span>
                </h5>
                <p className="text-gray-600">
                  Here you can view and manage your available time slots. Users
                  will be able to book slots based on your availability. To
                  ensure a smooth booking process, please make sure your slots
                  are up-to-date.
                </p>
              </div>
              <div className="xl:lg:md:w-[15%] mt-5 xl:lg:md:mt-0 flex justify-end">
                <AppButton onClick={() => setIsOpen(true)} filled>
                  Schedule New
                </AppButton>
              </div>
            </div>
          </div>
          <div className="flex mt-20 gap-5 flex-wrap pb-10">
            <Calendar
              onChange={handleDateChange}
              tileClassName={getTileClassName}
              value={date}
              className="flex-1 transition-all duration-300"
              minDate={new Date()}
            />
            <div className="flex-1">
              <div className="mt-6">
                <h6 className="text-2xl font-semibold">
                  {moment(date).format("dddd, MMMM DD, YYYY")}
                </h6>
                {selectedSlots.filter(slot => slot.status !== "rejected").length > 0 ? (
                  <ul className="flex flex-col flex-wrap gap-3 mt-4">
                    {selectedSlots.filter(slot => slot.status !== "rejected").map((slot, index) => (
                      <Fragment key={index}>
                        <li
                          className={clsx(
                            "px-6 py-4 rounded-lg flex justify-between items-center shadow-sm",
                            slot.booked
                              ? "border border-primary-500 text-primary-600 bg-primary-50"
                              : "border-2 border-green-600 text-green-700 bg-green-50"
                          )}
                        >
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-lg font-semibold">
                              <span>{slot.time}</span>
                              {!slot.booked && (
                                <span className="text-green-600">
                                  Available
                                </span>
                              )}
                            </div>

                            <div className="text-sm capitalize text-gray-600">
                              {slot.status === "accepted" ? (
                                <>
                                  Confirmed for{" "}
                                  <span className="font-medium text-primary-700">
                                    {slot.userId?.name?.firstName || ""}{" "}
                                    {slot.userId?.name?.lastName || ""}
                                  </span>
                                </>
                              ) : (
                                <span className="text-yellow-600">Pending</span>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <AppButton
                              onClick={() => setNoteModel(slot)}
                              // size="sm"
                              filled
                            >
                              Add Note
                            </AppButton>
                            {!slot.booked && (
                              <AppButton
                                onClick={() => onDelete(slot._id)}
                                loading={isCancelLoading}
                                outlined
                                className="border-red-500 text-red-500 hover:bg-red-50"
                              >
                                <FiTrash2 className="mr-1" />
                                Delete
                              </AppButton>
                            )}
                          </div>
                        </li>

                        {slot.status !== "accepted" && slot.booked && (
                          <Menu as="div" className="relative mt-2">
                            <MenuButton
                              as="button"
                              className="flex items-center justify-between w-full px-5 py-3 rounded-md bg-primary-500 text-white hover:bg-primary-600 focus:outline-none"
                            >
                              Requested by {slot?.userId?.name?.firstName}{" "}
                              {slot?.userId?.name?.lastName}
                              <FiChevronDown size={20} className="ml-2" />
                            </MenuButton>

                            <MenuItems className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50 focus:outline-none">
                              <div className="py-2">
                                <MenuItem as="div">
                                  {({ active }) => (
                                    <button
                                      onClick={() =>
                                        onConfirm({
                                          slotId: slot?._id,
                                          mentorId: profile?.data?._id,
                                          userId: slot?.userId?._id,
                                        })
                                      }
                                      className={`block w-full text-left px-4 py-2 text-sm ${
                                        active
                                          ? "bg-primary-100 text-primary-700"
                                          : "text-gray-700"
                                      }`}
                                    >
                                      Accept Appointment
                                    </button>
                                  )}
                                </MenuItem>

                                <MenuItem as="div">
                                  {({ active }) => (
                                    <button
                                      onClick={() => onCancel(slot._id)}
                                      className={`block w-full text-left px-4 py-2 text-sm ${
                                        active
                                          ? "bg-red-100 text-red-700"
                                          : "text-gray-700"
                                      }`}
                                    >
                                      Cancel Appointment
                                    </button>
                                  )}
                                </MenuItem>
                              </div>
                            </MenuItems>
                          </Menu>
                        )}
                      </Fragment>
                    ))}
                  </ul>
                ) : (
                  <div className="shadow-lg border flex flex-col justify-center items-center w-full h-full p-3">
                    <p className="text-lg">
                      No slots available for{" "}
                      <span className="text-primary-500">
                        {moment(date).format("LL")}
                      </span>
                      .
                    </p>
                  </div>
                )}
              </div>
            </div>

            <Dialog
              open={isOpen}
              onClose={() => setIsOpen(false)}
              className="relative z-50"
            >
              <div className="fixed  bg-gray-950 bg-opacity-50 inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="max-w-lg space-y-4 border bg-white p-6 rounded-lg">
                  <DialogTitle className="font-bold">
                    Upload New Slot
                  </DialogTitle>
                  <Description>
                    Please note that once a slot is uploaded, it cannot be
                    modified or removed.
                  </Description>
                  <div className="flex flex-col gap-4">
                    <TextField
                      label="Date"
                      outlined
                      type="date"
                      value={newDate}
                      onChange={handleNewDateChange}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    {newSlots.map((slot, index) => (
                      <div key={index} className=" flex items-center gap-3">
                        <TextField
                          type="time"
                          id={`time-input-${index}`}
                          value={slot.time}
                          onChange={(event) => handleTimeChange(index, event)}
                          className="p-2 border border-gray-300 rounded-md w-full"
                          required
                        />
                        <AppButton
                          outlined
                          onClick={() => removeTimeSlot(index)}
                        >
                          Remove
                        </AppButton>
                      </div>
                    ))}
                    <AppButton filled type="button" onClick={addTimeSlot}>
                      <FiPlus size={24} /> Add More Magic Hours
                    </AppButton>
                  </div>
                  <div className="flex gap-4 justify-end">
                    <button onClick={() => setIsOpen(false)}>Cancel</button>
                    <button onClick={handleSubmit}>
                      {isNewLoading ? "loading..." : "Save"}
                    </button>
                  </div>
                </DialogPanel>
              </div>
            </Dialog>
          </div>
        </>
      )}
      {noteModel?._id?.length && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add Note for This Slot?
                  </h3>
                  <button
                    onClick={() => setNoteModel(null)}
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {noteModel?.note?.length === 0 && (
                    <>
                      <h6 className="capitalize">
                        This Slot is booked by{" "}
                        {noteModel?.userId?.name?.firstName}{" "}
                        {noteModel?.userId?.name?.lastName}
                      </h6>
                      <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                        <TextField
                          outlined
                          onChange={(e) => setNoteField(e.target.value)}
                          value={noteField || ""}
                        />
                      </p>
                    </>
                  )}

                  {noteModel?.note?.length !== 0 && (
                    <div className="flex items-center justify-between">
                      <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                        SAVED NOTE: {noteField}
                      </p>
                      <AppButton
                        filled
                        onClick={() => {
                          setNoteField("");
                          setNoteModel({ ...noteModel, note: "" });
                        }}
                      >
                        <AiOutlineClose />
                      </AppButton>
                    </div>
                  )}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setNoteModel(null)}
                  >
                    Close
                  </button>
                  <AppButton
                    loading={isUpdateLoading}
                    filled
                    type="button"
                    onClick={onUpdate}
                  >
                    Save Changes
                  </AppButton>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </MentorLayout>
  );
};
