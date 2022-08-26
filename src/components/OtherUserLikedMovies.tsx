import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import router from "next/router";
import MovieGrid from "../components/MovieGrid";

const OtherUserLikedMovies = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">
        Viewing other users movies likes in the works :)
      </h1>
    </div>
  );
};

export default OtherUserLikedMovies;
