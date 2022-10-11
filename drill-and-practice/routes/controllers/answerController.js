import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const topicValidationRules = {
  option_text: [validasaur.required, validasaur.minLength(1)],
};

const getTopicData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    option_text: params.get("option_text"),
  };
};

const addAnswer = async ({ request, response, params, render }) => {
  const body = request.body({ type: "form" });
  const requestParams = await body.value;
  let value = requestParams.get("is_correct");
  if (value === "on") {
    value = true;
  } else {
    value = false;
  }
  const topicData = await getTopicData(request);
  const [passes, errors] = await validasaur.validate(
    topicData,
    topicValidationRules,
  );
  if (!passes) {
    topicData.validationErrors = errors;
    const question = await userService.findQuestion(params.qId);
    render("answer.eta", {
      validationErrors: errors,
      question: question,
      name: topicData.option_text,
      answers: await userService.findQuestionAnswersById(params.qId),
      tId: params.tId,
      qId: params.qId,
    });
  } else {
    await userService.addAnswer(
      params.qId,
      requestParams.get("option_text"),
      value,
    );

    response.redirect("/topics/" + params.tId + "/questions/" + params.qId);
  }
};

const deleteAnswer = async ({ response, params }) => {
  await userService.deleteUserAnswersByOptionId(params.qId, params.oId);
  await userService.deleteAnswer(params.oId, params.qId);

  response.redirect("/topics/" + params.tId + "/questions/" + params.qId);
};

const showAnswers = async ({ render, params }) => {
  const question = await userService.findQuestion(params.qId);
  render("answer.eta", {
    answers: await userService.findQuestionAnswersById(params.qId),
    tId: params.tId,
    qId: params.qId,
    question: question,
  });
};

export { addAnswer, deleteAnswer, showAnswers };
