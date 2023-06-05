import { User } from "@prisma/client";
import { ActionFunction, LoaderArgs, json, redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  const name = form.get("name");
  const username = form.get("username");
  const { challengeId } = params || {};

  if (typeof name !== "string" || typeof username !== "string") {
    throw new Error("Form not submitted correctly.");
  }

  let user: User | null = null;

  user = await db.user.findUnique({ where: { username } });

  if (!user) {
    user = await db.user.create({ data: { name, username } });
  }

  if (!challengeId || !user) {
    throw new Error("Ups, Please try again");
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
    throw new Error(
      "Ups, This User with username '' already added to the challenge"
    );
  }

  await db.challengeOnUser.create({ data: { userId: user.id, challengeId } });

  return redirect(`/`);
};

export const loader = async ({ params }: LoaderArgs) => {
  return json({
    participants: await db.user.findMany({
      where: {
        ChallengeOnUser: { some: { challengeId: params.challengeId } },
      },
    }),
  });
};

export default function AddParticipants() {
  // Todo: will be use to handle errors
  const actionData = useActionData<typeof action>();
  const { participants } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div>
        <ul>
          {participants.map(({ id, name }) => {
            return (
              <li key={id}>
                <p>Name: {name}</p>
              </li>
            );
          })}
        </ul>
      </div>

      <form method="post">
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
          <button type="submit">ADD PARTICIPANT</button>
        </div>
      </form>
    </div>
  );
}
