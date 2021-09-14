import dayjs from 'dayjs'
export const userTypeConfig = {
    0 : '一般帳戶',
    1 : '台北通',
}

export const activeConfig = {
    0 : '停用',
    1 : '啟用'
}

export const translateUserType = (type) =>{
    return (userTypeConfig[type])? userTypeConfig[type]: '-'
}

export const percentageToInt = (denominator, molecular) => {
    if (denominator == 0 || molecular == 0) return 0
    return  Math.round(molecular / denominator * 10000) / 100
}

export const percentageCommon = (denominator, molecular, remainder) => {
    if (denominator == 0 || molecular == 0) return '0%'
    if(remainder){
        return `${ Math.round(molecular / denominator * 1000) / 10 }%`
    }else{
        return `${ Math.round(molecular / denominator * 10000) / 100 }%`
    }
}

export const growthPercentageCommon = (count, prev) => {
    if(prev){
        if (count == 0 || prev == 0) return '0%'
        const num = ((count - prev) / prev * 1000)/10
        return `${ toFixedFunction(num) }%`
    }else{
        return '-'
    }
}

export const decimalComma = (num) => {
    if(typeof num === 'number'){
        const number = (num % 1 === 0)? num: num.toFixed(2)
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }else{
        return num
    }
}

// https://css-tricks.com/converting-color-spaces-in-javascript/
export const hexAToRGB = (h) =>{
    if(h){
        let r = 0, g = 0, b = 0
    
        // 3 digits
        if (h.length == 4) {
            r = "0x" + h[1] + h[1]
            g = "0x" + h[2] + h[2]
            b = "0x" + h[3] + h[3]
    
        // 6 digits
        } else if (h.length == 7) {
            r = "0x" + h[1] + h[2]
            g = "0x" + h[3] + h[4]
            b = "0x" + h[5] + h[6]
        }
        
        // return "rgb("+ +r + "," + +g + "," + +b + ")"
        return +r + "," + +g + "," + +b
    }else{
        return '255,255,255'
    }
}

export const setGradientHexColor = (value, start, middle, end, steps=10) => {
    // t in ragne 0..1, start-middle-end are colors in hex e.g. #FF00FF
    const gradient = (t,start,middle,end) => {
        return t>=0.5 ? linear(middle,end,(t-.5)*2) : linear(start,middle,t*2);
    }
    const linear = (s,e,x) => {
        let r = byteLinear(s[1]+s[2], e[1]+e[2], x);
        let g = byteLinear(s[3]+s[4], e[3]+e[4], x);
        let b = byteLinear(s[5]+s[6], e[5]+e[6], x);
        return "#" + r + g + b;
    }
    // a,b are hex values from 00 to FF; x is real number in range 0..1
    const byteLinear = (a,b,x) => {
        let y = (('0x'+a)*(1-x) + ('0x'+b)*x)|0;
        return y.toString(16).padStart(2,'0') // hex output
    }
    return gradient(value/steps, start, middle, end)
}

export const toFixedFunction = (num, translate) => {
    if (typeof num === 'number') return (num % 1 === 0)? num: num.toFixed(2)
    return translate? 0: '-'
}

export const spliteName = (name) => {
    if(!name) return '--'
    if(name.includes('臺北市政府')){
        return name.split('臺北市政府')[1]
    }else {
        return name
    }
}

export const growthIcon = (count, prev) => {
    if(prev){
        return (count > prev)? '▲': '▼'
    }else{
        return ''
    }
}

export const growthIconClass = (subItem) => {
    if(subItem.lastValue){
        return (subItem.value > subItem.lastValue)? 'el-icon-caret-top': 'el-icon-caret-bottom'
    }else{
        return ''
    }
}

export const translateTime = (time) => {
    if(!dayjs(time).isValid()) return '-'
    if(dayjs(time).get('year') < 1911) return '-'
    return dayjs(time).format('YYYY-MM-DD HH:mm')
}

export default {}