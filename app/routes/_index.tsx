import { Link } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import stylesUrl from "~/styles/index.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export default function IndexRoute() {
  return (
    <div>
      <h1>Welcome to Team Challenge</h1>
      <h4>Stay healthy</h4>
      <Link to="feed">See Records</Link>
    </div>
  );
}
