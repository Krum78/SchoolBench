import { HomePage } from './home.po';
import { LogInPage } from './login.po';

export class LoginTestSuite {

  run() {
    describe('Login test set',
      () => {
        let homePage: HomePage;
        let logInPage: LogInPage;
        
        beforeEach(() => {
          homePage = new HomePage();
          logInPage = new LogInPage();
        });

        it('should display welcome message',
          () => {
            homePage.navigateTo();
            expect(homePage.getMainHeading()).toEqual('Hello, world!');
          });

        it('do login',
          () => {
            logInPage.navigateTo();
            if (logInPage.requiresUserCredantials())
              logInPage.doLogin();
          });

        it('should display welcome message',
          () => {
            homePage.navigateTo();
            expect(homePage.getMainHeading()).toEqual('Hello, world!');
          });

        it('should be logged in',
          () => {
            expect(homePage.isLoggedIn());
          });
      });
  }
}
