import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DNSZoneRegistro, HomeContext } from "../../contexts/HomeContext";
import { ActionButton, CancelButton, Content, Overlay } from "./styles";

export function DialogConfirmDelete(props: {
  dnsZoneRegistro: DNSZoneRegistro;
  isConfirmationOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const { deleteHostA, removeItemZoneRegistros } = useContext(HomeContext);

  async function handleDeleteNewHostA() {
    const { nome, valor } = props.dnsZoneRegistro;

    try {
      await deleteHostA({
        nomeHostA: nome,
      });

      toast.success("Solicitação bem-sucedida!", {
        position: "top-right",
        autoClose: 3000, // Fechar automaticamente após 3 segundos (opcional)
      });

      removeItemZoneRegistros({
        nome,
        valor,
      });
    } catch (error) {
      // Tratar erros e exibir uma notificação de erro
      console.error("Erro na solicitação:", error);
      toast.error("Ocorreu um erro na solicitação.", {
        position: "top-right",
      });
    }
  }

  return (
    <>
      <AlertDialog.Portal>
        <Overlay />

        <Content>
          <AlertDialog.Title className="text-xl font-semibold mb-2">
            Excluir DNS Host (A)
          </AlertDialog.Title>
          <AlertDialog.Description className="text-gray-300 text-base">
            Tem certeza de que deseja excluir este DNS Host (A)? <br />
            {props.dnsZoneRegistro.nome}
          </AlertDialog.Description>
          <div className="flex justify-end gap-[25px]">
            <CancelButton className={"bg-red-500"} asChild>
              <button>Cancelar</button>
            </CancelButton>
            <ActionButton className={"bg-blue-500"} asChild>
              <button onClick={handleDeleteNewHostA}>Sim, deletar</button>
            </ActionButton>
          </div>
        </Content>
      </AlertDialog.Portal>
      <ToastContainer />
    </>
  );
}
