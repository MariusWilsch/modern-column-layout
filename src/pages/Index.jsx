import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const Index = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-[90%] h-5/6">
        <div className="flex-1 bg-white border border-gray-300 rounded-lg m-2 flex flex-col items-center justify-between">
          <h2 className="text-black mb-4">Column 1</h2>
          <div className="flex items-center w-full px-4 mb-4">
            <div className="relative flex-1">
              <Input className="w-full pr-10" placeholder="Type your message..." />
              <Button variant="outline" className="absolute right-0 top-0 h-full rounded-l-none">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-green-200 border border-gray-300 rounded-lg m-2 flex flex-col items-start justify-start p-4">
          <h2 className="text-black mb-4">Choose your pattern</h2>
          <div className="flex items-center justify-center w-full h-full">
            <h2 className="text-black">Column 2</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;