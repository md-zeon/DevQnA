import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface Props {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles?: string;
  imgStyles?: string;
  titleStyles?: string;
  isAuthor?: boolean;
}

const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  href,
  textStyles,
  imgStyles,
  titleStyles,
  isAuthor,
}: Props) => {
  const metricContent = (
    <>
      {imgUrl ? (
        <Image
          src={imgUrl}
          width={16}
          height={16}
          alt={alt}
          className={`rounded-full object-contain ${imgStyles}`}
        />
      ) : (
        isAuthor && (
          <Avatar>
            <AvatarFallback className="primary-gradient font-space-grotesk p-1 text-xs font-bold text-white">
              {alt
                ?.split(" ")
                .map((word: string) => word[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        )
      )}

      <p className={`${textStyles} flex items-center gap-1`}>
        {value}{" "}
        {title ? (
          <span className={cn(`small-regular line-clamp-1`, titleStyles)}>
            {title}
          </span>
        ) : null}
      </p>
    </>
  );
  return href ? (
    <Link className="flex-center gap-1" href={href}>
      {metricContent}
    </Link>
  ) : (
    <div className="flex-center gap-1">{metricContent}</div>
  );
};

export default Metric;
