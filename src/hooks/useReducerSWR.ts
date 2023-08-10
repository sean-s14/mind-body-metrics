"use client";

import { useReducer, useEffect, useState } from "react";
import useSWR from "swr";
import { deepMergeObjects } from "@sean14/utils";

export default function useReducerSWR<D, S>(
  reducer: (state: S, action: any) => S,
  initialState: S,
  category: keyof D,
  url: string | null,
  fetcher: (url: string) => Promise<D>,
  actionType: string
): {
  state: S;
  dispatch: (action: any) => void;
  error: any;
  isLoading: boolean;
  isNew: boolean;
} {
  const [isNew, setIsNew] = useState(true);
  const { data, error, isLoading } = useSWR<D>(url, fetcher);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (isLoading) return;
    setIsNew(data ? false : true);

    if (data && data[category]) {
      dispatch({
        type: actionType,
        payload: deepMergeObjects(
          initialState as object,
          data[category] as object
        ),
      });
    } else {
      dispatch({
        type: actionType,
        payload: initialState,
      });
    }
  }, [data, isLoading, actionType, category, initialState]);

  return { state, dispatch, error, isLoading: isLoading, isNew };
}
