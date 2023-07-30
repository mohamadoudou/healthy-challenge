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
    <>
      <div className="w-72 h-96 px-2.5 flex-col justify-center items-start gap-56 inline-flex">
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
            <button className="px-16 py-3.5 bg-red-600 rounded-full justify-center items-center gap-2.5 inline-flex">
              <Link
                to="/challenge/add"
                className="text-center text-white text-base font-bold leading-tight"
              >
                Add Challenge
              </Link>
            </button>
          </div>
        </div>

        <div className="w-64 h-16 gap-2 flex-col justify-start items-start flex">
          {user ? (
            <>
              <div className="rounded-full justify-center items-center inline-flex gap-4">
                <img
                  className="w-10 h-10"
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
      <div className="Feed h-96 px-px flex-col justify-start items-start inline-flex">
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

        {/* <div className="Tweet h-96 px-px flex-col justify-start items-start gap-2 flex">
          <div className="Divider h-px justify-center items-center inline-flex">
            <div className="Divider h-px bg-gray-200" />
          </div>
          <div className="Container px-3.5 justify-start items-start gap-2.5 inline-flex">
            <div className="Side w-12 self-stretch justify-start items-start flex">
              <div className="AvatarMedium w-12 h-12 pr-px pt-px rounded-full justify-center items-center flex">
                <img
                  className="ProfilePicture w-12 h-12"
                  src="https://via.placeholder.com/48x48"
                />
              </div>
            </div>
            <div className="Main flex-col justify-start items-start inline-flex">
              <div className="User self-stretch pb-1 justify-start items-center gap-1 inline-flex">
                <div className="DevonLane text-white text-base font-bold">
                  Darlene Robertson
                </div>
                <div className="Marcelosalomao text-slate-500 text-base font-medium">
                  @johndue
                </div>
                <div className=" text-slate-500 text-base font-normal">· </div>
                <div className="S text-slate-500 text-base font-medium">
                  23s
                </div>
              </div>
              <div className="Content self-stretch justify-start items-start gap-2.5 inline-flex">
                <div className="HoldOnINeedAtLeastAFewMinutes grow shrink basis-0 text-white text-base font-medium">
                  Tom is in a big hurry.
                </div>
              </div>
              <div className="Media self-stretch py-2.5 rounded-2xl justify-start items-start inline-flex">
                <div className="Container h-60 rounded-2xl border border-slate-400 justify-center items-center flex">
                  <img
                    className="Placehpolder grow shrink basis-0 h-60"
                    src="https://via.placeholder.com/509x247"
                  />
                </div>
              </div>
              <div className="Actions self-stretch py-1 justify-start items-start inline-flex">
                <div className="ActionItem h-4 pr-20 justify-start items-start gap-2.5 flex">
                  <div className="DarkThemeCommentDefault w-4 h-4 px-0.5 py-0.5 justify-center items-center inline-flex" />
                  <div className=" text-slate-500 text-xs font-medium">61</div>
                </div>
                <div className="ActionItem h-4 pr-20 justify-start items-start gap-2.5 flex">
                  <div className="DarkThemeRetweetDefault w-4 h-4 px-px py-0.5 justify-center items-center inline-flex" />
                  <div className=" text-slate-500 text-xs font-medium">12</div>
                </div>
                <div className="ActionItem pr-20 justify-start items-start gap-2.5 flex">
                  <div className="DarkThemeLikeSelected w-4 h-4 px-px py-0.5 justify-center items-center inline-flex" />
                  <div className="2k text-rose-500 text-xs font-medium">
                    6.2K
                  </div>
                </div>
                <div className="ActionItem h-4 pr-20 justify-start items-start gap-2.5 flex">
                  <div className="DarkThemeShareDefault w-4 h-4 px-px py-0.5 justify-center items-center inline-flex">
                    <div className="Group w-3.5 h-3.5"></div>
                  </div>
                  <div className=" text-slate-500 text-xs font-medium">61</div>
                </div>
              </div>
              <div className="ShowThread py-2.5 justify-start items-start inline-flex">
                <div className="ShowThisThread text-sky-500 text-xs font-medium">
                  Show this thread
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
    // <>
    //   {/* <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
    //     <header>
    //       <h1 className="text-3xl text-red-500 font-bold underline">
    //         Healthy Challenge
    //       </h1>
    //     </header>

    //     <main className="main_container">
    //       <aside>
    //         <h4>Stay healthy</h4>
    //         <ul>
    //           <li>
    //             <Link to="/challenge">Home </Link>
    //           </li>
    //           <li>
    //             <Link to="/challenge/add">Create new Challenge</Link>
    //           </li>
    //         </ul>
    //       </aside>
    //       <section>
    //         <Outlet />
    //       </section>
    //       <aside>
    //         {user ? (
    //           <div className="user-info">
    //             <span>{`Hi ${user.username}`}</span>
    //             <form action="/logout" method="post">
    //               <button type="submit" className="button">
    //                 Logout
    //               </button>
    //             </form>
    //           </div>
    //         ) : (
    //           <Link to="/login">Login</Link>
    //         )}
    //         <section
    //           style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}
    //         >
    //           <h5>
    //             <Link to="/challenge/add">
    //               Create a Challenge for your team
    //             </Link>
    //           </h5>
    //           <div>list of your Team Challenges</div>
    //           <ul>
    //             {challenges.map(({ id, name, startDate, endDate }) => {
    //               return (
    //                 <li key={id}>
    //                   <p>
    //                     Date: {formatDate(startDate)} - {formatDate(endDate)}
    //                   </p>
    //                   <p>Name: {name}</p>
    //                   <h5>
    //                     <Link to={`/challenge/${id}/record`}>See Records</Link>
    //                   </h5>
    //                   <h5>
    //                     <Link to={`/challenge/${id}/participants`}>
    //                       View and Add participants
    //                     </Link>
    //                   </h5>
    //                 </li>
    //               );
    //             })}
    //           </ul>
    //         </section>
    //       </aside>
    //     </main>
    //   </div> */}
    // </>
  );
}
