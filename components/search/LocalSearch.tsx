"use client";

import Image from "next/image";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";

interface Props {
  route: string;
  imgSrc: string;
  placeholder: string;
  iconPosition?: "left" | "right";
  otherClasses?: string;
}

const LocalSearch = ({
  route,
  imgSrc,
  placeholder,
  iconPosition = "left",
  otherClasses,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const query = searchParams.get("query") || "";

  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const delayDebouceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: searchQuery,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newURL = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["query"],
          });
          router.push(newURL, { scroll: false });
        }
      }
    }, 500);

    return () => clearTimeout(delayDebouceFn);
  }, [searchQuery, router, route, searchParams, pathname]);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="Search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
      />

      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="Search"
          width={15}
          height={15}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearch;
