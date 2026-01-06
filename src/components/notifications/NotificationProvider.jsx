import React, { useCallback, useEffect, useRef, useState } from "react";
import { NotificationContext } from "./NotificationContext";
import { X } from "lucide-react";
import { Transition, TransitionChild } from "@headlessui/react";

const createId = () => `${Date.now()}-${Math.random()}`;

export const NotificationProvider = ({ children, duration = 3000 }) => {
  const [notifications, setNotifications] = useState([]);
  const timers = useRef(new Map());

  const remove = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));

    if (timers.current.has(id)) {
      clearTimeout(timers.current.get(id));
      timers.current.delete(id);
    }
  }, []);

  const notify = useCallback(
    (message, customDuration = duration) => {
      const id = createId();

      setNotifications((prev) => [...prev, { id, message }]);

      const timeout = setTimeout(() => {
        remove(id);
      }, customDuration);

      timers.current.set(id, timeout);
    },
    [duration, remove]
  );

  useEffect(() => {
    const current = timers.current;
    return () => {
      current.forEach(clearTimeout);
      current.clear();
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}

      <Transition
        show={notifications.length > 0}
        appear
        className="fixed bottom-4 left-1/2 z-50 w-full max-w-md -translate-x-1/2 p-1 bg-theme-2 rounded-[50px]"
        enter="transition transform duration-200 linear"
        enterFrom="opacity-0 translate-y-full"
        enterTo="opacity-100 translate-y-0"
        leave="transition transform duration-200 linear"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-full"
      >
        <div>
          {notifications.map((n) => (
            <TransitionChild
              key={n.id}
              appear
              enter="transition transform duration-200 ease-out"
              enterFrom="opacity-0 translate-y-2"
              enterTo="opacity-100 translate-y-0"
              leave="transition transform duration-150 ease-in"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-2"
            >
              <div
                key={n.id}
                className="flex items-center justify-between rounded-[50px] bg-theme-4 px-4 py-3 text-sm shadow text-theme-1"
              >
                <h2>{n.message}</h2>

                <button
                  type="button"
                  onClick={() => remove(n.id)}
                  className="ml-4 rounded-full p-2 bg-transparent hover:bg-theme-2 text-theme-1 hover:text-theme-4 cursor-pointer transition-colors duration-200"
                  aria-label="Dismiss notification"
                >
                  <X />
                </button>
              </div>
            </TransitionChild>
          ))}
        </div>
      </Transition>
    </NotificationContext.Provider>
  );
};
