import { serve } from "https://deno.land/std@0.153.0/http/server.ts";
import { content_type } from "media_types";

import { gen_trips } from "./gen_trips.ts";

const HEADERS = {
  "access-control-allow-origin": "*",
  "cache-control": "no-cache"
};

serve(async (request: Request): Promise<Response> => {
  const { pathname, searchParams } = new URL(request.url);
  const path = pathname === '/' ? './index.html' : `.${pathname}`;

  let response_body;

  if (pathname.startsWith('/rand_trips')) {
    const how_many = Number(searchParams.get("n") ?? 3);

    return new Response(JSON.stringify(gen_trips(how_many)), {
      status: 200,
      headers: {
        "content-type": "application/json",
        ...HEADERS
      }
    });
  }

  try {
    response_body = await Deno.readFile(path);
  } catch (e) {
    console.log(e);
    return new Response(`Route ${pathname} not found.`, {
      status: 404
    });
  }

  return new Response(response_body, {
    status: 200,
    headers: {
      "content-type": content_type(path),
      ...HEADERS
    }
  });
});
