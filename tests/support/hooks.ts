import { Before, BeforeAll, After, AfterAll, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium,Browser,BrowserContext,Page } from "playwright/test";
 import {ExcelReader} from '../utils/ExcelReader';
 import {LoginPage} from '../pages/LoginPage';
  import {config}  from '../../config/env';
  import {invokeBrowser} from '../../config/browsers/browserManager';


setDefaultTimeout(60*2000);
let browser:any
//let browser:Browser;
let censusId :string;
let baseURL: string;

BeforeAll(async ()=>{
  browser=await invokeBrowser();


//browser=await chromium.launch({
//headless:false,slowMo:1000,
//});

//Load census ID from excel
 censusId=ExcelReader.getCellData('LoginData',1,0);
 baseURL=config.UAT.baseURL;
console.log("Census ID from Excel:",censusId);
console.log("Base URL:",baseURL);
});

Before(async function(){
this.context=await browser.newContext();
this.page=await this.context.newPage();
this.loginPage=new LoginPage(this.page);

await this.loginPage.navigateToUrl(baseURL);
await this.page.waitForLoadState('networkidle');

await this.loginPage.enterCensusId(censusId);
await this.page.waitForLoadState('networkidle');

console.log("Navigation and Census ID entry completed in Before()");
await this.loginPage.clickOnLoginButton();
const expectedHeader="Are you completing the 2026 Census Test for:";
await this.loginPage.verifyLoginSuccess(expectedHeader);

console.log("Login completed successfully in Before()");

});

After(async function({pickle,result}){
 
 if(result?.status===Status.FAILED){
const images=await this.page.screenshot({path:'./test-result/screenshot/${pickle.name}.png',type:'png'});
await this.attach(images,"image/png");  
 }   
await this.context.close();
});
  

/*
AfterAll(async()=>{
if(browser){
await browser.close();
console.log("Browser closed");
}

});
*/
