import { MovieResponse } from "moviedb-promise";
import Image from "next/image";

const MovieDetailsOverview: React.FC<{ movie: MovieResponse }> = ({ movie }) => {
  return (
    <div className="grid grid-cols-6 sm:w-5/6 mx-auto">
      <div className="text-center col-span-6 lg:col-span-2 2xl:col-span-1 mt-8">
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt="movie poster"
          width={250}
          height={375}
          className="rounded-xl"
        />
        <div>
          <h1 className="text-xl text-white">{`${movie.runtime} minutes`}</h1>
        </div>
        <div>
          <h1 className="text-xl text-white">{movie.release_date}</h1>
        </div>
      </div>
      <div className="col-span-6 lg:col-span-4 2xl:col-span-5 gap-8 p-6">
        <div className="text-center">
          <h1 className="text-3xl lg:text-5xl text-white font-bold">{movie.title}</h1>
        </div>
        <div className="flex text-center flex-wrap">
          {movie.genres &&
            movie.genres.map((genre) => (
              <h1
                key={genre.id}
                className="m-2 p-2 rounded-md bg-slate-300 text-xl text-black font-semibold font flex-auto"
              >
                {genre.name}
              </h1>
            ))}
        </div>
        <div className="flex flex-wrap mt-2">
          <h1 className=" text-white text-5xl font-bold flex-1">Synposis</h1>
          <h1 className=" text-white text-5xl font-bold">{movie.vote_average?.toFixed(1)}</h1>
          <svg
            aria-hidden="true"
            className="w-12 h-12 text-yellow-400 mt-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Movie Rating</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        </div>
        <div className="divider"></div>
        <div className="text-slate-300">
          <h1 className="text-2xl">{movie.overview}</h1>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsOverview;
