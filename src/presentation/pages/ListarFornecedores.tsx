import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Fornecedor } from "../../core/entities/Fornecedor";
import { useFornecedorContext } from "../../contexts/FornecedorContext";
import { FornecedorForm } from "../components/FornecedorForm";
import { Notification } from "../components/Notification";
import FornecedorList from "../components/FornecedorList";
import { Modal } from "../components/Modal";

const Container = styled.div`
  padding: 20px;
  background-color: #ffffff;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #003875;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #3fa1ff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
  &:hover {
    background-color: #4ac0ff;
  }
`;

const ListarFornecedoresPage: React.FC = () => {
  const {
    fornecedores,
    adicionarFornecedor,
    excluirFornecedor,
    editarFornecedor,
    atualizarFornecedores,
  } = useFornecedorContext();
  const [isCadastro, setIsCadastro] = useState(false);
  const [fornecedorParaEditar, setFornecedorParaEditar] = useState<Fornecedor | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const carregarFornecedores = async () => {
      try {
        await atualizarFornecedores();
      } catch (error) {
        setNotification({ message: "Erro ao carregar fornecedores", type: "error" });
      }
    };

    carregarFornecedores();
  }, []);

  const handleCadastrar = async (data: Partial<Fornecedor>) => {
    try {
      if (fornecedorParaEditar) {

        await editarFornecedor({ ...fornecedorParaEditar, ...data } as Fornecedor);
        setNotification({ message: "Fornecedor editado com sucesso!", type: "success" });
      } else {

        const novoFornecedor: Fornecedor = { ...data, id: crypto.randomUUID() } as Fornecedor;
        await adicionarFornecedor(novoFornecedor);
        setNotification({ message: "Fornecedor salvo com sucesso!", type: "success" });
      }

      setIsCadastro(false);
      setFornecedorParaEditar(null);
    } catch (error) {
      setNotification({ message: "Erro ao salvar fornecedor", type: "error" });
    }
  };

  const handleExcluir = async (id: string) => {
    try {
      await excluirFornecedor(id);
      await atualizarFornecedores();
      setNotification({ message: "Fornecedor excluído com sucesso!", type: "success" });
    } catch (error) {
      setNotification({ message: "Erro ao excluir fornecedor", type: "error" });
    }
  };

  const handleEditar = (fornecedor: Fornecedor) => {
    setFornecedorParaEditar(fornecedor);
    setIsCadastro(true);
  };

  return (
    <Container>
      <Title>Lista de Fornecedores</Title>
      {notification && <Notification message={notification.message} type={notification.type} isVisible={false} />}

      <Button onClick={() => {
        setFornecedorParaEditar(null);
        setIsCadastro(true);
      }}>
        Cadastrar Novo Fornecedor
      </Button>

      {isCadastro && (
        <Modal isOpen={isCadastro} onClose={() => setIsCadastro(false)}>
          <FornecedorForm
            onSubmit={handleCadastrar}
            onCancel={() => {
              setIsCadastro(false);
              setFornecedorParaEditar(null);
            }}
            defaultValues={fornecedorParaEditar || undefined}
          />
        </Modal>
      )}

      <FornecedorList
        fornecedores={fornecedores}
        onDelete={handleExcluir}
        onEdit={handleEditar}
      />
    </Container>
  );
};

export default ListarFornecedoresPage;