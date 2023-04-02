import { useAtom } from "jotai";
import { NextPage } from "next";
import Head from "next/head";
import FaMedal from "~/components/FaMedal";
import { Navbar } from "~/components/Navbar";
import { api } from "~/utils/api";
import { tokenAtom } from "~/utils/store";
import { useSession } from "~/utils/useSession";

const Leaderboard: NextPage = () => {
  const signedIn = useSession();

  const [token] = useAtom(tokenAtom);

  const leaderboard = api.leaderboard.get.useQuery({
    token: token as string,
  });

  return (
    <>
      <Head>
        <title>Leaderboard</title>
      </Head>

      <main className="flex min-h-screen flex-col items-center bg-[#111111]">
        <div className="min-h-screen w-full bg-black/50 text-white">
          <div className="min-h-screen">
            <Navbar signedIn={signedIn} />
            <h1 className="mt-8 flex w-full flex-col items-start gap-y-8 px-8 text-5xl font-bold tracking-wide">
              Leaderboard
            </h1>
            <table className="mt-8 px-8">
              <thead>
                <tr className="py-2">
                  <th className="px-4 text-left">Rank</th>
                  <th className="px-4 text-left">Name</th>
                  <th className="px-4 text-left">Reputation</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.data
                  ? leaderboard.data.map((entry, index) => {
                      return (
                        <tr key={index} className="py-2">
                          <td className="px-4">
                            {index < 3 ? <FaMedal index={index} /> : index + 1}
                          </td>
                          <td className="px-4">{entry.name}</td>
                          <td className="px-4">{entry.reputation}</td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default Leaderboard;
