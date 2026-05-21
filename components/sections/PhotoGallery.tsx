import Image from "next/image";
import type { GalleryPhoto } from "@/data/photos";
import { Heading } from "@/components/ui/Heading";
import { SectionContainer } from "@/components/ui/SectionContainer";

const MAX_VISIBLE = 5;

export function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  const visible = photos
    .filter((p) => p.consentLogged && p.photographer.trim().length > 0)
    .slice(0, MAX_VISIBLE);

  if (visible.length === 0) return null;

  return (
    <SectionContainer id="gallery" className="bg-black/85">
      <Heading variant="h2" className="mb-10">
        GALLERY
      </Heading>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {visible.map((photo) => (
          <li key={photo.id}>
            <figure className="relative aspect-[4/5] bg-zinc-950 border border-zinc-800 rounded-md overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                <div className="font-inter text-[10px] tracking-[0.16em] text-zinc-300 uppercase">
                  © {photo.photographer}
                </div>
                {photo.caption && (
                  <div className="font-jp text-xs text-zinc-200 mt-1 line-clamp-1">
                    {photo.caption}
                  </div>
                )}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}
