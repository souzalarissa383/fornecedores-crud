import { createContext, useContext, useState, ReactNode } from "react";
import { Fornecedor } from "../core/entities/Fornecedor";
import { FornecedorRepositoryImpl } from "../data/repositories/FornecedorRepositoryImpl";

interface FornecedorContextType {
  fornecedores: Fornecedor[];
  adicionarFornecedor: (fornecedor: Fornecedor) => Promise<void>;
  excluirFornecedor: (id: string) => Promise<void>;
  editarFornecedor: (fornecedor: Fornecedor) => Promise<void>;
  atualizarFornecedores: () => Promise<void>;
  buscarFornecedorPorId: (id: string) => Promise<Fornecedor | null>; // Adicione esta linha
}

const FornecedorContext = createContext<FornecedorContextType | undefined>(undefined);

export const useFornecedorContext = () => {
  const context = useContext(FornecedorContext);
  if (!context) {
    throw new Error("useFornecedorContext deve ser usado dentro de um FornecedorProvider");
  }
  return context;
};

interface FornecedorProviderProps {
  children: ReactNode;
}

export const FornecedorProvider: React.FC<FornecedorProviderProps> = ({ children }) => {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const fornecedorRepository = new FornecedorRepositoryImpl();

  const adicionarFornecedor = async (novoFornecedor: Fornecedor) => {
    try {
      const fornecedorCriado = await fornecedorRepository.criar(novoFornecedor);
      setFornecedores((prevFornecedores) => [...prevFornecedores, fornecedorCriado]);
    } catch (error) {
      console.error("Erro ao criar fornecedor", error);
    }
  };

  const excluirFornecedor = async (id: string) => {
    try {
      await fornecedorRepository.excluir(id);
      setFornecedores((prev) => prev.filter((f) => f.id !== id));
    } catch (error) {
      console.error("Erro ao excluir fornecedor:", error);
      throw error;
    }
  };

  const editarFornecedor = async (fornecedorEditado: Fornecedor) => {
    try {
      const fornecedorAtualizado = await fornecedorRepository.editar(fornecedorEditado);
      setFornecedores((prevFornecedores) =>
        prevFornecedores.map((f) => (f.id === fornecedorAtualizado.id ? fornecedorAtualizado : f))
      );
    } catch (error) {
      console.error("Erro ao editar fornecedor:", error);
      throw error;
    }
  };

  const atualizarFornecedores = async () => {
    try {
      const listaAtualizada = await fornecedorRepository.listar();
      setFornecedores(listaAtualizada);
    } catch (error) {
      console.error("Erro ao atualizar fornecedores:", error);
      throw error;
    }
  };

  const buscarFornecedorPorId = async (id: string) => {
    try {
      const fornecedor = await fornecedorRepository.buscarPorId(id);
      return fornecedor;
    } catch (error) {
      console.error("Erro ao buscar fornecedor por ID:", error);
      throw error;
    }
  };

  return (
    <FornecedorContext.Provider
      value={{
        fornecedores,
        adicionarFornecedor,
        excluirFornecedor,
        editarFornecedor,
        atualizarFornecedores,
        buscarFornecedorPorId, 
      }}
    >
      {children}
    </FornecedorContext.Provider>
  );
};