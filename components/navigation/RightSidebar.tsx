import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import TagCard from "../cards/TagCard";
import { getHotQuestions } from "@/lib/actions/question.action";
import DataRenderer from "../DataRenderer";
import { getTopTags } from "@/lib/actions/tag.action";

const popularTags = [
  {
    _id: "1",
    name: "react",
    questions: 100,
  },
  {
    _id: "2",
    name: "nextjs",
    questions: 50,
  },
  {
    _id: "3",
    name: "typescript",
    questions: 150,
  },
  {
    _id: "4",
    name: "javascript",
    questions: 500,
  },
  {
    _id: "5",
    name: "react query",
    questions: 75,
  },
];

const RightSidebar = async () => {
  const { success, data: hotQuestions, error } = await getHotQuestions();
  const {
    success: tagSuccess,
    data: popularTags,
    error: tagError,
  } = await getTopTags();

  return (
    <section className="pt-36 custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <DataRenderer
          success={success}
          empty={{
            title: "No questions found",
            message: "No questions have been asked yet.",
          }}
          data={hotQuestions}
          error={error}
          render={(hotQuestions) => (
            <div className="mt-7 flex flex-col w-full gap-[30px]">
              {hotQuestions.map(({ _id, title }, index) => (
                <Link
                  key={_id}
                  href={ROUTES.QUESTION(_id)}
                  className="flex cursor-pointer items-center justify-between"
                >
                  <Image
                    src="/icons/question-primary.svg"
                    alt="Question"
                    width={20}
                    height={20}
                    className={index % 2 == 0 ? "invert-colors" : ""}
                  />
                  <p className="body-medium text-dark500_light700 line-clamp-2 mr-7 ml-4">
                    {title}
                  </p>

                  <Image
                    src="/icons/chevron-right.svg"
                    alt="Chevron Right"
                    width={20}
                    height={20}
                    className="invert-colors"
                  />
                </Link>
              ))}
            </div>
          )}
        />
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <DataRenderer
          success={tagSuccess}
          error={tagError}
          data={popularTags}
          empty={{
            title: "No tags found",
            message: "No tags have been created yet.",
          }}
          render={(popularTags) => (
            <div className="mt-7 flex flex-col gap-4">
              {popularTags.map(({ _id, name, questions }) => (
                <TagCard
                  key={_id}
                  _id={_id}
                  name={name}
                  questions={questions}
                  showCount
                  compact
                />
              ))}
            </div>
          )}
        />
      </div>
    </section>
  );
};

export default RightSidebar;
