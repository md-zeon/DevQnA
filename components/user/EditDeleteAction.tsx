"use client";
import Image from "next/image";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  type: "Question" | "Answer";
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const router = useRouter();
  const handleEdit = async () => {
    if (type === "Question") {
      router.push(`/questions/${itemId}/edit`);
    } else if (type === "Answer") {
      router.push(`/answers/${itemId}/edit`);
    }
  };
  const handleDelete = async () => {
    if (type === "Question") {
      // call api to delete Question

      toast("Question deleted", {
        description: "Your Question has been deleted successfully",
      });
    } else if (type === "Answer") {
      // call api to delete Answer

      toast("Answer deleted", {
        description: "Your Answer has been deleted successfully",
      });
    }
  };

  return (
    <div className={`flex items-center justify-end gap-3 max-sm:w-full ${type === "Answer" && 'gap-0 justify-center'}`}>
      {type === "Question" && (
        <Image
          src="/icons/edit.svg"
          alt="Edit"
          width={14}
          height={14}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}

      <AlertDialog>
        <AlertDialogTrigger className="cursor-pointer">
          <Image
            src="/icons/trash.svg"
            alt="Delete"
            width={14}
            height={14}
            className="cursor-pointer object-contain"
          />
        </AlertDialogTrigger>
        <AlertDialogContent className="background-light800_dark300">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              {type === "Question" ? "Question" : "Answer"} and remove it from
              our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="btn">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="!border-primary-100 !bg-primary-500 !text-light-800"
              onClick={handleDelete}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditDeleteAction;
