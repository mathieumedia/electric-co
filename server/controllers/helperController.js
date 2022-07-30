import colors from 'colors'


export function ExportError(res, error){
    error.message   
        ?   console.error(`ERROR: ${error.message}`.bgRed.underline.bold)
        :   console.error(`ERROR: ${error}`.bgRed.underline.bold)
    res.status(500).send('Server Error')
}

export const addDays = Date.prototype.addDays = async function addDays(days){
    let date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
}

export function toFixed(amount, length = 2){
    if(amount) {
        return parseFloat(amount.toFixed(length));
    }
    return null
}

