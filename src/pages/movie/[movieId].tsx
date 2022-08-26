import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import LikeMovieButton from "../../components/LikeMovieButton";
import { tempMovieDetail } from "../../utils/tempMovieDetails";
import MovieDetailsOverview from "../../components/MoveDetails";

const MovieDetails: NextPage = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const { movieId } = router.query;

  // const movieDetails = trpc.useQuery(["movie.get-movie-details", { id: movieId as string }]);

  // if (movieDetails.isLoading) return <div>Loading..</div>;

  // if (movieDetails.isError) return <h1>Not found</h1>;

  return (
    <div>
      {/* {movieDetails.isSuccess && (
        <>
          <LikeMovieButton />
          <div>{JSON.stringify(movieDetails)}</div>
        </>
      )} */}
      <>
        {/* <LikeMovieButton /> */}
        <MovieDetailsOverview movie={tempMovieDetail} />
      </>
    </div>
  );
};

export default MovieDetails;
