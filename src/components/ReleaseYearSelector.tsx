import React from "react";
import { Slider } from "./ui/slider";

interface ReleaseYearSelectorProps {
  selectedYear: number | null; // Allow null
  onChange: (value: number) => void;
}

const ReleaseYearSelector: React.FC<ReleaseYearSelectorProps> = ({
  selectedYear = 2024, // Default to current year if null
  onChange,
}) => {
  const handleChange = (value: number[]) => {
    onChange(value[0]);
  };

  return (
    <div className="p-4">
      <Slider
        id="release-year-slider"
        min={1900} // Set the minimum year
        max={2024} // Set the maximum year
        step={1} // Set the step size
        value={[selectedYear !== null ? selectedYear : 2024]} // Default to 2024 if null
        onValueChange={handleChange}
        className="w-full"
      />
      <div className="flex align-center justify-between mt-4">
        <label
          htmlFor="release-year-slider"
          className="block text-sm font-medium mb-2"
        >
          1900
        </label>
        <label
          htmlFor="release-year-slider"
          className="block text-sm font-medium mb-2"
        >
          2024
        </label>
      </div>
    </div>
  );
};

export default ReleaseYearSelector;
