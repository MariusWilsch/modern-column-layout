import React from "react";
import { Input } from "@/components/ui/input";
import { call_claude } from "@/lib/anthropic/client";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { toast } from "sonner";

const MessageInput = ({ inputValue, setInputValue, handleSend, selectedPattern, patterns }) => (
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
        onClick={async () => {
          if (!inputValue.trim()) {
            toast.error("Please add your input.", {
              style: {
                border: '1px solid red',
                padding: '16px',
                color: 'red',
              },
              position: 'top-right',
            });
          } else if (!selectedPattern) {
            toast.error("Please choose a pattern first.", {
              style: {
                border: '1px solid red',
                padding: '16px',
                color: 'red',
              },
              position: 'top-right',
            });
          } else {
            const systemPrompt = patterns.find(pattern => pattern.id === selectedPattern).patterns.join("\n\n");
            const userPrompt = inputValue;
            const response = await call_claude(systemPrompt, userPrompt);
            handleSend(response);
            toast("Success");
          }
        }}
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

export default MessageInput;