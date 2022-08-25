import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";

const MovieDetails: NextPage = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const movieDetails = trpc.useQuery(["example.get-movie-details", { id: movieId as string }]);

  if (movieDetails.isLoading) return <div>Loading..</div>;
  return <div>{movieDetails.isSuccess && <div>{JSON.stringify(movieDetails)}</div>}</div>;
};

export default MovieDetails;
