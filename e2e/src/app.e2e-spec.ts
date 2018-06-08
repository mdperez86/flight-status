import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Flight Status as card title', () => {
    page.navigateTo();
    expect(page.getCardTitle()).toEqual('Flight Status');
  });
});
