import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useFornecedorContext } from "../../contexts/FornecedorContext";
import { FornecedorForm } from "../components/FornecedorForm";
import { Fornecedor } from "../../core/entities/Fornecedor";

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
  color: #003875;
`;

const CadastroFornecedor: React.FC = () => {
  const navigate = useNavigate();
  const { adicionarFornecedor } = useFornecedorContext();

  const handleSubmit = async (data: Partial<Fornecedor>) => {
    try {
      await adicionarFornecedor(data as Fornecedor);
      toast.success("Fornecedor cadastrado com sucesso!");
      navigate("/listar-fornecedores");
    } catch (error) {
      console.error("Erro ao cadastrar fornecedor:", error);
      toast.error("Erro ao cadastrar fornecedor");
    }
  };

  return (
    <Container>
      <Title>Cadastrar Fornecedor</Title>
      <FornecedorForm
        onSubmit={handleSubmit}
        onCancel={() => navigate("/listar-fornecedores")}
      />
    </Container>
  );
};

export default CadastroFornecedor;