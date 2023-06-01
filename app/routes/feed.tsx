import { Outlet } from "@remix-run/react";

export default function feed() {
  return (
    <div>
      Feed list
      <Outlet />
    </div>
  );
}
