import { useCallback, useState } from "react";

export const useLoadingCallback = <T extends (...args: any[]) => Promise<any>>(
  callback: T
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSet, setIsSet] = useState(false);

  const callbackWithLoading = useCallback(
    async (...args: Parameters<T>): Promise<ReturnType<T>> => {
      try {
        setIsSet(false);
        setIsLoading(true);
        const result = await callback(...args);
        setIsSet(true);
        return result;
      } finally {
        setIsLoading(false);
      }
    },
    [callback]
  );

  return { isLoading, isSet, callback: callbackWithLoading };
};
