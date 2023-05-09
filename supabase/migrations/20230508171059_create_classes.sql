create table classes (
    id uuid primary key default gen_random_uuid(),
    name varchar(255) not null,
    description text,
    teacher_id uuid references auth.users(id),
    created_at timestamp default now(),
    updated_at timestamp default now()
);

alter table classes
    enable row level security;

create policy "Teachers can view and edit their classes."
    on classes
    for all using (auth.uid() = teacher_id);

create or replace function create_class(name varchar(255), description text) returns uuid as $$
    insert into classes (name, description, teacher_id)
    values (
        name,
        description,
        auth.uid()
    )
    returning id;
$$ language sql;

create or replace function update_class(id uuid, name varchar(255), description text) returns uuid as $$
    update classes
    set name = name, description = description
    where id = id
    returning id;
$$ language sql;