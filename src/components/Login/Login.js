import { useState } from "react";
import styled, { css } from "styled-components";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import isEmail from "../isEmail";
import Loader from "react-loader-spinner";
import logo from "../../assets/logo.png";

export default function Login(props) {
  const { setToken } = props;
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function loading() {
    const isValid = isEmail(email);
    if (isValid && password.length >= 4) {
      setDisabled(true);
      const body = {
        email: email,
        password: password,
      };
      const request = axios.post(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
        body
      );

      request.then((response) => {
        setToken(request.data.token);
        // useHistory.push("/habits");
      });
      request.catch((error) => {
        alert(error.response.data.message);
        setDisabled(false);
      });
    } else {
      if (!isValid) {
        alert("Insira um e-mail válido!");
      }
      if (password.length < 4) {
        alert("Senha muito curta!");
      }
    }
  }

  return (
    <Authentication>
      <img src={logo} alt="Logo TrackIt" />
      <Input
        type="text"
        placeholder="email"
        disabled={disabled}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="senha"
        disabled={disabled}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={loading} disabled={disabled}>
        {disabled ? (
          <Loader type="ThreeDots" color="#FFF" height={45} width={80} />
        ) : (
          "Entrar"
        )}
      </Button>
      <Link to="/signup">
        <SwitchLink disabled={disabled}>
          Não tem uma conta? Cadastre-se!
        </SwitchLink>
      </Link>
    </Authentication>
  );
}

const Authentication = styled.div`
  width: 100%;
  background-color: #fff;
  padding-top: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 180px;
    height: 180px;
    margin-bottom: 30px;
  }
`;

const Input = styled.input`
  width: 300px;
  height: 45px;
  padding: 10px;
  margin-bottom: 6px;
  border: 1px solid #d5d5d5;
  border-radius: 5px;

  ::placeholder {
    font-size: 20px;
    line-height: 25px;
    color: #dbdbdb;
  }

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.6;
      pointerevents: "none";
    `};
`;

const Button = styled.button`
  width: 300px;
  height: 45px;
  background: #52b6ff;
  border-radius: 5px;
  border: none;
  margin-bottom: 25px;
  font-size: 21px;
  line-height: 26px;
  text-align: center;
  color: #fff;

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.6;
      pointerevents: "none";
    `};
`;

const SwitchLink = styled.p`
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  text-decoration-line: underline;
  color: #52b6ff;

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.6;
      pointerevents: "none";
    `};
`;
