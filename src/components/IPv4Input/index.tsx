import { useRef } from "react";
import { Controller } from "react-hook-form";
import { ContainerInput, Input } from "./styles";

export function IPv4Input({ control, name }: { control: any; name: string }) {
  const inputRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  //const [concatenatedValue, setConcatenatedValue] = useState("");

  //   const handleInputChange = (
  //     e: ChangeEvent<HTMLInputElement>,
  //     index: number
  //   ) => {
  //     const value = e.target.value;
  //     const nextIndex = index + 1;

  //     // Atualize o valor no estado local
  //     const newConcatenatedValue = [...concatenatedValue];
  //     newConcatenatedValue[index] = value;
  //     setConcatenatedValue(newConcatenatedValue.join(""));

  //     // Verifique se o valor é um número e se está dentro de 0-255
  //     if (
  //       /^\d+$/.test(value) &&
  //       parseInt(value, 10) >= 0 &&
  //       parseInt(value, 10) <= 255
  //     ) {
  //       // Preencha o próximo campo se o comprimento for igual a 3
  //       if (value.length === 3 && nextIndex < inputRefs.length) {
  //         inputRefs[nextIndex].current?.focus();
  //       }
  //     } else {
  //       // Limpe o campo se o valor não for válido
  //       e.target.value = "";
  //     }

  //     // Se estiver no último campo e o valor tiver 3 dígitos, não faça nada
  //     if (index === inputRefs.length - 1 && value.length === 3) {
  //       e.preventDefault();
  //       return;
  //     }
  //   };

  //   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
  //     if (e.key === "Backspace" && index > 0 && e.currentTarget.value === "") {
  //       // Pressionou Backspace, campo não está vazio, e estamos no campo 1-3
  //       // Mova o foco para o campo anterior
  //       inputRefs[index - 1].current?.focus();
  //     } else if (e.key === "ArrowLeft" && index > 0) {
  //       // Pressionou a seta esquerda, estamos no campo 1-3
  //       // Mova o foco para o campo anterior
  //       inputRefs[index - 1].current?.focus();
  //     } else if (e.key === "ArrowRight" && index < inputRefs.length - 1) {
  //       // Pressionou a seta direita, estamos no campo 0-2
  //       // Mova o foco para o próximo campo
  //       inputRefs[index + 1].current?.focus();
  //     }
  //   };

  //   const handleInputFocus = (e: ChangeEvent<HTMLInputElement>) => {
  //     // Quando o campo ganha foco, coloque o cursor no final do valor
  //     e.target.selectionStart = e.target.value.length;
  //     e.target.selectionEnd = e.target.value.length;
  //   };

  return (
    <ContainerInput>
      {inputRefs.map((_, index) => (
        <Controller
          key={index}
          name={`${name}[${index}]`}
          control={control}
          defaultValue=""
          render={({ field }) => {
            return (
              <Input
                {...field}
                type="text"
                maxLength={3}
                placeholder="000"
                // onChange={(e) => handleInputChange(e, index)}
                // onKeyDown={(e) => handleKeyDown(e, index)}
              />
            );
          }}
        />
      ))}
    </ContainerInput>
  );
}
