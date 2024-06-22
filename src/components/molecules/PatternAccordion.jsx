import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";

const PatternAccordion = ({ patterns, expandedPattern, handleExpandClick }) => (
  <Accordion type="single" collapsible className="w-full">
    {patterns.map((pattern, index) => {
      const isExpanded = expandedPattern === index;
      const content = isExpanded
        ? pattern.patterns
        : pattern.patterns.slice(0, 500) +
          (pattern.patterns.length > 500 ? "..." : "");
      return (
        <AccordionItem key={pattern.id} value={`item-${index}`}>
          <AccordionTrigger onClick={() => handleExpandClick(index)}>
            Pattern {index + 1}
          </AccordionTrigger>
          <AccordionContent>
            <ReactMarkdown
              remarkPlugins={[remarkParse, remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-2xl font-bold my-4" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-xl font-semibold my-3" {...props} />
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
);

export default PatternAccordion;