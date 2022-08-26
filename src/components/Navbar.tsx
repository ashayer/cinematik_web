import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav className=" px-2 sm:px-4 py-2.5  dark:bg-gray-900">
      <div className="navbar bg-gray-900">
        <div className="flex-1">
          <Link href="/home">
            <a className="btn btn-ghost normal-case text-xl">FYLM LIST</a>
          </Link>
        </div>
        <div className="flex-none gap-1">
          <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered" />
          </div>
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
                <Link href={`user/1`}>
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
  );
};

export default Navbar;
