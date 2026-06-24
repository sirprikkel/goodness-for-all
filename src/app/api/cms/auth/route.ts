import { startGitHubAuth } from "../_auth/github";

export const runtime = "nodejs";

export function GET(request: Request): Response {
  return startGitHubAuth(request);
}
