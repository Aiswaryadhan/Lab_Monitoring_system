create table IF NOT EXISTS attendance_record(
    lab_date date not null,
    subject_id varchar(10),
    student_id varchar(10),
    presence int,
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id),
    FOREIGN KEY (student_id) REFERENCES student(student_id)
);