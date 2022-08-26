import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import router, { useRouter } from "next/router";
import { useEffect } from "react";
import MovieGrid from "../../components/MovieGrid";
// import { tempMovieDetail } from "../../utils/tempMovieDetails";

const UserPage: NextPage = () => {
  const { data: session } = useSession();
  const nrouter = useRouter();
  const { name } = nrouter.query;
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

  console.log(movieLikes.data);

  return (
    <>
      {movieLikes.data && movieLikes.isSuccess && (
        <div>
          <h1 className="text-3xl text-white font-bold">Your liked movies</h1>
          <MovieGrid data={movieLikes.data} />
        </div>
      )}
    </>
  );
};

export default UserPage;
