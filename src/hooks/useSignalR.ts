import { useEffect, useState } from 'react';
import { HubConnectionBuilder, HubConnection, LogLevel } from '@microsoft/signalr';

const useSignalR = (hubUrl: string) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [messages, setMessages] = useState<{ user: string, message: string }[]>([]);

  useEffect(() => {
    if (connection) return;
    const newConnection = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();
    newConnection.start()
      .then(() => console.log("SignalR connected"))
      .catch((err) => console.error("Error while starting connection:", err));
    setConnection(newConnection);

    return () => {
        newConnection.stop();
    };
  }, []);

  const sendTableExportData = async (user: string, message: string) => {
    if (connection) {
      try {
        await connection.invoke("SendTableExportData", user, message);
      } catch (error) {
        console.error("SendMessage Error:", error);
      }
    }
  };
  const sendUserInForm = async (user: object) => {
    if (connection) {
      try {
        await connection.invoke("SendUserInForm", user);
      } catch (error) {
        console.error("SendUserInForm Error:", error);
      }
    }
  };
  return { 
    messages, 
    sendTableExportData, 
    connection, 
    sendUserInForm,
   };
};

export default useSignalR;
