const { join } = require('path')
const allure = require('allure-commandline')
const video = require('wdio-video-reporter');
exports.config = {
   
    specs: [
        './tests/specs/e2eCadastroProduto.spec.js',
    ],
    runner: 'local',
    framework: 'mocha',
    //user: "fabiobruno_gARE0X",
    //key: "nTQs23EpyJq2K7pULAxw",
    //app: "bs://cb31b51c4b98abdfbaa994eb90f5a3cdb003f1ad",
    //sync: true,
    //deprecationWarnings: true,
    //bail: 0,
    baseUrl: 'localhost',
    waitforTimeout: 20000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 1,
    reporters: ['spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
        }],

        [video, {
            saveAllVideos: true,       // If true, also saves videos for successful test cases
            videoSlowdownMultiplier: 15, // Higher to get slower videos, lower for faster videos [Value 1-100]
        }]

    ],
    onComplete: function () {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function (exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })

    },
    afterStep: async function (step, scenario, { error, duration, passed }, context) {
        if (error) {
            driver.takeScreenshot();
        }
    },


    services: ['appium'],

    port: 4723,

    mochaOpts: {

        timeout: 300000
    },

capabilities: [
{
    platformName: "Android",
  "appium:platformVersion": "12.0",
  "appium:deviceName": "ebac-qe",
  "appium:automationName": "UiAutomator2",
  "appium:app": "C:\\repositorio\\TESTE-MOBILE-EBAC-SHOP\\app\\android\\loja-ebac.apk",
  "appium:appPackage": "com.woocommerce.android",
  "appium:appActivity": ".ui.main.MainActivity",
  "appium:appWaitActivity": ".ui.login.LoginActivity"
}

] 
//capabilities: //[
        //{

            //'app': 'bs://cb31b51c4b98abdfbaa994eb90f5a3cdb003f1ad',
            //'device': 'Samsung Galaxy S22 Ultra',
            //'os_version': '12.0',
            //'project': 'First NodeJS project',
            //'build': 'browserstack-build-1',
            //'name': 'first_test',


            //'browserstack.local': false,
            //'browserstack.debug': true
        //},


    //]
};





