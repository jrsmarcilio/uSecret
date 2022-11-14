type BannerProps = {
  title?: string;
  urlImage?: string;
  gradient?: string;
}

export default function Banner({ gradient, title, urlImage }: BannerProps) {
  return (
    <div className="h-screen w-screen">
      <div className="
        w-full
        h-full
        bg-gradient-to-b from-indigo-500 via-transparent to-indigo-900
        opacity-25
        z-10
        bg-[url('/jason-dent-3wPJxh-piRw-unsplash.jpg')]
        bg-cover
        bg-center
        bg-no-repeat
      "></div>
    </div>
  );
}