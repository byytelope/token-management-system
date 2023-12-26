import ButtonLink from "@/components/custom/button-link";

export default async function Home() {
  return (
    <main className="flex flex-col flex-grow justify-between items-center w-full h-full py-24 px-32">
      <h1>Welcome to AIMS Diagnostic Care Token System</h1>
      <div className="grid grid-cols-2 gap-16 w-full">
        <ButtonLink href="/english">English</ButtonLink>
        <ButtonLink dhivehi href="/english">
          ދވހ
        </ButtonLink>
      </div>
      <h1 className="font-faruma">އއމސ ޑއގނސޓކކ ކއރ ޓކނ ޙދމތށ މރޙބ</h1>
    </main>
  );
}
