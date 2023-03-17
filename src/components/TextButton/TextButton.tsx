import style from './TextButton.module.css'

const  TextButton: React.FC<{handler: () => void, children: string}> = (props) => {
  return <button onClick={props.handler} className={style.link}>{props.children}</button>
}
export default TextButton;