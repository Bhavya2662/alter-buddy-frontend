import React, { useState, useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";

interface CountDownTimerProps {
  mins: number;
  onComplete: () => void;
  onExpired?: () => void; // New callback for when session expires
}

export const CountdownTimerL: FC<CountDownTimerProps> = ({ mins, onComplete, onExpired }) => {
  const [time, setTime] = useState<number>(mins * 60); // Convert minutes to seconds
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>("");
  const [hasShown2MinWarning, setHasShown2MinWarning] = useState<boolean>(false);
  const [hasShown1MinWarning, setHasShown1MinWarning] = useState<boolean>(false);
  
  useEffect(() => {
    if (time === 0 && !isExpired) {
      setIsExpired(true);
      onComplete();
      if (onExpired) {
        onExpired();
      }
      return;
    }
    
    // Show warning when 2 minutes left
    if (time === 120 && !hasShown2MinWarning) {
      setHasShown2MinWarning(true);
      setWarningMessage("⚠️ Your session will end in 2 minutes!");
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 5000); // Hide after 5 seconds
    }
    
    // Show warning when 1 minute left
    if (time === 60 && !hasShown1MinWarning) {
      setHasShown1MinWarning(true);
      setWarningMessage("⚠️ Your session will end in 1 minute!");
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 5000); // Hide after 5 seconds
    }
    
    if (time > 0) {
      const timer = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime > 0 ? prevTime - 1 : 0;
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [time, onComplete, onExpired, isExpired, hasShown2MinWarning, hasShown1MinWarning]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <>
      <p className={`animate-pulse ${isExpired ? 'text-red-500' : ''}`}>
        {isExpired ? 'Session Expired' : `Time left - ${formatTime(time)}`}
      </p>
      
      {/* Warning Popup */}
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <div className="text-center">
              <div className="text-yellow-500 text-4xl mb-3">⚠️</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Session Timeout Warning</h3>
              <p className="text-gray-600 mb-4">{warningMessage}</p>
              <button
                onClick={() => setShowWarning(false)}
                className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
