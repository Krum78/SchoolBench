import { browser, by, element } from 'protractor';

export class HomePage {
  navigateTo() {
    return browser.get('/');
  }

  getMainHeading() {
    return element(by.css('app-root h1')).getText();
  }

  isLoggedIn() {
    return element(by.linkText('Log Out')).isPresent();
  }
}
