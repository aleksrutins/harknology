create table join_codes (
    code text primary key,
    class_id uuid references classes(id),
    created_at timestamp default now()
);

create or replace function generate_join_code(class_id uuid) returns text as $$ begin
    declare
        code text := substr(md5(random()::text), 0, 5);

    -- delete all expired codes (codes expire 2hr after creation)
    delete from join_codes where created_at < (now() - interval '2 hours');
 
    -- insert the new code
    insert into join_codes (code, class_id)
        values (code, class_id);
end $$ language plpgsql;

create or replace function join_class(code text) returns uuid as $$ begin
    declare
        class_id uuid;
        student_id uuid := auth.uid();

    select join_codes.class_id into class_id from join_codes where code = code;
    
    insert into student_classes (student_id, class_id)
    values (student_id, class_id);
end $$ language plpgsql;