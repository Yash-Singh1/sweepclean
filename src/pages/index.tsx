import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "~/utils/useSession";
import { Navbar } from "~/components/Navbar";

const Home: NextPage = () => {
  const signedIn = useSession();

  return (
    <>
      <Head>
        <title>SweepClean</title>
        <meta
          name="description"
          content="App for allowing you to post sweeping jobs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-[url('/polluted-world.jpg')] bg-no-repeat bg-top">
        <div className="bg-black/50 w-full min-h-screen text-white">
          <div className="min-h-screen">
            <Navbar signedIn={signedIn} />
            <div className="text-5xl w-full flex flex-col items-center tracking-wider gap-y-8 font-bold">
              <h1>Learn.</h1>
              <h1>Understand.</h1>
              <h1>Change.</h1>
              <h2 className="text-2xl tracking-normal font-medium">Changing the world, one piece of plastic at a time</h2>
            </div>
          </div>
          <div className="h-40 bg-gradient-to-b from-[#00000000] to-[#000000ff]"></div>
          <div className="min-h-screen flex flex-row">
            <div className="w-1/2 h-full flex items-center min-h-screen bg-black">
              <div className="px-4 py-10 w-full flex flex-col flex-wrap">
                <h1 className="text-3xl lg:text-6xl font-bold mb-8 w-full text-center">Mission Statement</h1>
                <p className="text-xl lg:text-2xl w-1/2 text-center border-b-2 pb-8 border-slate-400/50 font-light tracking-wider self-center">We're changing the world & You can be a part of it</p>
                <p className="text-2xl lg:text-4xl w-3/4 text-center pt-8 border-slate-400/50 font-semibold self-center leading-10">268 Million tons of trash is generated every year...we generate it every year</p>
                <p className="text-xl lg:text-2xl w-3/4 text-center pt-8 border-slate-400/50 font-semibold self-center leading-10">And we did something about it...</p>
              </div>
            </div>
            <div className="bg-[url('/R.jpg')] bg-center flex-grow"></div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
