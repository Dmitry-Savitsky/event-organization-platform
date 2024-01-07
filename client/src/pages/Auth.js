import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form, Button, Overlay } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { login, registration } from '../http/userApi';
import { useContext, useState } from 'react';
import { Context } from '../index';
import { LOGIN_ROUTE, SERVICES_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { toast, ToastContainer } from 'react-toastify';

const Auth = () => {
  
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  const { user } = useContext(Context)
  const navigate = useNavigate()
  const target = useRef(null);

  const [user_login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('');
  const status = 1;
  // const [status, setStatus] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [show, setShow] = React.useState(false);

  const click = async () => {
    console.log('Button clicked');
    try {
      if (!user_login || !password || (!isLogin && (!name || !status || !phoneNumber))) {
        toast.error('Please enter all required information', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      let data;
      if (isLogin) {
        data = await login(user_login, password);
      } else {
        data = await registration(user_login, password, status, name, phoneNumber);
      }
      localStorage.setItem('isAuth', 'true');
      user.setUser(data);
      user.setIsAuth(true);
      navigate(SERVICES_ROUTE);
    } catch (error) {
      toast.error('Error', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      if (error.response && error.response.status === 500) {
        setShow(true);
      } else if (error.response && error.response.data && error.response.data.message === "Client not found") {
        toast.error('Client not found', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  return (
    <>
      <Row style={{ width: '100%', height: '80vh', overflowX: 'hidden' }}>
        <Col className='d-flex flex-column justify-content-center align-items-center'>
          <h3 style={{ color: 'GrayText' }}>{isLogin ? 'АВТОРИЗАЦИЯ' : 'РЕГИСТРАЦИЯ'}</h3>
          <Form className='col-5'>
            <Form.Group className="mb-2">
              <Form.Control
                className="mb-2"
                id="email"
                type="email"
                value={user_login}
                onChange={e => setLogin(e.target.value)}
                placeholder="Email"
              />
              <Form.Control
                className="mb-2"
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Пароль"
              />
              {!isLogin && (
                <>
                  <Form.Control
                    className="mb-2"
                    id="first_name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Имя"
                  />
                  {/* <Form.Control
                    className="mb-2"
                    id="status"
                    type="nubmer?"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    placeholder="Статус"
                  /> */}
                  <Form.Control
                    className="mb-2"
                    id="phone_number"
                    type="tel"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    placeholder="Мобильный телефон"
                  />
                </>
              )}
              <Button onClick={click} className='me-2' ref={target} variant="dark">
                {isLogin ? 'Войти' : 'Регистрация'}
              </Button>
              {isLogin ? (
                <>
                  <Form.Text className="me-1" style={{ color: "GrayText" }}>Нет аккаунта?</Form.Text>
                  <NavLink className="text-decoration-none" style={{ color: "brown" }} to={REGISTRATION_ROUTE}>
                    Регистрация
                  </NavLink>
                </>
              ) : (
                <>
                  <Form.Text style={{ color: "GrayText" }} className="me-1">
                    Есть аккаунт?
                  </Form.Text>
                  <NavLink className="text-decoration-none" style={{ color: "brown" }} to={LOGIN_ROUTE}>
                    Войти
                  </NavLink>
                </>
              )}
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Overlay target={target.current} show={show} placement="bottom">
        {({
          placement: _placement,
          arrowProps: _arrowProps,
          show: _show,
          popper: _popper,
          hasDoneInitialMeasure: _hasDoneInitialMeasure,
          ...props
        }) => (
          <div
            {...props}
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(255, 100, 100, 0.85)',
              padding: '2px 10px',
              color: 'white',
              borderRadius: 3,
              ...props.style,
            }}
          >
            Ошибка
          </div>
        )}
      </Overlay>
      <ToastContainer />
    </>
  );
}

export default observer(Auth);
