"use client";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { ChevronDown, ChevronUp, Filter, Search } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import GenreList from "@/components/GenreList";
import ReleaseYearSelector from "@/components/ReleaseYearSelector";
import DurationSelector from "@/components/DurationSelector";
import RatingList from "@/components/RatingList";
import MovieCard from "@/components/MovieCard";
import { fetchMovies, Movie } from "@/lib/fetchMovies";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Initialize state with default values
  const [filters, setFilters] = React.useState({
    isFilterOpen: !isMobile,
    isFilterGenreOpen: !isMobile,
    isFilterYearOpen: !isMobile,
    isFilterDurationOpen: !isMobile,
    isFilterRatingOpen: !isMobile,
    searchQuery: "",
    genre: "",
    releaseYear: null,
    duration: null,
    rating: "",
  });

  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchInitialMovies = async () => {
      setLoading(true);
      const latestMovies = await fetchMovies({});
      setMovies(latestMovies);
      setLoading(false);
    };

    fetchInitialMovies();
  }, []);

  // Update filters state when `isMobile` changes
  React.useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      isFilterOpen: !isMobile, // Close filter on mobile
    }));
  }, [isMobile]);

  const handleSearch = async () => {
    if (!filters.searchQuery) return;

    setLoading(true);
    const searchedMovies = await fetchMovies({
      query: filters.searchQuery,
      genre: filters.genre,
      year: filters.releaseYear,
      duration: filters.duration,
      rating: filters.rating,
    });
    setMovies(searchedMovies);
    setLoading(false);
  };

  const handleFilterChange = (filterName: string, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  return (
    <>
      <header className="pt-12 pb-3">
        <h1 className="font-bold text-3xl">Your search</h1>
      </header>
      <div className="min-h-screen flex flex-col md:flex-row gap-4 md:gap-8 p-4">
        <aside className="w-full md:w-64">
          <Collapsible
            open={filters.isFilterOpen}
            onOpenChange={(isOpen) =>
              handleFilterChange("isFilterOpen", isOpen)
            }
            className="w-full"
          >
            <header className="w-full">
              <CollapsibleTrigger asChild>
                <Button className="w-full bg-foreground flex items-center justify-between py-2 px-6 rounded-md">
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4" />
                    <span className="font-semibold">Filter</span>
                  </div>
                  {filters.isFilterOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronUp className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </header>

            <CollapsibleContent className="p-4 mt-6 rounded-md bg-foreground">
              <Collapsible
                open={filters.isFilterGenreOpen}
                onOpenChange={(isOpen) =>
                  handleFilterChange("isFilterGenreOpen", isOpen)
                }
              >
                <CollapsibleTrigger asChild>
                  <Button className="w-full bg-foreground flex items-center justify-between p-2 rounded-md">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">Genres</span>
                    </div>
                    {filters.isFilterGenreOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronUp className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <GenreList
                    selectedGenre={filters.genre}
                    onChange={(genre) => handleFilterChange("genre", genre)}
                  />
                </CollapsibleContent>
              </Collapsible>
              <Collapsible
                open={filters.isFilterYearOpen}
                onOpenChange={(isOpen) =>
                  handleFilterChange("isFilterYearOpen", isOpen)
                }
              >
                <CollapsibleTrigger asChild>
                  <Button className="w-full bg-foreground flex items-center justify-between p-2 rounded-md">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">Release year</span>
                    </div>
                    {filters.isFilterYearOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronUp className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <ReleaseYearSelector
                    selectedYear={filters.releaseYear}
                    onChange={(year) => handleFilterChange("releaseYear", year)}
                  />
                </CollapsibleContent>
              </Collapsible>
              <Collapsible
                open={filters.isFilterDurationOpen}
                onOpenChange={(isOpen) =>
                  handleFilterChange("isFilterDurationOpen", isOpen)
                }
              >
                <CollapsibleTrigger asChild>
                  <Button className="w-full bg-foreground flex items-center justify-between p-2 rounded-md">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">Duration</span>
                    </div>
                    {filters.isFilterDurationOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronUp className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <DurationSelector
                    selectedDuration={filters.duration}
                    onChange={(duration) =>
                      handleFilterChange("duration", duration)
                    }
                  />
                </CollapsibleContent>
              </Collapsible>
              <Collapsible
                open={filters.isFilterRatingOpen}
                onOpenChange={(isOpen) =>
                  handleFilterChange("isFilterRatingOpen", isOpen)
                }
              >
                <CollapsibleTrigger asChild>
                  <Button className="w-full bg-foreground flex items-center justify-between p-2 rounded-md">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">Rating</span>
                    </div>
                    {filters.isFilterRatingOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronUp className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <RatingList
                    selectedRating={filters.rating}
                    onChange={(rating) => handleFilterChange("rating", rating)}
                  />
                </CollapsibleContent>
              </Collapsible>
            </CollapsibleContent>
          </Collapsible>
        </aside>
        <main className="flex-1">
          <header className="flex w-full gap-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full text-white rounded-lg bg-foreground pl-8"
                value={filters.searchQuery}
                onChange={(e) =>
                  handleFilterChange("searchQuery", e.target.value)
                }
              />
            </div>
            <Button onClick={handleSearch} className="bg-foreground">
              <span className="font-semibold">Search</span>
            </Button>
          </header>
          <div className="mt-6 flex flex-col gap-4">
            {loading ? (
              <>
                <MovieCardSkeleton />
                <MovieCardSkeleton />
              </>
            ) : (
              movies.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
              ))
            )}
          </div>
        </main>
      </div>
    </>
  );
}
