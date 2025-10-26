import IssueDetailsPage from "@/components/projects/Issue/IssueDetails";

export default function IssueDetails({
  params,
}: {
  params: { issueId: string; projectId: string };
}) {
  return (
    <div className="p-6">
      <IssueDetailsPage issueId={params.issueId} />
    </div>
  );
}
