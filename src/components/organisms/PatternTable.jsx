import React from "react";
import PatternTableRow from "@/components/molecules/PatternTableRow";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PatternTable = ({ patterns, expandedPattern, handleExpandClick, setSelectedPattern }) => {
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
            <PatternTableRow
              key={pattern.id}
              pattern={pattern}
              expandedPattern={expandedPattern}
              handleExpandClick={handleExpandClick}
              setSelectedPattern={setSelectedPattern}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PatternTable;