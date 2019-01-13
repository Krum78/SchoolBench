import { HomePage } from './home.po';
import { CoursesPage } from './courses.po';
import { LogOutPage } from "./logout.po";

export class CoursesTestSuite {

  run() {
    describe('Courses test suite',
      () => {
        let homePage: HomePage;
        let coursesPage: CoursesPage;
        let logOutPage: LogOutPage;

        beforeEach(() => {
          homePage = new HomePage();
          coursesPage = new CoursesPage();
          logOutPage = new LogOutPage();
        });

        it('should be logged in',
          () => {
            expect(homePage.isLoggedIn());
          });

        it('go to courses',
          () => {
            coursesPage.navigateTo();
            expect(coursesPage.getCoursesHeading()).toEqual('Courses');
            expect(coursesPage.isListLoaded());
          });

        it('list of courses loaded',
          () => {
            expect(coursesPage.isListLoaded());
          }
        );

        it('Log out',
          () => {
            logOutPage.doLogOut();
            logOutPage.doReturn();
            expect(homePage.getMainHeading()).toEqual('Hello, world!');
          }
        );
      });
  }
}
