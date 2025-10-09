"use server";

import mongoose from "mongoose";
import Answer, { IAnswerDoc } from "@/database/answer.model";
import {
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswerParams,
} from "@/types/action";
import {
  ActionResponse,
  Answer as AnswerType,
  ErrorResponse,
} from "@/types/global";
import action from "../handlers/action";
import {
  AnswerServerSchema,
  DeleteAnswerSchema,
  getAnswersSchema,
} from "../validations";
import handleError from "../handlers/error";
import { Question, Vote } from "@/database";
import { revalidatePath } from "next/cache";
import ROUTES from "@/constants/routes";
import { filter } from "@mdxeditor/editor";

export async function createAnswer(
  params: CreateAnswerParams
): Promise<ActionResponse<IAnswerDoc>> {
  const validationResult = await action({
    params,
    schema: AnswerServerSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { content, questionId } = validationResult.params!;

  const userId = validationResult?.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const question = await Question.findById(questionId);

    if (!question) {
      throw new Error("Question not found");
    }

    const newAnswer = await Answer.create(
      [
        {
          author: userId,
          question: questionId,
          content,
        },
      ],
      { session }
    );

    if (!newAnswer) {
      throw new Error("Failed to create an answer");
    }

    question.answers += 1;
    await question.save({ session });
    await session.commitTransaction();

    revalidatePath(ROUTES.QUESTION(questionId));

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newAnswer)),
    };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error as Error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}

export async function getAnswers(params: GetAnswerParams): Promise<
  ActionResponse<{
    answers: AnswerType[];
    isNext: boolean;
    totalAnswers: number;
  }>
> {
  const validationResult = await action({
    params,
    schema: getAnswersSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { questionId, page = 1, pageSize = 10, filter } = params;

  const skip = (Number(page) - 1) * Number(pageSize);
  const limit = Number(pageSize);

  let sortCriteria = {};

  switch (filter) {
    case "latest":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "popular":
      sortCriteria = { upvotes: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }

  try {
    const totalAnswers = await Answer.countDocuments({ question: questionId });
    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id name image")
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalAnswers > skip + answers.length;

    return {
      success: true,
      data: {
        answers: JSON.parse(JSON.stringify(answers)),
        isNext,
        totalAnswers,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function deleteAnswer(
  params: DeleteAnswerParams
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: DeleteAnswerSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { answerId } = validationResult.params!;
  const userId = validationResult.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const answer = await Answer.findById(answerId).session(session);

    if (!answer) {
      throw new Error("Answer not found");
    }

    if (answer.author.toString() !== userId) {
      throw new Error("Unauthorized");
    }

    // Delete related entries inside the transaction
    await Vote.deleteMany({
      actionId: answerId,
      actionType: "answer",
    }).session(session);

    const questionId = answer.question.toString();

    await Question.findByIdAndUpdate(
      questionId,
      { $inc: { answers: -1 } },
      { session }
    );

    // Delete the answer
    await Answer.findByIdAndDelete(answerId).session(session);
    await session.commitTransaction();
    await session.endSession();

    revalidatePath(`/profile/${userId}`);
    revalidatePath(ROUTES.QUESTION(questionId));

    return { success: true };
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    return handleError(error) as ErrorResponse;
  }
}
