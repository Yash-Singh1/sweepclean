/* eslint-disable */

import { useAtom } from "jotai";
import { api, RouterOutputs } from "~/utils/api";
import { tokenAtom } from "~/utils/store";
import { FaPlus } from "~/components/FaPlus";
import { FaInfo } from "~/components/FaInfo";
import { useEffect, useState } from "react";

function formatTwo(firstDate: Date, secondDate: Date) {
  if (firstDate.toDateString() == secondDate.toDateString()) {
    return (
      <>
        <time dateTime={firstDate.toISOString()}>
          {firstDate.toLocaleTimeString()}
        </time>{" "}
        -{" "}
        <time dateTime={secondDate.toISOString()}>
          {secondDate.toLocaleTimeString()}
        </time>
      </>
    );
  } else {
    return (
      <>
        <time dateTime={firstDate.toISOString()}>
          {firstDate.toLocaleDateString()} {firstDate.toLocaleTimeString()}
        </time>{" "}
        -{" "}
        <time dateTime={secondDate.toISOString()}>
          {secondDate.toLocaleDateString()} {secondDate.toLocaleTimeString()}
        </time>
      </>
    );
  }
}

const Post: React.FC<{
  post: RouterOutputs["post"]["all"][number];
}> = ({ post }) => {
  const util = api.useContext();
  const join = api.post.join.useMutation({
    onSuccess() {
      util.post.all.invalidate();
    },
  });

  const [token] = useAtom(tokenAtom);

  const getId = api.user.getId.useQuery({
    token: token as string,
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div
        key={post.id}
        className="flex-grow cursor-pointer rounded-lg border border-slate-400/50 bg-black/50 p-4 text-white hover:-translate-y-1 hover:transition"
      >
        <div className="flex flex-row flex-nowrap items-center gap-x-1">
          <h2 className="text-xl font-semibold">{post.name}</h2>
          {post.relation === "none" ? (
            <button
              onClick={() => {
                join.mutate({
                  token: token as string,
                  eventId: post.id,
                });
              }}
              className="rounded-md bg-blue-500 p-1 hover:bg-blue-700 hover:transition-colors active:bg-blue-600 active:transition-colors"
            >
              <FaPlus />
            </button>
          ) : post.relation === "attended" ? (
            <button
              onClick={() => {
                setDialogOpen(true);
              }}
              className="rounded-full bg-blue-500 p-1 hover:bg-blue-700 hover:transition-colors active:bg-blue-600 active:transition-colors"
            >
              <FaInfo />
            </button>
          ) : null}
        </div>
        <p className="text-lg font-normal">{post.description}</p>
        <i>{post.address}</i>
        <br />
        <i>{formatTwo(post.startTime, post.endTime)}</i>
      </div>
      <dialog
        open={dialogOpen}
        style={{
          display: dialogOpen ? "" : "none",
        }}
        className="absolute left-0 top-0 flex min-h-screen w-full items-center justify-center bg-transparent"
      >
        <div className="rounded-lg bg-white">
          <button
            className="w-full cursor-pointer p-2 pb-1 text-right"
            onClick={() => setDialogOpen(false)}
          >
            &times;
          </button>
          <div className="p-5 pt-0">
            <p className="mb-5 max-w-[150px] text-center text-xs">
              Show the below QR code to the booth manager:
            </p>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                `http://localhost:3000/enter/${getId.data}`
              )}`}
            />
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Post;
