import axios from "axios";

export class ViaCepService {
  async buscarEnderecoPorCep(cep: string) {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
  }
}