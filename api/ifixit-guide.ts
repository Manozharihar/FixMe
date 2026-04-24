import { sendError, sendJson } from "./_config";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return sendError(res, 405, "Method not allowed");
  }

  const guideId = req.query?.id;
  if (!guideId) {
    return sendError(res, 400, "Guide ID parameter is required");
  }

  try {
    const response = await fetch(`https://www.ifixit.com/api/2.0/guides/${guideId}`);
    const data = await response.json();

    if (!response.ok) {
      return sendError(res, response.status, "iFixit API error");
    }

    return sendJson(res, 200, data);
  } catch (error: any) {
    console.error("iFixit guide load failed:", error);
    return sendError(res, 500, "Failed to load iFixit guide");
  }
}