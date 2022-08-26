import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import router from "next/router";
import MovieGrid from "../components/MovieGrid";
// import { tempMovieDetail } from "../../utils/tempMovieDetails";

const YourLikedMovies = () => {
  const { data: session } = useSession();
  const movieLikes = trpc.useQuery([
    "movie.get-user-liked-movies-by-id",
    { userId: session?.user?.id as string },
  ]);

  if (movieLikes.isLoading) return <div>Loading...</div>;

  if (movieLikes.isError) return <h1>Not found</h1>;

  if (!session?.user) {
    router.push({
      pathname: "/",
    });
  }

  return (
    <div>
      {movieLikes.data && movieLikes.isSuccess && (
        <div>
          <h1 className="text-3xl text-white font-bold">Your liked movies</h1>
          <MovieGrid data={movieLikes.data} />
        </div>
      )}
      {!movieLikes.data && (
        <div>
          <h1 className="text-5xl text-white font-bold ">Like some movies to see them all here!</h1>
        </div>
      )}
    </div>
  );
};

export default YourLikedMovies;
