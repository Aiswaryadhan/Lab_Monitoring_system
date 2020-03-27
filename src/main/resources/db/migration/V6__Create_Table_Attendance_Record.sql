create table IF NOT EXISTS attendance_record(
    date date not null,
    subject_id varchar(10) not null,
    student_id varchar(10) not null,
    presence tinyint(1),
    primary key(date,subject_id,student_id),
    FOREIGN KEY (subject_id) REFERENCES subject(id),
    FOREIGN KEY (student_id) REFERENCES student(id)
);