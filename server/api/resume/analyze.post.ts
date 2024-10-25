import { ChatAnthropic } from "@langchain/anthropic";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();
  const { resumeContent, jobDescription } = body;

  const model = new ChatAnthropic({
    anthropicApiKey: config.claudeApiKey,
    modelName: "claude-3-5-sonnet-20240620",
  });

  const summary = await model.invoke(`Summarize the following resume:
    ${resumeContent}
  `);

  const matchingScore = await model.invoke(`
    Compare the following resume with the job description and provide a matching score from 0 to 100.

    Resume:
    ${resumeContent}

    Job Description:
    ${jobDescription}

    Provide only the numeric score as output.
  `);

  console.log(matchingScore);

  return {
    summary,
    matchingScore: matchingScore.content,
  };
});
