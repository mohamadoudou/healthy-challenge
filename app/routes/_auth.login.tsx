import { ActionFunction, LinksFunction } from "@remix-run/node";
import { Link, useActionData } from "@remix-run/react";
import { badRequest } from "~/utils/request.server";
import { createUserSession, loginUser } from "~/utils/session.server";
import stylesUrl from "~/styles/login.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

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

export default function Login() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="login_page">
      <form method="post" className="login_form">
        <div className="logo">
          <h3>Healty Challenge </h3>
          <p>Keep Your Team Fit</p>
        </div>
        <input
          name="usernameOrEmail"
          type="text"
          placeholder="Username or Email"
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
          Login
        </button>
        <p className="sign_up">
          Don't have an account? <Link to={`/signup`}>Sign up</Link>
        </p>
      </form>
    </div>
  );
}
