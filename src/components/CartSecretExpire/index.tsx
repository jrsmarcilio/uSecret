interface CardSecretExpireProps {
  size: "sm" | "lg";
  title: string;
  children?: React.ReactNode | React.ReactNode[] ;
}

export default function CardSecretExpire({ size, title, children }: CardSecretExpireProps) {
  return (
    <div className={`flex flex-col bg-white shadow rounded-lg ${size === 'sm' ? 'row-span-3' : 'md:col-span-2 md:row-span-2'}`}>
      <div className="px-6 py-5 font-semibold border-b border-gray-100">{title}</div>
      <div className="p-4 flex-grow">
        <div className="flex items-center justify-center h-full px-4 py-24 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">{children ? children : 'None'}</div>
      </div>
    </div>
  );
}