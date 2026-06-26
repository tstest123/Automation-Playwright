// generate-report.ts
(async()=>{

const { generate }=await import ('multiple-cucumber-html-reporter');

generate({
  jsonDir: 'test_results',
  reportPath: './',
  metadata: {
    browser: {
      name: "chrome",
      version: "latest",
    },
    device: "Local test machine",
    platform: {
      name: "osx",
      version: "Sonoma",
    },
  },
  customData: {
    title: "Playwright Test Report",
    data: [
      { label: "Project", value: "My Awesome Project" },
      { label: "Release", value: "1.0.0" },
      { label: "Execution", value: "GitHub Actions" },
    ],
  },
});