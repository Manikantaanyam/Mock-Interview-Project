import { Context } from "hono";
import { createChatSession, sendMessageToGemini } from "../Gemini";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export async function Interview(c: Context) {
  const { jobRole, techStack, YOE } = await c.req.json();

  const userId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const question = `${jobRole}, ${techStack}, ${YOE}, depend on this information generate 10 interview questions and answer in json fromat. Question and answers as fields in json`;
  try {
    const chatSession = createChatSession(c);
    const response = await sendMessageToGemini(chatSession, question);
    const jsonString = response.replace(/```json\n|\n```/g, "");
    const interviewQuestions = JSON.parse(jsonString);

    const intervieww = await prisma.interview.create({
      data: {
        userId: userId,
      },
    });

    const aiQuestions = await prisma.question.createMany({
      data: interviewQuestions.map((q: any) => ({
        interviewId: intervieww.id,
        question: q.question,
        answer: q.answer,
        techstack: techStack,
        source: "AI",
      })),
    });

    const actualResponse = await prisma.question.findMany({
      where: {
        techstack: {
          contains: techStack,
        },
      },
      select: {
        techstack: true,
        question: true,
        answer: true,
        source: true,
      },
    });

    return c.json({ actualResponse });
  } catch (e: any) {
    return c.json({ msg: e.message });
  }
}

export async function endInterview(c: Context) {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const question = `${body} based on this questions and answers give me the rating out of 10 at the last give me your feedback and tips to improve my performance`;

  try {
    const chatSession = createChatSession(c);
    const response = await sendMessageToGemini(chatSession, question);
    const jsonString = response.replace(/```json\n|\n```/g, "");
    const interviewQuestions = JSON.parse(jsonString);
  } catch (e) {}
}
