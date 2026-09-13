export async function onRequestGet(context) {
  const { searchParams } = new URL(context.request.url);
  const wordbookId = searchParams.get('wordbook_id');
  const today = new Date().toISOString().split('T')[0];

  const { results } = await context.env.DB
    .prepare(`SELECT id, word, meaning, phonetic, due, stability, difficulty, reps, state 
      FROM words 
      WHERE wordbook_id = ? 
        AND (due IS NULL OR due <= ?)
      ORDER BY due ASC
      LIMIT 1000`)  //重置本书进度1000个单词量
    .bind(wordbookId, today)
    .all();

  return Response.json({ words: results });
}
