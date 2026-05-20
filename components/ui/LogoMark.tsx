import Image from "next/image";
import Link from "next/link";

export type LogoMarkProps = {
  src?: string;
  alt?: string;
  className?: string;
};

export function LogoMark({
  src = "/images/assets/freoli_logo.png",
  alt = "FREOLI ロゴ",
  className = "",
}: LogoMarkProps) {
  return (
    <Link
      href="/"
      aria-label="FREOLI ホーム"
      className={`group inline-block ${className}`.trim()}
    >
      <Image
        src={src}
        alt={alt}
        width={1536}
        height={953}
        className="h-[120px] md:h-[160px] w-auto object-contain transition-transform duration-200 group-hover:scale-105"
      />
    </Link>
  );
}
