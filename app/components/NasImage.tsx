import Image from 'next/image';
import { getNasImageUrl } from '@/utils/nas-utils';

interface NasImageProps {
  imageName: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
}

const NasImage = ({
  imageName,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
}: NasImageProps) => {
  const imageUrl = getNasImageUrl(imageName);

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      fill={fill}
    />
  );
};

export default NasImage; 