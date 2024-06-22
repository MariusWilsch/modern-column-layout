import React from "react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Loading from "@/components/atoms/Loading";
import Error from "@/components/atoms/Error";
import PatternAccordion from "@/components/molecules/PatternAccordion";

const PatternColumn = ({ patterns, isLoading, error, expandedPattern, handleExpandClick }) => (
  <div className="flex-1 bg-white border border-gray-300 rounded-lg m-2 flex flex-col items-start justify-start p-4">
    <h2 className="text-black mb-4">Patterns</h2>
    <Label className="text-gray-600 mb-2">Choose from pre-written patterns</Label>
    <Separator className="mb-4" />
    {isLoading ? (
      <Loading />
    ) : error ? (
      <Error message={error.message} />
    ) : (
      <PatternAccordion
        patterns={patterns}
        expandedPattern={expandedPattern}
        handleExpandClick={handleExpandClick}
      />
    )}
  </div>
);

export default PatternColumn;