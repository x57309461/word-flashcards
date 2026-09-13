export async function onRequestPost(context) {
  const { wordbookId } = await context.request.json();

  if (!wordbookId) {
    return Response.json({ error: '缺少 wordbookId' }, { status: 400 });
  }

  await context.env.DB
    .prepare(`UPDATE words SET
      due = NULL,
      stability = NULL,
      difficulty = NULL,
      reps = 0,
      state = 0,
      last_review = NULL
      WHERE wordbook_id = ?`)
    .bind(wordbookId)
    .run();

  return Response.json({ success: true });
}
