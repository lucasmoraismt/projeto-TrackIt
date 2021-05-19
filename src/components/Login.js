import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import isEmail from "./isEmail";
import Loader from "react-loader-spinner";
import logo from "../assets/logo.png";
import Authentication from "../styled/Authentication";
import Input from "../styled/Input";
import Button from "../styled/Button";
import SwitchLink from "../styled/SwitchLink";
import UserContext from "../contexts/UserContext";

export default function Login() {
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  let history = useHistory();

  function loading() {
    const isValid = isEmail(email);
    if (isValid && password.length >= 4) {
      setDisabled(true);
      const body = {
        email,
        password,
      };
      const request = axios.post(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
        body
      );

      request.then((response) => {
        setUser(response.data);
        history.push("/today");
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
      <SwitchLink
        onClick={() => {
          if (disabled) {
            return;
          } else {
            history.push("/signup");
          }
        }}
        disabled={disabled}
      >
        Não tem uma conta? Cadastre-se!
      </SwitchLink>
    </Authentication>
  );
}
