import { ModelBase } from "./model.base";


export class TestItemModel extends ModelBase {
  testId: number;
  itemOrder: number;
  type: number;
  question: string;
}
