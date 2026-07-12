import { GraphQLFormattedError } from "graphql";

interface Error {
  message: string;
  statusCode: string;
}

// Function that get an access token and headers if we not have errors
export const customFetch = async (url: string, options: RequestInit) => {
  const accessToken = localStorage.getItem("access_token");

  const headers = options.headers as Record<string, string>;

  return await fetch(url, {
    ...options,
    headers: {
      ...headers,
      Authorization: headers?.Authorization || `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "Apollo-Require-Preflight": "true",
    },
  });
};

// Function that get an error if we have and check if we have response
const getGraphQLErrors = (
  body: Record<"errors", GraphQLFormattedError[] | undefined>,
): Error | null => {
  if (!body) {
    return {
      message: "UnKnown Error",
      statusCode: "INTERNAL_SERVER_ERROR",
    };
  }

  if ("errors" in body) {
    const errors = body.errors;

    const message = errors?.map((err) => err?.message)?.join("");
    const code = errors?.[0]?.extensions?.code;

    return {
      message: message || JSON.stringify(errors),
      statusCode: code || 500,
    };
  }

  return null;
};

// Function that make a response and fetch
export const fetchWrapper = async (url: string, options: RequestInit) => {
  const response = await customFetch(url, options);

  const responseClone = response.clone();
  const body = await responseClone.json();

  const error = getGraphQLErrors(body);

  if (error) throw error;

  return response;
};
