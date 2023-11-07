'use client';

export default function DateTimeView({ date, ...props }: { date: Date } & React.HTMLAttributes<HTMLTimeElement>) {
    return <time dateTime={date.toISOString()} {...props}>{date.toLocaleString()}</time>
}