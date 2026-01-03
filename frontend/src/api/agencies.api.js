const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000";

// ----------------------
// Fetch all agencies
export async function fetchAgencies() {
  const res = await fetch(`${API_BASE}/api/agencies/`);
  if (!res.ok) throw new Error("Failed to fetch agencies");
  return res.json();
}

// ----------------------
// Citizen login
export async function loginCitizen(nid, dob) {
  const res = await fetch(`${API_BASE}/api/users/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nid, dob })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);
  return data;
}

// ----------------------
// Agency login
export async function loginAgency(agencyName, staffId, username, password) {
  const res = await fetch(`${API_BASE}/api/agencies/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ agency_name: agencyName, staff_id: staffId, username, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);
  return data;
}

// ----------------------
// Fetch issues assigned to agency
export async function fetchAgencyIssues() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/api/agencies/issues/`, {
    headers: { Authorization: `Token ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch agency issues");
  return res.json();
}

// ----------------------
// Update issue status
export async function updateIssueStatus(issueId, newStatus) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/api/agencies/issues/${issueId}/update/`, {
    method: "PATCH",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    },
    body: JSON.stringify({ status: newStatus })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to update status");
  return data;
}
