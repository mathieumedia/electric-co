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