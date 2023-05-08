create table classes (
    id uuid primary key default gen_random_uuid(),
    name varchar(255) not null,
    description text,
    teacher_id uuid references auth.users(id)
);

alter table classes
    enable row level security;

create policy "Teachers can view and edit their classes."
    on classes
    for all using (auth.uid() = teacher_id);