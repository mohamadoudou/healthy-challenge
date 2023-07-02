import { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import stylesUrl from "~/styles/challenge.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

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
