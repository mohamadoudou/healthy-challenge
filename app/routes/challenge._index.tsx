import { Link, useLoaderData } from "@remix-run/react";
import { LinksFunction, LoaderArgs, json } from "@remix-run/node";

import stylesUrl from "~/styles/index.css";
import { db } from "~/utils/db.server";
import { formatDate } from "~/utils/formatter";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export const loader = async () => {
  return json({
    records: await db.record.findMany({
      include: {
        author: {
          select: {
            username: true,
            name: true,
          },
        },
      },
    }),
  });
};

export default function Challenge() {
  const { records } = useLoaderData<typeof loader>();

  return (
    <section style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h5>
        <Link to="/challenge/add">Create a Challenge for your team</Link>
      </h5>
      <div>list of your Team Challenges</div>
      <ul>
        {records.map(({ id, author, date, points, prove }) => {
          return (
            <li key={id}>
              <p>Date: {formatDate(date)}</p>
              <p>
                Name: {author.name} @{author.username}
              </p>
              <p>Steps: {points}</p>
              {!!prove && <img src={prove} width={500} height={500} />}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
