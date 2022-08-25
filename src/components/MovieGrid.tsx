import React from "react";
import { MovieResult } from "moviedb-promise";

const MovieGrid: React.FC<{ data: MovieResult[] }> = ({ data }) => {
  return (
    <div>
      {data.map((movieDetails) => (
        <div key={movieDetails.id}>
          <h1>{movieDetails.title}</h1>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
