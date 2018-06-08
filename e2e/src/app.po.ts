import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getCardTitle() {
    return element(by.css('mat-card-title')).getText();
  }
}
