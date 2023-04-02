import { type NextPage, type GetServerSideProps } from "next";
import Head from "next/head";
import { Navbar } from "~/components/Navbar";
import { useSession } from "~/utils/useSession";
import { api } from "~/utils/api";
import { useAtom } from "jotai";
import { tokenAtom } from "~/utils/store";
import { useState } from "react";

const Enter: NextPage<{ userId: string }> = ({ userId }) => {
  const signedIn = useSession();

  const [token] = useAtom(tokenAtom);
  const getName = api.user.getName.useQuery({
    token: token as string,
    userId,
  });

  const incrementReputation = api.user.incrementReputation.useMutation();

  const [poundsCollected, setPoundsCollected] = useState(1);

  return (
    <>
      <Head>
        <title>Enter Results</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-[#111111]">
        <div className="min-h-screen w-full bg-black/50 text-white">
          <div className="min-h-screen">
            <Navbar signedIn={signedIn} />
            <div className="mt-8 flex w-full flex-col items-start gap-y-8 px-8 text-5xl font-bold tracking-wider">
              <h1>Enter Results for {getName.data}</h1>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col flex-wrap gap-y-4 text-xl text-black"
              >
                <p className="uppercase tracking-normal text-gray-400">
                  Pounds Collected
                </p>
                <input
                  value={poundsCollected}
                  type="number"
                  className="rounded-lg p-2 ring-0"
                  placeholder="Pounds collected"
                  min={1}
                  onChange={(event) =>
                    setPoundsCollected(parseInt(event.target.value, 10))
                  }
                />
                <button
                  onClick={() => {
                    incrementReputation.mutate({
                      token: token as string,
                      amount: poundsCollected,
                    });
                  }}
                  className="rounded-lg bg-blue-500 p-1 text-white"
                >
                  Submit Results
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{ userId: string }> =
  async function (context) {
    return {
      props: {
        userId: context.params!.userId as string,
      },
    };
  };

export default Enter;
