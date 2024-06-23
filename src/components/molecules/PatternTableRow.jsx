import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdownStyles = {
  h1: {
    fontSize: "1.5em",
    fontWeight: "bold",
    marginBottom: "0.5em",
    color: "black",
  },
  h2: {
    fontSize: "1.25em",
    fontWeight: "bold",
    marginBottom: "0.5em",
    color: "black",
  },
  h3: {
    fontSize: "1.00em",
    fontWeight: "bold",
    marginBottom: "0.5em",
    color: "black",
  },
  p: { marginBottom: "1em", color: "black" },
  ul: { marginLeft: "1em", marginBottom: "1em", color: "black" },
  ol: { marginLeft: "1em", marginBottom: "1em", color: "black" },
  li: { marginBottom: "0.5em", color: "black" },
  a: { color: "black", textDecoration: "underline" },
};

const capitalizeFileName = (fileName) => {
  return fileName.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
};

const PatternTableRow = ({ pattern, expandedPattern, handleExpandClick, setSelectedPattern }) => {
  const [selectedCheckbox, setSelectedCheckbox] = React.useState(null);

  const handleCheckboxChange = (patternId) => {
    setSelectedCheckbox((prevSelected) => {
      if (prevSelected === patternId) {
        return null; // Uncheck if the same checkbox is clicked
      } else {
        return patternId; // Select the new checkbox
      }
    });
  };

  const renderMarkdown = (markdown) => {
    return (
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1 style={markdownStyles.h1} {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 style={markdownStyles.h2} {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 style={markdownStyles.h3} {...props} />
          ),
          p: ({ node, ...props }) => <p style={markdownStyles.p} {...props} />,
          ul: ({ node, ...props }) => (
            <ul style={markdownStyles.ul} {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol style={markdownStyles.ol} {...props} />
          ),
          li: ({ node, ...props }) => (
            <li style={markdownStyles.li} {...props} />
          ),
          a: ({ node, ...props }) => <a style={markdownStyles.a} {...props} />,
        }}
      >
        {markdown}
      </ReactMarkdown>
    );
  };

  return (
    <TableRow key={pattern.id}>
      <TableCell>
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={selectedCheckbox === pattern.id}
            onCheckedChange={() => handleCheckboxChange(pattern.id)}
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[60%] h-[60vh] overflow-auto p-4 bg-white text-black">
              <DialogHeader>
                <DialogTitle className="text-4xl mb-2">
                  {capitalizeFileName(pattern.file_name)}
                </DialogTitle>
                <Separator className="my-4" />
                <DialogDescription>
                  {renderMarkdown(pattern.patterns.join("\n\n") || '')}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </TableCell>
      <TableCell>{capitalizeFileName(pattern.file_name)}</TableCell>
      <TableCell className="text-black">
        {pattern.patterns.join(" ").split(" ").slice(0, 10).join(" ")}
      </TableCell>
    </TableRow>
  );
};

export default PatternTableRow;