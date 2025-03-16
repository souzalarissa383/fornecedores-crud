import { Fornecedor } from "../entities/Fornecedor";
import { FornecedorRepository } from "../interfaces/FornecedorRepository";

export class CriarFornecedor {
  constructor(private fornecedorRepo: FornecedorRepository) {}

  async execute(fornecedor: Fornecedor): Promise<Fornecedor> {
    return this.fornecedorRepo.criar(fornecedor);
  }
}