import { Button, withStyles } from '@material-ui/core';
import {useState} from 'react';
import {Form, Card, Col, Row, Alert} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axiosDB from './../../../axiosDB';
import * as actions from './../../../store/actions';


const purple = "#551281";
const   PurpleButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple),
      backgroundColor: purple,
      '&:hover': {
        backgroundColor: purple,
      },
      marginTop: "10px"
    },
  }))(Button);

const LoginPage = (props) => {

    const dispatch = useDispatch();
    const loginFail = useSelector(state => state.loginErr);

    const [regSuccess, setRegSuccess] = useState(false);
    const [regFail, setRegFail] = useState(false);

    const [processing, setProcessing] = useState(false);

    const handleSubmitLoginForm = (event) => {
        event.preventDefault()
        let login = event.target[0].value;
        let pass = event.target[1].value;

        dispatch(actions.fetchUserLogin(login, pass));
    }

    const handleSubmitRegisterForm = (event) => {
        event.preventDefault()
        setProcessing(true);

        var name = event.target[0].value;
        var gender = event.target[1].value
        var login = event.target[2].value;
        var pass1 = event.target[3].value;
        var pass2 = event.target[4].value;
        if(pass1 === pass2){
            let userData = {
                username: login,
                password: pass1,
                name: name,
                gender: gender
            }
            console.log(userData)
            axiosDB.post('/user', userData)
                    .then(res => {
                        setProcessing(false)
                        if(res.status === 200){
                            setRegSuccess(true)
                        }
                    }).catch(err => {
                        setProcessing(false)
                        setRegFail(true);
                    })
            .catch(err => {
                setProcessing(false)
                setRegFail(true);
            })
        }else{
            setProcessing(false)
            setRegFail(true);
        }
    }

    const errLogin = (
        <Alert variant="danger">
            <Alert.Heading>O nie!</Alert.Heading>
            <p>
            Nie udało się zalogować! Podano błędne dane lub wystąpił błąd serwera... Spróbuj ponownie
            </p>
      </Alert>
    )

    const errRegister = (
        <Alert variant="danger" onClose={() => setRegFail(false)} dismissible>
            <Alert.Heading>O nie!</Alert.Heading>
            <p>
            Nie udało się zarejestrować! Podano błędne dane lub wystąpił błąd serwera... Spróbuj ponownie
            </p>
      </Alert>
    )

    const succRegister = (
        <Alert variant="success" onClose={() => setRegSuccess(false)} dismissible>
            <Alert.Heading>Poprawnie utworzono konto!</Alert.Heading>
            <p>
            Teraz możesz się zalogować
            </p>
      </Alert>
    )

    return (
        <Row style={{margin: "40px"}}>
            <Col>
                <Card style={{padding: "20px"}}>
                    {loginFail ? errLogin : null}
                    <Card.Title>
                        Zaloguj się 
                    </Card.Title>
                    <Card.Body>
                        <Form onSubmit={handleSubmitLoginForm}>
                            <Form.Group className="mb-3" controlId="log_login">
                                <Form.Label>Login</Form.Label>
                                <Form.Control type="text" placeholder="Podaj login" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="log_pass">
                                <Form.Label>Hasło</Form.Label>
                                <Form.Control type="password" placeholder="Podaj hasło" />
                            </Form.Group>
                            <PurpleButton variant="contained" color="primary" type='submit'>
                                Zaloguj
                            </PurpleButton>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card style={{padding: "20px"}}>
                    {regFail ? errRegister : null}
                    {regSuccess ? succRegister : null}
                    <Card.Title>
                        Zarejestruj się 
                    </Card.Title>
                    <Card.Body>
                        <Form onSubmit={handleSubmitRegisterForm}>
                            <Form.Group className="mb-3" controlId="reg_name">
                                <Form.Label>Imie</Form.Label>
                                <Form.Control type="text" placeholder="Podaj imię" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="reg_gender">
                                <Form.Label>Płeć:</Form.Label>
                                <Form.Select>
                                    <option value="f">kobieta</option>
                                    <option value="m">mężczyzna</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="reg_email">
                                <Form.Label>Login</Form.Label>
                                <Form.Control type="text" placeholder="Podaj login" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="reg_pass_1">
                                <Form.Label>Hasło</Form.Label>
                                <Form.Control type="password" placeholder="Podaj hasło" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="reg_pass_2">
                                <Form.Label>Powtórz hasło</Form.Label>
                                <Form.Control type="password" placeholder="Powtórz hasło" />
                            </Form.Group>
                            <PurpleButton variant="contained" color="primary" type='submit'>
                                Utwórz konto
                            </PurpleButton>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default LoginPage;