import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import MovieDetailsOverview from "../../components/MovieDetails";
import Head from "next/head";
import { useState } from "react";
import Comment from "../../components/Comment";
// import { tempMovieDetail } from "../../utils/tempMovieDetails";

const MovieDetails: NextPage = () => {
  const { data: session } = useSession();

  const nrouter = useRouter();
  const { movieId } = nrouter.query;
  const movieDetails = trpc.useQuery(["movie.get-movie-details", { id: movieId as string }]);
  const getComments = trpc.useQuery(["comment.get-movie-comments", { movieId: movieId as string }]);

  const getUserCommentVotes = trpc.useQuery([
    "comment.get-user-comment-votes",
    {
      userId: session?.user?.id as string,
      movieId: movieId as string,
    },
  ]);

  const [characterCount, setCharacterCount] = useState(0);

  const createComment = trpc.useMutation(["comment.make-comment"], {
    onSuccess: () => getComments.refetch(),
  });

  const [commentText, setCommentText] = useState<string>("");

  if (movieDetails.isLoading) return <div>Loading..</div>;
  if (movieDetails.isError) return <h1>Not found</h1>;

  if (!session?.user) {
    router.push({
      pathname: "/",
    });
  }

  console.log(getUserCommentVotes.data);
  return (
    <div>
      <>
        {movieDetails.data && (
          <>
            <Head>
              <title>{movieDetails.data.title}</title>
            </Head>
            <MovieDetailsOverview movie={movieDetails.data} />
            <div>
              <h2 className="text-5xl text-center font-bold text-white">Comments</h2>
              <div className="form-control w-10/12 flex mx-auto">
                <label className="label">
                  <span className="label-text">Comment here</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24 text-white"
                  placeholder="Comment here"
                  onChange={(e) => {
                    setCommentText(e.target.value);
                    setCharacterCount(e.target.value.length);
                  }}
                  maxLength={4000}
                  value={commentText}
                />
                <label className="label">
                  <span className="label-text-alt">{`${characterCount}/4000`}</span>
                </label>
                <button
                  className="btn"
                  onClick={() => {
                    createComment.mutateAsync({
                      userId: session?.user?.id as string,
                      userName: session?.user?.name as string,
                      movieId: movieId as string,
                      text: commentText,
                    });
                    setCommentText("");
                  }}
                >
                  Post comment
                </button>
              </div>
            </div>
            {getComments.data && getUserCommentVotes.data && (
              <div className="w-10/12 flex flex-col gap-4 mx-auto my-4 ">
                {getComments.data?.map((comment, index) => {
                  return (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      session={session}
                      getComments={getComments}
                      getUserCommentVotes={getUserCommentVotes}
                      movieId={movieId as string}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default MovieDetails;
