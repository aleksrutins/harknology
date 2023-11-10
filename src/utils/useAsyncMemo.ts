/* eslint-disable react-hooks/exhaustive-deps */
import { DependencyList, useEffect, useState } from "react";

export function useAsyncMemo<T>(
  fn: () => Promise<T>,
  dependencies?: DependencyList,
  defaultValue?: T
) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    fn().then(setValue);
  }, dependencies);

  return value;
}

export function useFetch<T>(
  params: () => Parameters<typeof fetch>,
  dependencies?: DependencyList,
  defaultValue?: T
) {
  return useAsyncMemo<T>(
    async () => {
      const res = await fetch(...params());
      return res.json();
    },
    dependencies,
    defaultValue
  );
}
