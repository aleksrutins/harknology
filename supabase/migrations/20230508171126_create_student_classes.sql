create table student_classes (
    id serial primary key,
    student_id uuid references auth.users(id) on delete cascade,
    class_id uuid references classes(id) on delete cascade
);

alter table student_classes
    enable row level security;

create policy "Students can view which classes they are in."
    on student_classes
    for all using (auth.uid() = student_id);

create policy "Students can view classes they have joined."
    on classes
    for select using (
        auth.uid() in (
            select student_id from student_classes
            where class_id = classes.id
        )
    );

create policy "Students can join classes."
    on student_classes
    for insert to public
    with check (auth.uid() = student_id);