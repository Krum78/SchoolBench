import { ModelBase } from "./model.base";


export class AnswerOptionModel extends ModelBase {
  questionId: number;
  itemOrder: number;
  isCorrect: boolean;
  text: string;
}
