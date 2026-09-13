export async function onRequestPost(context) {
  const { wordId, rating, due, stability, difficulty, reps, state } = await context.request.json();
  
  if (!wordId || !rating) {
    return Response.json({ error: '缺少必要参数' }, { status: 400 });
  }

  // rating: 1=Again, 2=Hard, 3=Good, 4=Easy
  await context.env.DB
    .prepare(`UPDATE words SET 
      due = ?, 
      stability = ?, 
      difficulty = ?, 
      reps = ?, 
      state = ?,
      last_review = datetime('now')
      WHERE id = ?`)
    .bind(due, stability, difficulty, reps, state, wordId)
    .run();

  return Response.json({ success: true });
}
