import { LoginTestSuite } from './login.suite';
import { CoursesTestSuite } from './courses.suite';

let ts1 = new LoginTestSuite();
ts1.run();

let ts2 = new CoursesTestSuite();
ts2.run();
