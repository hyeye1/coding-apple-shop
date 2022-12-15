import { createContext, useEffect, useState } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import './App.css';
import bg from './sky.webp'
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail';
import Cart from './routes/Cart';
import axios from 'axios';

export let Context1 = createContext();

function App() {

  let [shoes, setShoes] = useState(data);
  let [stock, setStock] = useState([10, 11, 12])
  let navigate = useNavigate();
  let [clickCount, setClickCount] = useState(1);
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (clickCount < 4) {
      axios.get('https://codingapple1.github.io/shop/data'+ clickCount +'.json')
      .then((res) => {
        console.log(res.data);
        let copy = [...shoes,  ...res.data];
        setShoes(copy);
        setIsLoading(false);
      })
      .catch(() => {
        console.log('실패');
        setIsLoading(false);
        // console.log(url)
      })
    } else {
      alert('더 볼 목록이 없습니다');
      setIsLoading(false);
    }
  }, [clickCount]);
  return (
    <div className='App'>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Hyeshop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail')}}>Detail</Nav.Link>
            <Nav.Link onClick={() => { navigate('/event')}}>Event</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart')}}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg' style={{ backgroundImage: 'url('+bg+')'}}></div>
            <div className='container'>
              {
                isLoading
                ? <Loading />
                : null
              }
              <div className='row'>
                {shoes.map(function(s, i) {
                  return (
                    <div onClick={()=>{
                      navigate(`/detail/${i}`)
                    }} >
                      <Card shoes={shoes[i]}/>
                    </div>
                  )
                })}
              </div>
              <button onClick={() => {
                // 로딩중 Ui 띄우기
                setIsLoading(true);
                setClickCount(clickCount+1);

                // axios
                // 두개 동시 요청하고 둘다 성공했을때 수정
                // Promise.all([
                //   axios.get('/url1'),
                //   axios.get('/url2')
                // ]).then(() => {
                //   // 두개 동시에 요청하고 둘다 성공했을때!
                // })
                // fetch는 라이브러리 도움을 받지 않아도 가능/ 제이슨 데이터를 가져왔을때 json을 array나 object 로 변환해야함
              }}>더보기</button>
            </div>
          </>
        }/>
        {/* :url파라미터 */}
        <Route path='/detail/:id' element={
          <Context1.Provider value={{ stock }}> 
            <Detail shoes={shoes} />
          </Context1.Provider>
        }/>
        <Route path='/cart' element={<Cart/>} />
        <Route path='/about' element={<About/>}>
          {/* // nested Routes */}
          <Route path='member' element={<div>멤버임</div>}/>
          <Route path='location' element={<div>위치정보임</div>}/>
        </Route>
        <Route path='/event' element={<Event/>} >
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path='two' element={<div>생일기념 쿠폰받기</div>} />
        </Route>

        <Route path='*' element={<div>없는 페이지요</div>}/>
      </Routes>
      
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Card(props) {
  return (
    <div className='col-md-4'>
      <img src={"https://codingapple1.github.io/shop/shoes" + (props.shoes.id+1) +".jpg"} width='80%' />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )
}

function Loading() {
  return (
    <div className='alert alert-warning'>
      <p>로딩중입니다</p>
    </div>
  )
}

export default App;
