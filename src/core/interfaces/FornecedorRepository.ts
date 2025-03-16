import { Fornecedor } from "../entities/Fornecedor";

export interface FornecedorRepository {
  criar(fornecedor: Fornecedor): Promise<Fornecedor>;
  excluir(id: string): Promise<void>;
  listar(): Promise<Fornecedor[]>;
  editar(fornecedor: Fornecedor): Promise<Fornecedor>; 
  buscarPorNome(nome: string): Promise<Fornecedor[]>;
  buscarPorId(id: string): Promise<Fornecedor | null>;
}