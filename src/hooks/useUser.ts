import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  username: string;
  email: string;
  role?: string;
}

export function useUser(withRole: boolean = false, redirectIfUnauthenticated: boolean = false) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const formatRole = (role: string) => {
    if (!role) return "";
    return role.replace("ROLE_", "").replace("_", " ").toLowerCase();
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/auth/user", {
          withCredentials: true,
        });

        const data = response.data;

        const role = withRole
          ? formatRole(data.roles?.[0]?.authority || "")
          : undefined;

        setUser({
          username: data.username,
          email: data.email,
          role,
        });
      } catch (err: any) {
        const message = err.response?.data?.message || "Failed to fetch user";
        setError(message);

        // 👇 Automatically redirect to signin if not authenticated
        if (redirectIfUnauthenticated) {
          router.push("/auth/signin");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [withRole, redirectIfUnauthenticated, router]);

  return { user, loading, error };
}
