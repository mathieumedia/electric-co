import colors from 'colors'


export function ExportError(res, error){
    console.error(`ERROR: ${error.message}`.bgRed.underline.bold)
    res.status(500).send('Server Error')
}

export const addDays = Date.prototype.addDays = async function addDays(days){
    let date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
}

