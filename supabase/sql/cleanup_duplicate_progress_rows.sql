-- İsteğe bağlı temizlik.
-- Önceki senkronizasyon yüzünden aynı local kayıtlar Supabase'e birden fazla insert edildiyse
-- birebir aynı timestamp'e sahip duplicate satırları temizler.

with duplicate_question_attempts as (
  select
    id,
    row_number() over (
      partition by user_id, question_id, selected_choice_id, correct_choice_id, is_correct, answered_at
      order by id
    ) as row_no
  from public.question_attempts
)
delete from public.question_attempts
where id in (
  select id from duplicate_question_attempts where row_no > 1
);

with duplicate_flashcard_reviews as (
  select
    id,
    row_number() over (
      partition by user_id, card_id, topic_id, remembered, reviewed_at
      order by id
    ) as row_no
  from public.flashcard_reviews
)
delete from public.flashcard_reviews
where id in (
  select id from duplicate_flashcard_reviews where row_no > 1
);

with duplicate_exam_results as (
  select
    id,
    row_number() over (
      partition by user_id, exam_id, score, total, completed_at
      order by id
    ) as row_no
  from public.exam_results
)
delete from public.exam_results
where id in (
  select id from duplicate_exam_results where row_no > 1
);
