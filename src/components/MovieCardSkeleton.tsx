import React from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component from Shadcn UI

const MovieCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row bg-foreground p-4 rounded-lg">
      <Skeleton className="w-full sm:w-48 rounded-md" />
      <div className="sm:ml-4 mt-4 sm:mt-0 flex flex-col justify-between">
        <div>
          <Skeleton className="w-1/2 h-6 mb-2" /> {/* Title */}
          <Skeleton className="w-1/3 h-4 mb-2" /> {/* Year, Runtime, Genre */}
          <div className="flex items-center mt-2 space-x-2">
            <Skeleton className="w-20 h-4" /> {/* Rotten Tomatoes Rating */}
            <Skeleton className="w-20 h-4" /> {/* IMDb Rating */}
          </div>
          <Skeleton className="w-full h-16 mt-4" /> {/* Plot */}
        </div>
        <div className="flex  mt-4 gap-2">
          <Skeleton className="w-full  h-8" /> {/* Watch Button */}
          <Skeleton className="w-full  h-8" /> {/* Like Button */}
          <Skeleton className="w-full  h-8" /> {/* Dislike Button */}
        </div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
