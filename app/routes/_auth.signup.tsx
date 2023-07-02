import { User } from "@prisma/client";
import { ActionFunction, LinksFunction } from "@remix-run/node";
import { Link, useActionData } from "@remix-run/react";
import { db } from "~/utils/db.server";
import bcrypt from "bcryptjs";
import { badRequest } from "~/utils/request.server";
import { createUserSession } from "~/utils/session.server";
import stylesUrl from "~/styles/signup.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

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

  if (!user) {
    return badRequest({
      formError: "Ups, Something when wrong please try again",
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
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input"
        />
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
