import { useSession } from "next-auth/react";
import router, { useRouter } from "next/router";
import MovieSearchResults from "../../components/MovieSearchResults";
import { trpc } from "../../utils/trpc";

const Text = () => {
  const { data: session } = useSession();

  const nrouter = useRouter();
  const { text } = nrouter.query;

  const searchResults = trpc.useQuery(["movie.search-movie", { searchText: text as string }]);

  if (searchResults.isLoading) return <div>Loading...</div>;
  if (searchResults.isError) return <div>Error...</div>;

  if (!session?.user) {
    router.push({
      pathname: "/",
    });
  }

  return (
    <div>
      {searchResults.data &&
        searchResults.data.results &&
        searchResults.data.results.map((result) => (
          <div key={result.id}>
            <MovieSearchResults movie={result} />
          </div>
        ))}
    </div>
  );
};

export default Text;
