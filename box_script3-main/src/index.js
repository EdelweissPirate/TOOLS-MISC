const puppeteer = require('puppeteer')
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder')

const utils = require('./utils')
const Environment = require('../public/project/environment')

// ==================================================================

// BOX COORD SET UP

// function to set the input array
const setInput = (arr) => {
    return arr
}

// generate random array of hex values
let input =  setInput(['ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff'])

let hexArray = input.map(item => {
    return item.split(' ')
})

// generate box data
const boxBits = utils.generateBoxBits([...hexArray])
const boxCoords = utils.generateBoxCoords(boxBits)

// ==================================================================

// CAPTURE THREEJS 

// recorder config
const Config = {
    fps: 60,
    videoFrame: {
        width: 600,
        height: 600,
    },
    aspectRatio: '4:3', 
}

// discreetly load page, take screenshot, record video, and then exit.
async function grabScreen() {
    // set up puppeteer page config
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({width: 600, height: 600, deviceScaleFactor: 2})
    
    // init recorder config
    const recorder = new PuppeteerScreenRecorder(page, Config)
    const SavePath = './output/videos/vid000.mp4'
    const public = require('path').resolve(__dirname, '..')

    // serve html
    await page.goto(public + '/public/index.html', { waitUntil: 'load' })

    // passes boxCoords to process three.js and inits three.js environment
    await page.evaluate((boxCoords) => {
        initProps(boxCoords, 'eth')
        Environment()
    }, boxCoords)

    // takes screenshot
    await page.screenshot({ path: './output/images/img000.png' })
    console.log('PNG Generated.')

    // set up recorder interval to control duration and stop script running
    let count = 0
    const recInterval = async () => {
        count++
        if(count >= 15){
            clearInterval(this)
            await recorder.stop()
            await browser.close()
            console.log('MP4 generated.')
            
            console.log('done.')
            process.exit()
        }
    }

    // waits one second before starting the recodring and interval timer
    setTimeout(async function(){
        await recorder.start(SavePath);
        setInterval(recInterval, 1000)
        console.log('Recording video...')
    }, 1000)
}

grabScreen()
