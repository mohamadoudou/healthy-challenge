import { User } from "@prisma/client";
import {  ActionFunction, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const action:ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  const name = form.get("name");
  const dateInput = form.get("date");
  const points = form.get("points");
  const username = form.get("username");
  const { challengeId } = params;

  if (
    typeof name !== "string" ||
    typeof dateInput !== "string" ||
    typeof points !== "string"||
    typeof username !== "string"
  ) {
    throw new Error("Form not submitted correctly.");
  }

  let user: User | null = null;

  user = await db.user.findUnique({ where: { username } });
  const date = new Date(dateInput);

  // Get the timestamp in milliseconds using the getTime() method
  const timestamp = date.getTime();
  if (!user || !challengeId) {
    throw new Error("Ups the user or the challenge does not exist");
  }

  const isUserExistInTheChallenge = await db.challengeOnUser.findUnique({
    where: {
      userId_challengeId: {
        userId: user.id,
        challengeId,
      },
    },
  });

  if (isUserExistInTheChallenge) {
    const fields = { date: String(timestamp), points,challengeId,authorId:user.id };
    await db.record.create({ data: fields });
  }else{
    throw new Error(
      "Ups, This User with username '' does not added to this challenge"
    );
  }

  return redirect(`/challenge/${challengeId}/record`);
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
            Username
            <input name="username" type="text" />
          </label>
        </div>
        <div>
          <label>
            Points
            <input name="points" type="text" />
          </label>
        </div>
        <div>
          <button type="submit">ADD</button>
        </div>
      </form>
    </div>
  );
}
