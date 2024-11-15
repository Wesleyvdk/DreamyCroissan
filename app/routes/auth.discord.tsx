import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { auth } from "~/auth.server";

export let loader: LoaderFunction = () => {
  console.log("Redirect from auth");
  return redirect("/login");
};

export let action: ActionFunction = ({ request }) => {
  return auth.authenticate("discord", request);
};
