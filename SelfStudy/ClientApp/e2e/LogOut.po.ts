import { browser, by, element, ExpectedConditions } from 'protractor';

export class LogOutPage {
  doLogOut() {
    browser.ignoreSynchronization = true;
    return browser.get('/logout');
  }

  doReturn() {
    var EC = ExpectedConditions;
    browser.wait(EC.presenceOf(element(by.css('.PostLogoutRedirectUri'))), 5000);

    if (element(by.css('.PostLogoutRedirectUri')).isPresent())
      element(by.css('.PostLogoutRedirectUri')).click();
  }
}
