"use client";

// **Initial Page Load:** When a user visits the question details page, the server renders the page with the current view count. This is because the page is a server component, so it's getting executed right on the server.
// **View Count Increment:** After the page is loaded, a server action is called to increment the view count in the database. This server action is called from the client side, meaning only after page has been rendered, dom has been created, a client call is made through `useEffect`.
// **Stale Data Issue:** The problem arises because the page was rendered and served to the client before the view count was incremented. This means the user doesn't see the updated view count immediately.
// **Delayed Update:** Thus, the user would only see the updated view count if they navigate away and then return to the page or if they refresh the page.

import { incrementViews } from "@/lib/actions/question.action";
import { useEffect } from "react";
import { toast } from "sonner";

const View = ({ questionId }: { questionId: string }) => {
  const handleIncrement = async () => {
    const result = await incrementViews({ questionId });

    if (result.success) {
      toast("Success", {
        description: "Views incremented.",
      });
    } else {
      toast.error("Error", {
        description: result.error?.message || "Something went wrong.",
      });
    }
  };

  useEffect(() => {
    handleIncrement();
  }, []);
  return <div>view</div>;
};

export default View;
