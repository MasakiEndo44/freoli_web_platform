import Image from "next/image";
import Link from "next/link";

export type LogoMarkProps = {
  src?: string;
  alt?: string;
  className?: string;
};

export function LogoMark({
  src = "/images/assets/freoli_logo.jpg",
  alt = "FREOLI ロゴ",
  className = "",
}: LogoMarkProps) {
  return (
    <Link
      href="/"
      aria-label="FREOLI ホーム"
      className={`group inline-block ${className}`.trim()}
    >
      <span className="block w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden bg-black/40 backdrop-blur-sm ring-1 ring-white/10 shadow-lg shadow-black/40 transition-transform duration-200 group-hover:scale-105">
        <Image
          src={src}
          alt={alt}
          width={64}
          height={64}
          className="w-full h-full object-cover"
        />
      </span>
    </Link>
  );
}
