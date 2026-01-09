"use client";

import { ReactNode, useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";
import LogoLoader from "@/components/LogoLoader";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export default function Providers({
  children,
}: {
  children: ReactNode;
}) {
  // IMPORTANT: create client once
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LogoLoader />
          {children}
        </PersistGate>
      </ReduxProvider>
    </QueryClientProvider>
  );
}
