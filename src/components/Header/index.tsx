import { HeaderContainer, HeaderContent } from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        {/* <img src={logoSvg} alt="" /> */}

        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            backgroundColor: "red",
            color: "white",
            padding: "8px",
            zIndex: 9999,
            borderBottomLeftRadius: 10,
            fontSize: "12px",
          }}
        >
          Versão teste
        </div>

        <div>
          <h1 className="font-bold">DNS Manager</h1>
          <small>
            Aplicação para realizar apontamentos interno no Domain
            Controller(DC), utilizando esta interface WEB.
          </small>
          <br />
        </div>
      </HeaderContent>
    </HeaderContainer>
  );
}
