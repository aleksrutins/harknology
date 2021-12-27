import { list, objectType, queryType } from "nexus";
import {Class, Discussion, Response, User} from 'nexus-prisma';
import { resolve } from "path/posix";


export default [
    objectType({
        name: 'User',
        definition(t) {
            t.field(User.email);
            t.field(User.name);
            t.field(User.classes);
            t.field(User.teachingClasses);
            t.field(User.responses);
        }
    }),
    objectType({
        name: Discussion.$name,
        definition(t) {
            t.field(Discussion.id);
            t.field(Discussion.name);
            t.field('class', Discussion.Class);
            t.field('responses', Discussion.Response);
        }
    }),
    objectType({
        name: Response.$name,
        definition(t) {
            t.field(Response.id);
            t.field(Response.content);
            t.field(Response.parent);
            t.field(Response.responses);
            t.field('author', Response.User);
            t.field('discussion', Response.Discussion);
        }
    }),
    objectType({
        name: Class.$name,
        definition(t) {
            t.field(Class.id);
            t.field(Class.name);
            t.field(Class.description);
            t.field(Class.students);
            t.field(Class.discussions);
            t.field(Class.teacher);
        }
    })
]