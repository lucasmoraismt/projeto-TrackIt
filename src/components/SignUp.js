import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Loader from "react-loader-spinner";
import logo from "../assets/logo.png";
import Authentication from "../styled/Authentication";
import Input from "../styled/Input";
import Button from "../styled/Button";
import SwitchLink from "../styled/SwitchLink";
import Form from "../styled/Form";

export default function SignUp() {
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  let history = useHistory();

  function loading(e) {
    e.preventDefault();
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
  }

  return (
    <Authentication>
      <img src={logo} alt="Logo TrackIt" />
      <Form onSubmit={loading}>
        <Input
          type="text"
          placeholder="email"
          disabled={disabled}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="senha"
          disabled={disabled}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="nome"
          disabled={disabled}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="foto"
          disabled={disabled}
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <Button type="submit" disabled={disabled}>
          {disabled ? (
            <Loader type="ThreeDots" color="#FFF" height={45} width={80} />
          ) : (
            "Cadastrar"
          )}
        </Button>
      </Form>
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
