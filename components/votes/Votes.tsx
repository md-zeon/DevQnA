"use client";

import { createVote } from "@/lib/actions/vote.action";
import { formatNumber } from "@/lib/utils";
import { HasVotedResponse } from "@/types/action";
import { ActionResponse } from "@/types/global";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { use, useState } from "react";
import { toast } from "sonner";

interface Params {
  upvotes: number;
  downvotes: number;
  targetType: "question" | "answer";
  targetId: string;
  hasVotedPromise: Promise<ActionResponse<HasVotedResponse>>;
}

const Votes = ({
  upvotes,
  downvotes,
  targetType,
  targetId,
  hasVotedPromise,
}: Params) => {
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();

  const userId = session.data?.user?.id;

  const { success, data } = use(hasVotedPromise);

  const { hasUpvoted, hasDownvoted } = data;

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!userId) {
      return toast("Please login to vote", {
        description: "Only logged in users can vote",
      });
    }
    setIsLoading(true);

    try {
      const result = await createVote({
        targetId,
        targetType,
        voteType,
      });

      if (!result.success) {
        return toast("Failed to vote", {
          description: result.error?.message,
        });
      }

      const successMessage =
        voteType === "upvote"
          ? `Upvote ${!hasUpvoted ? "added" : "removed"} successfully`
          : `Downvote ${!hasDownvoted ? "added" : "removed"} successfully`;

      toast(successMessage, {
        description: "Your vote has been recorded.",
      });
    } catch (error) {
      toast.error("Failed to vote", {
        description: "An error occurred while voting. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-center gap-2.5">
      <div className="flex-center gap-1.5">
        <Image
          src={
            success && hasUpvoted ? "/icons/upvoted.svg" : "/icons/upvote.svg"
          }
          width={18}
          height={18}
          alt="Upvote"
          className={`cursor-pointer ${isLoading && "opacity-50"}`}
          aria-label="Upvote"
          onClick={() => !isLoading && handleVote("upvote")}
        />
        <div className="flex-center background-light700_dark400 min-w-5 rounded-sm p-1">
          <p className="subtle-medium text-dark400_light900">
            {formatNumber(upvotes)}
          </p>
        </div>
      </div>
      <div className="flex-center gap-1.5">
        <Image
          src={
            success && hasDownvoted
              ? "/icons/downvoted.svg"
              : "/icons/downvote.svg"
          }
          width={18}
          height={18}
          alt="Downvote"
          className={`cursor-pointer ${isLoading && "opacity-50"}`}
          aria-label="Downvote"
          onClick={() => !isLoading && handleVote("downvote")}
        />
        <div className="flex-center background-light700_dark400 min-w-5 rounded-sm p-1">
          <p className="subtle-medium text-dark400_light900">
            {formatNumber(downvotes)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Votes;
