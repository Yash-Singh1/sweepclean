import { useAtom } from "jotai";
import { tokenAtom } from "./store";
import { useEffect, useState } from "react";
import { TOKEN } from "./constants";
import { api } from "./api";

export function useSession() {
  const [token, setToken] = useAtom(tokenAtom);

  const verifyQuery = api.auth.verify.useQuery(
    {
      token: token as string,
    },
    {
      enabled: typeof token === 'string',
    }
  );

  useEffect(() => {
    if (localStorage.getItem(TOKEN)) {
      setToken(localStorage.getItem(TOKEN)!);
      verifyQuery.refetch();
    }
  }, []);

  return !!verifyQuery.data;
}
