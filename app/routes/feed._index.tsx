import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async () => {
  return json({
    records: await db.record.findMany(),
  });
};

export default function Feed() {
  const { records } = useLoaderData<typeof loader>();
  return (
    <main>
      <ul>
        {records.map(({ name, date, steps }) => {
          return (
            <li>
              <p>Date: {new Date(Number(date)).toString()}</p>
              <p>Name: {name}</p>
              <p>Steps: {steps}</p>
            </li>
          );
        })}
      </ul>
      <Link to="add"> Add Your record </Link>
    </main>
  );
}
