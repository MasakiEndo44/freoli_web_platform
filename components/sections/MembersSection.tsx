import type { ReactElement } from "react";
import Image from "next/image";
import { members, type Member } from "@/data/members";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { SectionContainer } from "@/components/ui/SectionContainer";

function GuitarVocalSilhouette() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="w-16 h-16 text-zinc-600"
    >
      <circle cx="32" cy="18" r="6" />
      <path d="M22 30c-2 4-3 9-3 14h26c0-5-1-10-3-14" />
      <path d="M44 32l8 12" />
      <circle cx="52" cy="46" r="3" />
      <path d="M32 36v18" />
      <circle cx="32" cy="56" r="3" />
    </svg>
  );
}

function GuitarSilhouette() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="w-16 h-16 text-zinc-600"
    >
      <circle cx="32" cy="18" r="6" />
      <path d="M22 30c-2 4-3 9-3 14h26c0-5-1-10-3-14" />
      <path d="M40 30l12 16" />
      <ellipse cx="52" cy="48" rx="5" ry="4" />
    </svg>
  );
}

function BassSilhouette() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="w-16 h-16 text-zinc-600"
    >
      <circle cx="30" cy="18" r="6" />
      <path d="M20 30c-2 4-3 9-3 14h24c0-5-1-10-3-14" />
      <path d="M40 32l14 18" />
      <ellipse cx="52" cy="50" rx="6" ry="4" />
      <path d="M44 34l8 10" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

function DrumSilhouette() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="w-16 h-16 text-zinc-600"
    >
      <circle cx="32" cy="16" r="6" />
      <path d="M24 26c-2 3-3 7-3 11" />
      <path d="M40 26c2 3 3 7 3 11" />
      <ellipse cx="32" cy="44" rx="14" ry="5" />
      <path d="M18 44v8M46 44v8" />
      <ellipse cx="32" cy="52" rx="14" ry="3" />
      <path d="M20 30l-6-4M44 30l6-4" />
    </svg>
  );
}

function silhouetteFor(member: Member): ReactElement {
  if (member.partLabel.startsWith("Gt./Vo")) return <GuitarVocalSilhouette />;
  if (member.partLabel.startsWith("Gt.")) return <GuitarSilhouette />;
  if (member.partLabel.startsWith("Ba.")) return <BassSilhouette />;
  return <DrumSilhouette />;
}

export function MembersSection() {
  const sorted = [...members].sort((a, b) => a.partOrder - b.partOrder);

  return (
    <SectionContainer id="members" className="bg-black/85">
      <Heading variant="h2" className="mb-10">
        MEMBERS
      </Heading>
      <ul className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
        {sorted.map((member) => (
          <li key={member.id}>
            <Card className="h-full flex flex-col gap-4">
              <div className="relative aspect-square bg-zinc-950 border border-zinc-800 rounded-md flex items-center justify-center overflow-hidden">
                {member.photoPath === null ? (
                  silhouetteFor(member)
                ) : (
                  <Image
                    src={member.photoPath}
                    alt={`${member.displayName}（${member.partLabel}）のポートレート`}
                    fill
                    sizes="(min-width: 1024px) 25vw, 100vw"
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <div className="font-jp font-bold text-xl text-zinc-50">
                  {member.displayName}
                </div>
                <div className="font-inter text-sm text-cyan-400 mt-1">
                  {member.partLabel}
                </div>
                <p className="font-jp text-sm text-zinc-400 mt-3 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}
