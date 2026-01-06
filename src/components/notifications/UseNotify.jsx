import React, { useContext } from "react";
import { NotificationContext } from "./NotificationContext";

const UseNotify = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error("useNotify must be used within NotificationProvider");
  }
  return ctx.notify;
};

export default UseNotify;
