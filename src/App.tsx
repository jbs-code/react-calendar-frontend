import { BrowserRouter } from "react-router";

import { Toaster } from "@/components/ui/toast";

import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
