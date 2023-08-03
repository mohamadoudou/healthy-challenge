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
    <section>
      {challenges.map(({ id, name, startDate, endDate, records }) => {
        return (
          <div key={id} className="border-l border-r border-gray-600">
            <div className="Challenge p-1 h-10 self-stretch pb-1 justify-start items-center gap-1 inline-flex border-t border-b w-full border-gray-600">
              <div className="DevonLane text-white text-base font-bold">
                {name}
              </div>
              <div className=" text-slate-500 text-base font-normal">· </div>
              <div className="S text-slate-500 text-base font-medium">
                From {formatDate(startDate)} to {formatDate(endDate)}
              </div>
            </div>
            {records.map(({ id, author, date, points, prove }) => {
              return (
                <div
                  key={id}
                  className="Tweet h-96 px-px flex-col justify-start items-start gap-2 flex"
                >
                  <div className="Divider h-px justify-center items-center inline-flex">
                    <div className="Divider h-px bg-gray-200" />
                  </div>
                  <div className="Container px-3.5 justify-start items-start gap-2.5 inline-flex">
                    <div className="Side w-12 self-stretch justify-start items-start flex">
                      <div className="AvatarMedium w-12 h-12 pr-px pt-px rounded-full justify-center items-center flex">
                        <img
                          className="ProfilePicture w-12 h-12 rounded-full"
                          src="https://via.placeholder.com/48x48"
                        />
                      </div>
                    </div>
                    <div className="Main flex-col justify-start items-start inline-flex">
                      <div className="User self-stretch pb-1 justify-start items-center gap-1 inline-flex">
                        <div className="DevonLane text-white text-base font-bold">
                          {author.name}
                        </div>
                        <div className="Marcelosalomao text-slate-500 text-base font-medium">
                          @{author.name.toLowerCase()}
                        </div>
                        <div className=" text-slate-500 text-base font-normal">
                          ·{" "}
                        </div>
                        <div className="S text-slate-500 text-base font-medium">
                          {formatDate(date)}
                        </div>
                      </div>
                      <div className="Content self-stretch justify-start items-start gap-2.5 inline-flex">
                        <div className="HoldOnINeedAtLeastAFewMinutes grow shrink basis-0 text-white text-base font-medium">
                          Steps: {points}
                        </div>
                      </div>
                      <div className="Media self-stretch py-2.5 rounded-2xl justify-start items-start inline-flex">
                        <div className="Container h-60 rounded-2xl justify-center items-center flex">
                          {!!prove && (
                            <img
                              className="Placehpolder grow shrink basis-0 h-60 rounded-2xl"
                              src={prove}
                            />
                          )}
                        </div>
                      </div>
                      {/* <div className="Actions self-stretch py-1 justify-start items-start inline-flex">
                        <div className="ActionItem h-4 pr-20 justify-start items-start gap-2.5 flex">
                          <div className="DarkThemeCommentDefault w-4 h-4 px-0.5 py-0.5 justify-center items-center inline-flex" />
                          <div className=" text-slate-500 text-xs font-medium">
                            61
                          </div>
                        </div>
                        <div className="ActionItem h-4 pr-20 justify-start items-start gap-2.5 flex">
                          <div className="DarkThemeRetweetDefault w-4 h-4 px-px py-0.5 justify-center items-center inline-flex" />
                          <div className=" text-slate-500 text-xs font-medium">
                            12
                          </div>
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
                          <div className=" text-slate-500 text-xs font-medium">
                            61
                          </div>
                        </div>
                      </div> */}
                      <div className="ShowThread py-2.5 justify-start items-start inline-flex">
                        <div className="ShowThisThread text-sky-500 text-xs font-medium">
                          Show this thread
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </section>
    // <section
    // // style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}
    // >
    //   <div>list of your Team Challenges</div>
    //   <ul>
    //     {challenges.map(({ id, name, startDate, endDate, records }) => {
    //       return (
    //         <li key={id}>
    //           Challenge: {name}
    //           Challenge Period: from {formatDate(startDate)} to{" "}
    //           {formatDate(endDate)}
    //           <ul>
    //             {records.map(({ id, author, date, points, prove }) => {
    //               return (
    //                 <li key={id}>
    //                   <p>Date: {formatDate(date)}</p>
    //                   <p>
    //                     Name: {author.name} @{author.username}
    //                   </p>
    //                   <p>Steps: {points}</p>
    //                   {!!prove && <img src={prove} width={500} height={500} />}
    //                 </li>
    //               );
    //             })}
    //           </ul>
    //         </li>
    //       );
    //     })}
    //   </ul>
    // </section>
  );
}
