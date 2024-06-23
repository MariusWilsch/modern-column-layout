import React from "react";
import { User, MessageSquare } from "lucide-react";
import Message from "@/components/atoms/Message";
import MessageInput from "@/components/molecules/MessageInput";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const ChatColumn = ({ messages, inputValue, setInputValue, handleSend, patterns, selectedPattern }) => (
  <div className="flex-1 bg-white border border-gray-300 rounded-lg m-2 flex flex-col justify-between">
    <div className="flex flex-col items-start justify-start p-4">
      <h2 className="text-black mb-2">Chat Input</h2>
      <Label className="text-gray-600 mb-2">Type your input here...</Label>
      <Separator className="mb-4 w-full" />
      <div className="flex flex-col space-y-2 w-full">
        {messages.map((message, index) => (
          <div key={index} className="bg-lightgrey rounded-lg p-2 flex items-center space-x-2">
            {message.role === "user" ? (
              <User className="h-4 w-4 text-grey" />
            ) : (
              <MessageSquare className="h-4 w-4 text-grey" />
            )}
            <span className="text-black">{message.content}</span>
          </div>
        ))}
      </div>
    </div>
    <MessageInput
      inputValue={inputValue}
      setInputValue={setInputValue}
      handleSend={(response) => {
        setMessages([...messages, { role: "user", content: inputValue }, { role: "assistant", content: response }]);
        setInputValue("");
      }}
      selectedPattern={selectedPattern}
      patterns={patterns}
    />
  </div>
);

export default ChatColumn;