import { Outlet } from "@remix-run/react";

export default function Feed() {
  return (
    <div>
      Feed list
      <Outlet />
    </div>
  );
}
