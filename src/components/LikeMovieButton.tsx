import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import { useState } from "react";

const LikeMovieButton = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const { movieId } = router.query;
  const [movieIsLiked, setMovieIsLiked] = useState(false);
  const userMovieLikes = trpc.useQuery([
    "movie.check-if-movie-liked",
    { userId: session?.user?.id as string, movieId: movieId as string },
  ]);

  const likeMovieMutation = trpc.useMutation(["movie.like-movie-by-id"]);
  const dislikeMutation = trpc.useMutation(["movie.disliked-movie"]);

  if (userMovieLikes.isLoading) return null;
  return (
    <>
      {movieIsLiked || userMovieLikes.data !== null ? (
        <button
          className="btn btn-circle"
          onClick={() => {
            console.log("disliking movie");
            dislikeMutation.mutate({
              userId: session?.user?.id as string,
              movieId: movieId as string,
            });
            setMovieIsLiked(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="red"
            viewBox="0 0 23 24"
            stroke="red"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      ) : (
        <button
          className="btn btn-circle"
          onClick={() => {
            console.log("liking movie");
            likeMovieMutation.mutate({
              userId: session?.user?.id as string,
              movieId: movieId as string,
            });
            setMovieIsLiked(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      )}
    </>
  );
};
export default LikeMovieButton;
