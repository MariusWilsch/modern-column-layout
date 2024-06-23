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
import { Pagination } from "@/components/ui/pagination";
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

const PatternTable = ({ patterns, expandedPattern, handleExpandClick, setSelectedPattern }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedCheckboxes, setSelectedCheckboxes] = React.useState([]);
  
  const itemsPerPage = 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = (patternId) => {
    setSelectedCheckboxes((prevSelected) => {
      if (prevSelected.includes(patternId)) {
        return prevSelected.filter((id) => id !== patternId);
      } else {
        return [...prevSelected, patternId];
      }
    });
  };

  const paginatedPatterns = patterns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Pattern Name</TableHead>
            <TableHead>Short Summary</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedPatterns.map((pattern, index) => (
            <TableRow key={pattern.id}>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedCheckboxes.includes(pattern.id)}
                    onChange={() => handleCheckboxChange(pattern.id)}
                  />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="min-w-[60%] h-[60vh] overflow-auto">
                      <DialogHeader>
                        <DialogTitle className="text-4xl mb-2">
                          {pattern.file_name.replace(/_/g, ' ')}
                        </DialogTitle>
                        <Separator className="my-4" />
                        <DialogDescription>
                          {renderMarkdown(pattern.patterns)}
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
              <TableCell>{pattern.file_name.replace(/_/g, ' ')}</TableCell>
              <TableCell>
                {pattern.patterns.split(" ").slice(0, 10).join(" ")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        totalItems={patterns.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PatternTable;

// Ensure the PatternTable component receives the setSelectedPattern prop
const PatternColumn = ({ patterns, expandedPattern, handleExpandClick, setSelectedPattern }) => {
  return (
    <PatternTable
      patterns={patterns}
      expandedPattern={expandedPattern}
      handleExpandClick={handleExpandClick}
      setSelectedPattern={setSelectedPattern}
    />
  );
};