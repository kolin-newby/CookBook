import React, { useCallback, useEffect, useRef, useState } from "react";
import { NotificationContext } from "./NotificationContext";
import { X } from "lucide-react";
import { Transition, TransitionChild } from "@headlessui/react";

const createId = () => `${Date.now()}-${Math.random()}`;

export const NotificationProvider = ({ children, duration = 3000 }) => {
  const [notifications, setNotifications] = useState([]);
  const timers = useRef(new Map());

  const clearTimer = useCallback((id) => {
    const t = timers.current.get(id);
    if (t) {
      clearTimeout(t);
      timers.current.delete(id);
    }
  }, []);

  const dismiss = useCallback(
    (id) => {
      clearTimer(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, open: false } : n))
      );
    },
    [clearTimer]
  );

  const finalizeRemove = useCallback(
    (id) => {
      clearTimer(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    },
    [clearTimer]
  );

  const notify = useCallback(
    (message, customDuration = duration) => {
      const id = createId();

      setNotifications((prev) => [...prev, { id, message, open: true }]);

      if (customDuration !== Infinity) {
        const timeout = setTimeout(() => dismiss(id), customDuration);
        timers.current.set(id, timeout);
      }

      return { id, dismiss: () => dismiss(id) };
    },
    [duration, dismiss]
  );

  useEffect(() => {
    const current = timers.current;
    return () => {
      current.forEach(clearTimeout);
      current.clear();
    };
  }, []);

  const showViewport = notifications.some((n) => n.open);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}

      <Transition
        show={showViewport}
        as={"div"}
        appear
        className="fixed bottom-4 left-0 right-0 sm:left-1/2 z-50 sm:-translate-x-1/2 space-y-1 mx-0.5"
        enter="transition transform duration-200 linear"
        enterFrom="opacity-0 translate-y-full"
        enterTo="opacity-100 translate-y-0"
        leave="transition transform duration-200 linear"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-full"
      >
        {notifications.map((n) => (
          <TransitionChild
            as={"div"}
            key={n.id}
            show={n.open}
            appear
            afterLeave={() => finalizeRemove(n.id)}
            enter="transition transform duration-200 ease-out"
            enterFrom="opacity-0 translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition transform duration-150 ease-in"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-2"
          >
            <div className="w-full p-1 bg-theme-2 rounded-[50px]">
              <div className="flex items-center justify-between rounded-[50px] bg-theme-4 px-4 py-3 text-sm shadow text-theme-1">
                <h2 className="flex flex-1 items-center justify-center">
                  {n.message}
                </h2>

                <button
                  type="button"
                  onClick={() => dismiss(n.id)}
                  className="ml-4 rounded-full bg-transparent p-2 hover:bg-theme-2 text-theme-1 hover:text-theme-4 cursor-pointer transition-colors duration-200"
                  aria-label="Dismiss notification"
                >
                  <X />
                </button>
              </div>
            </div>
          </TransitionChild>
        ))}
      </Transition>
    </NotificationContext.Provider>
  );
};
