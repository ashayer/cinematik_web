import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import router, { useRouter } from "next/router";
import { useEffect } from "react";
import MovieGrid from "../../components/MovieGrid";
import YourLikedMovies from "../../components/YourLikedMovies";
import OtherUserLikedMovies from "../../components/OtherUserLikedMovies";
import Head from "next/head";
// import { tempMovieDetail } from "../../utils/tempMovieDetails";

const UserPage: NextPage = () => {
  const { data: session } = useSession();
  const nrouter = useRouter();
  const { name } = nrouter.query;

  console.log(name);

  return (
    <div className="text-center">
      <Head>
        <title>{`${session?.user?.name} Profile`}</title>
      </Head>
      {name === session?.user?.name ? <YourLikedMovies /> : <OtherUserLikedMovies />}
    </div>
  );
};

export default UserPage;
