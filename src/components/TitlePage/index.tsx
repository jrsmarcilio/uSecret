export interface TitlePageProps {
  title: string;
  subtitle: string;
}

export default function TitlePage({ title, subtitle }: TitlePageProps) {

  return (
    <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
      <div className="mr-6">
        <h1 className="text-4xl font-semibold mb-2">{title}</h1>
        <h2 className="text-gray-600 ml-0.5">{subtitle}</h2>
      </div>
    </div>
  );
}