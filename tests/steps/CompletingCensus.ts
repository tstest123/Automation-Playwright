   import {Given,When,Then} from '@cucumber/cucumber';
    import { expect,Page}from '@playwright/test';
    import  {CompletingCensusPage} from '../pages/CompletingCensusPage';
    import {ExcelReader} from '../utils/ExcelReader';

                
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

       Then('click Help link', async function() {
        //await this.page.getByRole('button', { name: 'Help' }).click();         
         await this.completingCensusPage.clickOnHelpLink();
       });

         Then('verify the text', async function () {
          //Read from UI
        const helpSection=this.page.locator('#component170');
        await helpSection.waitFor({state:'visible'});
        const UIHelpText=await helpSection.textContent();
        console.log('Help sectiontext:',UIHelpText) ;   
       
        //Read from excel
        await this.page.waitForLoadState('networkidle');
         const ExpectedHelpTextPage2=ExcelReader.getCellData('ISRData',1,0);
         console.log('HelpTextPage2 from Excel:',ExpectedHelpTextPage2,{timeout:15000});
         
         //Compare both
         expect(UIHelpText?.trim()).toContain(ExpectedHelpTextPage2.trim());
});


        
       


                
         //Verify text on More Information window

         