import { Fornecedor } from "../entities/Fornecedor";
import { FornecedorRepository } from "../interfaces/FornecedorRepository";

export class ListarFornecedores {
  constructor(private fornecedorRepo: FornecedorRepository) {}

  async execute(): Promise<Fornecedor[]> {
    return this.fornecedorRepo.listar();
  }
}