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
    <div className="block w-[40rem] rounded-lg px-6 py-16 bg-neutral-900 ring-2">
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
        <div className="relative mb-6">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-white"
          >
            Describe your challenge
          </label>
          <textarea
            name="description"
            placeholder="Add a description to your challenge ..."
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        {actionData?.formError && (
          <p style={{ color: "red" }}>{actionData.formError}</p>
        )}
        <div className="mt-16">
          <button type="submit" className="w-full bg-[#34495e] rounded-lg p-2">
            ADD CHALLENGE
          </button>
        </div>
      </form>
    </div>
  );
}
