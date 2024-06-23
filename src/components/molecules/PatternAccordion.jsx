import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Label } from "@/components/ui/label";
import Loading from "@/components/atoms/Loading";
import Error from "@/components/atoms/Error";
import { useQuery } from "@tanstack/react-query";
import { fromSupabase, supabase } from "@/integrations/supabase/index.js";

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

const renderMarkdown = (markdown) => {
  const cleanedMarkdown = markdown.replace(/# IDENTITY and PURPOSE/g, '');
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
      {cleanedMarkdown}
    </ReactMarkdown>
  );
};

const PatternTable = ({ patterns, expandedPattern, handleExpandClick, setSelectedPattern }) => {
  console.log("Patterns data: ", patterns);
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

  return (
    <div className="w-full h-full overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Pattern Name</TableHead>
            <TableHead>Short Summary</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patterns.map((pattern, index) => (
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
                      {console.log("Dialog pattern data: ", pattern)}
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
                {renderMarkdown(pattern.patterns.join(" ").split(" ").slice(0, 10).join(" "))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PatternTable;

const PatternColumn = ({ patterns, isLoading, error, expandedPattern, handleExpandClick, setSelectedPattern }) => (
  <div className="flex-1 bg-white border border-gray-300 rounded-lg m-2 flex flex-col items-start justify-start p-4 h-full">
    <h2 className="text-black mb-4">Patterns</h2>
    <Label className="text-gray-600 mb-2">Choose from pre-written patterns</Label>
    <Separator className="mb-4" />
    {isLoading ? (
      <Loading />
    ) : error ? (
      <Error message={error.message} />
    ) : (
      <PatternTable
        patterns={patterns}
        expandedPattern={expandedPattern}
        handleExpandClick={handleExpandClick}
        setSelectedPattern={setSelectedPattern}
      />
    )}
  </div>
);

const Index = () => {
  const { data: patterns, isLoading, error } = usePatterns();
  console.log("Patterns data in Index: ", patterns);
  // existing code...
};

export const usePatterns = () => useQuery({
  queryKey: ['Patterns'],
  queryFn: () => fromSupabase(supabase.from('Patterns').select('*')),
  onSuccess: (data) => {
    console.log("Fetched patterns data: ", data);
  },
});