import { HomePage } from './home.po';
import { CoursesPage } from './courses.po';

export class CoursesTestSuite {

  run() {
    describe('Login test set',
      () => {
        let homePage: HomePage;
        let coursesPage: CoursesPage;

        beforeEach(() => {
          homePage = new HomePage();
          coursesPage = new CoursesPage();
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
      });
  }
}
