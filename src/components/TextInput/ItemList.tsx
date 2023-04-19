import * as S from './styles';

function LoadingList() {
  return <>{Array.from("1234567").map(i => <S.LoadingButton key={i} />)}</>
}

const ItemList: React.FC<{ 
  loading: boolean, 
  items: string[]; 
  handler: (v: string) => void;
}> = (props) => {

  if (props.items.length === 0) return null;
 
  return <S.Container>
    {props.loading ? (
        <LoadingList />
      )
      : props.items.map((c) => (
          <S.ListButton key={c} onClick={() => props.handler(c)}>
            {c}
          </S.ListButton>)
        )
    }
  </S.Container>
}

export default ItemList;
