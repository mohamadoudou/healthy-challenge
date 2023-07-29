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
    challenges: await db.challenge.findMany({
      include: {
        records: {
          select: {
            id: true,
            date: true,
            points: true,
            prove: true,
            author: true,
          },
        },
      },
    }),
  });
};

export default function Challenge() {
  const { challenges } = useLoaderData<typeof loader>();

  return (
    <section
    // style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}
    >
      <div>list of your Team Challenges</div>
      <ul>
        {challenges.map(({ id, name, startDate, endDate, records }) => {
          return (
            <li key={id}>
              Challenge: {name}
              Challenge Period: from {formatDate(startDate)} to{" "}
              {formatDate(endDate)}
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
            </li>
          );
        })}
      </ul>
    </section>
  );
}
