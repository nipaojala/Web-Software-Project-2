import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const topicValidationRules = {
  name: [validasaur.required, validasaur.minLength(1)],
};

const getTopicData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    name: params.get("name"),
  };
};

const addTopic = async ({ request, response, state, user, render }) => {
  const topicData = await getTopicData(request);
  const [passes, errors] = await validasaur.validate(
    topicData,
    topicValidationRules,
  );

  if (!passes) {
    topicData.validationErrors = errors;
    render("topics.eta", {
      validationErrors: errors,
      name: topicData.name,
      user: await state.session.get("user"),
      topics: await userService.findTopics(),
    });
  } else {
    await userService.addTopic(
      user.id,
      topicData.name,
    );
    response.redirect("/topics");
  }
};

const deleteTopic = async ({ state, response, params }) => {
  const user2 = await state.session.get("user");
  const userFromDatabase = await userService.findUserByEmail(
    user2.email,
  );
  const user = userFromDatabase[0];
  if (user.admin == false) {
    response.redirect("/topics");
  } else {
    const questions = await userService.findQuestionsByTopicId(params.tId);
    questions.forEach((element) => {
      userService.deleteUserAnswers(element.id);
      userService.deleteAnswerOptions(element.id);
    });
    await userService.deleteQuestions(params.tId);
    await userService.deleteTopic(params.tId);

    response.redirect("/topics");
  }
};

const showTopics = async ({ render, state }) => {
  render("topics.eta", {
    user: await state.session.get("user"),
    topics: await userService.findTopics(),
  });
};

export { addTopic, deleteTopic, showTopics };
