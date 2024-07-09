import React from "react";
import Message from "@/components/atoms/Message";
import MessageInput from "@/components/molecules/MessageInput";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const ChatColumn = ({ messages, inputValue, setInputValue, handleSend }) => (
  <div className="flex-1 bg-white border border-gray-300 rounded-lg m-2 flex flex-col justify-between">
    <div className="flex flex-col items-start justify-start p-4">
      <h2 className="text-black mb-2">Chat Input</h2>
      <Label className="text-gray-600 mb-2">Type your input here...</Label>
      <Separator className="mb-4 w-full" />
      <Separator className="mb-4 w-full" />
      <div className="flex flex-col space-y-2 w-full">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
    </div>
    <MessageInput
      inputValue={inputValue}
      setInputValue={setInputValue}
      handleSend={handleSend}
    />
  </div>
);

export default ChatColumn;