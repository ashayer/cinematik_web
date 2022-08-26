import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import MovieGrid from "../components/MovieGrid";
import testData from "../utils/tempMovieData";
import MovieCarousel from "../components/MovieCarousel";
const LandingPage: NextPage = () => {
  //const movies = trpc.useQuery(["movie.get-popular-movies"]);

  //if (movies.isLoading) return null;

  return (
    <div className="text-center">
      <h1 className="font-bold text-6xl pb-5 text-white">Trending Now</h1>
      {/* {movies.data && <MovieGrid data={movies.data} />} */}
      {<MovieCarousel data={testData.slice(0, 10)} />}
      {<MovieGrid data={testData} />}
    </div>
  );
};

export default LandingPage;
