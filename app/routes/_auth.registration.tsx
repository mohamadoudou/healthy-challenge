import { User } from "@prisma/client";
import { ActionFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { db } from "~/utils/db.server";
import bcrypt from "bcryptjs";
import { badRequest } from "~/utils/request.server";
import { createUserSession } from "~/utils/session.server";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const name = form.get("name");
  const username = form.get("username");
  const password = form.get("password");

  if (
    typeof email !== "string" ||
    typeof name !== "string" ||
    typeof username !== "string" ||
    typeof password !== "string" ||
    !email ||
    !name ||
    !username ||
    !password
  ) {
    return badRequest({ formError: "Form not submitted correctly." });
  }

  let isUserExist: User | null = null;
  isUserExist = await db.user.findUnique({ where: { username: username } });
  if (isUserExist) {
    return badRequest({
      formError:
        "Sorry the username is already taken or the account already exist.",
    });
  }
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: { email, name, username, password: passwordHash },
  });
  
 return createUserSession(user.id,'/')
};

export default function Add() {
  const actionData = useActionData<typeof action>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div>Registration</div>
      <form method="post">
        <div>
          <label>
            Email
            <input name="email" type="email" />
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
            Password
            <input name="password" type="password" />
          </label>
        </div>
        {actionData?.formError && (
          <p style={{ color: "red" }}>{actionData.formError}</p>
        )}
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}
