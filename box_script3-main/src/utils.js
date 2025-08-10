// utils.js
// ========

module.exports = {
    generateBoxBits: function (indexes) {
        return generateBoxBits(indexes)
    },
    generateBoxCoords: function (keys) {
        return generateBoxCoords(keys)
    },
}

// generate bit array to be converted into coords
const generateBoxBits = (keys) => {
    function checkHex(n){return/^[0-9A-Fa-f]{1,64}$/.test(n)}
    function hex2Bin(n, i){
        if(!checkHex(n)) return 0;
        let output = parseInt(n, 16).toString(2)
        return output
    }
    
    const keysBin = keys.map(item => 
        item.map((inner, i) => {
            let arr;
            if(inner.length === 8){
                arr = inner.toString().match(/(..?)/g)
            } else {
                arr = inner.split('')
            }

            return arr.map(inner2 => {
                let hex = hex2Bin(inner2, i)
                while(hex.length < 8){
                    hex = 0 + hex
                }
                return hex
            })
        })
    )

    const bitsArray = keysBin.join('').replace(/,/g, '').split('')

    return bitsArray
}


const generateBoxCoords = (bits) => {
    let indexes = []

    bits.map((item, i) => {
        if(item != 0) return indexes.push(i)
    })

    const output = indexes.map((item) => {
        return calcBoxPosIndex(item)
    })

    return output
}

const calcBoxPosIndex = (i) => {
    let xCount = 0
    let yCount = 0
    let zCount = 0

    yCount = (Math.floor(i/256))
    zCount = (i%16)
    xCount = (Math.floor(i/16) - (16 * yCount))

    let x = 0
    let y = 0
    let z = 0

    x = x + xCount
    z = z - zCount
    y = 0 + (1 * yCount)

    return {x: x, y: y, z: z}
}