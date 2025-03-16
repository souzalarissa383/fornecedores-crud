import { Fornecedor } from "../../core/entities/Fornecedor";
import { FornecedorRepository } from "../../core/interfaces/FornecedorRepository";

export class FornecedorRepositoryImpl implements FornecedorRepository {
  private fornecedores: Fornecedor[] = [];

  async criar(fornecedor: Fornecedor): Promise<Fornecedor> {
    try {
      fornecedor.id = (this.fornecedores.length + 1).toString(); 
      this.fornecedores.push(fornecedor); 
      console.log("Fornecedor criado:", fornecedor); 
      return fornecedor;
    } catch (error) {
      console.error("Erro ao criar fornecedor:", error); 
      throw error; 
    }
  }

  async excluir(id: string): Promise<void> {
    try {
      this.fornecedores = this.fornecedores.filter((f) => f.id !== id); 
      console.log("Fornecedor excluído:", id); 
    } catch (error) {
      console.error("Erro ao excluir fornecedor:", error); 
      throw error; 
    }
  }

  async editar(fornecedorAtualizado: Fornecedor): Promise<Fornecedor> {
    try {
      const index = this.fornecedores.findIndex((f) => f.id === fornecedorAtualizado.id);

      if (index === -1) {
        console.log("Fornecedor não encontrado. Criando um novo fornecedor...");
        return await this.criar(fornecedorAtualizado);
      }

      this.fornecedores[index] = fornecedorAtualizado;
      console.log("Fornecedor editado:", fornecedorAtualizado); 
      return fornecedorAtualizado;
    } catch (error) {
      console.error("Erro ao editar fornecedor:", error); 
      throw error; 
    }
  }

  async listar(): Promise<Fornecedor[]> {
    try {
      return this.fornecedores; 
    } catch (error) {
      console.error("Erro ao listar fornecedores:", error); 
      throw error; 
    }
  }

  async buscarPorNome(nome: string): Promise<Fornecedor[]> {
    try {
      return this.fornecedores.filter((f) =>
        f.nome.toLowerCase().includes(nome.toLowerCase())
      ); 
    } catch (error) {
      console.error("Erro ao buscar fornecedores por nome:", error);
      throw error; 
    }
  }

  async buscarPorId(id: string): Promise<Fornecedor | null> {
    try {
      const fornecedor = this.fornecedores.find((f) => f.id === id) || null; 
      return fornecedor;
    } catch (error) {
      console.error("Erro ao buscar fornecedor por ID:", error); 
      throw error; 
    }
  }
}