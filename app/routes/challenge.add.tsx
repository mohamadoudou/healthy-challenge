import { ActionArgs, redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";

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
    typeof endDateInput !== "string"
  ) {
    throw new Error("Form not submitted correctly.");
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
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
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
            <input name="description" type="text" />
          </label>
        </div>
        <div>
          <button type="submit">ADD</button>
        </div>
      </form>
    </div>
  );
}
