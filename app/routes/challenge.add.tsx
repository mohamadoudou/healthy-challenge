import { ActionArgs, LinksFunction, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";
import stylesUrl from "~/styles/index.css";
import InputField from "~/components/InputField";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const name = form.get("name");
  const description = form.get("description");
  const startDateInput = form.get("start_date");
  const endDateInput = form.get("end_date");

  if (
    typeof name !== "string" ||
    typeof description !== "string" ||
    typeof startDateInput !== "string" ||
    typeof endDateInput !== "string" ||
    !name ||
    !description ||
    !startDateInput ||
    !endDateInput
  ) {
    return badRequest({ formError: "Form not submitted correctly." });
  }

  const startDate = new Date(startDateInput);
  const endDate = new Date(endDateInput);

  // Get the timestamp in milliseconds using the getTime() method
  const startDateTimestamp = startDate.getTime();
  const endDateTimestamp = endDate.getTime();

  const fields = {
    name,
    description,
    startDate: String(startDateTimestamp),
    endDate: String(endDateTimestamp),
  };

  await db.challenge.create({ data: fields });

  return redirect("/");
};

export default function Add() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="block w-[40rem] rounded-lg bg-black px-6 py-16 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <form method="post" className="">
        <InputField
          name="start_date"
          label="Start Date"
          type="date"
          placeholder="Start Date"
        />
        <InputField
          name="end_date"
          label="End Date"
          type="date"
          placeholder="End Date"
        />
        <InputField name="name" type="text" label="Name" />
        <div className="relative mb-6 text-red-600">
          <textarea
            name="description"
            placeholder="Add a description to your challenge ..."
            className="peer block min-h-[auto] w-full rounded px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-red-600 dark:placeholder:text-red-600 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          />
          <label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-red-600 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-red-600 dark:peer-focus:text-primary">
            Description
          </label>
        </div>
        {actionData?.formError && (
          <p style={{ color: "red" }}>{actionData.formError}</p>
        )}
        <div className="mt-20">
          <button
            type="submit"
            className="dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded bg-[#34495e] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            ADD CHALLENGE
          </button>
        </div>
      </form>
    </div>
  );
}
