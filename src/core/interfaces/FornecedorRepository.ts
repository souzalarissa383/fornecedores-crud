import { Fornecedor } from "../entities/Fornecedor";

export interface FornecedorRepository {
  criar(fornecedor: Fornecedor): Promise<Fornecedor>;
  excluir(id: string): Promise<void>;
  editar(fornecedor: Fornecedor): Promise<Fornecedor>;
  listar(): Promise<Fornecedor[]>;
  buscarPorNome(nome: string): Promise<Fornecedor[]>;
  buscarPorId(id: string): Promise<Fornecedor | null>;
}