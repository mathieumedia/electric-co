import {toast} from 'react-toastify'

import Color from 'color'
// #region ------ Background Images --------------
import brian from '../backgrounds/brian-wangenheim-unsplash.jpg';
import lars from '../backgrounds/lars-van-poucke-unsplash.jpg';
import leandra from '../backgrounds/leandra-rieger-unsplash.jpg';
import misty from '../backgrounds/misty-unsplash.jpg';
import rob from '../backgrounds/rob-potter-unsplash.jpg'
import visax from '../backgrounds/visax-unsplash.jpg';
// #endregion ----------------

export const drawerWidth = 240;

export function BgImage(){
    const list = [
        // brian, lars, 
        leandra, 
        // misty, rob, visax
    ]
    return {
        background: `url(${list[Math.floor(Math.random() * list.length)]})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
    }
}

export function Glass(color){
    return {
        backgroundColor: Color(color).alpha(0.3).toString(), //SetColor(theme, props.color, 0.3),
        backgroundImage: `linear-gradient(to bottom right, 
            ${Color(color).alpha(0.2).toString()}, ${Color(color).alpha(0).toString()})`,
        backdropFilter: `blur(10px)`,
        boxShadow: `10px 10px 10px ${Color(color).alpha(0.1).toString()})`,
    }
}

export function BeautifyAlert(obj){
    alert(JSON.stringify(obj, null, 4))
}

export function Alert(alert, dispatch, clear){
    toast(alert.message, {type: alert.type, toastId: alert.message})
    if(clear) dispatch(clear())
}

export function getName(arr, id){
    if(arr && id){
        return (arr.find(obj => obj._id === id)).name
    }
    return ''
}

export function billingMonths () {
    return [
        {value: '01', label: 'January'},
        {value: '02', label: 'February'},
        {value: '03', label: 'March'},
        {value: '04', label: 'April'},
        {value: '05', label: 'May'},
        {value: '06', label: 'June'},
        {value: '07', label: 'July'},
        {value: '08', label: 'August'},
        {value: '09', label: 'September'},
        {value: '10', label: 'October'},
        {value: '11', label: 'November'},
        {value: '12', label: 'December'}
    ]
}

export function getMonthYear(date){
    if(date){
        const newDate = new Date(date);
        const month = billingMonths()[newDate.getMonth()].label
        const year = newDate.getFullYear()
        return `${month}-${year}`
    }

    return ''
}

export function formatCurrency(amount){
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    return formatter.format(amount)
}

export function FormatPhone(value){
    if(value){
        var cleaned = ('' + value).replace(/\D/g, '');
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            var intlCode = (match[1] ? '+1 ' : '');
            return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
        }
        return null;
    }
}

export function FormatCreditCard(value){
    if(value){
        let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        let matches = v.match(/\d{4,16}/g);
        let match = matches && matches[0] || ''
        let parts = []

        for (let i=0, len=match.length; i<len; i+=4) {
            parts.push(match.substring(i, i + 4))
        }

        if (parts.length) {
            return parts.join('-')
        } else {
            return value
        }
    }
}

export function FormatSSN(value){

    if(value){
        let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        v = v.replace(/^(\d{3})/, '$1-');
        v = v.replace(/-(\d{2})/, '-$1-');
        v = v.replace(/(\d)-(\d{4}).*/, '$1-$2');
        return v;
    }
}

export function shortDate(date){
    if(date){
        const newDate = new Date(date);
        return `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`
    }
    return ''
}

export function Mask(originalString, length = 4){
    let newString = []

    if(originalString){
        for(let i = 0; i < originalString.length; i++){
            i < originalString.length - length ? newString.push('*') : newString.push(originalString[i])
        }
    }
    return newString.join('')
}



