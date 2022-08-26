import { MovieResult } from "moviedb-promise";
import MovieCard from "./MovieCard";

const MovieGrid: React.FC<{ data: MovieResult[] }> = ({ data }) => {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 
    xl:grid-cols-6 2xl:grid-cols-7 gap-4 w-5/6 mx-auto text-white mt-10"
    >
      {data.map((movieDetails) => (
        <MovieCard key={movieDetails.id} data={movieDetails} />
      ))}
    </div>
  );
};

export default MovieGrid;
