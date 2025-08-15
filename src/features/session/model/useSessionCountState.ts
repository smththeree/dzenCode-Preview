import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const useSessionCountState = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const socket = io("https://dzencode-server.onrender.com", {
      withCredentials: true,
    });
    const handleActiveSessions = (value: number): void => {
      setCount(value);
    };
    socket.on("activeSessions", handleActiveSessions);
    return () => {
      socket.off("activeSessions", handleActiveSessions);
      socket.disconnect();
    };
  }, []);

  return {
    count,
  };
};
