const { I } = inject()

export = {
    suggestDropdown: (label?: string) => locate ('//*[@data-qa-type="uikit/dropdown.item.title"]'),
    inputAutocompleteLabel: (label?: string) => locate ('//*[@data-qa-type="uikit/inputAutocomplete.inputBox.label"]'),
    inputAutocompleteValue: (label?: string) => locate ('//*[@data-qa-type="uikit/inputAutocomplete.value.input"]'),
    selectDropdown: (label?: string) => locate ('//*[@data-qa-type="uikit/select.dropdown.item.title"]'),
    selectValue: (label?: string) => locate ('//*[@data-qa-type="uikit/select.value"]'),
    regionValue: (label?: string) => locate ('//*[@data-qa-type="uikit/select.input"]'),
    linkCheckbox: (label?: string) => locate ('//*[@data-qa-type="uikit/linkCheckbox.checkbox.input"]'),
    checkboxLabel: (label?: string) => locate ('//*[@data-qa-type="uikit/checkbox.label"]'),
    errorBlock: (label?: string) => locate ('//*[@data-qa-type="uikit/formRow.errorBlock"]'),


    FillingStep1 () {
        const modelDropdown = this.suggestDropdown('Модель автомобиля')
        const inputModelLabel = this.inputAutocompleteLabel()
        const inputModelValue = this.inputAutocompleteValue()
        const engineDropdown = this.selectDropdown('Двигатель')
        const engineValue = this.selectValue()
        const regionDropdown = this.selectDropdown('Регион использования')
        const regionValue = this.regionValue()
        const checkbox = this.linkCheckbox('Я принимаю')
        const errorBlock = this.errorBlock('Для продолжения нужно согласие с условиями')

        I.fillField('Модель автомобиля', 'Ford Focus')
        I.waitForVisible(modelDropdown.withText('Ford Focus'))
        I.click(modelDropdown.withText('Ford Focus'))
        I.waitForVisible(modelDropdown.withText('Ford Focus 2018'))
        I.click(modelDropdown.withText('Ford Focus 2018'))

        I.waitForVisible(inputModelValue.withAttr({ value: 'Ford Focus, 2018'}))
        I.waitForVisible(inputModelLabel.withText('Марка, модель, год'))

        I.waitForVisible(engineDropdown.withText('1.5 (150.00 л.с.)'))
        I.click(engineDropdown.withText('1.5 (150.00 л.с.)'))

        I.waitForVisible(engineValue.withText('1.5 (150.00 л.с.)'))

        I.click('Регион использования')
        I.waitForVisible(regionDropdown.withText('Москва и МО'))
        I.click(regionDropdown.withText('Москва и МО'))
        I.waitForVisible(regionValue.withAttr({ value: 'Москва и МО'}))

        I.click(checkbox)
        I.click('Далее')
        I.waitForVisible(errorBlock.withText('Для продолжения нужно согласие с условиями'))

        I.click(checkbox)
        I.dontSee(errorBlock.withText('Для продолжения нужно согласие с условиями'))
        I.seeCheckboxIsChecked(checkbox)
    },

    FillingStep2 () {
        const checkboxAccident = this.checkboxLabel('Были ДТП за прошлый год')
        const insCasesValue = this.selectValue('Страховых случаев за год')
        const insCasesDropdown = this.selectDropdown('Страховых случаев за год')
        const checkboxPossession = this.checkboxLabel('Владею авто уже 1,5 года')

        I.fillField('Фамилия, имя и отчество', 'Иванов Иван Иванович')
        I.fillField('Мобильный телефон', '9998887766')
        I.fillField('Электронная почта', 'test@tinkoff.ru')
        I.fillField('Мин. возраст водителей', '20')
        I.fillField('Мин. стаж вождения', '2')

        I.dontSeeCheckboxIsChecked(checkboxAccident.withText('Были ДТП за прошлый год'))

        I.waitForVisible(insCasesValue.withText('0'))
        I.click('Страховых случаев за год')
        I.waitForVisible(insCasesDropdown.withText('1'))
        I.click(insCasesDropdown.withText('1'))
        I.waitForVisible(insCasesValue.withText('1'))

        I.dontSeeCheckboxIsChecked(checkboxPossession.withText('Владею авто уже 1,5 года'))

        I.fillField('Пробег', '1000')
    }
}
