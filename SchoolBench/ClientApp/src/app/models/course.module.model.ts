import { ModelBase } from "./model.base";


export class CourseModuleModel extends ModelBase {
  courseId: number;
  name: string;
  description: string;
  content: string;
  contentLink: string;
  isLink: boolean;
}
