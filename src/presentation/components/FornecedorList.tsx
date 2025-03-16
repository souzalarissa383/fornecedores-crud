import React, { useState } from "react";
import styled from "styled-components";
import { Fornecedor } from "../../core/entities/Fornecedor";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff; /* Fundo branco */
  margin-top: 20px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Th = styled.th`
  padding: 10px;
  border: 1px solid #efefef; /* Cinza claro 1 para bordas */
  background-color: #003875; /* Azul escuro para fundo */
  color: #ffffff; /* Texto branco */

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #efefef; /* Cinza claro 1 para bordas */
  color: #003875; /* Azul escuro para texto */

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const Button = styled.button`
  padding: 5px 10px;
  margin-right: 5px;
  background-color: #3fa1ff; /* Azul médio para botões */
  color: #ffffff; /* Texto branco */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #4AC0FF; /* Azul claro para hover */
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 8px;
  }
`;

const WhatsAppButton = styled(Button)`
  background-color: #25d366; /* Verde do WhatsApp */
  &:hover {
    background-color: #128C7E; /* Verde mais escuro para hover */
  }
`;

const ExportButton = styled(Button)`
  background-color: #28a745; /* Verde para exportar */
  &:hover {
    background-color: #218838; /* Verde mais escuro para hover */
  }
`;

const MapsButton = styled(Button)`
  background-color: #ff5722; /* Laranja para Maps */
  &:hover {
    background-color: #e64a19; /* Laranja mais escuro para hover */
  }
`;

const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #efefef; /* Cinza claro 1 para bordas */
  border-radius: 4px;
  font-size: 14px;
  color: #003875; /* Azul escuro para texto */
  margin-bottom: 10px;
  width: 100%;
  max-width: 300px;

  &:focus {
    outline: none;
    border-color: #3fa1ff; /* Azul médio para foco */
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px;
  }
`;

interface FornecedorListProps {
  fornecedores: Fornecedor[];
  onDelete: (id: string) => void;
  onEdit: (fornecedor: Fornecedor) => void;
}

export const FornecedorList: React.FC<FornecedorListProps> = ({ fornecedores, onDelete, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFornecedores = fornecedores.filter((fornecedor) =>
    fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleWhatsAppClick = (telefone: string) => {
    const url = `https://wa.me/${telefone.replace(/\D/g, '')}`;
    window.open(url, '_blank');
  };

  const handleExportCSV = () => {
    const headers = ["Nome", "Descrição", "Telefone", "CEP", "Estado", "Cidade", "Logradouro", "Número", "Referência"];
    const rows = fornecedores.map(fornecedor => [
      fornecedor.nome,
      fornecedor.descricao || '',
      fornecedor.contatos[0].telefone,
      fornecedor.endereco.cep,
      fornecedor.endereco.estado,
      fornecedor.endereco.cidade,
      fornecedor.endereco.logradouro,
      fornecedor.endereco.numero,
      fornecedor.endereco.referencia || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'fornecedores.csv';
    link.click();
  };

  const handleMapsClick = (endereco: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      <SearchInput
        type="text"
        placeholder="Buscar por nome"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ExportButton onClick={handleExportCSV}>Exportar CSV</ExportButton>
      <Table>
        <thead>
          <tr>
            <Th>Nome</Th>
            <Th>Descrição</Th>
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody>
          {filteredFornecedores.map((fornecedor) => (
            <tr key={fornecedor.id}>
              <Td>{fornecedor.nome}</Td>
              <Td>{fornecedor.descricao}</Td>
              <Td>
                <Button onClick={() => onEdit(fornecedor)}>Editar</Button>
                <Button onClick={() => onDelete(fornecedor.id!)}>Excluir</Button>
                <WhatsAppButton onClick={() => handleWhatsAppClick(fornecedor.contatos[0].telefone)}>
                  WhatsApp
                </WhatsAppButton>
                <MapsButton onClick={() => handleMapsClick(`${fornecedor.endereco.logradouro}, ${fornecedor.endereco.numero}, ${fornecedor.endereco.cidade}, ${fornecedor.endereco.estado}`)}>
                  Maps
                </MapsButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};