create table IF NOT EXISTS attendance_record(
    date date not null,
    subject_id varchar(10),
    student_id varchar(10),
    presence tinyint(1),
    FOREIGN KEY (subject_id) REFERENCES subject(id),
    FOREIGN KEY (student_id) REFERENCES student(id)
);