import axios from "axios";

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

export const callAPIPost = async () => {
  return await axios.get("https://jsonplaceholder.typicode.com/posts");
}