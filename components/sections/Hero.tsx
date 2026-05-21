import Image from "next/image";

import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <header
      data-hero
      className="relative w-full overflow-hidden h-[524px] lg:h-[620px]"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-full aspect-[2/3]">
          <Image
            src="/images/band/freoli_1.JPEG"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-y-0 left-0 w-6 lg:w-20 bg-gradient-to-r from-black/85 to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute inset-y-0 right-0 w-6 lg:w-20 bg-gradient-to-l from-black/85 to-transparent"
            aria-hidden="true"
          />
        </div>
      </div>
      <div
        className="absolute inset-0 bg-[linear-gradient(148deg,rgba(56,189,248,0.22)_0%,rgba(34,211,238,0.14)_40%,transparent_66%)] lg:bg-[linear-gradient(148deg,rgba(56,189,248,0.20)_0%,rgba(34,211,238,0.12)_42%,transparent_68%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_18%,rgba(0,0,0,0.55)_60%,rgba(0,0,0,0.85)_100%)] lg:bg-[linear-gradient(to_bottom,transparent_22%,rgba(0,0,0,0.42)_55%,rgba(0,0,0,0.85)_100%)]"
        aria-hidden="true"
      />

      <div className="absolute bottom-0 left-0 right-0 px-[22px] pb-[30px] lg:px-16 lg:pb-14">
        <h1 className="mb-[11px] lg:mb-[18px]">
          <Image
            src="/images/assets/freoli_logo.png"
            alt="FREOLI"
            width={1486}
            height={354}
            priority
            className="h-[56px] md:h-[92px] lg:h-[104px] w-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
          />
        </h1>
        <p className="font-jp text-sm md:text-base lg:text-lg text-zinc-200 leading-relaxed mb-4 lg:mb-5 max-w-[28rem] lg:max-w-2xl">
          暗がりに沈んだ原風景を、音が光に変えて差し出す。東京の四人組。
        </p>
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
