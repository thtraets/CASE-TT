import { resolve } from 'node:path';
import { browser, by, element } from 'protractor';

export class courseOverViewPO {


  async navigateTo(url){
    await browser.get(url);
  }

  async getTitleText(): Promise<string> {
    return element(by.tagName('h1')).getText();
  }

  async findTable(){
    return (await element.all(by.className("table table-hover")));
  }

  async countTableRows(){
    return (await element.all(by.tagName("tr")));
  }

}



export class courseAddPO {

  async navigateTo(url){
    await browser.get(url);
  }

  async getTitleText(): Promise<string> {
    return element(by.tagName('h1')).getText();
  }

  async findButton(){
    return (await element.all(by.className("btn btn-light border")));
  }

  async submit(){
      await element(by.className("btn btn-light border")).click();
  }
}

