import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import router, { useRouter } from "next/router";
import { useEffect } from "react";
import MovieGrid from "../../components/MovieGrid";
import YourLikedMovies from "../../components/YourLikedMovies";
import OtherUserLikedMovies from "../../components/OtherUserLikedMovies";
// import { tempMovieDetail } from "../../utils/tempMovieDetails";

const UserPage: NextPage = () => {
  const { data: session } = useSession();
  const nrouter = useRouter();
  const { name } = nrouter.query;

  return (
    <div className="text-center">
      {name === session?.user?.name ? <YourLikedMovies /> : <OtherUserLikedMovies />}
    </div>
  );
};

export default UserPage;
