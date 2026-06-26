import {expect,Page,Locator}from '@playwright/test';
export class CompletingCensusPage
{
  private page:Page;
  private headerPage1Locator:Locator;
  private headerLocatorPage2:Locator;
  private headerLocatorPage3:Locator;
  private addressText:Locator;
  private yesButton:Locator;
  private nextButton:Locator;

    constructor(page:Page)
    {
    this.page=page;
    this.headerPage1Locator=page.locator('//div[contains(@class,"question-wording mb-3 fw-bold")]/span');
    this.headerLocatorPage2=page.locator('//div[contains(@class,"question-wording")]/span');    
    this.headerLocatorPage3=page.locator('//div[contains(@class,"question-wording")]/span');

    this.addressText=page.locator('Label.form-label.d-block span');  
    this.yesButton=page.getByRole('radio', { name: 'Yes' });
    this.nextButton=page.getByRole('button', { name: 'Next >' });
    }  

async verifyLoginSuccess(expectedHeaderPage1:string){
//await expect(this.successMessage).toHaveText('2026 Census Test');
const actualHeaderPage1=await  this.headerPage1Locator.textContent();
 console.log("Extracted Page1 Header:", actualHeaderPage1);
 console.log("Expected Header Page1:", expectedHeaderPage1);
 //await expect(this.headerLocator).toHaveText(expectedHeader);
expect(actualHeaderPage1?.trim()).toBe(expectedHeaderPage1);
}

//Verify Address
async getAddress(){
 return await this.addressText.innerText();
}
async verifyAddress(expectedAddress:string ){
await expect(this.addressText).toHaveText(expectedAddress);
}

//Verify pageHeader Page2
async verifyPageHeader(expectedHeaderPage2:string){
 const actualHeaderPage2=await  this.headerLocatorPage2.textContent();
 console.log("Extracted Header Page2:", actualHeaderPage2);
 console.log("Expected Header: Page2:", expectedHeaderPage2);
 //await expect(this.headerLocator).toHaveText(expectedHeader);
expect(actualHeaderPage2?.trim()).toBe( expectedHeaderPage2);
}


//Verify pageHeader Page3
async verifyPageHeaderPage3(expectedHeaderPage3:string){
 const actualHeaderPage3=await  this.headerLocatorPage3.textContent();
 console.log("Extracted Header Page3:", actualHeaderPage3);
 console.log("Expected Header: Page3:", expectedHeaderPage3);
 //await expect(this.headerLocator).toHaveText(expectedHeader);
expect(actualHeaderPage3?.trim()).toBe( expectedHeaderPage3);
} 






async clickOnYesButton(){
await this.yesButton.click();
}

async clickOnNextButton(){
await this.nextButton.click();
}





}


