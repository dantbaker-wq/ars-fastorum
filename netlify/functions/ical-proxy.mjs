const ICAL_URL =
  "https://calendar.google.com/calendar/ical/32f0b2e07961b398d9498e960410e2c13fb3f3d751ecb97530451f6881176d7d%40group.calendar.google.com/private-553074c41cefe14179bdc42c588cd2fc/basic.ics";

export default async (req) => {
  try {
    const response = await fetch(ICAL_URL);
    if (!response.ok) {
      return new Response(JSON.stringify({ error: response.status }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }
    const text = await response.text();
    return new Response(text, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Cache-Control": "public, max-age=900",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
