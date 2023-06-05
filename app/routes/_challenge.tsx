import { Outlet } from "@remix-run/react";

export default function Challenge() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <header>
        <h1>Welcome to Team Challenge</h1>
        <h4>Stay healthy</h4>
      </header>
      <section>
        Create a new Challenge to keep you team healthy
        <Outlet />
      </section>
    </div>
  );
}
