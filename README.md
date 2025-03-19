# Gestão de Fornecedores

Este projeto foi desenvolvido para ajudar empresas na gestão de seus fornecedores, permitindo o controle de informações como contatos, endereços e gastos. O sistema oferece um CRUD completo para fornecedores, com funcionalidades adicionais como busca, exportação de dados e integração com APIs externas.

## Requisitos Funcionais

### Cadastro de Fornecedores:
- Cadastrar, visualizar, editar e excluir fornecedores.
- Mensagens de sucesso ou falha após cada ação.
- Campo de busca por nome na listagem de fornecedores.
- Preenchimento automático de endereço ao informar o CEP.

### Formulário de Fornecedor:
- **Campos obrigatórios:** Nome, Contato (nome e telefone), Endereço (CEP, Estado, Cidade, Logradouro, Número).
- **Validação de campos:** telefone formatado, CEP formatado, estado com 2 caracteres maiúsculos.

## Requisitos Técnicos

### Tecnologias:
- ReactJS com TypeScript.
- Styled Components para estilização.
- React Hook Form e Yup para validação de formulários.
- API ViaCEP para busca de endereços.

### Bibliotecas:
- `axios` para requisições HTTP.
- `react-toastify` para notificações.
- `react-router-dom` para roteamento.
- `json-server` para simulação de API (opcional).

### Identidade Visual:
- **Cores da paleta da VExpenses:**
  - Azul escuro (#003875)
  - Azul médio (#3fa1ff)
  - Azul claro (#4AC0FF)
  - Branco (#ffffff)
  - Cinza claro (#efefef)

### Responsividade:
- Layout funcional para desktop e mobile.

## Funcionalidades Extras

### Integração com WhatsApp:
- Abrir contato do fornecedor diretamente no WhatsApp.

### Exportação de Dados:
- Exportar lista de fornecedores em formato CSV.

### Autenticação:
- Sistema de login simples para acesso ao sistema.

### Integração com Google Maps:
- Visualizar localização do fornecedor no Google Maps.

## Como Executar o Projeto

### Pré-requisitos
- Node.js instalado (versão 16 ou superior).
- Yarn ou NPM instalado.

### Passos para Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/gestao-fornecedores.git
   cd gestao-fornecedores
   ```

2. Instale as dependências:
   ```bash
   yarn install
   # ou
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   yarn dev
   # ou
   npm run dev
   ```

4. Acesse a aplicação:
   - Abra o navegador e acesse: [http://localhost:3000](http://localhost:3000).

5. **Login:**
   - Utilize as credenciais:
     - **Usuário:** admin
     - **Senha:** admin

## Estrutura do Projeto

```
/src:
  /core: Entidades e interfaces do sistema.
  /data: Repositórios e serviços (ex: ViaCEP).
  /presentation: Componentes, páginas e contextos.
  /contexts: Contextos do React para gerenciamento de estado.
  /services: Serviços externos (ex: API ViaCEP).
/public: Arquivos estáticos.
```

