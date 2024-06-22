import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";

const PatternTable = ({ patterns, expandedPattern, handleExpandClick }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedPatterns = patterns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox />
            </TableHead>
            <TableHead>Pattern Name</TableHead>
            <TableHead>Short Summary</TableHead>
            <TableHead className="w-[50px]">Expand</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedPatterns.map((pattern, index) => (
            <TableRow key={pattern.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{pattern.name}</TableCell>
              <TableCell>
                {pattern.patterns.split(" ").slice(0, 10).join(" ")}
              </TableCell>
              <TableCell>
                <Button variant="outline" onClick={() => handleExpandClick(index)}>
                  <ChevronDown className="h-4 w-4" />
                </Button>
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