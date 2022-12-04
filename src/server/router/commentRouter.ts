import { createRouter } from "./context";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const commentRouter = createRouter()
  .query("get-movie-comments", {
    input: z.object({ movieId: z.string() }),
    async resolve({ input, ctx }) {
      const commentList = await ctx.prisma.comment.findMany({
        where: {
          MovieId: {
            equals: input.movieId,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return commentList;
    },
  })
  // .query("get-user-comment-votes", {
  //   input: z.object({ movieId: z.string(), userId: z.string() }),
  //   async resolve({ input, ctx }) {
  //     const commentLikes = await ctx.prisma.commentVotes.findMany({
  //       where: {
  //         AND: [
  //           {
  //             movieId: {
  //               equals: input.movieId,
  //             },
  //           },
  //           {
  //             userId: {
  //               equals: input.userId,
  //             },
  //           },
  //         ],
  //       },
  //     });
  //     console.log(commentLikes);
  //     return commentLikes;
  //   },
  // })
  .mutation("create-comment-vote", {
    input: z.object({
      userId: z.string(),
      movieId: z.string(),
      commentId: z.string(),
      isLike: z.boolean(),
    }),
    async resolve({ input, ctx }) {
      await ctx.prisma.commentVotes.create({
        data: {
          userId: input.userId,
          movieId: input.movieId,
          commentId: input.commentId,
          IsLike: input.isLike,
        },
      });
    },
  })
  .mutation("make-comment", {
    input: z.object({
      userId: z.string(),
      userName: z.string(),
      movieId: z.string(),
      text: z.string(),
    }),
    async resolve({ input, ctx }) {
      await ctx.prisma.comment.create({
        data: {
          userId: input.userId,
          userName: input.userName,
          MovieId: input.movieId,
          Text: input.text,
          Likes: 0,
          Dislikes: 0,
        },
      });
    },
  })
  .mutation("delete-comment", {
    input: z.object({
      commentId: z.string(),
    }),
    async resolve({ input, ctx }) {
      await ctx.prisma.comment.delete({
        where: {
          id: input.commentId,
        },
      });
    },
  })
  .mutation("like-comment", {
    input: z.object({
      commentId: z.string(),
      userId: z.string(),
      movieId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const comment = await ctx.prisma.comment.findFirst({
        where: {
          id: input.commentId,
        },
      });
      if (comment !== null && comment.Likes !== null) {
        await ctx.prisma.comment.update({
          where: {
            id: input.commentId,
          },
          data: {
            Likes: comment.Likes + 1,
          },
        });
      } else {
        throw new Error("Something went wrong");
      }
    },
  })
  .mutation("dislike-comment", {
    input: z.object({
      commentId: z.string(),
      userId: z.string(),
      movieId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const comment = await ctx.prisma.comment.findFirst({
        where: {
          id: input.commentId,
        },
      });
      if (comment !== null && comment.Dislikes !== null) {
        await ctx.prisma.comment.update({
          where: {
            id: input.commentId,
          },
          data: {
            Dislikes: comment.Dislikes + 1,
          },
        });
      } else {
        throw new Error("Something went wrong");
      }
    },
  });
