import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";

const MovieDetails: NextPage = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const { movieId } = router.query;

  const movieDetails = trpc.useQuery(["movie.get-movie-details", { id: movieId as string }]);

  if (movieDetails.isLoading) return <div>Loading..</div>;

  if (movieDetails.isError) return <h1>Not found</h1>;

  return (
    <div>
      <button></button>
      {movieDetails.isSuccess && <div>{JSON.stringify(movieDetails)}</div>}
    </div>
  );
};

export default MovieDetails;
