import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const topicValidationRules = {
  question_text: [validasaur.required, validasaur.minLength(1)],
};

const getTopicData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    question_text: params.get("question_text"),
  };
};

const addTopicsQuestion = async (
  { request, response, state, params, render },
) => {
  const body = request.body({ type: "form" });
  const requestParams = await body.value;
  const user = await state.session.get("user");

  const topicData = await getTopicData(request);
  const [passes, errors] = await validasaur.validate(
    topicData,
    topicValidationRules,
  );

  if (!passes) {
    topicData.validationErrors = errors;
    render("question.eta", {
      validationErrors: errors,
      name: topicData.question_text,
      questions: await userService.findQuestionsByTopicId(params.tId),
      user: params.tId,
    });
  } else {
    await userService.addQuestion(
      user.id,
      params.tId,
      requestParams.get("question_text"),
    );

    response.redirect("/topics/" + params.tId);
  }
};

const deleteQuestion = async ({ response, params }) => {
  await userService.deleteQuestion(params.qId);
  response.redirect("/topics/" + params.tId);
};

const showTopicsQuestions = async ({ render, params }) => {
  render("question.eta", {
    questions: await userService.findQuestionsByTopicId(params.tId),
    user: params.tId,
  });
};

export { addTopicsQuestion, deleteQuestion, showTopicsQuestions };
