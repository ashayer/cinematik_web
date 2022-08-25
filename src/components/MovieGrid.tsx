import React from "react";
import { MovieResult } from "moviedb-promise";
import Link from "next/link";

const MovieGrid: React.FC<{ data: MovieResult[] }> = ({ data }) => {
  return (
    <div>
      {data.map((movieDetails) => (
        <div key={movieDetails.id}>
          <Link href={`/movie/${movieDetails.id}`}>
            <h1>{movieDetails.title}</h1>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
