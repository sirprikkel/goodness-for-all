import { finishGitHubAuth } from "../_auth/github";

export const runtime = "nodejs";

export async function GET(request: Request): Promise<Response> {
  return finishGitHubAuth(request);
}
