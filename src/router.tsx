import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

type RouterOptions = Parameters<typeof createRouter>[0];

export const getRouter = (options?: Pick<RouterOptions, "history">) => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    ...options,
  });

  return router;
};
