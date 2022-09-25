import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import MovieGrid from "../components/MovieGrid";
import MovieCarousel from "../components/MovieCarousel";
import { useSession } from "next-auth/react";
import router from "next/router";
import Head from "next/head";
// import testData from "../utils/tempMovieData";

const LandingPage: NextPage = () => {
  const { data: session } = useSession();
  const movies = trpc.useQuery(["movie.get-popular-movies"]);

  if (movies.isLoading) return null;

  if (!session?.user) {
    router.push({
      pathname: "/",
    });
  }

  return (
    <div className="text-center">
      <Head>
        <title>Home</title>
      </Head>
      <h1 className="font-bold text-6xl pb-5 text-white">Trending Now</h1>
      {movies.data && <MovieCarousel data={movies.data.slice(0, 10)} />}
      {movies.data && <MovieGrid data={movies.data} />}
    </div>
  );
};

export default LandingPage;
