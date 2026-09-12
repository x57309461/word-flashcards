export async function onRequestGet(context) {
  const { searchParams } = new URL(context.request.url);
  const wordbookId = searchParams.get('wordbook_id');

  if (!wordbookId) {
    return Response.json({ error: '缺少 wordbook_id' }, { status: 400 });
  }

  const { results } = await context.env.DB
    .prepare('SELECT id, word, meaning, phonetic FROM words WHERE wordbook_id = ?')
    .bind(wordbookId)
    .all();

  return Response.json({ words: results });
}