import IssueDetailsPage from "@/components/projects/Issue/IssueDetails";
import { sampleComments, sampleIssue } from "@/util/data";


export default function IssueDetails() {
  return (
    <div>
      <IssueDetailsPage issue={sampleIssue} initialComments={sampleComments} />
    </div>
  );
}
