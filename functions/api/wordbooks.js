export async function onRequestGet(context) {
  const { results } = await context.env.DB
    .prepare('SELECT id, stage, name FROM wordbooks ORDER BY stage, id')
    .all();

  return Response.json({ wordbooks: results });
}
