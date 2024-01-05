import ButtonLink from "@/components/custom/button-link";

export default async function Home() {
  const languages = [
    { name: "English", href: "/english" },
    { name: "ދިވެހި", href: "/dhivehi" },
  ];
  return (
    <main className="flex flex-col flex-grow justify-between items-center text-center w-full h-full py-16 xl:py-24 px-12 xl:px-32">
      <h1 className="leading-relaxed font-medium">
        Welcome to AIMS Diagnostic Care Token System
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-16 w-full">
        {languages.map((language, i) => (
          <ButtonLink
            href={language.href}
            animationDelay={i}
            key={i + language.href}
          >
            {language.name}
          </ButtonLink>
        ))}
      </div>
      <h1 className="font-faruma leading-loose">
        އެއިމްސް ޑައިގްނޯސްޓިކް ކެއާރ ޓޯކެން ޙިދުމަތަށް މަރުޙަބާ
      </h1>
    </main>
  );
}
