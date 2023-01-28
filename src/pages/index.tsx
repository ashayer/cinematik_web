import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import MovieCarousel from "../components/MovieCarousel";

const Home: NextPage = () => {
  return (
    <main className="mx-auto min-h-screen max-w-7xl border">
      <div>
        <MovieCarousel />
      </div>
    </main>
  );
};

export default Home;
