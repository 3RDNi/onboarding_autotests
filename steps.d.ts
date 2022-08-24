/// <reference types='codeceptjs' />
type loginPage = typeof import('./loginPage');
type homePage = typeof import('./homePage');
type KaskoForm = typeof import('./pages/KaskoForm');
type CustomHelper = import('./CustomHelper');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, loginPage: loginPage, homePage: homePage , KaskoForm: KaskoForm }
  interface Methods extends Playwright, CustomHelper {}
  interface I extends WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }

}
