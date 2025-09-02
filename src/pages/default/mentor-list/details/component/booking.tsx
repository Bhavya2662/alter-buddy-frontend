// BookingPanel.jsx (Full logic version)
import React from "react";
import {
  AiOutlineCalendar,
  AiOutlineMessage,
  AiOutlinePhone,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import moment from "moment";
import clsx from "clsx";
import { Input } from "@chakra-ui/react";
import { DayPicker } from "react-day-picker";
import { AppButton } from "../../../../../component";

 const BookingPanel = ({
  packages,
  callType,
  setCallType,
  selectedCategory,
  selectedPrice,
  setSelectedPrice,
  setSelectTime,
  selectTime,
  timeOptions,
  setConfirmModel,
  selectTimeHour,
  setSelectTimeHour,
  selected,
  setSelected,
  selectedVideo,
  setSelectedVideo,
  calendarRef,
  slotData,
  setSelectedTimeSlot,
  isOpen,
  setIsOpen,
  isOpenVideo,
  setIsOpenVideo,
  handleSelect,
  handleSelectVideo,
  setSelectType
}) => {
  const renderTimeButton = (time) => (
    <button
      key={time}
      onClick={() => {
        setSelectTime(time);
        setSelectType("time");
      }}
      className={clsx(
        "border px-5 py-1 border-primary-500 rounded-lg cursor-pointer group disabled:opacity-50 mr-2",
        selectTime === time && "bg-primary-500"
      )}
    >
      <p className={clsx("text-primary-500", selectTime === time && "text-white")}>{time} Mins</p>
    </button>
  );

  const renderSlotButton = (time, slotId, slotsDate) => (
    <button
      disabled={false}
      onClick={() => {
        setSelectTimeHour(time);
        setSelectType("slot");
        setSelectedTimeSlot({ date: slotsDate, slot: time, _id: slotId });
      }}
      key={slotId}
      className={clsx(
        "border px-5 py-1 border-primary-500 rounded-lg cursor-pointer group disabled:opacity-50 mr-3",
        selectTimeHour === time && "bg-primary-500 text-white"
      )}
    >
      <p className={clsx("text-primary-500", selectTimeHour === time && "text-white")}>{moment(time, "HH:mm").format("hh:mm A")}</p>
    </button>
  );

  const getPackagePrice = (type) =>
    packages?.data
      ?.filter((pkg) => pkg?.categoryId?._id === selectedCategory)
      ?.find((pkg) => pkg?.packageType === type || pkg?.type === type)?.price || 0;

  const getAvailableSessionTypes = () => {
    if (!packages?.data || !selectedCategory) return [];
    
    return packages.data
      .filter((pkg) => pkg?.categoryId?._id === selectedCategory)
      .map((pkg) => pkg?.packageType || pkg?.type)
      .filter((type) => type && getPackagePrice(type) > 0);
  };

  const handleSessionTypeClick = (type) => {
    setCallType(type);
    setSelectedPrice(getPackagePrice(type));
    setSelectTime(5);
  };

  const availableTypes = getAvailableSessionTypes();
  const showTimeInputs = callType === "chat";
  const showVideoInputs = callType === "video" && slotData?.data?.length > 0;
  const showAudioSlots = callType === "audio" && slotData?.data?.length > 0;
  const showAudioTimeInputs = callType === "audio";

  return (
    <div className="xl:lg:md:w-[35%] top-20 shadow-xl border border-gray-300 p-5 rounded-lg mt-10">
      <p className="text-gray-500 my-2">Schedule a personal audio/video session and feel better.</p>
      <div className="flex items-center gap-3">
        <AiOutlineCalendar size={30} className="fill-primary-500" />
        <p className="text-lg text-gray-900 font-bold">Book Session</p>
      </div>

      <div className="flex gap-5 flex-wrap mt-3">
        {availableTypes.length > 0 ? (
          availableTypes.map((type) => (
            <AppButton
              key={type}
              outlined
              filled={callType === type}
              flexed
              onClick={() => handleSessionTypeClick(type)}
            >
              {type === "chat" && <AiOutlineMessage size={20} />}
              {type === "audio" && <AiOutlinePhone size={20} />}
              {type === "video" && <AiOutlineVideoCamera size={20} />}
              ₹{getPackagePrice(type)}
            </AppButton>
          ))
        ) : (
          <p className="text-gray-500 text-sm">
            No packages available for the selected category.
          </p>
        )}
      </div>

      {showTimeInputs && (
        <>
          <label className="block mt-4 text-sm font-bold text-gray-900">Preferred time (in minutes)</label>
          <Input
            type="number"
            value={selectTime}
            onChange={(e) => setSelectTime(parseInt(e.target.value))}
            className="mt-1 border border-gray-300 rounded-md px-4 py-2"
          />
          <div className="mt-3">
            <label className="text-sm font-semibold">Popular among users:</label>
            <div className="flex gap-2 mt-1 flex-wrap">{timeOptions.map(renderTimeButton)}</div>
          </div>
        </>
      )}

      {showVideoInputs && (
        <>
          <label className="block mt-4 text-sm font-bold text-gray-900">Video Call Duration</label>
          <div className="flex gap-3 mt-2">
            {[45, 60].map((t) => renderTimeButton(t))}
          </div>
          <label className="block mt-4 text-sm font-bold text-gray-900">Select a date</label>
          <button
            onClick={() => setIsOpenVideo((prev) => !prev)}
            className="mt-1 flex w-full items-center gap-2 px-4 py-2 border border-primary-500 rounded-md"
          >
            <AiOutlineCalendar className="text-primary-500" />
            {selectedVideo ? moment(selectedVideo).format("MMM D, YYYY") : "Select a date"}
          </button>
          {isOpenVideo && (
            <div ref={calendarRef} className="relative z-10 mt-2">
              <DayPicker mode="single" selected={selectedVideo} onSelect={handleSelectVideo} />
            </div>
          )}
          <label className="block mt-4 text-sm font-bold text-gray-900">Select Slot Timing</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {slotData?.data?.map(({ slots, slotsDate }) =>
              slots?.map(({ time, _id }) => renderSlotButton(time, _id, slotsDate))
            )}
          </div>
        </>
      )}

      {showAudioTimeInputs && (
        <>
          <label className="block mt-4 text-sm font-bold text-gray-900">Audio Session Options</label>
          <div className="mt-2 space-y-3">
            <div className="border border-gray-300 rounded-lg p-3">
              <h4 className="font-medium text-gray-900 mb-2">Option 1: Preferred Time</h4>
              <p className="text-sm text-gray-600 mb-3">Enter your preferred session duration and we'll coordinate with the mentor</p>
              <Input
                type="number"
                value={selectTime}
                onChange={(e) => {
                  setSelectTime(parseInt(e.target.value));
                  setSelectType("time");
                }}
                placeholder="Duration in minutes"
                className="mb-2 border border-gray-300 rounded-md px-4 py-2"
              />
              <div className="flex gap-2 flex-wrap">
                <label className="text-sm font-semibold">Popular durations:</label>
                {timeOptions.map(renderTimeButton)}
              </div>
            </div>
            
            {slotData?.data?.length > 0 && (
              <div className="border border-gray-300 rounded-lg p-3">
                <h4 className="font-medium text-gray-900 mb-2">Option 2: Select Available Slot</h4>
                <p className="text-sm text-gray-600 mb-3">Choose from mentor's available time slots</p>
                <label className="block text-sm font-bold text-gray-900 mb-2">Select session date</label>
                <button
                  onClick={() => {
                    setIsOpen((prev) => !prev);
                    setSelectType("slot");
                  }}
                  className="mb-3 flex w-full items-center gap-2 px-4 py-2 border border-primary-500 rounded-md"
                >
                  <AiOutlineCalendar className="text-primary-500" />
                  {selected ? moment(selected).format("MMM D, YYYY") : "Select a date"}
                </button>
                {isOpen && (
                  <div ref={calendarRef} className="relative z-10 mb-3">
                    <DayPicker mode="single" selected={selected} onSelect={handleSelect} />
                  </div>
                )}
                <label className="block text-sm font-bold text-gray-900 mb-2">Available time slots</label>
                <div className="flex flex-wrap gap-2">
                  {slotData?.data?.map(({ slots, slotsDate }) =>
                    slots?.map(({ time, _id }) => renderSlotButton(time, _id, slotsDate))
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      <AppButton
        className="mt-5"
        flexed
        filled
        disabled={!callType}
        onClick={() => setConfirmModel(true)}
      >
        {callType === "chat" ? "Start a chat" : callType === "audio" ? "Book a call" : "Book a session"}
      </AppButton>
    </div>
  );
};

// At the bottom of BookingPanel.jsx
export default BookingPanel;
