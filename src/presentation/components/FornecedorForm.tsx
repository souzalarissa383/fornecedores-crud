import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";
import { Fornecedor } from "../../core/entities/Fornecedor";
import { ViaCepService } from "../../data/services/ViaCepService";

const schema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  descricao: yup.string().optional(),
  contatos: yup
    .array()
    .of(
      yup.object().shape({
        telefone: yup
          .string()
          .matches(/^\(\d{2}\) \d{4,5}\d{4}$/, "Telefone inválido")
          .required("Telefone do contato é obrigatório"),
      })
    )
    .min(1, "Pelo menos um contato é obrigatório")
    .required("Contatos são obrigatórios"),
  endereco: yup.object().shape({
    cep: yup
      .string()
      .matches(/^\d{5}-\d{3}$/, "CEP inválido")
      .required("CEP é obrigatório"),
    estado: yup.string().required("Estado é obrigatório"),
    cidade: yup.string().required("Cidade é obrigatória"),
    logradouro: yup.string().required("Logradouro é obrigatório"),
    numero: yup.string().required("Número é obrigatório"),
    referencia: yup.string().optional(),
  }),
});

interface FornecedorFormProps {
  onSubmit: (data: Partial<Fornecedor>) => Promise<void>;
  onCancel: () => void;
  defaultValues?: Partial<Fornecedor>; 
}
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #ffffff; /* Fundo branco */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #efefef; /* Cinza claro 1 para bordas */
  border-radius: 4px;
  font-size: 14px;
  color: #003875; /* Azul escuro para texto */
  &:focus {
    outline: none;
    border-color: #3fa1ff; /* Azul médio para foco */
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: #3fa1ff; /* Azul médio para botões */
  color: #ffffff; /* Texto branco */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #4AC0FF; /* Azul claro para hover */
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const CancelButton = styled(Button)`
  background-color: #f91919; /* Cinza claro 2 para cancelar */
  &:hover {
    background-color: #ff5722; /* Laranja para hover */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ErrorMessage = styled.span`
  color: #f91919; /* Cinza claro 2 para mensagens de erro */
  font-size: 14px;
`;

export const FornecedorForm: React.FC<FornecedorFormProps> = ({
  onSubmit,
  onCancel,
  defaultValues, 
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<Fornecedor>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      contatos: [{ telefone: "" }],
      endereco: {
        cep: "",
        estado: "",
        cidade: "",
        logradouro: "",
        numero: "",
        referencia: "",
      },
    },
  });

  const viaCepService = new ViaCepService();

  const handleCepBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const cep = event.target.value.replace(/\D/g, "");
    if (cep.length === 8) {
      try {
        const endereco = await viaCepService.buscarEnderecoPorCep(cep);
        setValue("endereco.estado", endereco.uf);
        setValue("endereco.cidade", endereco.localidade);
        setValue("endereco.logradouro", endereco.logradouro);
        await trigger("endereco");
      } catch (error) {
        console.error("Erro ao buscar endereço:", error);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("nome")} placeholder="Nome" />
      {errors.nome && <ErrorMessage>{errors.nome.message}</ErrorMessage>}

      <Input {...register("descricao")} placeholder="Descrição" />
      {errors.descricao && <ErrorMessage>{errors.descricao.message}</ErrorMessage>}

      <Controller
        name="contatos"
        control={control}
        defaultValue={[{ telefone: "" }]}
        render={({ field }) => (
          <div>
            {field.value.map((_, index) => (
              <div key={index}>
                <Input
                  {...register(`contatos.${index}.telefone`)}
                  placeholder="Telefone do contato"
                />
                {errors.contatos?.[index]?.telefone && (
                  <ErrorMessage>{errors.contatos[index]?.telefone?.message}</ErrorMessage>
                )}
              </div>
            ))}
          </div>
        )}
      />
      {errors.contatos && <ErrorMessage>{errors.contatos.message}</ErrorMessage>}

      <Input {...register("endereco.cep")} placeholder="CEP" onBlur={handleCepBlur} />
      {errors.endereco?.cep && <ErrorMessage>{errors.endereco.cep.message}</ErrorMessage>}

      <Input {...register("endereco.estado")} placeholder="Estado" />
      {errors.endereco?.estado && <ErrorMessage>{errors.endereco.estado.message}</ErrorMessage>}

      <Input {...register("endereco.cidade")} placeholder="Cidade" />
      {errors.endereco?.cidade && <ErrorMessage>{errors.endereco.cidade.message}</ErrorMessage>}

      <Input {...register("endereco.logradouro")} placeholder="Logradouro" />
      {errors.endereco?.logradouro && <ErrorMessage>{errors.endereco.logradouro.message}</ErrorMessage>}

      <Input {...register("endereco.numero")} placeholder="Número" />
      {errors.endereco?.numero && <ErrorMessage>{errors.endereco.numero.message}</ErrorMessage>}

      <Input {...register("endereco.referencia")} placeholder="Referência" />

      <ButtonContainer>
        <Button type="submit">Salvar</Button>
        <CancelButton type="button" onClick={onCancel}>
          Cancelar
        </CancelButton>
      </ButtonContainer>
    </Form>
  );
};