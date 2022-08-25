import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div>
      <div>
        <h1 className="text-6xl font-extrabold">FYLM List</h1>
      </div>
      {session && (
        <>
          <Image src={session.user?.image ?? ""} alt="User picture" height={50} width={50} />
          <h1>{session.user?.name}</h1>
          <button
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </button>
        </>
      )}
    </div>
  );
};

export default Navbar;
