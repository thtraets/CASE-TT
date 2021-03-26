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

  // async countInstancesReceivedFromApi(){  
  //   // return fetch('https://localhost:44340/api/courseinstances/week')
  //   //     .then(response => response.json()).then(resolve)

  //   let instances = [];

  //   fetch('https://localhost:44340/api/courseinstances/week')
  //     .then(response => response.json())
  //     .then(data => instances = data);

  //   return instances;
  // }

  async countTableRows(){
    return (await element.all(by.tagName("tr")));
  }

}



export class courseAddPO {


  // async countProducts() : Promise<number> {
  //     return (await element.all(by.tagName('tr'))).length;
  // }

  // async enterName(name: string){
  //     await element(by.id('input-name')).sendKeys(name);
  // }

  // async enterPrice(price: number){
  //     await element(by.id('input-price')).sendKeys(price);
  // }

  // async enterPhoto(photo: string){
  //     await element(by.id('input-photo')).sendKeys(photo);
  // }

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


// describe('Main page', () =>{

//   it('should return a new row after adding a new product', async () =>{
//       await browser.get('http://localhost:4200');

//       const initialTr = await element.all(by.tagName('tr'));

//       await element(by.id('input-name')).sendKeys('test naampje sinas');
//       await element(by.id('input-price')).sendKeys(14.73);
//       await element(by.id('input-photo')).sendKeys('https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQbmsznlFu88ihFEXg1lpOLcxadTVtLTCtSHi4juz6hrEYs1nPC_vkVgC0fmwuWq6CR6kiXxaFtBrB79EZyDQtBu_2QUIpHDYUx&usqp=CAc');

//       await element(by.id('submitModelDriven')).click();

      
//       const arr = await element.all(by.tagName('tr'));

//       expect(arr.length).toBe(initialTr.length + 1);
//   });

// });