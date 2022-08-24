import { Request } from 'playwright'

class CustomHelper extends Helper {
    private requests: any = [];

    constructor(config: any) {
        super(config)
        this.helpers
    }


    /* Логируем запросы */
    logRequest = (interceptedRequest: {
        method: () => any;
        url: () => any;
        postData: () => any;
    }) => {
        console.log('>>',
            interceptedRequest.method(),
            interceptedRequest.url(),
            interceptedRequest.postData()
        );
    }

    handleRequest = (request: Request) =>
        this.requests.push({postData: request.postDataJSON(), url: request.url()})

    async requestListener(flag: boolean) {
        const { page } = this.helpers.Playwright;

        if (flag === true) {
            console.log('Start listen request')
            page.on('request', this.logRequest)
            page.on('request', this.handleRequest)
        } else if (flag === false) {
            await page.waitForTimeout(500)
            console.log('Stop listen request')
            page.off('request', this.logRequest)
            page.off('request', this.handleRequest)
        }
    }

    async checkRequest(url: string, expectedPostData: any) {
        const { browser } = this.helpers.Playwright;

        let result: boolean = false
        /* expectedPostData конвертим в объект из JSON если string */
        let expectedJSON = expectedPostData
        if (typeof expectedPostData === 'string') {
            expectedJSON = JSON.parse(expectedPostData)
        }

        /* Тут ищем совпадение по ключу */
        const checkPostData = (actual:any, expected: any) => {
            const keys = Object.keys(expected)
            if (keys.length === 0)
                return false
            for (let key of keys)
                if (actual[key] !== expected[key])
                    return false
                return true
        }

        /* Перебираем запросы в массиве в поисках совпадения */
        for (let request of this.requests) {
            if (request.url.includes(url) && checkPostData(request.postData, expectedJSON)) {
                result = true
                console.log('Проверка прошла успешно!\n',
                            'expected url:\n', url, '\n',
                            'actual url:\n', request.url, '\n',
                            'expected postData:\n', expectedPostData, '\n',
                            'actual postData:\n', request.postData)
            }
        }

        /* Выводим результат */
        if (result) {} else {
            console.log('Проверка не пройдена!\n',
                        'expected url:\n', url, '\n',
                        'expected postData:\n', expectedPostData)
            throw new Error('Проверка не пройдена!');
        }
    }
}

export = CustomHelper