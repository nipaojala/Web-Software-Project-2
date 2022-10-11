import { executeQuery } from "../database/database.js";

const addUser = async (email, password) => {
  await executeQuery(
    `INSERT INTO users
      (email, password)
        VALUES ($1, $2)`,
    email,
    password,
  );
};

const findUserByEmail = async (email) => {
  const result = await executeQuery(
    "SELECT * FROM users WHERE email = $1",
    email,
  );

  return result.rows;
};

const findQuestionsByTopicId = async (tId) => {
  const result = await executeQuery(
    "SELECT * FROM questions WHERE topic_id = $1",
    tId,
  );

  return result.rows;
};

const findTopicByName = async (name) => {
  const result = await executeQuery(
    "SELECT * FROM topics WHERE name = $1",
    name,
  );

  return result.rows;
};

const findRandQuestion = async (tId) => {
  const result = await executeQuery(
    "SELECT * FROM questions WHERE topic_id = $1 ORDER BY RANDOM() LIMIT 1",
    tId,
  );

  return result.rows;
};

const findQuestionAnswersById = async (qId) => {
  const result = await executeQuery(
    "SELECT * FROM question_answer_options WHERE question_id = $1",
    qId,
  );

  return result.rows;
};

const addTopic = async (userId, name) => {
  await executeQuery(
    `INSERT INTO topics
      (user_id, name)
        VALUES ($1, $2)`,
    userId,
    name,
  );
};

const findQuestion = async (qId) => {
  const result = await executeQuery(
    "SELECT * FROM questions WHERE id = $1",
    qId,
  );

  return result.rows;
};

const deleteTopic = async (tId) => {
  await executeQuery(
    "DELETE FROM topics WHERE id = $1",
    tId,
  );
};

const deleteQuestions = async (tId) => {
  await executeQuery(
    "DELETE FROM questions WHERE topic_id = $1",
    tId,
  );
};

const deleteQuestion = async (qId) => {
  await executeQuery(
    `DELETE FROM questions
      WHERE id = $1`,
    qId,
  );
};

const deleteAnswer = async (oId, qId) => {
  await executeQuery(
    `DELETE FROM question_answer_options
      WHERE id = $1 AND question_id = $2`,
    oId,
    qId,
  );
};

const addQuestion = async (userId, tId, question) => {
  await executeQuery(
    `INSERT INTO questions
      (user_id, topic_id, question_text)
        VALUES ($1, $2, $3)`,
    userId,
    tId,
    question,
  );
};

const addAnswer = async (qId, answer, boolean) => {
  await executeQuery(
    `INSERT INTO question_answer_options
      (question_id, option_text, is_correct)
        VALUES ($1, $2, $3)`,
    qId,
    answer,
    boolean,
  );
};

const findTopics = async () => {
  const result = await executeQuery(
    "SELECT * FROM topics ORDER BY name ASC",
  );

  return result.rows;
};

const deleteAnswerOptions = async (qId) => {
  await executeQuery(
    "DELETE FROM question_answer_options WHERE question_id = $1",
    qId,
  );
};

const checkAnswer = async (oId) => {
  const result = await executeQuery(
    "SELECT * FROM question_answer_options WHERE id = $1",
    oId,
  );

  return result.rows;
};

const saveAnswer = async (userId, qId, oId) => {
  const result = await executeQuery(
    "INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES ($1, $2, $3)",
    userId,
    qId,
    oId,
  );

  return result.rows;
};

const findRightAnswer = async (qId) => {
  const result = await executeQuery(
    "SELECT * FROM question_answer_options WHERE question_id = $1 AND is_correct = true",
    qId,
  );

  return result.rows;
};

const findRandQuestionToApi = async () => {
  const result = await executeQuery(
    "SELECT * FROM questions ORDER BY RANDOM() LIMIT 1",
  );

  return result.rows;
};

const findQuestions = async () => {
  const result = await executeQuery(
    "SELECT * FROM questions",
  );

  return result.rows;
};

const findUserAnswers = async () => {
  const result = await executeQuery(
    "SELECT * FROM question_answers",
  );

  return result.rows;
};

const deleteUserAnswers = async (qId) => {
  await executeQuery(
    "DELETE FROM question_answers WHERE question_id = $1",
    qId,
  );
};

const deleteUserAnswersByOptionId = async (qId, oId) => {
  await executeQuery(
    "DELETE FROM question_answers WHERE question_id = $1 AND question_answer_option_id = $2",
    qId,
    oId,
  );
};

export {
  addAnswer,
  addQuestion,
  addTopic,
  addUser,
  checkAnswer,
  deleteAnswer,
  deleteAnswerOptions,
  deleteQuestion,
  deleteQuestions,
  deleteTopic,
  deleteUserAnswers,
  deleteUserAnswersByOptionId,
  findQuestion,
  findQuestionAnswersById,
  findQuestions,
  findQuestionsByTopicId,
  findRandQuestion,
  findRandQuestionToApi,
  findRightAnswer,
  findTopicByName,
  findTopics,
  findUserAnswers,
  findUserByEmail,
  saveAnswer,
};
