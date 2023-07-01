import { User } from "@prisma/client";
import {
  ActionFunction,
  redirect,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";
import { uploadImageToCloudinary } from "~/utils/cloudinaryConfig.server";
import { requireUserId } from "~/utils/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  const uploadHandler = unstable_composeUploadHandlers(
    // our custom upload handler
    async ({ name, contentType, data, filename }) => {
      if (name !== "prove") {
        return undefined;
      }
      const uploadedImage = await uploadImageToCloudinary(data);
      return uploadedImage.secure_url;
    },
    // fallback to memory for everything else
    unstable_createMemoryUploadHandler()
  );

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const dateInput = formData.get("date");
  const points = formData.get("points");
  const prove = formData.get("prove");
  const { challengeId } = params;

  if (
    typeof dateInput !== "string" ||
    typeof points !== "string" ||
    typeof prove !== "string" ||
    !dateInput ||
    !points ||
    !prove
  ) {
    return badRequest({ formError: "Form not submitted correctly." });
  }

  const userId = await requireUserId(request);
  let user: User | null = null;

  user = await db.user.findUnique({ where: { id: userId } });
  const date = new Date(dateInput);

  // Get the timestamp in milliseconds using the getTime() method
  const timestamp = date.getTime();

  if (!user || !challengeId) {
    return badRequest({
      formError: "Ups the user or the challenge does not exist",
    });
  }

  const isUserExistInTheChallenge = await db.challengeOnUser.findUnique({
    where: {
      userId_challengeId: {
        userId: user.id,
        challengeId,
      },
    },
  });

  const isChallengeExist = await db.challenge.findUnique({
    where: {
      id: challengeId,
    },
  });

  if (!isChallengeExist) {
    return badRequest({ formError: "This Challenge does not exist" });
  }

  if (isUserExistInTheChallenge) {
    const fields = {
      date: String(timestamp),
      points,
      challengeId,
      authorId: user.id,
      prove,
    };
    await db.record.create({ data: fields });
  } else {
    return badRequest({
      formError: "Ups, Your are not a particitant of this challenge.",
    });
  }

  return redirect(`/challenge/${challengeId}/record`);
};

export default function Add() {
  const actionData = useActionData<typeof action>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div>Add your record</div>
      <form encType="multipart/form-data" method="post">
        <div>
          <label>
            Choose Date
            <input name="date" type="date" />
          </label>
        </div>
        <div>
          <label>
            Prove
            <input name="prove" type="file" />
          </label>
        </div>
        <div>
          <label>
            Points
            <input name="points" type="text" />
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
