"use client";

import Image from "next/image";
import { useState } from "react";

type ContentImageProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
};

export function ContentImage({
  src,
  alt,
  className = "",
  fill,
  width,
  height,
  priority,
  sizes,
}: ContentImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-neutral-100 text-sm text-neutral-400 ${className}`}
        aria-label={alt}
      >
        Image coming soon
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={className}
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      priority={priority}
      sizes={sizes}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
