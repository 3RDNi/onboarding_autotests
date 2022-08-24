Feature('Typescript Example');

Before(({ I}) => {
  I.amOnPage('/')
})

Scenario('Filling Step 1 with Locators',  ({ I}) => {
  I.fillField('Модель автомобиля', 'Ford Focus')
  I.waitForVisible('//*[@data-qa-type="uikit/dropdown.item.title"][text()="Ford Focus"]')
  I.click('//*[@data-qa-type="uikit/dropdown.item.title"][text()="Ford Focus"]')
  I.waitForVisible('//*[@data-qa-type="uikit/dropdown.item.title"][text()="Ford Focus 2018"]')
  I.click('//*[@data-qa-type="uikit/dropdown.item.title"][text()="Ford Focus 2018"]')

  I.waitForVisible('//*[@data-qa-type="uikit/inputAutocomplete.inputBox.label"][text()="Марка, модель, год"]')
  I.waitForVisible('//*[@name="carRef_model"][@value="Ford Focus, 2018"]')

  I.waitForVisible('//*[@data-qa-type="uikit/select.dropdown.item.title"][text()="1.5 (150.00 л.с.)"]')
  I.click('//*[@data-qa-type="uikit/select.dropdown.item.title"][text()="1.5 (150.00 л.с.)"]')

  I.waitForVisible('//*[@data-qa-type="uikit/select.value"][text()="1.5 (150.00 л.с.)"]')

  I.click('Регион использования')
  I.waitForVisible('//*[@data-qa-type="uikit/select.dropdown.item.title"][text()="Москва и МО"]')
  I.click('//*[@data-qa-type="uikit/select.dropdown.item.title"][text()="Москва и МО"]')

  I.waitForVisible('//*[@name="region"][@value="Москва и МО"]')

  I.click('//*[@data-qa-type="uikit/linkCheckbox.checkbox.input"]')
  I.click('//*[@data-qa-type="uikit/button.content"]')
  I.waitForVisible('//*[@data-qa-type="uikit/formRow.errorBlock"][text()="Для продолжения нужно согласие с условиями"]')

  I.click('//*[@data-qa-type="uikit/linkCheckbox.checkbox.input"]')
  I.dontSee('//*[@data-qa-type="uikit/formRow.errorBlock"][text()="Для продолжения нужно согласие с условиями"]')
  I.seeCheckboxIsChecked('//*[@data-qa-type="uikit/linkCheckbox.checkbox.input"]')
});

Scenario('Filling Step 1 and Step 2', ({ I, KaskoForm }) => {
  KaskoForm.FillingStep1()
  I.click('Далее')
  KaskoForm.FillingStep2()
});

Scenario('Отправка add_application после выбора модели автомобиля', ({ I , KaskoForm}) => {
  const modelDropdown = KaskoForm.suggestDropdown('Модель автомобиля')
  const engineDropdown = KaskoForm.selectDropdown('Двигатель')
  const engineValue = KaskoForm.selectValue()

  I.fillField('Модель автомобиля', 'Ford Focus')
  I.waitForVisible(modelDropdown.withText('Ford Focus'))
  I.click(modelDropdown.withText('Ford Focus'))
  I.waitForVisible(modelDropdown.withText('Ford Focus 2018'))
  I.requestListener(true)
  I.click(modelDropdown.withText('Ford Focus 2018'))
  I.requestListener(false)
  I.checkRequest('api/v1/add_application', '{"car_maker":"Ford","car_model":"Focus","car_year":"2018"}')

  I.waitForVisible(engineDropdown.withText('1.5 (150.00 л.с.)'))
  I.click(engineDropdown.withText('1.5 (150.00 л.с.)'))
  I.click(engineValue.withText('1.5 (150.00 л.с.)'))

  I.waitForVisible(engineDropdown.withText('1.6 (100.00 л.с.)'))
  I.click(engineDropdown.withText('1.6 (100.00 л.с.)'))
});