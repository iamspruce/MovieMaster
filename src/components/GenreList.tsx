import React from "react";
import { Checkbox } from "./ui/checkbox";

const genres: string[] = [
  "Action",
  "Adventure",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "Horror",
  "Romance",
  "Science Fiction",
];

interface GenreListProps {
  selectedGenre: string;
  onChange: (genre: string) => void;
}

const GenreList: React.FC<GenreListProps> = ({ selectedGenre, onChange }) => {
  const handleCheckboxChange = (genre: string) => {
    onChange(genre);
  };

  return (
    <div className="space-y-2">
      {genres.map((genre) => (
        <div key={genre} className="flex items-center space-x-2">
          <Checkbox
            className="border-white"
            checked={selectedGenre === genre}
            onCheckedChange={() => handleCheckboxChange(genre)}
          />
          <span>{genre}</span>
        </div>
      ))}
    </div>
  );
};

export default GenreList;
