import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import MovieGrid from "../components/MovieGrid";
const LandingPage: NextPage = () => {
  const movies = trpc.useQuery(["movie.get-popular-movies"]);

  if (movies.isLoading) return null;

  return (
    <div>
      <h1>Trending Now</h1>
      {movies.data && <MovieGrid data={movies.data} />}
    </div>
  );
};

export default LandingPage;
