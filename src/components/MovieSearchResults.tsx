import { MovieResult } from "moviedb-promise";
import Image from "next/image";
import Link from "next/link";

const MovieSearchResults: React.FC<{ movie: MovieResult }> = ({ movie }) => {
  return (
    <div className="grid grid-cols-12 w-5/6 mx-auto mt-5 rounded-xl ">
      <div className=" col-span-4 sm:col-span-3 md:col-span-2 ml-auto cursor-pointer ">
        <Link href={`/movie/${movie.id}`}>
          <Image
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt="Movie Poster"
            width={132}
            height={198}
            className="rounded-xl"
          />
        </Link>
      </div>
      <div className="col-span-8 sm:col-span-9 md:col-span-10 p-4 hover:bg-slate-700">
        <div>
          <Link href={`/movie/${movie.id}`}>
            <a>
              <h1 className="font-bold text-xl text-white">{movie.title}</h1>
            </a>
          </Link>
        </div>
        <div>
          <h1>{movie.release_date}</h1>
        </div>
        <div>
          <h1>{movie.overview}</h1>
        </div>
      </div>
    </div>
  );
};

export default MovieSearchResults;
