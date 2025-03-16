import { createContext, useContext, useState, ReactNode } from "react";
import { Fornecedor } from "../core/entities/Fornecedor";
import { FornecedorRepositoryImpl } from "../data/repositories/FornecedorRepositoryImpl";

interface FornecedorContextType {
  fornecedores: Fornecedor[];
  adicionarFornecedor: (fornecedor: Fornecedor) => Promise<void>;
  excluirFornecedor: (id: string) => Promise<void>;
  editarFornecedor: (fornecedor: Fornecedor) => Promise<void>;
  atualizarFornecedores: () => Promise<void>;
  buscarFornecedorPorId: (id: string) => Promise<Fornecedor | null>;
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

  const adicionarFornecedor = async (fornecedor: Fornecedor) => {
    try {
      const novoFornecedor = await fornecedorRepository.criar(fornecedor);
      setFornecedores((prev) => [...prev, novoFornecedor]); 
      console.log("Fornecedor adicionado:", novoFornecedor); 
    } catch (error) {
      console.error("Erro ao adicionar fornecedor:", error); 
      throw error; 
    }
  };

  const excluirFornecedor = async (id: string) => {
    try {
      await fornecedorRepository.excluir(id);
      setFornecedores((prev) => prev.filter((f) => f.id !== id)); 
      console.log("Fornecedor excluído:", id);
    } catch (error) {
      console.error("Erro ao excluir fornecedor:", error); 
      throw error; 
    }
  };

  const editarFornecedor = async (fornecedor: Fornecedor) => {
    try {
      
      const fornecedorExistente = fornecedores.find((f) => f.id === fornecedor.id);
      if (!fornecedorExistente) {
        throw new Error("Fornecedor não encontrado no estado local");
      }

      
      const fornecedorAtualizado = await fornecedorRepository.editar(fornecedor);

      
      setFornecedores((prev) =>
        prev.map((f) => (f.id === fornecedorAtualizado.id ? fornecedorAtualizado : f))
      );

      console.log("Fornecedor editado no estado:", fornecedorAtualizado); 
    } catch (error) {
      console.error("Erro ao editar fornecedor:", error); 
      throw error; 
    }
  };

  const atualizarFornecedores = async () => {
    try {
      const listaAtualizada = await fornecedorRepository.listar();
      setFornecedores(listaAtualizada); 
      console.log("Lista de fornecedores atualizada:", listaAtualizada); 
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