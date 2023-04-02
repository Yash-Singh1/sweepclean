/* eslint-disable */

import { useAtom } from "jotai";
import Head from "next/head";
import { useRouter } from "next/router";
import { Navbar } from "~/components/Navbar";
import Post from "~/components/Post";
import { api } from "~/utils/api";
import { tokenAtom } from "~/utils/store";
import { useSession } from "~/utils/useSession";

const Pickups: React.FC = () => {
  const signedIn = useSession();

  const [token] = useAtom(tokenAtom);

  const postsQuery = api.post.all.useQuery({
    token: token as string,
  });

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Pickups</title>
        <meta name="description" content="Pickups" />
      </Head>

      <main className="flex min-h-screen flex-col items-center bg-[#111111]">
        <div className="min-h-screen w-full bg-black/50 text-white">
          <div className="min-h-screen">
            <Navbar signedIn={signedIn} />
            <div className="px-4">
              <button
                onClick={() => router.push("/createpost")}
                className="rounded-lg bg-blue-500 px-2 py-1"
              >
                Create Post
              </button>
              <div className="mt-4 flex w-3/4 flex-col flex-wrap gap-8">
                {postsQuery.data &&
                  postsQuery.data.map((post) => {
                    return <Post post={post} key={post.id} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Pickups;
