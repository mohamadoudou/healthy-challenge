import { LinksFunction, LoaderArgs, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getUser } from "~/utils/session.server";
import stylesUrl from "~/styles/challenge.css";
import { db } from "~/utils/db.server";
import { formatDate } from "~/utils/formatter";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export const loader = async ({ request }: LoaderArgs) => {
  return json({
    challenges: await db.challenge.findMany(),
    user: await getUser(request),
  });
};

export default function Challenge() {
  const { user, challenges } = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <header>
        <h1>Healthy Challenge</h1>
      </header>
      <main className="main_container">
        <aside>
          <h4>Stay healthy</h4>
          <ul>
            <li>
              <Link to="/challenge">Home </Link>
            </li>
            <li>
              <Link to="/challenge/add">Create new Challenge</Link>
            </li>
          </ul>
        </aside>
        <section>
          <Outlet />
        </section>
        <aside>
          {user ? (
            <div className="user-info">
              <span>{`Hi ${user.username}`}</span>
              <form action="/logout" method="post">
                <button type="submit" className="button">
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
          <section
            style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}
          >
            <h5>
              <Link to="/challenge/add">Create a Challenge for your team</Link>
            </h5>
            <div>list of your Team Challenges</div>
            <ul>
              {challenges.map(({ id, name, startDate, endDate }) => {
                return (
                  <li key={id}>
                    <p>
                      Date: {formatDate(startDate)} - {formatDate(endDate)}
                    </p>
                    <p>Name: {name}</p>
                    <h5>
                      <Link to={`/challenge/${id}/record`}>See Records</Link>
                    </h5>
                    <h5>
                      <Link to={`/challenge/${id}/participants`}>
                        View and Add participants
                      </Link>
                    </h5>
                  </li>
                );
              })}
            </ul>
          </section>
        </aside>
      </main>
    </div>
  );
}
