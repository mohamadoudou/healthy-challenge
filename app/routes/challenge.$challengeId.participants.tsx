import { User } from "@prisma/client";
import { ActionArgs, LoaderArgs, json, redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";
import { requireUserId } from "~/utils/session.server";

export const action = async ({ request, params }: ActionArgs) => {
  const form = await request.formData();
  const name = form.get("name");
  const username = form.get("username");
  const { challengeId } = params;

  if (
    typeof name !== "string" ||
    typeof username !== "string" ||
    !name ||
    !username
  ) {
    return badRequest({ formError: "Form not submitted correctly." });
  }

  let user: User | null = null;

  user = await db.user.findUnique({ where: { username } });

  // Create a user and then add him to the challenge when do user doesn't exist in the system
  if (!user) {
    return badRequest({
      formError:
        "The user Does not exist, Ask your particitant to create an account.",
    });
  }

  if (!challengeId || !user) {
    return badRequest({ formError: "Ups, Please try again" });
  }

  const isChallengeExist = await db.challenge.findUnique({
    where: {
      id: challengeId,
    },
  });

  if (!isChallengeExist) {
    return badRequest({ formError: "This Challenge does not exist" });
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
    return badRequest({
      formError: "Ups, This User already added to the challenge",
    });
  }

  await db.challengeOnUser.create({ data: { userId: user.id, challengeId } });

  return redirect(`/`);
};

export const loader = async ({ request, params }: LoaderArgs) => {
  await requireUserId(request);

  return json({
    participants: await db.user.findMany({
      where: {
        ChallengeOnUser: { some: { challengeId: params.challengeId } },
      },
    }),
  });
};

export default function AddParticipants() {
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
        {actionData?.formError && (
          <p style={{ color: "red" }}>{actionData.formError}</p>
        )}
        <div>
          <button type="submit">ADD PARTICIPANT</button>
        </div>
      </form>
    </div>
  );
}
