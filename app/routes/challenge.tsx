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
              <div className="text-red-600 text-lg font-bold">
                Team Challenge
              </div>
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
                <div className="w-6 h-6 relative"></div>
              </div>
              <div className="text-white text-lg font-bold">Lists</div>
            </div>
            <div className="w-64 h-14 pl-2.5 pr-32 py-3.5 justify-start items-center gap-5 inline-flex">
              <div className="w-7 h-7 px-1 py-0.5 justify-center items-center inline-flex" />
              <div className="text-white text-lg font-bold">Profile</div>
            </div>
            <div className="w-64 h-14 pl-2.5 pr-36 py-3.5 justify-start items-center gap-5 inline-flex">
              <div className="w-7 h-7 p-0.5 justify-center items-center inline-flex">
                <div className="w-7 h-7 relative"></div>
              </div>
              <div className="text-white text-lg font-bold">More</div>
            </div>
          </div>
          <div className="self-stretch py-3.5 flex-col justify-start items-start gap-2.5 inline-flex">
            <button className="px-16 py-3.5 bg-red-600 rounded-full justify-center items-center gap-2.5 inline-flex">
              <div className="text-center text-white text-base font-bold leading-tight">
                Add Challenge
              </div>
            </button>
          </div>
        </div>
        <div className="w-64 h-16 relative flex-col justify-start items-start flex">
          <div className="w-10 h-10 rounded-full justify-center items-center inline-flex">
            <img
              className="w-10 h-10"
              src="https://via.placeholder.com/39x39"
            />
          </div>
          <div className="text-white text-base font-bold">Jerome Bell</div>
          <div className="w-8 h-8 px-2 justify-center items-center inline-flex" />
          <div className="text-slate-500 text-base font-medium">
            @afonsoinocente
          </div>
        </div>
      </div>
      <div className="Feed w-96 h-96 px-px flex-col justify-start items-start inline-flex">
        <div className="Header w-96 h-14 relative">
          <div className="Home left-[15px] top-[15px] absolute text-white text-lg font-bold">
            Home
          </div>
          <div className="Divider h-px left-0 top-[52px] absolute flex-col justify-end items-start inline-flex">
            <div className="Divider w-96 h-px bg-gray-200" />
            <div className="Frame1 self-stretch px-3.5 py-1" />
          </div>
          <div className="DarkThemeToptweetDefault w-6 h-6 px-px py-px left-[560px] top-[15px] absolute justify-center items-center inline-flex" />
        </div>
        <div className="Spacer w-96 h-2.5 pb-2 bg-gray-50 justify-center items-center inline-flex">
          <div className="Divider w-96 h-px bg-gray-200" />
        </div>
        <div className="Tweet h-96 px-px flex-col justify-start items-start gap-2 flex">
          <div className="Divider w-96 h-px justify-center items-center inline-flex">
            <div className="Divider w-96 h-px bg-gray-200" />
          </div>
          <div className="Container w-96 px-3.5 justify-start items-start gap-2.5 inline-flex">
            <div className="Side w-12 self-stretch justify-start items-start flex">
              <div className="AvatarMedium w-12 h-12 pr-px pt-px rounded-full justify-center items-center flex">
                <img
                  className="ProfilePicture w-12 h-12"
                  src="https://via.placeholder.com/48x48"
                />
              </div>
            </div>
            <div className="Main w-96 flex-col justify-start items-start inline-flex">
              <div className="User self-stretch pb-1 justify-start items-center gap-1 inline-flex">
                <div className="DevonLane text-white text-base font-bold">
                  Devon Lane
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
                <div className="Container w-96 h-60 rounded-2xl border border-slate-400 justify-center items-center flex">
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
                    <div className="Group w-3.5 h-3.5 relative"></div>
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
        </div>
        <div className="Tweet h-96 px-px flex-col justify-start items-start gap-2 flex">
          <div className="Divider w-96 h-px justify-center items-center inline-flex">
            <div className="Divider w-96 h-px bg-gray-200" />
          </div>
          <div className="Container w-96 px-3.5 justify-start items-start gap-2.5 inline-flex">
            <div className="Side w-12 self-stretch justify-start items-start flex">
              <div className="AvatarMedium w-12 h-12 pr-px pt-px rounded-full justify-center items-center flex">
                <img
                  className="ProfilePicture w-12 h-12"
                  src="https://via.placeholder.com/48x48"
                />
              </div>
            </div>
            <div className="Main w-96 flex-col justify-start items-start inline-flex">
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
                <div className="Container w-96 h-60 rounded-2xl border border-slate-400 justify-center items-center flex">
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
                    <div className="Group w-3.5 h-3.5 relative"></div>
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
        </div>
      </div>
    </>
    // <>
    //   <div className="w-96 h-96 relative bg-gray-900">
    //     <div className="w-72 h-96 px-2.5 left-[88px] top-0 absolute flex-col justify-center items-start gap-56 inline-flex">
    //       <div className="h-96 flex-col justify-center items-start inline-flex">
    //         <div className="self-stretch h-14 pl-2.5 pr-52 pt-2.5 pb-3 justify-start items-center inline-flex">
    //           <div className="w-7 h-7 relative flex-col justify-start items-start flex" />
    //         </div>
    //         <div className="self-stretch flex-col justify-start items-start inline-flex">
    //           <div className="w-64 h-14 pl-2.5 pr-36 py-3.5 justify-start items-center gap-5 inline-flex">
    //             <div className="w-7 h-7 relative flex-col justify-start items-start flex" />
    //             <div className="text-sky-500 text-lg font-bold">Home</div>
    //           </div>
    //           <div className="w-64 h-14 pl-2.5 pr-32 py-3.5 justify-start items-center gap-5 inline-flex">
    //             <div className="w-7 h-7 relative flex-col justify-start items-start flex" />
    //             <div className="text-white text-lg font-bold">Explore</div>
    //           </div>
    //           <div className="w-64 h-14 pl-2.5 pr-20 py-3.5 justify-start items-center gap-5 inline-flex">
    //             <div className="w-7 h-7 relative flex-col justify-start items-start flex" />
    //             <div className="text-white text-lg font-bold">
    //               Notifications
    //             </div>
    //           </div>
    //           <div className="w-64 h-14 pl-2.5 pr-28 py-3.5 justify-start items-center gap-5 inline-flex">
    //             <div className="w-7 h-7 relative flex-col justify-start items-start flex" />
    //             <div className="text-white text-lg font-bold">Messages</div>
    //           </div>
    //           <div className="w-64 h-14 pl-2.5 pr-24 py-3.5 justify-start items-center gap-5 inline-flex">
    //             <div className="w-7 h-7 relative flex-col justify-start items-start flex" />
    //             <div className="text-white text-lg font-bold">Bookmarks</div>
    //           </div>
    //           <div className="w-64 h-14 pl-2.5 pr-36 py-3.5 justify-start items-center gap-5 inline-flex">
    //             <div className="w-7 h-7 relative flex-col justify-start items-start flex">
    //               <div className="w-6 h-6 relative"></div>
    //             </div>
    //             <div className="text-white text-lg font-bold">Lists</div>
    //           </div>
    //           <div className="w-64 h-14 pl-2.5 pr-32 py-3.5 justify-start items-center gap-5 inline-flex">
    //             <div className="w-7 h-7 relative flex-col justify-start items-start flex" />
    //             <div className="text-white text-lg font-bold">Profile</div>
    //           </div>
    //           <div className="w-64 h-14 pl-2.5 pr-36 py-3.5 justify-start items-center gap-5 inline-flex">
    //             <div className="w-7 h-7 relative flex-col justify-start items-start flex">
    //               <div className="w-7 h-7 relative"></div>
    //             </div>
    //             <div className="text-white text-lg font-bold">More</div>
    //           </div>
    //         </div>
    //         <div className="self-stretch py-3.5 flex-col justify-start items-start gap-2.5 inline-flex">
    //           <div className="px-24 py-3.5 bg-sky-500 rounded-full justify-center items-center gap-2.5 inline-flex">
    //             <div className="text-center text-white text-base font-bold leading-tight">
    //               Tweet
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="w-64 h-16 relative flex-col justify-start items-start flex">
    //         <div className="w-10 h-10 rounded-full justify-center items-center inline-flex">
    //           <img
    //             className="w-10 h-10"
    //             src="https://via.placeholder.com/39x39"
    //           />
    //         </div>
    //         <div className="text-white text-base font-bold">Davide Biscuso</div>
    //         <div className="w-8 h-8 relative" />
    //         <div className="text-slate-400 text-base font-medium">
    //           @biscuttu
    //         </div>
    //       </div>
    //     </div>
    //     <div className="px-px left-[363px] top-0 absolute flex-col justify-start items-start inline-flex">
    //       <div className="w-96 h-14 relative">
    //         <div className="left-[15px] top-[15px] absolute text-white text-lg font-bold">
    //           Home
    //         </div>
    //         <div className="h-px left-0 top-[52px] absolute flex-col justify-end items-start inline-flex">
    //           <div className="w-96 h-px bg-gray-700" />
    //           <div className="self-stretch px-3.5 py-1" />
    //         </div>
    //         <div className="w-6 h-6 left-[560px] top-[15px] absolute" />
    //       </div>
    //       <div className="h-28 px-3.5 py-2.5 flex-col justify-start items-start gap-2.5 flex">
    //         <div className="w-96 h-24 relative">
    //           <div className="w-12 h-12 pr-px pt-px left-0 top-0 absolute rounded-full justify-center items-center inline-flex">
    //             <img
    //               className="w-12 h-12"
    //               src="https://via.placeholder.com/48x48"
    //             />
    //           </div>
    //           <div className="left-[61px] top-[12px] absolute text-slate-400 text-xl font-medium">
    //             What’s happening?
    //           </div>
    //           <div className="w-44 left-[58px] top-[67px] absolute justify-between items-start gap-3.5 inline-flex">
    //             <div className="w-6 h-6 relative">
    //               <div className="w-5 h-5 left-[2px] top-[2px] absolute"></div>
    //             </div>
    //             <div className="w-6 h-6 relative">
    //               <div className="w-5 h-5 left-[1.25px] top-[2.02px] absolute"></div>
    //             </div>
    //             <div className="w-6 h-6 relative" />
    //             <div className="w-6 h-6 relative">
    //               <div className="w-5 h-5 left-[1.25px] top-[1.25px] absolute"></div>
    //             </div>
    //             <div className="w-6 h-6 relative">
    //               <div className="w-14 h-5 left-[-38px] top-[1.10px] absolute"></div>
    //             </div>
    //           </div>
    //           <div className="w-20 h-10 px-24 py-3.5 left-[491px] top-[59px] absolute opacity-50 bg-sky-500 rounded-full justify-center items-center gap-2.5 inline-flex">
    //             <div className="text-center text-white text-base font-bold leading-tight">
    //               Tweet
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="w-96 h-2.5 pb-2 bg-gray-800 justify-center items-center inline-flex">
    //         <div className="w-96 h-px bg-gray-700" />
    //       </div>
    //       <div className="h-96 px-px flex-col justify-start items-start gap-2 flex">
    //         <div className="w-96 h-px justify-center items-center inline-flex">
    //           <div className="w-96 h-px bg-gray-700" />
    //         </div>
    //         <div className="w-96 px-3.5 justify-start items-start gap-2.5 inline-flex">
    //           <div className="w-12 self-stretch justify-start items-start flex">
    //             <div className="w-12 h-12 pr-px pt-px rounded-full justify-center items-center flex">
    //               <img
    //                 className="w-12 h-12"
    //                 src="https://via.placeholder.com/48x48"
    //               />
    //             </div>
    //           </div>
    //           <div className="w-96 flex-col justify-start items-start inline-flex">
    //             <div className="self-stretch pb-1 justify-start items-center gap-1 inline-flex">
    //               <div className="text-white text-base font-bold">
    //                 Devon Lane
    //               </div>
    //               <div className="text-slate-400 text-base font-medium">
    //                 @marcelosalomao
    //               </div>
    //               <div className="text-slate-400 text-base font-normal">· </div>
    //               <div className="text-slate-400 text-base font-medium">
    //                 23s
    //               </div>
    //             </div>
    //             <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
    //               <div className="grow shrink basis-0 text-white text-base font-medium">
    //                 Is this big enough for you?
    //               </div>
    //             </div>
    //             <div className="self-stretch py-2.5 rounded-2xl justify-start items-start inline-flex">
    //               <div className="w-96 h-60 rounded-2xl border border-gray-700 justify-center items-center flex">
    //                 <img
    //                   className="grow shrink basis-0 h-60"
    //                   src="https://via.placeholder.com/509x247"
    //                 />
    //               </div>
    //             </div>
    //             <div className="self-stretch py-1 justify-start items-start inline-flex">
    //               <div className="h-4 pr-20 justify-start items-start gap-2.5 flex">
    //                 <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
    //                 <div className="text-slate-400 text-xs font-medium">61</div>
    //               </div>
    //               <div className="h-4 pr-20 justify-start items-start gap-2.5 flex">
    //                 <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
    //                 <div className="text-slate-400 text-xs font-medium">12</div>
    //               </div>
    //               <div className="pr-20 justify-start items-start gap-2.5 flex">
    //                 <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
    //                 <div className="text-rose-500 text-xs font-medium">
    //                   6.2K
    //                 </div>
    //               </div>
    //               <div className="h-4 pr-20 justify-start items-start gap-2.5 flex">
    //                 <div className="w-4 h-4 relative flex-col justify-start items-start flex">
    //                   <div className="w-3.5 h-3.5 relative"></div>
    //                 </div>
    //                 <div className="text-slate-400 text-xs font-medium">61</div>
    //               </div>
    //             </div>
    //             <div className="py-2.5 justify-start items-start inline-flex">
    //               <div className="text-sky-500 text-xs font-medium">
    //                 Show this thread
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="h-96 px-px flex-col justify-start items-start gap-2 flex">
    //         <div className="w-96 h-px justify-center items-center inline-flex">
    //           <div className="w-96 h-px bg-gray-700" />
    //         </div>
    //         <div className="w-96 px-3.5 justify-start items-start gap-2.5 inline-flex">
    //           <div className="w-12 self-stretch justify-start items-start flex">
    //             <div className="w-12 h-12 pr-px pt-px rounded-full justify-center items-center flex">
    //               <img
    //                 className="w-12 h-12"
    //                 src="https://via.placeholder.com/48x48"
    //               />
    //             </div>
    //           </div>
    //           <div className="w-96 flex-col justify-start items-start inline-flex">
    //             <div className="self-stretch pb-1 justify-start items-center gap-1 inline-flex">
    //               <div className="text-white text-base font-bold">
    //                 Esther Howard
    //               </div>
    //               <div className="text-slate-400 text-base font-medium">
    //                 @andrebiachi
    //               </div>
    //               <div className="text-slate-400 text-base font-normal">· </div>
    //               <div className="text-slate-400 text-base font-medium">
    //                 23s
    //               </div>
    //             </div>
    //             <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
    //               <div className="grow shrink basis-0 text-white text-base font-medium">
    //                 Are you ready for your big date?
    //               </div>
    //             </div>
    //             <div className="self-stretch py-2.5 rounded-2xl justify-start items-start inline-flex">
    //               <div className="w-96 h-60 rounded-2xl border border-gray-700 justify-center items-center flex">
    //                 <img
    //                   className="grow shrink basis-0 h-60"
    //                   src="https://via.placeholder.com/509x247"
    //                 />
    //               </div>
    //             </div>
    //             <div className="self-stretch py-1 justify-start items-start inline-flex">
    //               <div className="h-4 pr-20 justify-start items-start gap-2.5 flex">
    //                 <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
    //                 <div className="text-slate-400 text-xs font-medium">61</div>
    //               </div>
    //               <div className="h-4 pr-20 justify-start items-start gap-2.5 flex">
    //                 <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
    //                 <div className="text-slate-400 text-xs font-medium">12</div>
    //               </div>
    //               <div className="pr-20 justify-start items-start gap-2.5 flex">
    //                 <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
    //                 <div className="text-rose-500 text-xs font-medium">
    //                   6.2K
    //                 </div>
    //               </div>
    //               <div className="h-4 pr-20 justify-start items-start gap-2.5 flex">
    //                 <div className="w-4 h-4 relative flex-col justify-start items-start flex">
    //                   <div className="w-3.5 h-3.5 relative"></div>
    //                 </div>
    //                 <div className="text-slate-400 text-xs font-medium">61</div>
    //               </div>
    //             </div>
    //             <div className="py-2.5 justify-start items-start inline-flex">
    //               <div className="text-sky-500 text-xs font-medium">
    //                 Show this thread
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="w-96 h-px left-[364px] top-0 absolute origin-top-left rotate-90 bg-gray-700" />
    //     <div className="w-96 h-px left-[963px] top-0 absolute origin-top-left rotate-90 bg-gray-700" />
    //     <div className="w-80 pt-2.5 left-[993px] top-0 absolute flex-col justify-start items-start gap-3.5 inline-flex">
    //       <div className="w-80 h-10 pl-4 pr-48 py-2.5 bg-slate-800 rounded-full justify-start items-start gap-3.5 inline-flex">
    //         <div className="w-5 h-5 relative flex-col justify-start items-start flex" />
    //         <div className="text-slate-400 text-base font-medium">
    //           Search Twitter
    //         </div>
    //       </div>
    //       <div className="bg-gray-800 rounded-2xl flex-col justify-start items-start flex">
    //         <div className="w-80 h-11 relative">
    //           <div className="left-[16px] top-[11px] absolute text-white text-xl font-bold tracking-tight">
    //             What’s happening
    //           </div>
    //           <div className="w-80 h-px left-0 top-[45px] absolute bg-gray-700" />
    //         </div>
    //         <div className="w-80 px-3.5 py-2.5 justify-start items-start gap-3.5 inline-flex">
    //           <div className="flex-col justify-start items-start gap-1.5 inline-flex">
    //             <div className="justify-start items-start gap-1 inline-flex">
    //               <div className="text-slate-400 text-sm font-medium">
    //                 COVID 19
    //               </div>
    //               <div className="text-slate-400 text-sm font-medium">·</div>
    //               <div className="text-slate-400 text-sm font-medium">
    //                 Last night
    //               </div>
    //             </div>
    //             <div className="w-60 text-white text-base font-bold tracking-tight">
    //               England’s Chief Medical Officer says the UK is at the most
    //               dangerous time of the pandemic
    //             </div>
    //             <div className="justify-start items-start gap-1 inline-flex">
    //               <div className="text-slate-400 text-sm font-medium">
    //                 Trending with
    //               </div>
    //               <div className="text-sky-500 text-sm font-medium">
    //                 #covid19
    //               </div>
    //             </div>
    //           </div>
    //           <div className="w-16 h-16 justify-center items-center flex">
    //             <div className="grow shrink basis-0 self-stretch rounded-xl justify-center items-center inline-flex">
    //               <img
    //                 className="w-16 h-16"
    //                 src="https://via.placeholder.com/71x69"
    //               />
    //             </div>
    //           </div>
    //         </div>
    //         <div className="w-80 h-px bg-gray-700" />
    //         <div className="w-80 px-3.5 py-2.5 justify-start items-start gap-3.5 inline-flex">
    //           <div className="flex-col justify-start items-start gap-1.5 inline-flex">
    //             <div className="justify-start items-start gap-1 inline-flex">
    //               <div className="text-slate-400 text-sm font-medium">
    //                 US news
    //               </div>
    //               <div className="text-slate-400 text-sm font-medium">·</div>
    //               <div className="text-slate-400 text-sm font-medium">
    //                 4h ago
    //               </div>
    //             </div>
    //             <div className="w-60 text-white text-base font-bold tracking-tight">
    //               Parler may go offline following suspensions by Amazon, Apple
    //               and Google
    //             </div>
    //             <div className="justify-start items-start gap-1 inline-flex">
    //               <div className="text-slate-400 text-sm font-medium">
    //                 Trending with
    //               </div>
    //               <div className="text-sky-500 text-sm font-medium">#trump</div>
    //             </div>
    //           </div>
    //           <div className="w-16 h-16 justify-center items-center flex">
    //             <div className="grow shrink basis-0 self-stretch rounded-xl justify-center items-center inline-flex">
    //               <img
    //                 className="w-16 h-16"
    //                 src="https://via.placeholder.com/71x69"
    //               />
    //             </div>
    //           </div>
    //         </div>
    //         <div className="w-80 h-px bg-gray-700" />
    //         <div className="w-80 px-3.5 py-2.5 justify-start items-start gap-3.5 inline-flex">
    //           <div className="flex-col justify-start items-start gap-1.5 inline-flex">
    //             <div className="justify-start items-start gap-1 inline-flex">
    //               <div className="text-slate-400 text-sm font-medium">
    //                 India
    //               </div>
    //               <div className="text-slate-400 text-sm font-medium">·</div>
    //               <div className="text-slate-400 text-sm font-medium">
    //                 1h ago
    //               </div>
    //             </div>
    //             <div className="w-60 text-white text-base font-bold tracking-tight">
    //               India vs Australia: India hold on to earn a draw on Day 5 in
    //               Sydney Test
    //             </div>
    //             <div className="justify-start items-start gap-1 inline-flex">
    //               <div className="text-slate-400 text-sm font-medium">
    //                 Trending with
    //               </div>
    //               <div className="text-sky-500 text-sm font-medium">#sport</div>
    //             </div>
    //           </div>
    //           <div className="w-16 h-16 justify-center items-center flex">
    //             <div className="grow shrink basis-0 self-stretch rounded-xl justify-center items-center inline-flex">
    //               <img
    //                 className="w-16 h-16"
    //                 src="https://via.placeholder.com/71x69"
    //               />
    //             </div>
    //           </div>
    //         </div>
    //         <div className="w-80 h-px bg-gray-700" />
    //         <div className="self-stretch p-3.5 justify-start items-start inline-flex">
    //           <div className="text-sky-500 text-base font-medium">
    //             Show more
    //           </div>
    //         </div>
    //       </div>
    //       <div className="bg-gray-800 rounded-2xl flex-col justify-start items-start flex">
    //         <div className="w-80 h-11 relative">
    //           <div className="left-[16px] top-[11px] absolute text-white text-xl font-bold">
    //             Who to follow
    //           </div>
    //           <div className="w-80 h-px left-0 top-[45px] absolute bg-gray-700" />
    //         </div>
    //         <div className="w-80 h-16 pb-px justify-center items-center inline-flex">
    //           <div className="w-80 h-16 relative flex-col justify-start items-start flex">
    //             <div className="w-12 h-12 pr-px pt-px rounded-full justify-center items-center inline-flex">
    //               <img
    //                 className="w-12 h-12"
    //                 src="https://via.placeholder.com/48x48"
    //               />
    //             </div>
    //             <div className="text-white text-base font-bold">
    //               Bessie Cooper
    //             </div>
    //             <div className="w-20 h-7 px-24 py-3.5 rounded-full border border-sky-500 justify-center items-center inline-flex">
    //               <div className="text-center text-sky-500 text-base font-bold leading-tight">
    //                 Follow
    //               </div>
    //             </div>
    //             <div className="text-slate-400 text-base font-medium">
    //               @alessandroveronezi
    //             </div>
    //             <div className="w-80 h-px bg-gray-700" />
    //           </div>
    //         </div>
    //         <div className="w-80 h-16 pb-px justify-center items-center inline-flex">
    //           <div className="w-80 h-16 relative flex-col justify-start items-start flex">
    //             <div className="w-12 h-12 pr-px pt-px rounded-full justify-center items-center inline-flex">
    //               <img
    //                 className="w-12 h-12"
    //                 src="https://via.placeholder.com/48x48"
    //               />
    //             </div>
    //             <div className="text-white text-base font-bold">
    //               Jenny Wilson
    //             </div>
    //             <div className="w-20 h-7 px-24 py-3.5 rounded-full border border-sky-500 justify-center items-center inline-flex">
    //               <div className="text-center text-sky-500 text-base font-bold leading-tight">
    //                 Follow
    //               </div>
    //             </div>
    //             <div className="text-slate-400 text-base font-medium">
    //               @gabrielcantarin
    //             </div>
    //             <div className="w-80 h-px bg-gray-700" />
    //           </div>
    //         </div>
    //         <div className="self-stretch p-3.5 justify-start items-start inline-flex">
    //           <div className="text-sky-500 text-base font-medium">
    //             Show more
    //           </div>
    //         </div>
    //       </div>
    //       <div className="w-80 h-9 text-slate-400 text-xs font-medium">
    //         Terms of Service Privacy Policy Cookie Policy
    //         <br />
    //         Ads info More © 2021 Twitter, Inc.
    //       </div>
    //     </div>
    //     <div className="w-6 h-6 left-[109px] top-[310px] absolute" />
    //   </div>

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
