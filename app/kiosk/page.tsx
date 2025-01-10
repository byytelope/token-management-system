import KioskButton from "@/components/custom/kiosk-button";

export default async function Home() {
  const languages = [
    { name: "English", href: "/english" },
    { name: "ދިވެހި", href: "/dhivehi" },
  ];
  return (
    <main className="flex flex-col flex-grow justify-between items-center gap-8 text-center w-full h-full py-8 md:py-16 xl:py-24 px-12 xl:px-32">
      <h1 className="leading-relaxed font-medium">
        Welcome to the Token System
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-16 w-full my-auto">
        {languages.map((language, i) => (
          <KioskButton
            href={`kiosk/${language.href}`}
            animationDelay={i}
            key={language.href}
            dhivehi={language.name === "ދވހ"}
          >
            {language.name}
          </KioskButton>
        ))}
      </div>
      <h1 className="font-faruma leading-normal">ޓޯކަން ސިސްޓަމަށް މަރުހަބާ</h1>
    </main>
  );
}
