create table discussions (
    id uuid primary key default gen_random_uuid(),
    class_id uuid references classes(id),
    description text,
    name varchar(255) not null
);

alter table discussions
    enable row level security;

create policy "Teachers can view and edit discussions in their classes."
    on discussions
    for all using (auth.uid() in (
        select teacher_id from classes
        where id = class_id
    ));

create policy "Students can view discussions in their classes."
    on discussions
    for select using (auth.uid() in (
        select student_id from student_classes
        where class_id = class_id
    ));