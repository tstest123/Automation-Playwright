   import {Given,When,Then} from '@cucumber/cucumber';
    import { expect,Page}from '@playwright/test';
    import  {CompletingCensusPage} from '../pages/CompletingCensusPage';

                
        Given('I am on Census Form page1 {string}', async function (expectedHeaderPage1) {
         
         this.completingCensusPage=new CompletingCensusPage(this.page);         
         await this.page.waitForLoadState('networkidle');       
         await this.completingCensusPage.verifyLoginSuccess(expectedHeaderPage1);       
        
        });
   
        Then('I verify the address {string} is displayed', async function (expectedAddress) {
        await this.completingCensusPage.verifyAddress(expectedAddress);  
         });

        Then('User clicks Yes button', async function () {
         await this.completingCensusPage.clickOnYesButton();   
         });

         Given('User clicks Next', async function () {
         await this.page.waitForTimeout(1000);
         await this.completingCensusPage.clickOnNextButton();   
          //await browser.close();
         });

       Then('I verify that page2 {string} is displayed', async function (expectedHeaderPage2) {
        await this.page.waitForTimeout(1000);
       await this.completingCensusPage.verifyPageHeader(expectedHeaderPage2); 
        });


