import { useAtom } from "jotai";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Navbar } from "~/components/Navbar";
import { api } from "~/utils/api";
import { tokenAtom } from "~/utils/store";
import { useSession } from "~/utils/useSession";

const CreatePost: React.FC = () => {
  const signedIn = useSession();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState(new Date().toISOString().slice(0, -1));
  const [endTime, setEndTime] = useState(new Date().toISOString().slice(0, -1));
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((data) => {
      setLat(data.coords.latitude);
      setLon(data.coords.longitude);
    });
  }, []);

  const util = api.useContext();
  const createPost = api.post.create.useMutation({
    onSuccess() {
      util.post.invalidate();
      location.pathname = "/pickups";
    },
  });

  const [token] = useAtom(tokenAtom);

  return (
    <>
      <Head>
        <title>Create Post</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-[#111111]">
        <div className="min-h-screen w-full bg-black/50 text-white">
          <div className="min-h-screen">
            <Navbar signedIn={signedIn} />
            <div className="mt-8 flex w-full flex-col items-start gap-y-8 px-8 text-5xl font-bold tracking-wider">
              <h1>Create Post</h1>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col flex-wrap gap-y-4 text-xl text-black">
                <input
                  value={name}
                  className="rounded-lg p-2 ring-0"
                  placeholder="Name of the event"
                  onChange={(event) => setName(event.target.value)}
                />
                <textarea
                  value={description}
                  className="rounded-lg p-2 ring-0"
                  placeholder="Description of the event"
                  onChange={(event) => setDescription(event.target.value)}
                />
                <input
                  type="datetime-local"
                  className="p-2 rounded-lg"
                  value={startTime}
                  onChange={(event) =>
                    setStartTime(event.target.value)
                  }
                />
                <input
                  type="datetime-local"
                  className="p-2 rounded-lg"
                  value={endTime}
                  onChange={(event) => setEndTime(event.target.value)}
                />
                <button
                  onClick={() => {
                    createPost.mutate({
                      name,
                      description,
                      startTime: new Date(startTime),
                      endTime: new Date(endTime),
                      token: token as string,
                      lat,
                      lon,
                    });
                  }}
                  className="rounded-lg bg-blue-500 p-1 text-white"
                >
                  Create Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CreatePost;
