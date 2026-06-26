import {LaunchOptions,chromium,firefox,webkit,Browser,BrowserType} from "playwright";

const options:LaunchOptions={
    headless:false,
};


export async function invokeBrowser(){
    const browserType=(process.env.BROWSER || "chromium");
  
    switch (browserType){
        case "chromium":
            case "chrome":
           return chromium.launch(options);      


            case "firefox":
          return  firefox.launch(options);
                
            case "webkit":
          return  webkit.launch(options);                 
    }      

};