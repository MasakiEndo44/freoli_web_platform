import Image from "next/image";

export function Hero() {
  return (
    <header
      data-hero
      className="relative w-full overflow-hidden bg-black md:h-[620px] lg:h-[680px]"
    >
      <div className="relative aspect-[3/2] w-full bg-black md:absolute md:inset-0 md:aspect-auto">
        <Image
          src="/images/band/freoli_hero_current.jpg"
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
        className="hidden md:block absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.48)_0%,rgba(0,0,0,0.22)_34%,rgba(0,0,0,0.02)_68%,rgba(0,0,0,0.12)_100%)]"
        aria-hidden="true"
      />
      <div
        className="hidden md:block absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.10)_0%,transparent_24%,rgba(0,0,0,0.28)_60%,rgba(0,0,0,0.88)_100%)]"
        aria-hidden="true"
      />

      <div className="relative px-[22px] pt-7 pb-[30px] md:absolute md:bottom-0 md:left-0 md:right-0 md:px-10 md:pt-0 lg:px-16 lg:pb-14">
        <h1 className="mb-[10px] flex items-center gap-3 lg:mb-3 lg:gap-4">
          <Image
            src="/images/assets/freoli_symbol_white.png"
            alt=""
            width={2000}
            height={2000}
            priority
            className="h-[54px] w-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] md:h-[72px] lg:h-[84px]"
          />
          <span className="font-jp text-[42px] font-bold leading-none tracking-[0.02em] text-zinc-50 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] md:text-[56px] lg:text-[68px]">
            FREOLI
          </span>
        </h1>
        <p className="mb-2 font-jp text-xs font-semibold tracking-[0.16em] text-zinc-50 md:text-sm lg:text-base">
          Fresh Olive / フレッシュなオリーブ
        </p>
        <p className="font-jp font-medium text-xs md:text-[15px] tracking-[0.12em] md:tracking-[0.10em] text-sky-400 leading-none">
          東京発、4人組インディーロックバンド
        </p>
      </div>
    </header>
  );
}
