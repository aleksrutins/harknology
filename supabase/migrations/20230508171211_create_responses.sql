create table responses (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id),
    content text not null,
    discussion_id uuid references discussions(id)
);

alter table responses
    enable row level security;

create policy "Teachers can view and create responses in discussions in their classes."
    on responses
    for all using (auth.uid() in (
        select teacher_id from classes
        left join discussions on classes.id = discussions.class_id
        where discussions.id = discussion_id
    ));

create policy "Students can view and create responses in their classes."
    on responses
    for select using (auth.uid() in (
        select student_id from student_classes
        left join discussions on discussions.class_id = student_classes.class_id
        where discussions.id = discussion_id
    ));

create or replace function respond_to(discussion_id uuid, content text) returns uuid as $$
    insert into responses (user_id, content, discussion_id)
    values (auth.uid(), content, discussion_id)
    returning id;
$$ language sql;