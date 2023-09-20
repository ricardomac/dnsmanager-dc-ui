import styled from "styled-components";

export const DNSContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  padding: 0 1.5rem;
`;

export const DNSTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;

  th {
    font-size: 0.875rem;
    text-align: left;
    padding: 0 1rem;
    background: none;
  }

  thead {
    tr {
      th {
        &:first-child {
          background: none;
        }
      }
    }
  }

  tbody {
    tr {
      background: ${(props) => props.theme["gray-700"]};

      &:hover {
        background: ${(props) => props.theme["gray-600"]};
      }
    }
  }

  td {
    padding: 0.875rem 1rem;
    font-size: 0.875rem;

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`;

export const AddHostButton = styled.button`
  height: 30px;
  border: 0;
  font-size: 0.875rem;
  background: ${(props) => props.theme["blue-500"]};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme["blue-700"]};
    transition: background-color 0.2s;
  }
`;
