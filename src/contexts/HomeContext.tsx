import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

export interface DNSZoneRegistro {
  nome: string;
  valor: string;
}

export interface DNSZone {
  nome: string;
  registros: DNSZoneRegistro[];
}

interface CreateHostAInput {
  dominio: string;
  nomeHostA: string;
  fqdn: string;
  enderecoIp: string;
}

interface DeleteHostAInput {
  nomeHostA: string;
}

interface HomeContextType {
  dnsZones: DNSZone[];
  zoneSelecionada: DNSZone | null;
  zoneRegistros: DNSZoneRegistro[];
  fetchDnsZones: (query?: string) => Promise<void>;
  createHostA: (data: CreateHostAInput) => Promise<void>;
  deleteHostA: (data: DeleteHostAInput) => Promise<void>;
  expandirLinha: (dnsZone: DNSZone) => void;
  removeItemZoneRegistros: (dnsZoneRegistro: DNSZoneRegistro) => void;
}

interface HomeProviderProps {
  children: ReactNode;
}

export const HomeContext = createContext({} as HomeContextType);

export function HomeProvider({ children }: HomeProviderProps) {
  const [dnsZones, setDnsZones] = useState<DNSZone[]>([]);
  const [zoneSelecionada, setZoneSelecionada] = useState<DNSZone | null>(null);
  const [zoneRegistros, setZoneRegistros] = useState<DNSZoneRegistro[]>([]);

  function expandirLinha(dnsZone: DNSZone) {
    if (zoneSelecionada?.nome === dnsZone.nome) {
      setZoneSelecionada(null);
      setZoneRegistros([]);
    } else {
      setZoneSelecionada(dnsZone);
      setZoneRegistros(dnsZone.registros);
    }
  }

  function removeItemZoneRegistros(dNSZoneRegistro: DNSZoneRegistro) {
    console.log(dNSZoneRegistro);
    const newZoneRegistros = zoneRegistros.filter(
      (v) => v.nome != dNSZoneRegistro.nome
    );

    setZoneRegistros(newZoneRegistros);
  }

  async function fetchDnsZones() {
    const response = await api.get("dnsZones");
    setDnsZones(response.data);
  }

  async function createHostA(data: CreateHostAInput) {
    const { dominio, nomeHostA, fqdn, enderecoIp } = data;

    await api.post("dns/host/a", {
      dominio,
      nomeHostA,
      fqdn,
      enderecoIp,
    });
  }

  async function deleteHostA(data: DeleteHostAInput) {
    const { nomeHostA } = data;

    await api.delete("dns/host/a", {
      params: {
        nomeHostA,
      },
    });
  }

  useEffect(() => {
    fetchDnsZones();
  }, []);
  return (
    <HomeContext.Provider
      value={{
        dnsZones,
        fetchDnsZones,
        createHostA,
        deleteHostA,
        expandirLinha,
        removeItemZoneRegistros,
        zoneSelecionada,
        zoneRegistros,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
