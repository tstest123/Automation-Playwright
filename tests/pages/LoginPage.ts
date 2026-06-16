import {expect,Page,Locator}from '@playwright/test';

 export class LoginPage
{

  private page:Page;
  private idInput:Locator;
  private loginButton:Locator;
  private headerPage1Locator:Locator


    constructor(page:Page)
    {
    this.page=page;
    this.idInput=page.locator("//*[@id='first_input']");
    this.loginButton=page.getByRole('button', { name: 'auth submit button' });
    this.headerPage1Locator=page.locator('//div[contains(@class,"question-wording mb-3 fw-bold")]/span');
    }
    async navigateToUrl(url:string){
    await this.page.goto(url);
    }

 async enterCensusId(censusid:string ){
 await this.idInput.type(censusid);
}

 async clickOnLoginButton(){
 await this.loginButton.click();
}
async verifyLoginSuccess(expectedPage1Header:string){
//await expect(this.successMessage).toHaveText('2026 Census Test');
const actualPage1Header=await  this.headerPage1Locator.textContent();
 console.log("Extracted Page1 Header:", actualPage1Header);
 console.log("Expected Page1Header:", expectedPage1Header);
 //await expect(this.headerLocator).toHaveText(expectedHeader);
expect(actualPage1Header?.trim()).toBe(expectedPage1Header);
}
}



