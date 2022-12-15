import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Nav, NavItem } from 'react-bootstrap';

import { Context1 } from './../App.js'

let YellowBtn = styled.button`
  background: ${ props => props.bg == 'blue' ? 'white' : 'black' };
  color: black;
  padding: 10px;
`
let Box = styled.div`
  background: grey;
  padding : 20px;
`

function Detail(props) {

  let {stock} = useContext(Context1)

  // 유저가 url파라미터에 입력한거 가져오는 함수 useParams()
  let { id } = useParams(); 
  let [ count, setCount ] = useState(0);
  let [ isVisible, setIsVisible ] = useState(true);
  let [ isNumber, setIsNumber ] = useState(true);
  let [ inputValue, setInputValue] = useState('');
  let [ warningMsg, setWarningMsg ] = useState('');
  let [ tab, setTab ] = useState(0);
  let [ fade, setFade ] = useState(''); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade('end');
    }, 100);

    return () => {
      clearTimeout(timer);
      setFade('');
    }
  }, []);

  useEffect(() => { 
    // 훅(갈고리): 여기 안에 적은 코드는 디테일 컴포넌트가 처음 장착이 되었을때 실행됨. side effect(핵심기능말고 부가기능)를 보관 
    // 밖에다가 써도 똑같이 동작하는데?? 왜존재? useEffect안에있는 코드는 Html랜더링 후에 동작한다
    // 디버깅때문에 한 두번 동작하게 됨 싫으면 index.js 가서 react.Strict 제거
    let a = setTimeout(() => {
      setIsVisible(false);
      
    }, 2000);
    console.log(2);
    return () => {
      // 기존 타이머는 제거해주세요 -> 쓸데없이 타이머가 여러개 있는걸 방지/ 기존요청과 충돌 방지
      console.log(1)
      clearTimeout(a);
    };
    // console.log('memo');
  }, []);
  // count라는 state가 변할 때 실행됨 - > 실행 조건으을 넣ㅇ르 수 있음 []에 
  // mount시 와 count 변경될때 실행됨
  // mount 될때만 하고 싶으면 []만함
  // clean up function: return 을 넣을 수 있는데 저 코드는 useEffect 동작 전에 실행됨 
  // 클린업펑선은 마운트 시 실행안됨 근데 Unmount땐 실행됨;
  useEffect(() => {
    console.log("inputvalue", inputValue);
    const numberReg = /^[0-9]*$/;
    setIsNumber(numberReg.test(inputValue));
  }, [inputValue]);

  return (
    <div className={`container start ${fade}`}>
      {
        isVisible == true
        ? <div className="alert alert-warning">
            2초 이내 구매시 할인
          </div>
        : null
      }
      {/* {count}
      <button onClick={() => { setCount(count+1)}}>버튼</button> */}
      <div className="row">
        <div className="col-md-6">
          <img src={"https://codingapple1.github.io/shop/shoes" + (props.shoes[id].id + 1) +".jpg"} width="100%" />
        </div>
        {/* <div className="col-md-6">
          <input onChange={(e) => {
            setInputValue(e.target.value);
          }}/>
          {
            isNumber == true
            ? null
            : <p>경고: 숫자만 입력하세요</p>
          }
          <p>{warningMsg}</p>
        </div> */}
        <div className="col-md-6 mb-5">
          <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}</p>
          <button className="btn btn-danger">주문하기</button> 
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={() => {
            setTab(0)
          }} eventKey="link0">버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => {
            setTab(1)
          }} eventKey="link1">버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => {
            setTab(2)
          }} eventKey="link2">버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} shoes={props.shoes}/>
    </div> 
  )
}

function TabContent({tab, shoes}) {

  let [fade, setFade] = useState('');
  let {stock} = useContext(Context1)

  useEffect(() => {
    // automatic batching : state변경 함수를 쓸때마다 재렌더링이 아닌, 근처에 있는 state변경 함수를 한번에 모아서 재렌더링하기에 timeout을 써야함
    let timer = setTimeout(() => {
      setFade('end')
    }, 100);

    return () => {
      clearTimeout(timer);
      setFade('')
    }
  }, [tab]);

  return <div className={`start ${fade}`}>
    {
      [<div>{shoes[0].title}</div>, 
      <div>{shoes[0].title}</div>, 
      <div>{shoes[0].title}</div>
      ][tab]
    }
  </div>
}

export default Detail;