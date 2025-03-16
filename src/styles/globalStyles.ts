import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: #003875; /* Azul escuro para textos */
    background-color: #ffffff; /* Fundo branco */
  }

  h1, h2, h3, h4, h5, h6 {
    color: #003875; /* Azul escuro para títulos */
    margin: 0;
  }

  p {
    color: #666666; /* Cinza para textos comuns */
    line-height: 1.5;
  }

  a {
    color: #3fa1ff; /* Azul médio para links */
    text-decoration: none;
    &:hover {
      color: #4AC0FF; /* Azul claro para hover */
    }
  }

  button {
    background-color: #3fa1ff; /* Azul médio para botões */
    color: #ffffff; /* Texto branco */
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    &:hover {
      background-color: #4AC0FF; /* Azul claro para hover */
    }
  }

  input, textarea, select {
    border: 1px solid #efefef; /* Cinza claro 1 para bordas */
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    color: #003875; /* Azul escuro para texto */
    &:focus {
      outline: none;
      border-color: #3fa1ff; /* Azul médio para foco */
    }
  }

  .bg-azul-escuro {
    background-color: #003875; /* Azul escuro */
  }

  .bg-azul-medio {
    background-color: #3fa1ff; /* Azul médio */
  }

  .bg-azul-claro {
    background-color: #4AC0FF; /* Azul claro */
  }

  .bg-branco {
    background-color: #ffffff; /* Branco */
  }

  .bg-cinza {
    background-color: #666666; /* Cinza */
  }

  .bg-cinza-claro-1 {
    background-color: #efefef; /* Cinza claro 1 */
  }

  .bg-cinza-claro-2 {
    background-color: #f91919; /* Cinza claro 2 (vermelho) */
  }

  .text-azul-escuro {
    color: #003875; /* Azul escuro */
  }

  .text-azul-medio {
    color: #3fa1ff; /* Azul médio */
  }

  .text-azul-claro {
    color: #4AC0FF; /* Azul claro */
  }

  .text-branco {
    color: #ffffff; /* Branco */
  }

  .text-cinza {
    color: #666666; /* Cinza */
  }

  .text-cinza-claro-1 {
    color: #efefef; /* Cinza claro 1 */
  }

  .text-cinza-claro-2 {
    color: #f91919; /* Cinza claro 2 (vermelho) */
  }
`;