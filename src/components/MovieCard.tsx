import React from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Play } from "lucide-react";

interface MovieCardProps {
  movie: {
    Poster: string;
    Title: string;
    Year: string;
    Runtime: string;
    Genre: string;
    imdbRating: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Plot: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { Poster, Title, Year, Runtime, Genre, imdbRating, Ratings, Plot } =
    movie;

  const rottenTomatoesRating = Ratings?.find(
    (rating) => rating.Source === "Rotten Tomatoes"
  )?.Value;

  return (
    <div className="flex flex-col sm:flex-row bg-foreground p-4 rounded-lg">
      <img
        src={Poster}
        alt={Title}
        className="w-full sm:w-48 rounded-md object-cover"
      />
      <div className="sm:ml-4 mt-4 sm:mt-0 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold">{Title}</h2>
          <p className="text-sm text-gray-400">
            {Year} • {Runtime} • {Genre}
          </p>
          <div className="flex items-center mt-2 space-x-2">
            <div className="flex items-center ">
              <img
                src="/rotten-tomatoes-logo.svg"
                alt="Rotten Tomatoes"
                className="h-4"
              />
              <span className="ml-1 text-sm">{rottenTomatoesRating}</span>
            </div>
            <div className="flex items-center">
              <img src="/imdb-logo.svg" alt="IMDb" className="h-4 " />
              <span className="ml-1 text-sm ">{imdbRating}</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-300">{Plot}</p>
        </div>
        <div className="flex flex-wrap mt-4 gap-2">
          <Button className="flex items-center space-x-1 bg-blue-600 w-full sm:w-auto">
            <Play className="h-4 w-4" />
            <span>Watch the Movie</span>
          </Button>
          <Button className="flex items-center space-x-1 bg-green-600 w-full sm:w-auto">
            <ThumbsUp className="h-4 w-4" />
            <span>Like</span>
          </Button>
          <Button className="flex items-center space-x-1 bg-red-600 w-full sm:w-auto">
            <ThumbsDown className="h-4 w-4" />
            <span>Dislike</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
