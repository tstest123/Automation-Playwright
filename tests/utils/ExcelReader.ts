import * as  XLSX from 'xlsx';
import * as path from 'path';
import * as  fs from 'fs';
import { config } from '../../config/env';

export class ExcelReader{
   static getCellData(sheetName:string,row:number,column:number) :any{
   const filePath='config/testdata/data.xlsx';
    console.log(`Reading excel from :`,filePath);

    if(!fs.existsSync(filePath)){
    throw new Error(`Excel file not found: ${filePath}`);     }

     const workbook=XLSX.readFile(filePath);
     const worksheet=workbook.Sheets[sheetName];

     if(!worksheet){
      throw new Error(
         `Sheet "${sheetName}" not found.Available sheets: ${workbook.SheetNames.join(', ')}`
      );
   }
     const data:any[][]=XLSX.utils.sheet_to_json(worksheet,{header:1});
     console.log(`Excel data:`,data);

     if(!data[row]){
      throw new Error(`Row ${row} not found in sheet "${sheetName}"`);
     }
     return data[row][column];       
       
    }
   } 

