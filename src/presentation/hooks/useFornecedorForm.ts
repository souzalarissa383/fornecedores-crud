import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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

export const useFornecedorForm = (defaultValues?: Partial<Fornecedor>) => {
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

  return {
    register,
    handleSubmit,
    control,
    errors,
    handleCepBlur,
    setValue,
    trigger,
  };
};