import style from './DeleteButton.module.css';

const DeleteButton: React.FC<{handler: () => void}> = (props) => {
  return <button className={style.button} onClick={props.handler}><img src='/delete.png' alt="delete"/></button>
}
export default DeleteButton;