"use client";

import { QueryClientProvider, QueryClient } from "react-query";

interface Props {
  children?: React.ReactNode | React.ReactNode[];
}

const queryClient = new QueryClient();

export const NextQueryClientProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
