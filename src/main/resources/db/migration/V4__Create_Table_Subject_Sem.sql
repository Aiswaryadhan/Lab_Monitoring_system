create table IF NOT EXISTS subject_sem(
    subject_id varchar(10),
    sem int,
    FOREIGN KEY (subject_id) REFERENCES subject(id)
);