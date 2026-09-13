export async function onRequestGet(context) {
  try {
    const { searchParams } = new URL(context.request.url);
    const wordbookId = searchParams.get('wordbook_id');

    const { results } = await context.env.DB
      .prepare(`SELECT id, word, meaning, phonetic, due, stability, difficulty, reps, state 
        FROM words 
        WHERE wordbook_id = ? AND is_difficult = 1
        ORDER BY last_review DESC
        LIMIT 100`)
      .bind(wordbookId)
      .all();

    return Response.json({ words: results });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
