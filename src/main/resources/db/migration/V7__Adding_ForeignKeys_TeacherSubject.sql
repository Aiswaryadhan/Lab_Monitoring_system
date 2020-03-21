alter table teacher_subject ADD FOREIGN KEY (teacher_id) REFERENCES teacher(id);
alter table teacher_subject ADD FOREIGN KEY (subject_id) REFERENCES subject(id);