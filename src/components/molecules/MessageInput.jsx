import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const MessageInput = ({ inputValue, setInputValue, handleSend }) => (
  <div className="flex items-center w-full px-4 mb-4">
    <div className="relative flex-1">
      <Input
        className="w-full pr-10"
        placeholder="Type your message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button
        variant="outline"
        className="absolute right-0 top-0 h-full rounded-l-none"
        onClick={handleSend}
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

export default MessageInput;