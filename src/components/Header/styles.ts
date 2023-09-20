import styled from "styled-components";

export const HeaderContainer = styled.header`
  background-color: ${(props) => props.theme["gray-600"]} !important;
  /* padding: 2.5rem 0 7.5rem; */
  padding: 1rem;

`;

export const HeaderContent = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;