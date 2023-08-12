import { LinksFunction, LoaderArgs, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getUser } from "~/utils/session.server";
import { db } from "~/utils/db.server";

export const loader = async ({ request }: LoaderArgs) => {
  return json({
    challenges: await db.challenge.findMany(),
    user: await getUser(request),
  });
};

export default function Challenge() {
  const { user, challenges } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="w-80 px-2.5 flex-col justify-center items-start gap-44 inline-flex overflow-visible">
        <div className="h-96 flex-col justify-center items-start inline-flex">
          <div className="self-stretch h-14 pl-2.5 pr-52 pt-2.5 pb-3 justify-start items-center inline-flex">
            <div className="w-7 self-stretch px-px py-1 justify-center items-center inline-flex" />
          </div>
          <div className="self-stretch flex-col justify-start items-start inline-flex">
            <div className="w-100 h-14 pl-2.5 pr-30 py-3.5 justify-start items-center gap-5 inline-flex">
              <div className="w-7 h-7 px-px py-0.5 justify-center items-center inline-flex" />
              <Link to="/challenge" className="text-red-600 text-lg font-bold">
                Team Challenge
              </Link>
            </div>
            <div className="w-64 h-14 pl-2.5 pr-32 py-3.5 justify-start items-center gap-5 inline-flex">
              <div className="w-7 h-7 p-0.5 justify-center items-center inline-flex" />
              <div className="text-white text-lg font-bold">Explore</div>
            </div>
            <div className="w-64 h-14 pl-2.5 pr-20 py-3.5 justify-start items-center gap-5 inline-flex">
              <div className="w-7 h-7 px-0.5 py-0.5 justify-center items-center inline-flex" />
              <div className="text-white text-lg font-bold">Notifications</div>
            </div>
            <div className="w-64 h-14 pl-2.5 pr-28 py-3.5 justify-start items-center gap-5 inline-flex">
              <div className="w-7 h-7 px-0.5 py-1 justify-center items-center inline-flex" />
              <div className="text-white text-lg font-bold">Messages</div>
            </div>
            <div className="w-64 h-14 pl-2.5 pr-24 py-3.5 justify-start items-center gap-5 inline-flex">
              <div className="w-7 h-7 px-1 pt-1 pb-px justify-center items-center inline-flex" />
              <div className="text-white text-lg font-bold">Bookmarks</div>
            </div>
            <div className="w-64 h-14 pl-2.5 pr-36 py-3.5 justify-start items-center gap-5 inline-flex">
              <div className="w-7 h-7 p-0.5 justify-center items-center inline-flex">
                <div className="w-6 h-6"></div>
              </div>
              <div className="text-white text-lg font-bold">Lists</div>
            </div>
            <div className="w-64 h-14 pl-2.5 pr-32 py-3.5 justify-start items-center gap-5 inline-flex">
              <div className="w-7 h-7 px-1 py-0.5 justify-center items-center inline-flex" />
              <div className="text-white text-lg font-bold">Profile</div>
            </div>
            <div className="w-64 h-14 pl-2.5 pr-36 py-3.5 justify-start items-center gap-5 inline-flex">
              <div className="w-7 h-7 p-0.5 justify-center items-center inline-flex">
                <div className="w-7 h-7"></div>
              </div>
              <div className="text-white text-lg font-bold">More</div>
            </div>
          </div>
          <div className="self-stretch py-3.5 flex-col justify-start items-start gap-2.5 inline-flex">
            <Link
              to="/challenge/add"
              className="text-center text-white text-base font-bold leading-tight px-16 py-3.5 bg-red-600 rounded-full justify-center items-center gap-2.5 inline-flex"
            >
              Add Challenge
            </Link>
          </div>
        </div>

        <div className="w-64 h-16 gap-2 flex-col justify-start items-start flex">
          {user ? (
            <>
              <div className="rounded-full justify-center items-center inline-flex gap-4">
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://via.placeholder.com/39x39"
                />
                <div>
                  <div className="text-white text-base font-bold">{`Hi ${user.username}`}</div>
                  <div className="text-slate-500 text-base font-medium">
                    {`@${user.username.toLowerCase()}`}
                  </div>
                </div>
              </div>
              <div className="w-8 h-8 px-2 justify-center items-center inline-flex" />
              <form action="/logout" method="post">
                <button
                  type="submit"
                  className="text-white bg-red-600 py-1 px-4 rounded-full font-bold"
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <Link
              to="/login"
              className="text-white bg-red-600 py-1 px-4 rounded-full font-bold"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      <div className="Feed h-screen pl-1 flex-col justify-start items-start inline-flex overflow-y-scroll pr-4 no-scrollbar">
        <div className="Header h-14">
          <div className="Home left-[15px] top-[15px] text-white text-lg font-bold">
            Home
          </div>
          <div className="Divider h-px left-0 top-[52px] flex-col justify-end items-start inline-flex">
            <div className="Divider h-px bg-gray-200" />
            <div className="Frame1 self-stretch px-3.5 py-1" />
          </div>
        </div>
        <div className="Spacer w-fit h-2.5 pb-2 bg-gray-50 justify-center items-center inline-flex">
          <div className="Divider h-px bg-gray-200" />
        </div>
        <Outlet />
      </div>
    </>
  );
}
