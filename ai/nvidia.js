const axios = require("axios");

async function generateCommit(
  prompt
) {
  const apiKey =
    process.env.NVIDIA_API_KEY;

  if (!apiKey) {
    throw new Error(
      "NVIDIA_API_KEY not found."
    );
  }

  try {
    const response =
      await axios.post(
        "https://integrate.api.nvidia.com/v1/chat/completions",
        {
          model:
            "meta/llama-3.1-70b-instruct",

          messages: [
            {
              role: "system",
              content:
                "You are a senior software engineer specialized in generating Conventional Commit messages."
            },

            {
              role: "user",
              content: prompt
            }
          ],

          temperature: 0.1,

          top_p: 0.7,

          max_tokens: 100,

          stream: false
        },

        {
          headers: {
            Authorization: `Bearer ${apiKey}`,

            Accept:
              "application/json",

            "Content-Type":
              "application/json"
          },

          timeout: 60000
        }
      );

    const content =
      response.data?.choices?.[0]
        ?.message?.content;

    if (!content) {
      return "chore: update project";
    }

    return content.trim();
  } catch (error) {
    if (
      error.response?.status === 401
    ) {
      throw new Error(
        "Invalid NVIDIA API key."
      );
    }

    if (
      error.response?.status === 429
    ) {
      throw new Error(
        "NVIDIA API rate limit exceeded."
      );
    }

    console.error(
      error.response?.data || error
    );

    throw new Error(
      "Failed to generate AI commit."
    );
  }
}

module.exports = {
  generateCommit
};