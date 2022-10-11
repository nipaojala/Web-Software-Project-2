import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const topicValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required, validasaur.minLength(4)],
};

const getTopicData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    email: params.get("email"),
    password: params.get("password"),
  };
};

const registerUser = async ({ request, response, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const topicData = await getTopicData(request);
  const [passes, errors] = await validasaur.validate(
    topicData,
    topicValidationRules,
  );
  if (!passes) {
    topicData.validationErrors = errors;
    render("registration.eta", topicData);
  } else {
    await userService.addUser(
      params.get("email"),
      await bcrypt.hash(params.get("password")),
    );

    response.redirect("/auth/login");
  }
};

const showRegistrationForm = ({ render }) => {
  render("registration.eta");
};

export { registerUser, showRegistrationForm };
