import * as userService from "../../services/userService.js";

const showQuiz = async ({ render }) => {
  render("quiz.eta", { topics: await userService.findTopics(), errors: "" });
};

const showQuizQuestions = async ({ params, response, render }) => {
  const result = await userService.findRandQuestion(params.tId);
  if (result && result.length > 0) {
    response.redirect("/quiz/" + params.tId + "/questions/" + result[0].id);
  } else {
    render("quiz.eta", {
      topics: await userService.findTopics(),
      errors: "So far there are no questions for the topic that you clicked!",
    });
  }
};

const showQuizAnswers = async ({ render, params }) => {
  render("quizAnswers.eta", {
    answers: await userService.findQuestionAnswersById(params.qId),
    question: await userService.findQuestion(params.qId),
  });
};

const showCorrect = ({ render, params }) => {
  render("correct.eta", { tId: params.tId });
};

const showIncorrect = async ({ render, params }) => {
  render("incorrect.eta", {
    answer: await userService.findRightAnswer(params.qId),
    tId: params.tId,
  });
};

const checkAnswer = async ({ state, response, params }) => {
  const user = await state.session.get("user");
  await userService.saveAnswer(user.id, params.qId, params.oId);
  const result = await userService.checkAnswer(params.oId);
  if (result[0].is_correct === true) {
    response.redirect(
      "/quiz/" + params.tId + "/questions/" + params.qId + "/correct",
    );
  } else {
    response.redirect(
      "/quiz/" + params.tId + "/questions/" + params.qId + "/incorrect",
    );
  }
};

export {
  checkAnswer,
  showCorrect,
  showIncorrect,
  showQuiz,
  showQuizAnswers,
  showQuizQuestions,
};
