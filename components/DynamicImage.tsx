import Image from "next/image";

interface DynamicImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  style?: React.CSSProperties;
  className?: string;
  priority?: boolean;
}

/**
 * Renders a plain <img> for absolute https:// URLs (direct link, no Next.js proxy)
 * and next/image for local /public paths.
 */
export default function DynamicImage({ src, alt, width, height, style, className, priority }: DynamicImageProps) {
  if (src.startsWith("https://") || src.startsWith("http://")) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{ objectFit: "cover", ...style }}
        className={className}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={style}
      className={className}
      priority={priority}
    />
  );
}
