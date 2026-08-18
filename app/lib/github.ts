const OWNER = process.env.REPO_OWNER || "RYANX9";
const REPO = process.env.REPO_NAME || "zaid-saad";
const BRANCH = process.env.REPO_BRANCH || "main";
const API_BASE = `https://api.github.com/repos/${OWNER}/${REPO}`;

function authHeaders() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN environment variable is not set");
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function getFileSha(path: string): Promise<string | null> {
  const res = await fetch(`${API_BASE}/contents/${path}?ref=${BRANCH}`, {
    headers: authHeaders(),
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to read ${path} (${res.status}): ${await res.text()}`);
  }
  const json = await res.json();
  return json.sha as string;
}

/**
 * Creates or updates a file in the repo via the GitHub Contents API.
 * `content` is raw UTF-8 text by default, or already-base64 binary data if isBase64 is true.
 */
export async function commitFile(
  path: string,
  content: string,
  message: string,
  isBase64 = false
) {
  const sha = await getFileSha(path);

  const body: Record<string, unknown> = {
    message,
    content: isBase64 ? content : Buffer.from(content, "utf-8").toString("base64"),
    branch: BRANCH,
  };
  if (sha) body.sha = sha;

  const res = await fetch(`${API_BASE}/contents/${path}`, {
    method: "PUT",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`GitHub commit failed (${res.status}): ${await res.text()}`);
  }
  return res.json();
}

