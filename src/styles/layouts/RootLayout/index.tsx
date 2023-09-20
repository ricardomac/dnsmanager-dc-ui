import { Header } from "../../../components/Header";

export function RootLayout({ children }: any) {
  return (
    <>
      <div className="flex">
        <main className="flex-1 mx-auto">
          <Header />
          {children}
        </main>
      </div>
    </>
  );
}
