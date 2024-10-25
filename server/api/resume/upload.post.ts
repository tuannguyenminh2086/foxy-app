import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { ChatAnthropic } from "@langchain/anthropic";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { readFiles } from "h3-formidable";
import path from "path";
import fs from "fs";

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const { files } = await readFiles(event);

    const file = files?.resume[0];

    if (!file) {
      throw createError({
        statusCode: 400,
        statusMessage: "No file uploaded",
      });
    }

    if (file.mimetype !== "application/pdf") {
      throw createError({
        statusCode: 400,
        statusMessage: "Uploaded file is not a PDF",
      });
    }
    const oldPath = file.filepath;

    const _originalFileName = file.originalFilename
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_\.]/g, "");

    const fileName = `${Date.now()}-${_originalFileName}`;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    fs.copyFileSync(oldPath, filePath);

    // // // Load PDF
    const loader = new PDFLoader(filePath);
    const docs = await loader.load();

    console.log(docs[0].pageContent);

    // // Extract information using Claude
    const model = new ChatAnthropic({
      anthropicApiKey: config.claudeApiKey,
      modelName: "claude-3-5-sonnet-20240620",
    });

    const outputParser = new JsonOutputParser();

    const chain = model.pipe(outputParser);

    const result = await chain.invoke(`
      Extract the following information from the resume:
      - name
      - phone
      - email
      - Work experience
      - Professional summary
      - Skills

      Provide the output in JSON format.

      Resume content:
      ${docs[0].pageContent}
    `);

    // const result = "";
    //
    return {
      status: "success",
      result: { personal: { ...result }, content: docs[0].pageContent },
    };
  } catch (error) {
    console.error("Error handling file upload:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error uploading file",
    });
  }
});
