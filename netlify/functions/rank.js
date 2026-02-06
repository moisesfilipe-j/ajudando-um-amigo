import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  const store = getStore("ajude-um-amigo");
  const key = "rank";

  // CORS (para funcionar no próprio site e pré-flight)
  const corsHeaders = {
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "content-type, authorization",
    "access-control-allow-methods": "GET,POST,OPTIONS",
  };
  if (req.method === "OPTIONS") {
    return new Response("", { status: 204, headers: corsHeaders });
  }

  // Helper: carrega rank atual (ou fallback)
  async function loadRank() {
    const data = await store.get(key, { type: "json" });
    if (data && typeof data === "object") return data;
    // fallback: rank vazio
    return { title: "Rank de Ajuda", items: [] };
  }

  if (req.method === "GET") {
    const data = await loadRank();
    return Response.json(data, { headers: { ...corsHeaders, "cache-control": "no-store" } });
  }

  if (req.method === "POST") {
    const adminToken = process.env.ADMIN_TOKEN || "";
    const auth = req.headers.get("authorization") || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";

    if (!adminToken || token !== adminToken) {
      return new Response("Unauthorized", { status: 401, headers: corsHeaders });
    }

    let body;
    try {
      body = await req.json();
    } catch (e) {
      return new Response("Bad JSON", { status: 400, headers: corsHeaders });
    }

    const title = typeof body.title === "string" ? body.title : "Rank de Ajuda";
    const items = Array.isArray(body.items) ? body.items : [];

    // Sanitiza
    const clean = items
      .map((x) => ({
        name: String(x?.name ?? "").slice(0, 60),
        value: Number(x?.value ?? 0),
      }))
      .filter((x) => x.name && Number.isFinite(x.value) && x.value >= 0)
      .slice(0, 500);

    const out = { title, items: clean };
    await store.setJSON(key, out);

    return Response.json({ ok: true }, { headers: { ...corsHeaders, "cache-control": "no-store" } });
  }

  return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
};
