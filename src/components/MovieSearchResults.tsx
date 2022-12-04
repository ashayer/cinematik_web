import { MovieResult } from "moviedb-promise";
import Image from "next/image";
import Link from "next/link";

const MovieSearchResults: React.FC<{ movie: MovieResult }> = ({ movie }) => {
  return (
    <>
      <div className="hidden sm:block">
        <div className="grid grid-cols-12 w-5/6 mx-auto mt-5 rounded-xl ">
          <div className=" col-span-4 sm:col-span-3 mr-2 hover:scale-110 transition-all md:col-span-2 ml-auto cursor-pointer text-white flex items-center">
            <Link href={`/movie/${movie.id}`}>
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="Movie Poster"
                width={100}
                height={150}
                className="rounded-xl "
              />
            </Link>
          </div>
          <div className="col-span-8 sm:col-span-9 md:col-span-10 p-4 hover:bg-slate-700 border-l-2 border-slate-400">
            <div>
              <Link href={`/movie/${movie.id}`}>
                <a>
                  <h1 className="font-bold text-xl text-white">{movie.title}</h1>
                </a>
              </Link>
            </div>
            <div>
              <p className="text-slate-400">{movie.release_date}</p>
            </div>
            <div className="overflow-x-hidden">
              <p className="text-slate-300">{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden w-64 mx-auto text-center my-4">
        <div className="border-b-2 border-slate-500">
          <p className="font-bold text-slate-300 mb-2">{movie.title}</p>
          <Link href={`/movie/${movie.id}`}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="Movie Poster"
              width={150}
              height={225}
              className="rounded-2xl "
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default MovieSearchResults;
