import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import TagCard from "../cards/TagCard";

const hotQuestions = [
  {
    _id: "1",
    tittle: "How to make a custom hook in react?",
  },
  {
    _id: "2",
    tittle: "How to use React Query?",
  },
  {
    _id: "3",
    tittle: "What is the difference between SSR and CSR in Next.js?",
  },
  {
    _id: "4",
    tittle: "How to optimize images in Next.js?",
  },
  {
    _id: "5",
    tittle: "Best practices for Redux Toolkit?",
  },
];

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

const RightSidebar = () => {
  return (
    <section className="pt-36 custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex flex-col w-full gap-[30px]">
          {hotQuestions.map(({ _id, tittle }) => (
            <Link
              href={ROUTES.QUESTIONS(_id)}
              key={_id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">{tittle}</p>

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
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
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
      </div>
    </section>
  );
};

export default RightSidebar;
