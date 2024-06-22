import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, User } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { usePatterns } from "../integrations/supabase/index.js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { data: patterns, isLoading, error } = usePatterns();
  const [expandedPattern, setExpandedPattern] = useState(null);

  const handleSend = () => {
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
        <div
          id="column1"
          className="flex-1 bg-white border border-gray-300 rounded-lg m-2 flex flex-col justify-between"
        >
          <div className="flex flex-col items-start justify-start p-4">
            <h2 className="text-black mb-2">Chat Input</h2>
            <Label className="text-gray-600 mb-2">
              Type your input here...
            </Label>
            <Separator className="mb-4 w-full" />
            <div className="flex flex-col space-y-2 w-full">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className="bg-gray-200 rounded-lg p-2 flex items-center space-x-2"
                >
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="text-black">{message}</span>
                </div>
              ))}
            </div>
          </div>
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
        </div>
        <div
          id="column2"
          className="flex-1 bg-white border border-gray-300 rounded-lg m-2 flex flex-col items-start justify-start p-4"
        >
          <h2 className="text-black mb-4">Patterns</h2>
          <Label className="text-gray-600 mb-2">
            Choose from pre-written patterns
          </Label>
          <Separator className="mb-4" />
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error loading patterns</p>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {patterns.map((pattern, index) => {
                const isExpanded = expandedPattern === index;
                const content = isExpanded
                  ? pattern.patterns
                  : pattern.patterns.slice(0, 500) +
                    (pattern.patterns.length > 500 ? "..." : "");
                return (
                  <AccordionItem key={pattern.id} value={`item-${index}`}>
                    <AccordionTrigger>Pattern {index + 1}</AccordionTrigger>
                    <AccordionContent>
                      <ReactMarkdown
                        remarkPlugins={[remarkParse, remarkGfm]}
                        components={{
                          h1: ({ node, ...props }) => (
                            <h1
                              className="text-2xl font-bold my-4"
                              {...props}
                            />
                          ),
                          h2: ({ node, ...props }) => (
                            <h2
                              className="text-xl font-semibold my-3"
                              {...props}
                            />
                          ),
                          p: ({ node, ...props }) => (
                            <p className="my-2" {...props} />
                          ),
                          code: ({ node, inline, ...props }) => (
                            <code
                              className={`${
                                inline
                                  ? "bg-gray-100 rounded px-1"
                                  : "block bg-gray-100 p-2 my-2 rounded"
                              }`}
                              {...props}
                            />
                          ),
                        }}
                      >
                        {content}
                      </ReactMarkdown>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
