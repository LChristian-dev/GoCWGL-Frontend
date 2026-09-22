import Image from "next/image";

type LogoVariant = "full" | "icon";

interface LogoProps {
  variant?: LogoVariant;
  /** Rendered height in pixels — width is derived from the source's aspect ratio. */
  height?: number;
  className?: string;
  priority?: boolean;
}

// Intrinsic dimensions of the source files in `public/images`.
const SOURCE = {
  full: { src: "/images/gocwgl-logo-v6.png", width: 2000, height: 800, alt: "GoCWGL" },
  icon: { src: "/images/gocwgl-icon-v6.png", width: 2000, height: 2000, alt: "" },
} as const;

export function Logo({ variant = "full", height = 33, className, priority }: LogoProps) {
  const { src, width, height: intrinsicHeight, alt } = SOURCE[variant];
  const renderedWidth = Math.round((width / intrinsicHeight) * height);

  return (
    <Image
      src={src}
      alt={alt}
      width={renderedWidth}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
