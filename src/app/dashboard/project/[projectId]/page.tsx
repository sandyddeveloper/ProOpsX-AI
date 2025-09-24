import ProjectDetails from "@/components/projects/ProjectDetails";

const sampleProject = {
  title: "NextGen Dashboard",
  description: "A project management dashboard for remote teams.",
  lead: "Santhosh Raj",
  members: [
    { id: 1, name: "Alice", initials: "AL" },
    { id: 2, name: "Bob", initials: "BO" },
    { id: 3, name: "Charlie", initials: "CH" },
  ],
  category: "Web App",
  status: "In Progress" as const,
};

const ProjectPage = () => {
  return <ProjectDetails {...sampleProject} />;
};

export default ProjectPage;
