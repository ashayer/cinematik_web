import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";

const LandingPage: NextPage = () => {
  const { data: session } = useSession();

  return (
    <div>
      <div>
        <h1>
          <strong>FiLM LIST</strong>
        </h1>
      </div>
      <div>
        <h1>See popular movies</h1>
      </div>
      <div>
        <h1>Track your favorites</h1>
      </div>
      <div>
        <h1>Find new films</h1>
      </div>
      <div>
        {!session && (
          <button
            onClick={() => {
              console.log("clicked");
              signIn();
            }}
          >
            <h1>GET STARTED</h1>
          </button>
        )}
        {session && (
          <>
            <h1>{session.user?.name}</h1>
            <button
              onClick={() => {
                console.log("clicked");
                signOut();
              }}
            >
              <h1>Sign Out</h1>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LandingPage;

