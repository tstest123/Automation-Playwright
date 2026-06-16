  import {Given,When,Then,After} from "@cucumber/cucumber";
  import {chromium,expect,Page,Browser} from '@playwright/test';   
  import {LoginPage} from '../pages/LoginPage';
  import {ExcelReader} from '../utils/ExcelReader';
    import {config}  from '../../config/env';
         /*
         const path=require('path');
         const XLSX=require('xlsx');            
         const userDataFile=path.join(__dirname,'..','..','testdata','data.xlsx');
          */

         let browser:Browser;
         let page:Page;
                   
         Given('I am on the login page', async function () {
           
          this.loginPage=new LoginPage(this.page);
          const targetUrl=config.UAT.baseURL;
         //await this.loginPage.navigateToUrl("https://access.uat.dice.census.gov/2026/authcode");
          this.loginPage=new LoginPage(this.page);
          await this.loginPage.navigateToUrl(targetUrl);

            });
         
         When('I enter Census ID', async function () {
         await this.page.waitForLoadState('networkidle');
         const censusId=ExcelReader.getCellData('LoginData',1,0);
         console.log('Census ID from Excel:',censusId,{timeout:15000});
         await this.loginPage.enterCensusId(censusId);   
       
         // await this.loginPage.enterCensusId("6RFWZWZ3VC4H");
         await this.page.waitForLoadState('networkidle');
          });
      
          When('Click on Log in button', async function () {
         await this.loginPage.clickOnLoginButton();
         });
                   
        Then('Login should be successful.{string} text is displayed', async function (expectedPage1Header) {
         await this.page.waitForLoadState('networkidle');       
         await this.loginPage.verifyLoginSuccess(expectedPage1Header);
         });
