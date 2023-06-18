import { LoaderArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async ({ params }: LoaderArgs) => {
  const { challengeId } = params;
  return json({
    records: await db.record.findMany({
      where: {
        challengeId,
      },
    }),
    challengeId,
  });
};

export default function Feed() {
  const { records, challengeId } = useLoaderData<typeof loader>();
  return (
    <main>
      <ul>
        {records.map(({ id, authorId, date, points, prove }) => {
          return (
            <li key={id}>
              <p>Date: {new Date(Number(date)).toString()}</p>
              <p>Name: {authorId}</p>
              <p>Steps: {points}</p>
              {!!prove && <img src={prove} />}
            </li>
          );
        })}
      </ul>
      <Link to={`/challenge/${challengeId}/addRecord`}> Add Your records </Link>
    </main>
  );
}
