import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
    background-color: #ffffff;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #efefef;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #003875;
  &:focus {
    outline: none;
    border-color: #3fa1ff;
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: #3fa1ff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #4AC0FF;
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
    </Container>
  );
};

export default Login;