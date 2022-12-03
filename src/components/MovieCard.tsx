import { MovieResult, MovieResponse } from "moviedb-promise";
import Image from "next/image";
import Link from "next/link";

const MovieCard: React.FC<{ data: MovieResult | MovieResponse }> = ({ data }) => {
  return (
    <Link href={`/movie/${data.id}`}>
      <div
        className="flex flex-col content-center justify-start border-2 
     w-48justify-self-center hover:scale-95 cursor-pointer ease-in-ou duration-100 rounded-lg overflow-hidden"
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt="Movie Poster"
          width={250}
          height={375}
        />
        <h1 className="font-bold">{data.title}</h1>
        <h1>{data.release_date}</h1>
      </div>
    </Link>
  );
};

export default MovieCard;
