import { User } from "@prisma/client";
import { ActionArgs, LinksFunction } from "@remix-run/node";
import { Link, useActionData } from "@remix-run/react";
import { db } from "~/utils/db.server";
import bcrypt from "bcryptjs";
import { badRequest } from "~/utils/request.server";
import { createUserSession } from "~/utils/session.server";
import stylesUrl from "~/styles/signup.css";
import {
  validatePassword,
  validateUsernameEmail,
} from "~/utils/validation.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export const action = async ({ request }: ActionArgs) => {
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
    return badRequest({
      formError: "Form not submitted correctly.",
      fieldErrors: null,
    });
  }

  let isUserExist: User | null = null;
  isUserExist = await db.user.findUnique({ where: { username: username } });
  if (isUserExist) {
    return badRequest({
      formError:
        "Sorry the username is already taken or the account already exist.",
      fieldErrors: null,
    });
  }

  const fieldErrors = {
    email: validateUsernameEmail(email),
    username: validateUsernameEmail(username),
    password: validatePassword(password),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields: { email, name, username, password },
      formError: null,
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: { email, name, username, password: passwordHash },
  });

  if (!user) {
    return badRequest({
      formError: "Ups, Something when wrong please try again",
      fieldErrors: null,
    });
  }

  return createUserSession(user.id, "/");
};

export default function SignUp() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="registration_page">
      <form method="post" className="registration_form">
        <div className="logo">
          <h3>Healty Challenge </h3>
          <p>Keep Your Team Fit</p>
        </div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input"
        />
        {actionData?.fieldErrors && (
          <p style={{ color: "red" }}>{actionData.fieldErrors.email}</p>
        )}
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          className="input"
        />
        <input
          name="username"
          type="text"
          placeholder="Username"
          className="input"
        />
        {actionData?.fieldErrors && (
          <p style={{ color: "red" }}>{actionData.fieldErrors.username}</p>
        )}
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input"
        />
        {actionData?.fieldErrors && (
          <p style={{ color: "red" }}>{actionData.fieldErrors.password}</p>
        )}
        {actionData?.formError && (
          <p style={{ color: "red" }}>{actionData.formError}</p>
        )}

        <button type="submit" className="button">
          Sign Up
        </button>
        <p className="login">
          Have an account? <Link to={`/login`}>Log in</Link>
        </p>
      </form>
    </div>
  );
}
