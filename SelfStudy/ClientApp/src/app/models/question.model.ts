import { ModelBase } from "./model.base";
import { AnswerOptionModel } from "./answer.option.model";


export class QuestionModel extends ModelBase {
  testId: number;
  itemOrder: number;
  type: number;
  question: string;
  answerOptions: AnswerOptionModel[];
}
