import Head from "next/head";
import { useState } from "react";
import { Navbar } from "~/components/Navbar";
import { api } from "~/utils/api";
import { tokenAtom } from "~/utils/store";
import { useSession } from "~/utils/useSession";
import { useAtom } from "jotai";
import { TOKEN } from "~/utils/constants";
import Link from "next/link";

const Signup: React.FC = () => {
  const signedIn = useSession();

  const [_, setToken] = useAtom(tokenAtom);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const utils = api.useContext();
  const signup = api.auth.signup.useMutation({
    onSuccess(data) {
      setToken(data);
      localStorage.setItem(TOKEN, data);
      utils.auth.invalidate();
      location.pathname = "/";
    },
  });

  return (
    <>
      <Head>
        <title>Signup</title>
        <meta name="description" content="Signup page for the authentication" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center bg-[#111111]">
        <div className="min-h-screen w-full bg-black/50 text-white">
          <div className="min-h-screen">
            <Navbar signedIn={signedIn} />
            <div className="mt-8 flex w-full flex-col items-start gap-y-8 px-8 text-5xl font-bold tracking-wider">
              <h1>Signup</h1>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col flex-wrap gap-y-4 text-xl text-black">
                <input
                  value={userName}
                  className="rounded-lg p-2 ring-0"
                  placeholder="User name"
                  onChange={(event) => setUserName(event.target.value)}
                />
                <input
                  type="password"
                  className="rounded-lg p-2 ring-0"
                  value={password}
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button
                  onClick={() => {
                    signup.mutate({
                      password,
                      username: userName,
                    });
                  }}
                  className="rounded-lg bg-blue-500 p-1 text-white"
                >
                  Sign up
                </button>
                <p>Already have an account, <Link href='/signin'>sign in</Link> instead.</p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Signup;
