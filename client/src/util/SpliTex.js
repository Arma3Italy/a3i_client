
export default function (str = "",maxMin,maxMax) {

    if (window.innerWidth < 400) {
        if (str.length > maxMin) {
            return str.substring(0,maxMin) + '...'
        } else {
            return str
        }
    } else {
        if (str.length > maxMax) {
            return str.substring(0,maxMax) + '...'
        } else {
            return str
        }
    }
}