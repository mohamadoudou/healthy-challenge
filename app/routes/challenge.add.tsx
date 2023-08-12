import { ActionArgs, LinksFunction, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";
import stylesUrl from "~/styles/index.css";

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
    <div>
      <form method="post">
        <div>
          <label>
            Start Date
            <input name="start_date" type="date" />
          </label>
        </div>
        <div>
          <label>
            End Date
            <input name="end_date" type="date" />
          </label>
        </div>
        <div>
          <label>
            Name
            <input name="name" type="text" />
          </label>
        </div>
        <div>
          <label>
            Description
            <textarea
              name="description"
              placeholder="Add a description to your challenge ..."
            />
          </label>
        </div>
        {actionData?.formError && (
          <p style={{ color: "red" }}>{actionData.formError}</p>
        )}
        <div>
          <button type="submit">ADD</button>
        </div>
      </form>
    </div>
  );
}
