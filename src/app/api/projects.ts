export const fetchProjects = async () => {
    try {
        const res = await fetch("http://localhost:8080/api/projects", {
            credentials: "include", // send cookie
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Error fetching projects:", err);
    }
};
