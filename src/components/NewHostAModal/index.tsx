import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { HomeContext } from "../../contexts/HomeContext";
import { IPv4Input } from "../IPv4Input";
import { CloseButton, Content, Overlay } from "./styles";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const newHostAFormSchema = z.object({
  nomeHostA: z.string().toLowerCase(),
  fqdn: z.string().toLowerCase(),
  enderecoIp: z.string().array(),
});

type NewHostAFormInputs = z.infer<typeof newHostAFormSchema>;

export function NewHostAModal(props: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const { createHostA, zoneSelecionada, zoneRegistros } =
    useContext(HomeContext);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    reset,
  } = useForm<NewHostAFormInputs>({
    resolver: zodResolver(newHostAFormSchema),
    defaultValues: {
      fqdn: zoneSelecionada?.nome,
    },
  });

  useEffect(() => {
    if (props.isOpen) {
      setValue("fqdn", `${zoneSelecionada?.nome}`);
    }
  }, [props.isOpen]);

  async function handleCreateNewHostA(data: NewHostAFormInputs) {
    if (!zoneSelecionada) {
      return;
    }

    const { nomeHostA, fqdn, enderecoIp } = data;

    try {
      const enderecoIpString = enderecoIp.join(".");

      await createHostA({
        dominio: zoneSelecionada?.nome,
        nomeHostA,
        fqdn,
        enderecoIp: enderecoIpString,
      });

      reset();

      closeModal();

      zoneRegistros.unshift({
        nome: fqdn,
        valor: enderecoIpString,
      });

      toast.success("Solicitação bem-sucedida!", {
        position: "top-right",
        autoClose: 3000, // Fechar automaticamente após 3 segundos (opcional)
      });
    } catch (error) {
      // Tratar erros e exibir uma notificação de erro
      console.error("Erro na solicitação:", error);
      toast.error("Ocorreu um erro na solicitação.", {
        position: "top-right",
      });
    }
  }

  function closeModal() {
    props.onOpenChange(false);
  }

  return (
    <>
      <Dialog.Portal>
        <Overlay />

        <Content>
          <Dialog.Title>Novo Host (A or AAAA)</Dialog.Title>

          <CloseButton>
            <X size={24} />
          </CloseButton>

          <form onSubmit={handleSubmit(handleCreateNewHostA)}>
            <input
              type="text"
              placeholder="Nome"
              required
              {...register("nomeHostA", {
                onChange(event) {
                  setValue(
                    "fqdn",
                    event.target.value
                      ? `${event.target.value}.${zoneSelecionada?.nome}`.toLowerCase()
                      : `${zoneSelecionada?.nome}`
                  );
                },
              })}
            />

            <input
              type="text"
              placeholder="Nome de domínio totalmente qualificado (FQDN)"
              readOnly
              disabled
              {...register("fqdn")}
            />

            <Controller
              control={control}
              name="enderecoIp"
              defaultValue={["", "", "", ""]} // Inicialize com 4 strings vazias
              render={(_) => <IPv4Input control={control} name="enderecoIp" />}
            />

            <button type="submit" disabled={isSubmitting}>
              Cadastrar
            </button>
          </form>
        </Content>
      </Dialog.Portal>
      <ToastContainer />
    </>
  );
}

// const OptionItem = React.forwardRef(
//   ({ children, className, ...props }: any, forwardedRef) => {
//     return (
//       <SelectItem
//         className={classnames("SelectItem", className)}
//         {...props}
//         ref={forwardedRef}
//       >
//         <Select.ItemText>{children}</Select.ItemText>
//         <SelectItemIndicator>
//           <Check />
//         </SelectItemIndicator>
//       </SelectItem>
//     );
//   }
// );
