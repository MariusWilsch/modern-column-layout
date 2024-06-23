import React from "react";
import { User } from "lucide-react";

const Message = ({ message }) => (
  <div className="bg-lightgrey rounded-lg p-2 flex items-center space-x-2">
    <User className="h-4 w-4 text-grey" />
    <span className="text-black">{message}</span>
  </div>
);

export default Message;