import Image from "next/image";

import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <header className="relative w-full bg-black overflow-hidden h-[524px] lg:h-[620px]">
      <Image
        src="/images/band/freoli_1.JPEG"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(148deg,rgba(56,189,248,0.22)_0%,rgba(34,211,238,0.14)_40%,transparent_66%)] lg:bg-[linear-gradient(148deg,rgba(56,189,248,0.20)_0%,rgba(34,211,238,0.12)_42%,transparent_68%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_18%,rgba(0,0,0,0.66)_60%,#000_100%)] lg:bg-[linear-gradient(to_bottom,transparent_22%,rgba(0,0,0,0.52)_55%,#000_100%)]"
        aria-hidden="true"
      />

      <div className="absolute bottom-0 left-0 right-0 px-[22px] pb-[30px] lg:px-16 lg:pb-14">
        <h1 className="font-inter font-extrabold text-[64px] md:text-[116px] tracking-[-0.03em] md:tracking-[-0.036em] leading-[0.92] md:leading-[0.88] text-zinc-50 mb-[11px] lg:mb-[18px]">
          FREOLI
        </h1>
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-9">
          <p className="font-jp font-medium text-xs md:text-[15px] tracking-[0.12em] md:tracking-[0.10em] text-sky-400 mb-6 lg:mb-0 leading-none">
            東京発、4人組インディーロック
          </p>
          <Button
            href="#next-live"
            variant="primary"
            className="self-start lg:self-auto px-[22px] py-[11px] md:px-7 md:py-[13px]"
          >
            NEXT LIVE
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M2 6h8M6 2l4 4-4 4" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
}
