create table classes (
    id uuid primary key default gen_random_uuid(),
    name varchar(255),
    description text,
    teacher_id UUID REFERENCES auth.users(id)
);

alter table classes
    enable row level security;

create policy "Teachers can view and edit their classes."
    on classes
    for all using (auth.uid() == teacher_id);

create table student_classes (
    id serial primary key,
    student_id uuid references auth.users(id),
    class_id references classes(id)
);

alter table student_classes
    enable row level security;

create policy "Students can view which classes they are in."
    on student_classes
    for all using (auth.uid() == student_id);

create policy "Students can view classes they have joined."
    on classes
    for select using (
        auth.uid() in (
            select student_id from student_classes
            where class_id == id
        )
    );