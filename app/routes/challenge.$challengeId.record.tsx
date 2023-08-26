import { LoaderArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { formatDate } from "~/utils/formatter";

export const loader = async ({ params }: LoaderArgs) => {
  const { challengeId } = params;
  return json({
    records: await db.record.findMany({
      where: {
        challengeId,
      },
      include: {
        author: {
          select: { username: true, name: true },
        },
      },
    }),
    challengeId,
  });
};

export default function Feed() {
  const { records, challengeId } = useLoaderData<typeof loader>();
  return (
    <main>
      <Link
        to={`/challenge/${challengeId}/addRecord`}
        className="text-red-600 underline underline-offset-4 sticky"
      >
        Add Your record
      </Link>
      <ul>
        {records.map(({ id, author, date, points, prove }) => {
          return (
            <li key={id}>
              <p>Date: {formatDate(date)}</p>
              <p>
                Name: {author.name} @{author.username}
              </p>
              <p>Steps: {points}</p>
              {!!prove && <img src={prove} width={400} height={400} />}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
