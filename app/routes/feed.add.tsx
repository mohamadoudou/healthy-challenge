import { ActionArgs, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const name = form.get("name");
  const dateInput = form.get("date");
  const steps = form.get("steps");
  if (
    typeof name !== "string" ||
    typeof dateInput !== "string" ||
    typeof steps !== "string"
  ) {
    throw new Error("Form not submitted correctly.");
  }

  const date = new Date(dateInput);

  // Get the timestamp in milliseconds using the getTime() method
  const timestamp = date.getTime();

  const fields = { name, date: String(timestamp), steps: Number(steps) };

  const joke = await db.record.create({ data: fields });
  return redirect("/feed");
};

export default function Add() {
  const actionData = useActionData<typeof action>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div>Add your record</div>
      <form method="post">
        <div>
          <label>
            Choose Date
            <input name="date" type="date" />
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
            Steps
            <input name="steps" type="number" />
          </label>
        </div>
        <div>
          <button type="submit">ADD</button>
        </div>
      </form>
    </div>
  );
}
