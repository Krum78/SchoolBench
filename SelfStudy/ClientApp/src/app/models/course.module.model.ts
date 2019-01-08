import { ModelBase } from "./model.base";


export class CourseModuleModel extends ModelBase {
  courseId: number;
  name: string;
  description: string;
  data: string;
  contentLink: string;
  isLink: boolean;
}
