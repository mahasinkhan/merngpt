import OpenAI from "openai";  // Use default export

export const configureOpenAI = () => {
  const openai = new OpenAI({
    apiKey: process.env.API_KEY,  // Make sure to set your API key in .env
    organization: process.env.ORGANIZATION_KEY,  // Optional: for organization key
  });

  return openai;
};
