import Image from "next/image";

import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <header
      data-hero
      className="relative w-full overflow-hidden bg-black md:h-[620px] lg:h-[680px]"
    >
      <div className="relative aspect-[3/2] w-full bg-black md:absolute md:inset-0 md:aspect-auto">
        <Image
          src="/images/band/freoli_live_20260327.JPG"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0.20)_100%)] md:hidden"
          aria-hidden="true"
        />
      </div>
      <div
        className="hidden md:block absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.34)_34%,rgba(0,0,0,0.08)_68%,rgba(0,0,0,0.24)_100%)]"
        aria-hidden="true"
      />
      <div
        className="hidden md:block absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.15)_0%,transparent_24%,rgba(0,0,0,0.40)_58%,rgba(0,0,0,0.92)_100%)]"
        aria-hidden="true"
      />
      <div
        className="hidden md:block absolute inset-0 bg-[radial-gradient(circle_at_62%_18%,rgba(56,189,248,0.20)_0%,transparent_30%),radial-gradient(circle_at_18%_24%,rgba(34,211,238,0.18)_0%,transparent_28%)]"
        aria-hidden="true"
      />

      <div className="relative px-[22px] pt-7 pb-[30px] md:absolute md:bottom-0 md:left-0 md:right-0 md:px-10 md:pt-0 lg:px-16 lg:pb-14">
        <h1 className="mb-[11px] lg:mb-[18px]">
          <Image
            src="/images/assets/freoli_logo.png"
            alt="FREOLI"
            width={1486}
            height={354}
            priority
            className="h-[37px] md:h-[61px] lg:h-[69px] w-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
          />
        </h1>
        <p className="font-jp text-sm md:text-base lg:text-lg text-zinc-200 leading-relaxed mb-4 lg:mb-5 max-w-[28rem] lg:max-w-2xl">
          夜の温度を残したまま、光の方へ鳴らしていく。
        </p>
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-9">
          <p className="font-jp font-medium text-xs md:text-[15px] tracking-[0.12em] md:tracking-[0.10em] text-sky-400 mb-6 lg:mb-0 leading-none">
            東京発、4人組インディーロックバンド
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
