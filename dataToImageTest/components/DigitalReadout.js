class DigitalReadout{
    constructor(obj, digitCount, hasDecimal, val) {
        this.obj = obj
        this.digitCount = digitCount
        this.hasDecimal = hasDecimal
        this.val = val
        this.digits = obj.children.filter(item => {
            const name = item.name?.split('_')
            return name? name[0] === 'dig' : false
        })

        this.hide_all()
        this.value = val
    }

    // returns readout value
    get value() {
        return this.val
    }

    // sets readout value
    set value(val) {
        val = this.addDecimal(val)
        const isFloat = !Number.isInteger(val)
        let val_string = String(val)

        // errors
        const valIsTooLong = val_string.split('.')[0].length > this.digitCount
        const isWrongType = isFloat && !this.hasDecimal

        if(valIsTooLong || isWrongType){
            return this.error_out()
        }

        let deNum = val_string.split('.')[1]
        let val_length = val_string.length
        let val_array = val_string.split('')

        this.hide_all()

        let val_final = []

        for(let i = 0; i <= val_length-1; i++){

            let digit = val_array[val_array.length-1]
            let screen_digit = this.obj['dig_' + (i+1)]

            if(!isFloat){

                digit = val_array.pop()
                this.parse_digit(screen_digit, digit)
                screen_digit.visible = true

            } else {
                if(i === 0 && deNum?.length == 1){
                    digit = '0'
                    this.parse_digit(screen_digit, digit)
                    screen_digit.visible = true

                } else {
                    digit = val_array.pop()
                    if(digit === '.'){
                        this.obj.decimal.visible = true
                        val_final.push(digit)
                        digit = val_array.pop()
                        this.parse_digit(screen_digit, digit)
                        screen_digit.visible = true
                        if(deNum.length !== 1){
                            val_length--
                        }
                    } else {
                        this.parse_digit(screen_digit, digit)
                        screen_digit.visible = true
                    }
                }
            }

            val_final.push(digit)

        }

        this.val = val_final.reverse().join('')
    }

    // shows error message
    error_out(){
        this.hide_all()
        
        this.digits[this.digits.length - 1].visible = true
        this.parse_digit(this.digits[this.digits.length - 1], 'R')

        this.digits[this.digits.length - 2].visible = true
        this.parse_digit(this.digits[this.digits.length - 2], 'R')

        this.digits[this.digits.length - 3].visible = true
        this.parse_digit(this.digits[this.digits.length - 3], 'E')

        if(this.hasDecimal){
            this.obj.decimal.visible = false
        }
    }

    // hides all digits and decimals
    hide_all() {
        this.digits.map(item => {
            item.visible = false
        })

        if(this.hasDecimal){
            this.obj.decimal.visible = false
        }
    }

    // turns passed string number into which segments to show
    parse_digit(digit, val) {
        switch(val){
            case '0':
                digit.seg1.visible = true
                digit.seg2.visible = true
                digit.seg3.visible = true
                digit.seg4.visible = false
                digit.seg5.visible = true
                digit.seg6.visible = true
                digit.seg7.visible = true
                break

            case '1':
                
                digit.seg1.visible = false
                digit.seg2.visible = false
                digit.seg3.visible = true
                digit.seg4.visible = false
                digit.seg5.visible = false
                digit.seg6.visible = false
                digit.seg7.visible = true
                break

            case '2':
                digit.seg1.visible = false
                digit.seg2.visible = true
                digit.seg3.visible = true
                digit.seg4.visible = true
                digit.seg5.visible = true
                digit.seg6.visible = true
                digit.seg7.visible = false
                break

            case '3':
                digit.seg1.visible = false
                digit.seg2.visible = true
                digit.seg3.visible = true
                digit.seg4.visible = true
                digit.seg5.visible = false
                digit.seg6.visible = true
                digit.seg7.visible = true
                break

            case '4':
                digit.seg1.visible = true
                digit.seg2.visible = false
                digit.seg3.visible = true
                digit.seg4.visible = true
                digit.seg5.visible = false
                digit.seg6.visible = false
                digit.seg7.visible = true
                break

            case '5':
                digit.seg1.visible = true
                digit.seg2.visible = true
                digit.seg3.visible = false
                digit.seg4.visible = true
                digit.seg5.visible = false
                digit.seg6.visible = true
                digit.seg7.visible = true
                break

            case '6':
                digit.seg1.visible = true
                digit.seg2.visible = true
                digit.seg3.visible = false
                digit.seg4.visible = true
                digit.seg5.visible = true
                digit.seg6.visible = true
                digit.seg7.visible = true
                break

            case '7':
                digit.seg1.visible = false
                digit.seg2.visible = true
                digit.seg3.visible = true
                digit.seg4.visible = false
                digit.seg5.visible = false
                digit.seg6.visible = false
                digit.seg7.visible = true
                break

            case '8':
                digit.seg1.visible = true
                digit.seg2.visible = true
                digit.seg3.visible = true
                digit.seg4.visible = true
                digit.seg5.visible = true
                digit.seg6.visible = true
                digit.seg7.visible = true
                break

            case '9':
                digit.seg1.visible = true
                digit.seg2.visible = true
                digit.seg3.visible = true
                digit.seg4.visible = true
                digit.seg5.visible = false
                digit.seg6.visible = true
                digit.seg7.visible = true
                break

            case 'E':
                digit.seg1.visible = true
                digit.seg2.visible = true
                digit.seg3.visible = false
                digit.seg4.visible = true
                digit.seg5.visible = true
                digit.seg6.visible = true
                digit.seg7.visible = false
                break

            case 'R':
                digit.seg1.visible = false
                digit.seg2.visible = false
                digit.seg3.visible = false
                digit.seg4.visible = true
                digit.seg5.visible = true
                digit.seg6.visible = false
                digit.seg7.visible = false
                break

            default:
                digit.seg1.visible = false
                digit.seg2.visible = false
                digit.seg3.visible = false
                digit.seg4.visible = true
                digit.seg5.visible = false
                digit.seg6.visible = false
                digit.seg7.visible = false
                break
        }
    }

    // add decimals to integers to look better
    addDecimal(val){
        if(Number.isInteger(val)){
            val += '.00'
        } 
        return val
    }
}

// class Timer extends DigitalReadout{

// }