// RightComponent.jsx
import React, { useEffect, useRef, useState } from "react";
import { AppButton } from "../../../../../component";
import {
  AiOutlineCalendar,
  AiOutlineGift,
  AiOutlineMessage,
  AiOutlinePhone,
  AiOutlineUsergroupAdd,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import { Input } from "@chakra-ui/react";
import { DayPicker } from "react-day-picker";
import moment from "moment";
import clsx from "clsx";
import { format } from "date-fns";

const RightComponent = ({
  callType,
  setCallType,
  selectedPrice,
  setSelectedPrice,
  packages,
  selectedCategory,
  setSelectedCategory,
  selectTime,
  setSelectTime,
  setScheduleModel,
  selectTimeHour,
  setSelectTimeHour,
  setSelectType,
  selected,
  setSelected,
  selectedVideo,
  setSelectedVideo,
  isOpen,
  setIsOpen,
  isOpenVideo,
  setIsOpenVideo,
  calendarRef,
  filteredSlots,
  onPackageBook,
  userPackages,
  groupSessions,
  onGroupBook,
  handleSelect,
  handleSelectVideo,
  selectedDate,
  setSelectedDate,
  duration,
  setDuration,
  selectedDuration,
  setSelectedDuration,
  preferredTime,
  setPreferredTime,
  selectedTimeSlot,
  setSelectedTimeSlot,
}) => {
  const timeOptions = [5, 10, 15, 20];
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear(),
    today.getMonth() + 3,
    today.getDate()
  );

  // Using handleSelect and handleSelectVideo from props
  // const handleSelect = (date) => {
  //   setSelected(date);
  //   setIsOpen(false);
  // };

  // const handleSelectVideo = (date) => {
  //   setSelectedVideo(date);
  //   setIsOpenVideo(false);
  // };

  return (
    <div className="w-full top-20 shadow-xl border border-gray-300 p-5 rounded-lg mt-10">
      <p className="text-gray-500 my-2">
        Schedule a personal audio/video session and feel better.
      </p>
      <div className="flex items-center gap-3">
        <AiOutlineCalendar size={30} className="fill-primary-500" />
        <p className="text-lg text-gray-900 font-bold">Book Session</p>
      </div>

      <div className="my-5">
        {/* Category Filter */}
        {packages?.data && packages.data.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Category (Optional)
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Categories</option>
              {/* Get unique categories from packages */}
              {[...new Set(packages.data.map(pkg => pkg.categoryId?._id).filter(Boolean))]
                .map(categoryId => {
                  const category = packages.data.find(pkg => pkg.categoryId?._id === categoryId)?.categoryId;
                  return category ? (
                    <option key={categoryId} value={categoryId}>
                      {category.title}
                    </option>
                  ) : null;
                })
              }
            </select>
          </div>
        )}
        
        {/* Call Type Buttons */}
        <div className="flex gap-5 flex-wrap mt-3">
          {["chat", "audio", "video"].map((type) => {
            const Icon =
              type === "chat"
                ? AiOutlineMessage
                : type === "audio"
                  ? AiOutlinePhone
                  : AiOutlineVideoCamera;
            
            // Find price for this session type, considering selectedCategory filter
            const packageData = packages?.data
              ?.filter(
                (prop) =>
                  // If no category is selected, show all packages
                  !selectedCategory || (prop.categoryId?._id || "") === selectedCategory
              )
              ?.find((prop) => (prop.packageType || prop.type) === type);
            
            // Use package price or fallback to default prices
            const price = packageData?.price || (type === "chat" ? 100 : type === "audio" ? 200 : 300);
            
            const typeLabel = type === "chat" ? "Chat" : type === "audio" ? "Audio" : "Video";
            
            return (
              <AppButton
                key={type}
                outlined
                filled={callType === type}
                flexed
                onClick={() => {
                  setSelectedPrice(price);
                  setCallType(type);
                  setSelectTime(5);
                }}
              >
                <Icon size={20} />
                {typeLabel}
              </AppButton>
            );
          })}
        </div>

        {/* Session Package Selection */}
        {callType && packages?.data && packages.data.length > 0 && (
          <div className="mt-4">
            <label className="text-gray-900 font-bold capitalize text-sm mb-2 block">
              Choose Session Type
            </label>
            <div className="space-y-2">
              {/* Single Session Option */}
              <div className="border border-gray-300 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">Single Session</h4>
                    <p className="text-sm text-gray-600">Book a one-time {callType} session</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary-500">₹{selectedPrice}</p>
                    <AppButton
                      outlined
                      onClick={() => {
                        // Keep current single session selection
                        setSelectedPrice(selectedPrice);
                      }}
                    >
                      Select
                    </AppButton>
                  </div>
                </div>
              </div>

              {/* Package Options */}
              {packages.data
                .filter((pkg) => 
                  (pkg.packageType || pkg.type) === callType &&
                  (!selectedCategory || (pkg.categoryId?._id || "") === selectedCategory)
                )
                .map((pkg, index) => (
                  <div key={index} className="border border-gray-300 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{pkg.title || `${pkg.totalSessions} Session Package`}</h4>
                        <p className="text-sm text-gray-600">
                          {pkg.totalSessions} {callType} sessions • {pkg.description || 'Package deal'}
                        </p>
                        {pkg.validity && (
                          <p className="text-xs text-gray-500">Valid for {pkg.validity} days</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary-500">₹{pkg.price}</p>
                        <p className="text-xs text-gray-500">₹{Math.round(pkg.price / pkg.totalSessions)} per session</p>
                        <AppButton
                          outlined
                          onClick={() => {
                            setSelectedPrice(pkg.price);
                            onPackageBook(pkg);
                          }}
                        >
                          Select Package
                        </AppButton>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {callType === "chat" && (
          <>
            <div className="mt-3">
              <label className="text-gray-900 font-bold capitalize text-sm">
                Please enter your preferred time.
              </label>
              <Input
                type="number"
                mt={1}
                focusBorderColor="#CBD5E1"
                placeholder="Enter minute"
                paddingY={0}
                borderRadius={"5px"}
                paddingX={"4"}
                value={selectTime}
                onChange={(e) => setSelectTime(parseInt(e.target.value))}
                border={"2px solid #CBD5E1"}
              />
            </div>
            <div className="flex gap-2 flex-wrap mt-3">
              <label className="text-gray-900 font-bold capitalize text-sm">
                Popular among users
              </label>
              {timeOptions.map((time) => (
                <button
                  key={time}
                  onClick={() => {
                    setSelectTime(time);
                    setSelectType("time");
                  }}
                  className={clsx(
                    "border px-5 py-1 border-primary-500 rounded-lg cursor-pointer",
                    selectTime === time && "bg-primary-500 text-white"
                  )}
                >
                  {time} Mins
                </button>
              ))}
            </div>
          </>
        )}

        {callType === "audio" && (
          <>
            <div className="mt-3">
              <label className="text-gray-900 font-bold capitalize text-sm">
                Please enter your preferred time (optional).
              </label>
              <Input
                type="number"
                mt={1}
                focusBorderColor="#CBD5E1"
                placeholder="Enter minute"
                paddingY={0}
                borderRadius={"5px"}
                paddingX={"4"}
                value={selectTime}
                onChange={(e) => setSelectTime(parseInt(e.target.value))}
                border={"2px solid #CBD5E1"}
              />
            </div>
            <div className="flex gap-2 flex-wrap mt-3">
              <label className="text-gray-900 font-bold capitalize text-sm">
                Popular among users
              </label>
              {timeOptions.map((time) => (
                <button
                  key={time}
                  onClick={() => {
                    setSelectTime(time);
                    setSelectType("time");
                  }}
                  className={clsx(
                    "border px-5 py-1 border-primary-500 rounded-lg cursor-pointer",
                    selectTime === time && "bg-primary-500 text-white"
                  )}
                >
                  {time} Mins
                </button>
              ))}
            </div>
            
            <div className="mt-3">
              <label className="text-gray-900 font-bold capitalize text-sm">
                Or Select A Date & Time Slot
              </label>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center w-full gap-2 bg-white px-4 py-2 border border-primary-500 rounded-md shadow-sm hover:bg-gray-50"
              >
                <AiOutlineCalendar className="w-5 h-5 text-primary-600" />
                <span className="text-primary-500 text-sm">
                  {selected ? format(selected, "PPP") : "Select a date"}
                </span>
              </button>
              {isOpen && (
                <div
                  ref={calendarRef}
                  className="absolute z-10 mt-2 bg-white p-4 rounded-lg shadow-lg"
                >
                  <DayPicker
                    mode="single"
                    selected={selected}
                    onSelect={handleSelect}
                    disabled={{ before: today, after: maxDate }}
                    modifiersClassNames={{
                      selected: "bg-primary-500 text-white",
                      today: "bg-gray-200",
                    }}
                  />
                </div>
              )}
            </div>

            <div className="mt-4">
              <label className="text-gray-900 font-bold capitalize text-sm">
                Select Slot Timing
              </label>
              {filteredSlots?.length > 0 ? (
                <div className="flex gap-5 flex-wrap mt-1">
                  {filteredSlots.map(({ slots, slotsDate }) =>
                    slots?.map(({ time, booked, _id: slotId }) => (
                      <button
                        key={slotId}
                        disabled={booked}
                        onClick={() => {
                          setSelectTimeHour(time);
                          setSelectType("slot");
                          setSelectedTimeSlot({ date: slotsDate, slot: time, _id: slotId });
                        }}
                        className={clsx(
                          "border px-5 py-1 border-primary-500 rounded-lg cursor-pointer",
                          selectTimeHour === time &&
                          "bg-primary-500 text-white"
                        )}
                      >
                        {moment(time, "HH:mm").format("hh:mm A")}
                      </button>
                    ))
                  )}
                </div>
              ) : (
                <p className="text-sm text-red-500 mt-2">
                  No slots available for the selected date. Please choose
                  another date.
                </p>
              )}
            </div>
          </>
        )}

        {callType === "video" && (
          <>
            <div className="mt-3">
              <label className="text-gray-900 font-bold capitalize text-sm">
                Select A Date
              </label>
              <button
                onClick={() => setIsOpenVideo(!isOpenVideo)}
                className="flex items-center w-full gap-2 bg-white px-4 py-2 border border-primary-500 rounded-md shadow-sm hover:bg-gray-50"
              >
                <AiOutlineCalendar className="w-5 h-5 text-primary-600" />
                <span className="text-primary-500 text-sm">
                  {selectedVideo ? format(selectedVideo, "PPP") : "Select a date"}
                </span>
              </button>
              {isOpenVideo && (
                <div
                  ref={calendarRef}
                  className="absolute z-10 mt-2 bg-white p-4 rounded-lg shadow-lg"
                >
                  <DayPicker
                    mode="single"
                    selected={selectedVideo}
                    onSelect={handleSelectVideo}
                    disabled={{ before: today, after: maxDate }}
                    modifiersClassNames={{
                      selected: "bg-primary-500 text-white",
                      today: "bg-gray-200",
                    }}
                  />
                </div>
              )}
            </div>

            <div className="mt-4">
              <label className="text-gray-900 font-bold capitalize text-sm">
                Select Slot Timing
              </label>
              {filteredSlots?.length > 0 ? (
                <div className="flex gap-5 flex-wrap mt-1">
                  {filteredSlots.map(({ slots, slotsDate }) =>
                    slots?.map(({ time, booked, _id: slotId }) => (
                      <button
                        key={slotId}
                        disabled={booked}
                        onClick={() => {
                          setSelectTimeHour(time);
                          setSelectType("slot");
                          setSelectedTimeSlot({ date: slotsDate, slot: time, _id: slotId });
                        }}
                        className={clsx(
                          "border px-5 py-1 border-primary-500 rounded-lg cursor-pointer",
                          selectTimeHour === time &&
                          "bg-primary-500 text-white"
                        )}
                      >
                        {moment(time, "HH:mm").format("hh:mm A")}
                      </button>
                    ))
                  )}
                </div>
              ) : (
                <p className="text-sm text-red-500 mt-2">
                  No slots available for the selected date. Please choose
                  another date.
                </p>
              )}
            </div>
          </>
        )}

        <div className="flex gap-5 flex-wrap mt-5">
          <AppButton
            flexed
            filled
            disabled={!callType}
            onClick={() => setScheduleModel(true)}
          >
            {callType === "chat"
              ? "Start a chat"
              : callType === "audio"
                ? "Book a call"
                : "Book a session"}
          </AppButton>
        </div>

        {userPackages?.length > 0 && (
          <div className="mt-2">
            <h6 className="text-sm font-semibold text-gray-800 mb-2">
              Use Package Session ({callType})
            </h6>
            {userPackages
              .filter(pack => pack.type === callType)
              .map((pack, idx) => (
                <>
                  <AppButton
                    key={idx}
                    flexed
                    outlined
                    onClick={() => onPackageBook(pack)}
                  >
                    <AiOutlineGift size={20} />
                    Use 1 of {pack.remainingSessions} sessions
                  </AppButton>
                  <br />
                </>
              ))}
          </div>
        )}

        {groupSessions?.length > 0 && (
          <div className="mt-2">
            <h6 className="text-sm font-semibold text-gray-800 mb-2">
              Join a Group Session
            </h6>
            {groupSessions.map((group, idx) => (
              <>
                <AppButton
                  key={idx}
                  flexed
                  outlined
                  onClick={() => onGroupBook(group)}

                >
                  <AiOutlineUsergroupAdd size={20} />
                  {group.title} ({group.capacity - (group.bookedUsers?.length || 0)} slots left, {group.bookedUsers?.length || 0}/{group.capacity} booked)
                </AppButton>
                <br />
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RightComponent;