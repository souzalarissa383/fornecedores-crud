import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #003875;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  color: #efefef;
  margin-bottom: 20px;
  font-weight: 600;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #efefef;
  border-radius: 4px;
  margin-bottom: 15px;
  font-size: 14px;
  color: #003875;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #3fa1ff;
  }

  &::placeholder {
    color: #666666;
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color: #3fa1ff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4AC0FF;
  }

  &:active {
    background-color: #003875;
  }
`;

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/listar-fornecedores");
    } else {
      alert("Usuário ou senha incorretos");
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <Form>
        <Input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Entrar</Button>
      </Form>
    </Container>
  );
};

export default Login;