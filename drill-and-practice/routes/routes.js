import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as questionsController from "./controllers/questionsController.js";
import * as answerController from "./controllers/answerController.js";
import * as quizController from "./controllers/quizController.js";
import * as topicApi from "./apis/topicApi.js";

const router = new Router();

router.get("/", mainController.showMain);
router.get("/quiz", quizController.showQuiz);
router.get("/quiz/:tId", quizController.showQuizQuestions);
router.get("/quiz/:tId/questions/:qId", quizController.showQuizAnswers);
router.post(
  "/quiz/:tId/questions/:qId/options/:oId",
  quizController.checkAnswer,
);
router.get("/quiz/:tId/questions/:qId/correct", quizController.showCorrect);
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.showIncorrect);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLogin);
router.post("/auth/login", loginController.processLogin);

router.get("/topics", topicController.showTopics);
router.post("/topics", topicController.addTopic);

router.get("/topics/:tId", questionsController.showTopicsQuestions);
router.post("/topics/:tId/questions", questionsController.addTopicsQuestion);

router.post("/topics/:tId/delete", topicController.deleteTopic);

router.get("/topics/:tId/questions/:qId", answerController.showAnswers);
router.post(
  "/topics/:tId/questions/:qId/delete",
  questionsController.deleteQuestion,
);
router.post("/topics/:tId/questions/:qId/options", answerController.addAnswer);
router.post(
  "/topics/:tId/questions/:qId/options/:oId/delete",
  answerController.deleteAnswer,
);

router.get("/api/questions/random", topicApi.findRandomQuestion);
router.post("/api/questions/answer", topicApi.listAvailableTopics);

export { router };
