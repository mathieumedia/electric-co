import { DialogTitle, Dialog, Slide, DialogContent} from '@mui/material'
import { forwardRef } from 'react'

const Transition = forwardRef(function Transition(props, ref){
    const directions = ['up', 'left', "right", "down"]
    const from = () => {
        return directions[Math.floor(Math.random() * directions.length)]
    }

    return <Slide direction={from()} ref={ref} {...props}  />
})
export default function Popup(props){
    const {open, clickAway, handleClose, title} = props

    return (
        <Dialog 
            TransitionComponent={Transition} open={open}
            onClose={clickAway ? handleClose : null}
        >
            <DialogTitle>{title}</DialogTitle>

            <DialogContent>{props.children}</DialogContent>
        </Dialog>
    )
}