import { browser, logging } from 'protractor';
import { AppPage, courseAddPO } from './app.po';

describe('Secretariaat - Course overview page', () => {
  let page: AppPage;

  beforeEach(async () => {
    page = new AppPage();
    await page.navigateTo('http://localhost:4200/secretariaat')
  });

  it('should display Weekoverzicht message', async () => {
    let result = await page.getTitleText();
    expect(result.substring(0, 22)).toBe(`Weekoverzicht van week`);
  });



  // afterEach(async () => {
  //   // Assert that there are no errors emitted from the browser
  //   const logs = await browser.manage().logs().get(logging.Type.BROWSER);
  //   expect(logs).not.toContain(jasmine.objectContaining({
  //     level: logging.Level.SEVERE,
  //   } as logging.Entry));
  // });  
});




describe('Coordinatoren - Course overview page', () => {
  let page: courseAddPO;

  beforeEach(async () => {
    page = new courseAddPO();
    await page.navigateTo('http://localhost:4200/coördinatoren')

  });

  it('should display Upload message', async () => {
    expect(await page.getTitleText()).toBe('Upload');
  });

  it('should find a dsiabled button', async () => {
    let result = await page.findButton();

    expect(result).toBeTruthy();    
  });
  
  // afterEach(async () => {
  //   // Assert that there are no errors emitted from the browser
  //   const logs = await browser.manage().logs().get(logging.Type.BROWSER);
  //   expect(logs).not.toContain(jasmine.objectContaining({
  //     level: logging.Level.SEVERE,
  //   } as logging.Entry));
  // });  
});