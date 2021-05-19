import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import isEmail from "./isEmail";
import isURL from "./isURL";
import Loader from "react-loader-spinner";
import logo from "../assets/logo.png";
import Authentication from "../styled/Authentication";
import Input from "../styled/Input";
import Button from "../styled/Button";
import SwitchLink from "../styled/SwitchLink";

export default function SignUp() {
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  let history = useHistory();

  function loading() {
    const isValid = isEmail(email);
    const isUrl = isURL(image);
    if (isValid && password.length >= 4) {
      setDisabled(true);
      const body = {
        email,
        name,
        image,
        password,
      };
      const request = axios.post(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
        body
      );

      request.then(() => {
        history.push("/");
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
      if (name.length < 1) {
        alert("Coloque um nome válido!");
      }
      if (!isUrl) {
        alert("Insira uma imagem válida!");
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
      <Input
        type="text"
        placeholder="nome"
        disabled={disabled}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="foto"
        disabled={disabled}
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button onClick={loading} disabled={disabled}>
        {disabled ? (
          <Loader type="ThreeDots" color="#FFF" height={45} width={80} />
        ) : (
          "Cadastrar"
        )}
      </Button>
      <SwitchLink
        onClick={() => {
          if (disabled) {
            return;
          } else {
            history.push("/");
          }
        }}
        disabled={disabled}
      >
        Já tem uma conta? Faça login!
      </SwitchLink>
    </Authentication>
  );
}
