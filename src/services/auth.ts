// services/auth.ts
export async function login(username: string, password: string) {
  const res = await fetch("http://localhost:8080/api/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const data = await res.json();
  // Example response: { token, id, username, roles }
  return data;
}
