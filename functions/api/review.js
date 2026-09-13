export async function onRequestPost(context) {
  try {
    const { wordId, rating, due, stability, difficulty, reps, state } = await context.request.json();

    if (!wordId || !rating) {
      return Response.json({ error: '缺少必要参数' }, { status: 400 });
    }

    // rating: 1=Again(不认识), 3=Good(认识)
    // 不认识 → 标记为难词；认识 → 清除标记
    const isDifficult = rating === 1 ? 1 : 0;

    await context.env.DB
      .prepare(`UPDATE words SET 
        due = ?, 
        stability = ?, 
        difficulty = ?, 
        reps = ?, 
        state = ?,
        is_difficult = ?,
        last_review = datetime('now')
        WHERE id = ?`)
      .bind(due, stability, difficulty, reps, state, isDifficult, wordId)
      .run();

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
