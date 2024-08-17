// lib/fetchMovies.ts
const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

export interface Movie {
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
}

export const fetchMovies = async (options: {
  query?: string;
  genre?: string;
  year?: string | null;
  duration?: string | null;
  rating?: string;
}): Promise<Movie[]> => {
  try {
    const { query, genre, year, duration, rating } = options;

    let searchQuery = query ? `s=${query}` : `s=Avengers`;

    if (genre) {
      searchQuery += `&genre=${genre}`;
    }
    if (year) {
      searchQuery += `&y=${year}`;
    }
    if (duration) {
      searchQuery += `&runtime=${duration}`;
    }
    if (rating) {
      searchQuery += `&rating=${rating}`;
    }

    // Add the page parameter to limit results to the first 10
    const response = await fetch(
      `https://www.omdbapi.com/?${searchQuery}&page=1&apikey=${API_KEY}`
    );

    const data = await response.json();

    if (data.Search) {
      const moviesData = await Promise.all(
        data.Search.slice(0, 5).map(async (movie: { imdbID: string }) => {
          const movieResponse = await fetch(
            `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`
          );
          return await movieResponse.json();
        })
      );

      return moviesData;
    } else {
      return [];
    }
  } catch (error: any) {
    console.error("Failed to fetch movies", error.message);
    return [];
  }
};
