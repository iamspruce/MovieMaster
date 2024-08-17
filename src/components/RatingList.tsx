import React from "react";
import { Checkbox } from "./ui/checkbox";

const ratings: string[] = ["9+", "12+", "14+", "16+", "18+"];

interface RatingListProps {
  selectedRating: string;
  onChange: (rating: string) => void;
}

const RatingList: React.FC<RatingListProps> = ({
  selectedRating,
  onChange,
}) => {
  const handleCheckboxChange = (rating: string) => {
    onChange(rating);
  };

  return (
    <div className="space-y-2">
      {ratings.map((rating) => (
        <div key={rating} className="flex items-center space-x-2">
          <Checkbox
            className="border-white"
            checked={selectedRating === rating}
            onCheckedChange={() => handleCheckboxChange(rating)}
          />
          <span>{rating}</span>
        </div>
      ))}
    </div>
  );
};

export default RatingList;
