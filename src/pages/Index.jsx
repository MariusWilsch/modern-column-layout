import React, { useState } from "react";
import { toast } from "sonner";
import { usePatterns } from "../integrations/supabase/index.js";
import ChatColumn from "@/components/organisms/ChatColumn";
import PatternColumn from "@/components/organisms/PatternColumn";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { data: patterns, isLoading, error } = usePatterns();
  const [expandedPattern, setExpandedPattern] = useState(null);
  const [selectedPattern, setSelectedPattern] = useState(null);
  
  const { toast } = useToast();

  const handleSend = () => {
    if (selectedPattern === null) {
      toast({
        title: "No Pattern Selected",
        description: "Please choose a pattern first.",
        position: "top-right",
        status: "error",
        style: {
          backgroundColor: "black",
          color: "white"
        }
      });
      return;
    }
    if (inputValue.trim() !== "") {
      setMessages([...messages, inputValue]);
      setInputValue("");
    }
  };

  const handleExpandClick = (index) => {
    setExpandedPattern(index === expandedPattern ? null : index);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-[90%] h-5/6">
        <ChatColumn
          messages={messages}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSend={handleSend}
        />
        <PatternColumn
          patterns={patterns}
          isLoading={isLoading}
          error={error}
          expandedPattern={expandedPattern}
          handleExpandClick={handleExpandClick}
          setSelectedPattern={setSelectedPattern}
        />
      </div>
    </div>
  );
};

export default Index;