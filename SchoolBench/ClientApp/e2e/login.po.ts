import { browser, by, element } from 'protractor';

export class LogInPage {

  static readonly userLogin = 'user';
  static readonly userPwd = 'pwd';

  navigateTo() {
    browser.ignoreSynchronization = true;
    return browser.get('/login');
  }

  requiresUserCredantials() {

    if (element(by.id('Username')).isPresent() && element(by.id(('Password'))).isPresent())
      return true;

    return false;
  }

  doLogin() {
    element(by.id('Username')).sendKeys(LogInPage.userLogin);
    element(by.id(('Password'))).sendKeys(LogInPage.userPwd);
    element(by.id('RememberLogin')).click();

    element(by.buttonText('Login')).click();
  }
}
