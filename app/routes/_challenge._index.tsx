import { Link, useLoaderData } from "@remix-run/react";
import { LinksFunction, json } from "@remix-run/node";

import stylesUrl from "~/styles/index.css";
import { db } from "~/utils/db.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export const loader = async () => {
  return json({
    challenges: await db.challenge.findMany(),
  });
};

export default function Challenge() {
  const { challenges } = useLoaderData<typeof loader>();

  return (
    <section style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h5>
        <Link to="challenge/add">Create a Challenge for your team</Link>
      </h5>
      <div>list of your Team Challenges</div>
      <ul>
        {challenges.map(({ id, name, startDate, endDate }) => {
          return (
            <li key={id}>
              <p>
                Date: {new Date(Number(startDate)).toString()} - Date:
                {new Date(Number(endDate)).toString()}
              </p>
              <p>Name: {name}</p>
              <h5>
                <Link to={`challenge/${id}/record`}>See Records</Link>
              </h5>
              <h5>
                <Link to={`challenge/${id}/participants`}>
                  View and Add participants
                </Link>
              </h5>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
