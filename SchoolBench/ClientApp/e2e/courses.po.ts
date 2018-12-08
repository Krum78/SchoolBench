import { browser, by, element } from 'protractor';

export class CoursesPage {
  navigateTo() {
    return browser.get('/student/courses');
  }

  getCoursesHeading() {
    return element(by.css('app-root h1')).getText();
  }

  isListLoaded() {
    return element(by.css('courses-item')).isPresent();
  }
}
