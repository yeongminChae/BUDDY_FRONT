import { Outlet } from "react-router-dom";
import { ScrollToTop } from "./ScollToTop";

export function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}
