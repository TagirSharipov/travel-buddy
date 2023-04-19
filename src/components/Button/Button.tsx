import style from './Button.module.css'

const  Button: React.FC<{handler: () => void, children: string, disabled?: boolean}> = (props) => {
  return <button type='button' 
    disabled={props.disabled} className={style.button} onClick={props.handler}>{props.children}</button>
}

export default Button;