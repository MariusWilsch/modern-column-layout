import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-[90%] h-5/6">
        <div id="column1" className="flex-1 bg-white border border-gray-300 rounded-lg m-2 flex flex-col items-start justify-start">
          <h2 className="text-black mb-2 self-start mt-4 ml-4">Chat Input</h2>
          <Label className="text-gray-600 mb-2 self-start ml-4">Type your input here...</Label>
          <Separator className="mb-4 w-full" />
          <div className="flex items-center w-full px-4 mb-4">
            <div className="relative flex-1">
              <Input className="w-full pr-10" placeholder="Type your message..." />
              <Button variant="outline" className="absolute right-0 top-0 h-full rounded-l-none">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div id="column2" className="flex-1 bg-white border border-gray-300 rounded-lg m-2 flex flex-col items-start justify-start p-4">
          <h2 className="text-black mb-4">Patterns</h2>
          <Label className="text-gray-600 mb-2">Choose from pre-written patterns</Label>
          <Separator className="mb-4" />
          <div className="flex items-center justify-center w-full h-full">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Option 1</AccordionTrigger>
                <AccordionContent>
                  Content for Option 1
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Option 2</AccordionTrigger>
                <AccordionContent>
                  Content for Option 2
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Option 3</AccordionTrigger>
                <AccordionContent>
                  Content for Option 3
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;