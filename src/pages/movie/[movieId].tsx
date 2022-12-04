import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import MovieDetailsOverview from "../../components/MovieDetails";
import Head from "next/head";
import { useState } from "react";
// import { tempMovieDetail } from "../../utils/tempMovieDetails";

const MovieDetails: NextPage = () => {
  const { data: session } = useSession();

  const nrouter = useRouter();
  const { movieId } = nrouter.query;
  const movieDetails = trpc.useQuery(["movie.get-movie-details", { id: movieId as string }]);
  const getComments = trpc.useQuery(["comment.get-movie-comments", { movieId: movieId as string }]);

  // const getUserCommentVotes = trpc.useQuery([
  //   "comment.get-user-comment-votes",
  //   {
  //     userId: session?.user?.id as string,
  //     movieId: movieId as string,
  //   },
  // ]);

  const [characterCount, setCharacterCount] = useState(0);

  const createComment = trpc.useMutation(["comment.make-comment"], {
    onSuccess: () => getComments.refetch(),
  });

  const deleteComment = trpc.useMutation(["comment.delete-comment"], {
    onSuccess: () => getComments.refetch(),
  });

  const likeComment = trpc.useMutation(["comment.like-comment"], {
    onSuccess: () => getComments.refetch(),
  });

  const dislikeComment = trpc.useMutation(["comment.dislike-comment"], {
    onSuccess: () => getComments.refetch(),
  });

  const createCommentVote = trpc.useMutation(["comment.create-comment-vote"]);

  const [commentText, setCommentText] = useState<string>("");

  if (movieDetails.isLoading) return <div>Loading..</div>;
  if (movieDetails.isError) return <h1>Not found</h1>;

  if (!session?.user) {
    router.push({
      pathname: "/",
    });
  }

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
            {getComments.data && (
              <div className="w-10/12 flex flex-col gap-4 mx-auto my-4 ">
                {getComments.data?.map((comment, index) => {
                  return (
                    <div
                      key={comment.id}
                      className="flex border-2 border-zinc-500  w-full rounded-2xl"
                    >
                      <div className="flex-1 p-4 text-ellipsis overflow-x-auto">
                        <div>
                          <a href={`/user/${comment.userName}`}>
                            <p className="text-2xl inline-block text-white">{comment.userName}</p>
                          </a>
                          <p className="inline-block mx-4 text-slate-200">
                            {comment.createdAt.toLocaleDateString()}
                          </p>
                          <button
                            className="btn btn-circle"
                            onClick={() => {
                              deleteComment.mutateAsync({ commentId: comment.id });
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                        <p className=" text-slate-300 ">{comment.Text}</p>
                      </div>
                      <div className="flex flex-col justify-center gap-10 p-4 text-white text-center">
                        <div>
                          <p>{comment.Likes}</p>
                          <button
                            className="btn"
                            onClick={() => {
                              likeComment.mutate({
                                commentId: comment.id,
                                userId: session?.user?.id as string,
                                movieId: movieId as string,
                              });
                              createCommentVote.mutate({
                                commentId: comment.id,
                                userId: session?.user?.id as string,
                                movieId: movieId as string,
                                isLike: true,
                              });
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="green"
                              className="w-10 h-10"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                              />
                            </svg>
                          </button>
                        </div>
                        <div>
                          <button
                            className="btn"
                            onClick={() => {
                              dislikeComment.mutateAsync({
                                commentId: comment.id,
                                userId: session?.user?.id as string,
                                movieId: movieId as string,
                              });
                              createCommentVote.mutate({
                                commentId: comment.id,
                                userId: session?.user?.id as string,
                                movieId: movieId as string,
                                isLike: false,
                              });
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="red"
                              className="w-10 h-10"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                              />
                            </svg>
                          </button>
                          <p>{comment.Dislikes}</p>
                        </div>
                      </div>
                    </div>
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
