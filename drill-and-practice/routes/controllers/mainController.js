import * as userService from "../../services/userService.js";

const showMain = async ({ render }) => {
  const topic = await userService.findTopics();
  const question = await userService.findQuestions();
  const answers = await userService.findUserAnswers();
  render("main.eta", {
    topics: topic,
    questions: question,
    answersFromUsers: answers,
  });
};

export { showMain };
