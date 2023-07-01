import { ActionFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { badRequest } from "~/utils/request.server";
import { createUserSession, loginUser } from "~/utils/session.server";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const usernameOrEmail = form.get("usernameOrEmail");
  const password = form.get("password");

  if (
    typeof usernameOrEmail !== "string" ||
    typeof password !== "string" ||
    !usernameOrEmail ||
    !password
  ) {
    return badRequest({ formError: "Form not submitted correctly." });
  }

  const user = await loginUser(usernameOrEmail, password);

  if (!user) {
    return badRequest({
      fieldErrors: null,
      fields: { usernameOrEmail, password },
      formError: `Username Or Email/Password combination is incorrect`,
    });
  }

  return createUserSession(user.id, "/");
};

export default function Add() {
  const actionData = useActionData<typeof action>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div>Login</div>
      <form method="post">
        <div>
          <label>
            Username or Email
            <input name="usernameOrEmail" type="text" />
          </label>
        </div>
        <div>
          <label>
            Password
            <input name="password" type="password" />
          </label>
        </div>
        {actionData?.formError && (
          <p style={{ color: "red" }}>{actionData.formError}</p>
        )}
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
