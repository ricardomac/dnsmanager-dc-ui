import styled from "styled-components";

export const ContainerInput = styled.div`
  
  input {
    margin-right: 5px;
  &:last-child {
    margin-right: 0;
    width: 100px;
  }
  }
`;


export const Input = styled.input`
  border-radius: 6px;
  border: 0;
  background: ${(props) => props.theme["gray-900"]};
  color: ${(props) => props.theme["gray-300"]};
  padding: 1rem;
  width: 100px;

  &::placeholder {
    color: ${(props) => props.theme["gray-500"]};
  }
`;
