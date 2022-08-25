import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const LandingPage: NextPage = () => {

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
        <button>
          <h1>GET STARTED</h1>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;

