import React from "react";
import { Slider } from "./ui/slider";

interface DurationSelectorProps {
  selectedDuration: number | null; // Allow null
  onChange: (value: number) => void;
}

const DurationSelector: React.FC<DurationSelectorProps> = ({
  selectedDuration = 30, // Default to 30 minutes if null
  onChange,
}) => {
  const handleChange = (value: number[]) => {
    onChange(value[0]);
  };

  return (
    <div className="p-4">
      <Slider
        id="duration-slider"
        min={30} // Minimum duration, e.g., 30 minutes
        max={244} // Maximum duration, e.g., 4 hours and 4 minutes (244 minutes)
        step={1} // Step size
        value={[selectedDuration !== null ? selectedDuration : 30]} // Default to 30 if null
        onValueChange={handleChange}
        className="w-full"
      />
      <div className="flex align-center justify-between mt-4">
        <label
          htmlFor="duration-slider"
          className="block text-sm font-medium mb-2"
        >
          30 m
        </label>
        <label
          htmlFor="duration-slider"
          className="block text-sm font-medium mb-2"
        >
          4 h 04 m
        </label>
      </div>
    </div>
  );
};

export default DurationSelector;
