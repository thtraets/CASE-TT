import { browser, logging } from 'protractor';
import { courseOverViewPO, courseAddPO } from './app.po';

describe('Secretariaat - Course overview page', () => {
  let page: courseOverViewPO;

  beforeEach(async () => {
  
    page = new courseOverViewPO();
    await page.navigateTo('http://localhost:4200/secretariaat')
  });

  it('should display Weekoverzicht message', async () => {
    let result = await page.getTitleText();
    expect(result.substring(0, 22)).toBe(`Weekoverzicht van week`);
  });

  it('should display a table for the results', async () => {
    let result = await page.findTable();    
    expect(result).toBeTruthy();
  });

  // TODO
    // Select and Upload file 


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });  
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

  it('should find a disabled button', async () => {
    let result = await page.findButton();

    expect(result).toBeTruthy();    
  });
  it('should be unable to click the disabled button', async () => {
    let result = await page.submit();

    expect(result).toBeFalsy();    
  });

  // TODO
    // Add check how many table rows appear and whether it matches courseinstanceService.getInstances()


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });  
});