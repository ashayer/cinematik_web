import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import router from "next/router";

type Inputs = {
  searchText: string;
};
const Navbar = () => {
  const { data: session } = useSession();
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    data.searchText.trim() !== "" ? router.push(`/search/${data.searchText.trim()}`) : null;

  return (
    <>
      {session?.user && (
        <nav className=" px-2 sm:px-4 py-2.5 bg-gray-900 text-white">
          <div className="navbar bg-gray-900">
            <div className="flex-1 hidden sm:block">
              <Link href="/home">
                <a className="btn btn-ghost normal-case text-xl">FYLM LIST</a>
              </Link>
            </div>
            <div className="flex-1 sm:hidden">
              <Link href="/home">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <a className="btn btn-ghost normal-case text-xl hidden sm:block"></a>
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>
              </Link>
            </div>
            <div className="flex-none gap-10">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  defaultValue=""
                  placeholder="Search for a movie..."
                  {...register("searchText")}
                  className="input w-full max-w-xs"
                />
              </form>

              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    {session?.user?.image && (
                      <Image
                        src={session?.user?.image ?? ""}
                        alt="User Profile Pic"
                        width={50}
                        height={50}
                      />
                    )}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link href={`/user/${session.user.name}`}>
                      <a>Profile</a>
                    </Link>
                  </li>
                  <li>
                    <a onClick={() => signOut({ callbackUrl: "/" })}>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
