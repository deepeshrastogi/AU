const BASE_URL = "https://dummyjson.com";

export async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,

    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("Invalid response from server");
  }

  if (!response.ok) {
    throw new Error(
      data?.message || `Request failed with status ${response.status}`
    );
  }

  return data;
}