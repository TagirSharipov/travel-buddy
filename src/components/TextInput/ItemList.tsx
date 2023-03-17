import style from './ItemList.module.css';

function LoadingList() {
  return <>{Array.from("1234567").map(i => <button className={`${style.button} ${style.loading}`} key={i} />)}</>
}

const ItemList: React.FC<{ 
  loading: boolean, 
  items: string[]; 
  handler: (v: string) => void;
}> = (props) => {

  if (props.items.length === 0) return null;
 
  return <div className={style.wrapper}>
    {props.loading ? <LoadingList />
    : props.items.map((c) => <button className={style.button} key={c} onClick={() => props.handler(c)}>{c}</button>)
    }
  </div>
}

export default ItemList;
