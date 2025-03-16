import { FornecedorRepository } from "../interfaces/FornecedorRepository";

export class ExcluirFornecedor {
  constructor(private fornecedorRepo: FornecedorRepository) {}

  async execute(id: string): Promise<void> {
    return this.fornecedorRepo.excluir(id);
  }
}