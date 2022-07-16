import colors from 'colors'


export function ExportError({res, error}){
    console.error(`ERROR: ${error.message}`.bgRed.underline.bold)
    res.status(500).send('Server Error')
}