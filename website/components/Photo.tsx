import Image from "next/image";
import { images, type ImageKey, type SiteImage } from "@/lib/images";
import { Camera } from "./Icons";

type PhotoProps = {
  name: ImageKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** Fills its parent. Renders a branded placeholder until the slot has a real photo. */
export function Photo({ name, className = "", sizes = "100vw", priority }: PhotoProps) {
  const img: SiteImage = images[name];

  return (
    <div className={`photo ${className}`}>
      {img.src ? (
        <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} />
      ) : (
        <div className="photo__placeholder" role="img" aria-label={img.alt}>
          <span className="photo__label">
            <Camera size={14} />
            {img.label}
          </span>
        </div>
      )}
    </div>
  );
}
