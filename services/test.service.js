const mongoose = require('mongoose');
const axios = require('axios');
const AnswerModel = require('../models/answer.model');
const TestModel = require('../models/test.model');
const EnvironmentModel = require('../models/environment.model');
const TestDto = require('../dtos/test.dto');
const AnswerDto = require('../dtos/answer.dto');

class TestService {
  async getTest() {
    const isGenerateTestAvailable = (await EnvironmentModel.findOne({ key: 'generateTest' }))
      ?.value;

    console.log('generate new test:', isGenerateTestAvailable);

    if (isGenerateTestAvailable) {
      const testString = await this._generateTest();

      const tests = this._parseTest(testString);

      for (let test of tests) {
        await TestModel.create({
          question: test.question,
          correctAnswer: test.correctAnswer,
          answers: test.answers.map((answer) => answer._id),
        });

        for (let answer of test.answers) {
          await AnswerModel.create(answer);
        }
      }

      return {
        questions: tests.map((test) => ({
          ...new TestDto(test),
          answers: test.answers.map((answer) => new AnswerDto(answer)),
        }))
      };
    } else {
      const availableCountTests = await TestModel.countDocuments({});
      const countTests = 5;

      let skipCount = Math.fround(Math.random() * availableCountTests);

      if (skipCount > availableCountTests - countTests) {
        skipCount -= countTests;
      }

      const tests = await TestModel.find().skip(skipCount).limit(countTests).populate('answers');

      return {
        questions: tests.map((test) => ({
          ...new TestDto(test),
          answers: test.answers.map((answer) => new AnswerDto(answer)),
        }))
      };
    }
  }

  async checkAnswers(tests = []) {
    const result = [];

    for (let test of tests) {
      const isAnswerCorrect = await this._checkAnswer(test.id, test.answerId);

      result.push({
        testId: test.id,
        answerId: test.answerId,
        isCorrect: isAnswerCorrect,
      });
    }

    return result;
  }

  async _checkAnswer(testId, answerId) {
    const test = await TestModel.findById(testId);
    return test.correctAnswer.toString() === answerId;
  }

  _parseTest(testString) {
    const [questionsString, answersString] = testString.split('Відповіді:');

    const questions = questionsString.split(/\d+\. /g).slice(1); // split by question number
    const correctAnswers = answersString.match(/(\d+: [А-Я,A-Z])/g).reduce((acc, curr) => {
      const [num, answer] = curr.split(': ');
      acc[num] = answer;
      return acc;
    }, {});

    return questions.map((q, i) => {
      const [question, ...answers] = q.split(/[А-Я,A-Z]\. /g);

      const answersWithId = answers.map((answer) => ({
        text: answer.replaceAll('\n', '').trim(),
        _id: new mongoose.Types.ObjectId(),
      }));

      const charCode = parseInt(correctAnswers[i + 1]?.charCodeAt(0));

      let minus;
      if (charCode > 1039) {
        minus = 1040;
      } else {
        minus = 65;
      }

      return {
        _id: new mongoose.Types.ObjectId(),
        question: question.replaceAll('\n', '').trim(),
        correctAnswer: answersWithId[charCode - minus]._id,
        answers: answersWithId,
      };
    });
  }

  async _generateTest() {
    return axios
      .post(
        `https://api.openai.com/v1/chat/completions`,
        {
          model: process.env.CHAT_GPT_MODEL,
          messages: [
            {
              role: 'user',
              content:
                "Придумай 5 запитаннь (з відповідями А, Б, В, Г) Тема: правил дорожнього руху. Контекст: Я учень, який планує здавати на права в Україні, придумай дуже рандомні питання, а не звичайні. Одразу після питань напиши відповіді, структура: '1. Питання \n А. Відповідь \n\n Відповіді: 1: А, 2: Б і тд.",
            },
          ],
          temperature: 0.8,
        },
        {
          headers: {
            Authorization: 'Bearer ' + process.env.CHAT_GPT_TOKEN,
          },
        },
      )
      .then(({ data }) => data.choices[0].message.content);
  }
}

module.exports = new TestService();
