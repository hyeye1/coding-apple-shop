import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeName } from './../store';

function Cart() {

  // let state = useSelector((state) => state.user )
  let cart = useSelector((state) => state.cart );
  let user = useSelector((state) => state.user );
  // store.js한테 요청을 보내주는 함수
  let dispatch = useDispatch();

  return (
    <div>
      {user}의 장바구니
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {
            cart.map((c, i) => (
              <tr key={i}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.count}</td>
                <td>
                  <button onClick={() => {
                    dispatch(changeName())
                  }}>+</button>
                </td>
              </tr>
            ))
          }
          
        </tbody>
      </Table>
    </div>
  )
}

export default Cart;