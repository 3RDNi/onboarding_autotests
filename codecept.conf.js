require('ts-node/register')
const { setHeadlessWhen } = require('@codeceptjs/configure');
const { bootstrap } = require('./presettings.ts');

// turn on headless mode when running with HEADLESS=true environment variable
// HEADLESS=true npx codecept run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './tests/**_test.ts',
  output: './output',
  helpers: {
    Playwright: {
      url: 'https://pwa.s3-website.tinkoff.ru/kasko-forms/storybook/iframe.html?id=kasko-uikitforms-desktop--default&viewMode=story',
      show: true,
      windowSize: '1200x900',
      browser: 'chromium'
    },
    CustomHelper: {
      require: './CustomHelper.ts'
    }
  },
  bootstrap,
  include: {
    loginPage: './loginPage.ts',
    homePage: './homePage.ts',
    KaskoForm: './pages/KaskoForm.ts'
  },
  name: 'typescript-boilerplate',
  plugins: {
    retryFailedStep: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    }
  }
}