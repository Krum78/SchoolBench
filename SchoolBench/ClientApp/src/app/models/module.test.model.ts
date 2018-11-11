import { ModelBase } from "./model.base";
import { QuestionModel } from "./question.model";


export class ModuleTestModel extends ModelBase {
  moduleId: number;
  name: string;
  description: string;
  questions: QuestionModel[];
}
