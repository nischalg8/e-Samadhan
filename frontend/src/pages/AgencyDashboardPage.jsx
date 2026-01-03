import { useEffect, useState } from "react";
import { fetchAgencyIssues, updateIssueStatus } from "../api/agencies.api";

export default function AgencyDashboardPage() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function loadIssues() {
      try {
        const data = await fetchAgencyIssues(token);
        setIssues(data);
      } catch (err) {
        console.error("Failed to fetch issues:", err);
      } finally {
        setLoading(false);
      }
    }
    loadIssues();
  }, [token]);

  const handleStatusChange = async (issueId, newStatus) => {
    setUpdating(true);
    try {
      await updateIssueStatus(issueId, newStatus, token);
      setIssues(prev =>
        prev.map(i => (i.id === issueId ? { ...i, status: newStatus } : i))
      );
    } catch (err) {
      alert(err.message || "Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p>Loading issues...</p>;

  return (
    <div className="agency-dashboard">
      <h2>Agency Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Reporter</th>
            <th>Created At</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {issues.map(issue => (
            <tr key={issue.id}>
              <td>{issue.description}</td>
              <td>{issue.category}</td>
              <td>{issue.priority}</td>
              <td>{issue.status}</td>
              <td>{issue.reporter}</td>
              <td>{new Date(issue.created_at).toLocaleString()}</td>
              <td>
                <select
                  value={issue.status}
                  disabled={updating}
                  onChange={e => handleStatusChange(issue.id, e.target.value)}
                >
                  <option value="submitted">Submitted</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
