import * as userService from "../../services/userService.js";

const findRandomQuestion = async ({ response }) => {
  const randQuestion = await userService.findRandQuestionToApi();
  const arr2 = [];
  if (!randQuestion[0]) {
    response.body = {};
  } else {
    const answers = await userService.findQuestionAnswersById(
      randQuestion[0].id,
    );
    let i = 0;
    answers.forEach((element) => {
      const person = { optionId: element.id, optionText: element.option_text };
      arr2.push(person);
      i++;
    });

    response.body = {
      questionId: randQuestion[0].id,
      questionText: randQuestion[0].question_text,
      answerOptions: arr2,
    };
  }
};

const listAvailableTopics = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const params = await body.value;
  const isCOrrect = await userService.checkAnswer(params.optionId);
  response.body = { correct: isCOrrect[0].is_correct };
};

export { findRandomQuestion, listAvailableTopics };
