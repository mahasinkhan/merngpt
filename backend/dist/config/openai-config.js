import OpenAI from "openai"; // Use default export
export const configureOpenAI = () => {
    const openai = new OpenAI({
        apiKey: process.env.API_KEY,
        organization: process.env.ORGANIZATION_KEY, // Optional: for organization key
    });
    return openai;
};
//# sourceMappingURL=openai-config.js.map