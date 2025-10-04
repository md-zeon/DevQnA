"use client";

import { toggleSaveQuestion } from "@/lib/actions/collection.action";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const SaveQuestion = ({ questionId }: { questionId: string }) => {
  const session = useSession();
  const userId = session.data?.user?.id;
  const [isLoadig, setIsLoadig] = useState(false);

  const handleSave = async () => {
    if (isLoadig) return;
    if (!userId) return toast("Please login to save questions");

    setIsLoadig(true);

    try {
      const { success, data, error } = await toggleSaveQuestion({ questionId });
      if (!success) {
        throw new Error(error?.message || "Something went wrong");
      }

      toast(`Question ${data?.saved ? "saved" : "unsaved"} successfully`);
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsLoadig(false);
    }
  };

  const hasSaved = false;

  return (
    <Image
      src={hasSaved ? "/icons/star-filed.svg" : "/icons/star-red.svg"}
      width={18}
      height={18}
      alt="Save"
      className={`cursor-pointer ${isLoadig && "opacity-50"}`}
      aria-label="Save question"
      onClick={handleSave}
    />
  );
};

export default SaveQuestion;
