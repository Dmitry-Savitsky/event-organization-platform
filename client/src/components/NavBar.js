import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useContext } from "react"
import { Context } from ".."
import { COMPANY_ROUTE, SERVICES_ROUTE, FAQ_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { CLIENT_ROUTE } from '../utils/consts';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { jwtDecode } from 'jwt-decode';


const NavBar = observer(() => {
 // РАЗОБРАТЬСЯ
    const { user } = useContext(Context)
    const navigate = useNavigate()

    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const isOrganizer = decodedToken && decodedToken.role === 'organizer';

    const logout = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.clear()
        navigate(SERVICES_ROUTE)
    }

    return (
        <Navbar bg="black">
            <Container fluid>
                <NavLink
                    style={{
                        fontSize: "20px", color: "white", textDecoration: "none"
                    }}
                    to={SERVICES_ROUTE}
                >
                    Events-org
                </NavLink>
                {localStorage.getItem('isAuth') ?
                    <Nav className="ml-auto">
                        {isOrganizer &&
                            <Button
                                className="me-2"
                                style={{ color: "white" }}
                                onClick={() => navigate(COMPANY_ROUTE)}
                                variant='outlined-primary'
                            >
                                Панель компании
                            </Button>
                        }
                        <Button
                            className="me-2"
                            style={{ color: "white" }}
                            onClick={() => navigate(CLIENT_ROUTE)}
                            variant='outlined-primary'
                        >
                            Профиль
                        </Button>
                        <Button
                            className="me-2"
                            style={{ color: "white" }}
                            onClick={() => navigate(FAQ_ROUTE)}
                            variant='outlined-primary'
                        >
                            FAQ
                        </Button>
                        <Button
                            variant='outlined-primary'
                            style={{ color: "white" }}
                            onClick={() => logout()}
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <>
                        <Nav className="ml-auto">
                            <Button
                                className="me-2"
                                style={{ color: "white" }}
                                onClick={() => navigate(FAQ_ROUTE)}
                                variant='outlined-primary'
                            >
                                FAQ
                            </Button>
                            <Button
                                variant='outlined-primary'
                                style={{ color: "white" }}
                                onClick={() => navigate(LOGIN_ROUTE)}
                            >
                                Авторизация
                            </Button>
                        </Nav>
                    </>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;
