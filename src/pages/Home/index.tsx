import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Dialog from "@radix-ui/react-dialog";
import { CaretRight, Trash } from "phosphor-react";
import { useContext, useState } from "react";
import { DialogConfirmDelete } from "../../components/DialogConfirmDelete";
import { NewHostAModal } from "../../components/NewHostAModal";
import { DNSZoneRegistro, HomeContext } from "../../contexts/HomeContext";
import { AddHostButton, DNSContainer, DNSTable } from "./styles";

export function Home() {
  const { dnsZones, expandirLinha, zoneRegistros, zoneSelecionada } =
    useContext(HomeContext);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<DNSZoneRegistro>(
    {} as DNSZoneRegistro
  );

  function handleDialogConfirmDelete(dnsZoneRegistro: DNSZoneRegistro) {
    setItemToDelete(dnsZoneRegistro);
    setIsConfirmationOpen(true);
  }

  return (
    <div className="flex">
      <div className="w-1/3 p-4">
        <DNSContainer>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Forward Lookup Zones</h2>
            <AddHostButton>Add Zone</AddHostButton>
          </div>
          <hr className="border-t border-gray-600 my-4" />
          <DNSTable>
            <thead>
              <tr>
                <th>Nome</th>
              </tr>
            </thead>
            <tbody>
              {dnsZones.map((dnsZone) => {
                return (
                  <tr
                    style={{ cursor: "pointer" }}
                    key={dnsZone.nome}
                    onClick={() => expandirLinha(dnsZone)}
                  >
                    <td width="100%">
                      <div className="flex justify-between items-center">
                        {dnsZone.nome} <CaretRight color="gray" size={16} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </DNSTable>
        </DNSContainer>
      </div>
      <div className="w-1/3 p-4">
        {zoneSelecionada !== null && (
          <DNSContainer>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Hosts</h2>
              <small className="font-semibold">{zoneSelecionada.nome}</small>
              <Dialog.Root open={isOpenModal} onOpenChange={setIsOpenModal}>
                <Dialog.Trigger asChild>
                  <AddHostButton>Add Host (A)</AddHostButton>
                </Dialog.Trigger>
                <NewHostAModal
                  isOpen={isOpenModal}
                  onOpenChange={setIsOpenModal}
                />
              </Dialog.Root>
            </div>
            <hr className="border-t border-gray-600 my-4" />
            <DNSTable>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>IP Address</th>
                </tr>
              </thead>
              <tbody>
                {zoneRegistros.map((dnsZoneRegistro) => {
                  return (
                    <tr key={dnsZoneRegistro.nome}>
                      <td width="100%">
                        <div className="flex items-center">
                          {dnsZoneRegistro.nome}
                        </div>
                      </td>
                      <td>{dnsZoneRegistro.valor}</td>
                      <td>
                        <Trash
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            handleDialogConfirmDelete(dnsZoneRegistro);
                          }}
                          size={18}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </DNSTable>
            <AlertDialog.Root
              open={isConfirmationOpen}
              onOpenChange={setIsConfirmationOpen}
            >
              <AlertDialog.Trigger asChild></AlertDialog.Trigger>
              <DialogConfirmDelete
                dnsZoneRegistro={itemToDelete}
                isConfirmationOpen={isConfirmationOpen}
                onOpenChange={setIsConfirmationOpen}
              />
            </AlertDialog.Root>
          </DNSContainer>
        )}
      </div>
    </div>
  );
}
