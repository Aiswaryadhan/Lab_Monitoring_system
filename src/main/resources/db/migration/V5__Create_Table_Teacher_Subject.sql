create table teacher_subject(
    teacher_id varchar(10),
    subject_id varchar(10),
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id),
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id)
);