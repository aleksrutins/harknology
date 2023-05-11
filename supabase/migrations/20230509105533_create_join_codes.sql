create table join_codes (
    code text primary key,
    class_id uuid references classes(id),
    created_at timestamp default now()
);

create or replace procedure delete_expired_codes()
language sql
as $$
    delete from join_codes where created_at < (now() - interval '2 hours');
$$;

create or replace function generate_join_code(class_id uuid) returns text as $$
declare
    code text := substr(md5(random()::text), 0, 5);
begin

    -- delete all expired codes (codes expire 2hr after creation)
    call delete_expired_codes();
    
    -- insert the new code
    insert into join_codes (code, class_id)
        values (code, class_id);
    
    return code;
end
$$ language plpgsql;

create or replace function join_class(code text) returns uuid as $$
declare
    class_id uuid;
    student_id uuid := auth.uid();
begin
    call delete_expired_codes();

    select join_codes.class_id into class_id from join_codes where code = code;
    
    insert into student_classes (student_id, class_id)
    values (student_id, class_id);

    return class_id;
end
$$ language plpgsql;

create or replace function get_join_code(class_id uuid) returns text as $$
declare
    code text;
begin
    select join_codes.code into code from join_codes where class_id = class_id;

    if code is null then
        code := generate_join_code(class_id);
    end if;

    return code;
end
$$ language plpgsql;