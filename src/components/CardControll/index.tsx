interface CardControllProps {
  size: "sm" | "lg";
  title: string;
  children?: React.ReactNode | React.ReactNode[];
}

export default function CardControll({ size, title, children }: CardControllProps) {
  return (
    <div className={`flex flex-col bg-white shadow rounded-lg ${size === 'sm' ? 'row-span-3' : 'md:col-span-2 md:row-span-2'}`}>
      <div className="px-6 py-5 font-semibold border-b border-gray-100">{title}</div>
      <div className="p-4 flex-grow">
        {children ? children : (
          <div className="flex items-center justify-center h-full px-4 py-24 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
            <span>Empty</span>
          </div>
        )}
      </div>
    </div>
  );
}