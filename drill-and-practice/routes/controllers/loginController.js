import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";

const processLogin = async ({ request, response, state, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const userFromDatabase = await userService.findUserByEmail(
    params.get("email"),
  );
  if (userFromDatabase.length != 1) {
    render("login.eta", { errors: "Email or password cannot be identified." });
    return;
  }

  const user = userFromDatabase[0];
  const passwordMatches = await bcrypt.compare(
    params.get("password"),
    user.password,
  );

  if (!passwordMatches) {
    render("login.eta", { errors: "Password cannot be identified." });
    return;
  }

  await state.session.set("user", user);
  response.redirect("/topics");
};

const showLogin = ({ render }) => {
  render("login.eta", { errors: "" });
};

export { processLogin, showLogin };
