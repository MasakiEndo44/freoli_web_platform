import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { members } from "@/data/members";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";

function findMember(id: string) {
  return members.find((member) => member.id === id);
}

export function generateStaticParams() {
  return members.map((member) => ({ id: member.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const member = findMember(params.id);
  if (!member) return { title: "Member | FREOLI" };

  return {
    title: `${member.displayName} | FREOLI`,
    description: `FREOLI ${member.displayName} のプロフィール。`,
  };
}

export default function MemberDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const member = findMember(params.id);
  if (!member) notFound();

  return (
    <main className="min-h-screen overflow-x-hidden bg-black/85">
      <section className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-8 md:px-8 md:py-14">
        <Link
          href="/#members"
          className="mb-10 inline-flex font-inter text-[10px] font-semibold tracking-[0.18em] text-cyan-400 uppercase underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Members
        </Link>

        <div className="grid w-full max-w-full gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,440px)] lg:items-start">
          <div className="min-w-0 max-w-full overflow-hidden">
            <div className="lg:block">
              <figure className="mx-auto mb-8 w-full max-w-[360px] lg:hidden">
                <div className="relative aspect-square overflow-hidden rounded-md border border-zinc-800 bg-zinc-950">
                  {member.photoPath ? (
                    <Image
                      src={member.photoPath}
                      alt={`${member.displayName}（${member.partLabel}）のポートレート`}
                      fill
                      priority
                      sizes="calc(100vw - 32px)"
                      className="object-contain"
                    />
                  ) : null}
                </div>
              </figure>

              <div className="min-w-0 max-w-full overflow-hidden">
                <Heading variant="eyebrow" className="mb-4">
                  Member Profile
                </Heading>
                <h1 className="break-words font-jp text-5xl font-bold leading-none tracking-[-0.02em] text-zinc-50 md:text-7xl">
                  {member.displayName}
                </h1>
                <p className="mt-4 font-inter text-lg font-semibold text-cyan-400">
                  {member.partLabel}
                </p>
                <p className="mt-2 font-jp text-base text-zinc-400">
                  {member.bio}
                </p>
              </div>
            </div>

            <Card className="mt-8 max-w-full overflow-hidden lg:mt-10">
              <div className="font-inter text-[10px] tracking-[0.16em] text-zinc-500 uppercase">
                Profile
              </div>
              <div className="mt-4 font-inter text-3xl font-extrabold tracking-[0.08em] text-zinc-50 uppercase md:text-5xl">
                Coming Soon
              </div>
              <p className="mt-4 max-w-xl break-all font-jp text-sm leading-relaxed text-zinc-400">
                詳しいプロフィール、使用機材、影響を受けた音楽などは準備中です。
              </p>
            </Card>

          </div>

          <figure className="hidden w-full max-w-[440px] lg:block">
            <div className="relative aspect-square overflow-hidden rounded-md border border-zinc-800 bg-zinc-950">
              {member.photoPath ? (
                <Image
                  src={member.photoPath}
                  alt={`${member.displayName}（${member.partLabel}）のポートレート`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 440px, calc(100vw - 32px)"
                  className="object-contain"
                />
              ) : null}
            </div>
          </figure>
        </div>
      </section>
    </main>
  );
}
