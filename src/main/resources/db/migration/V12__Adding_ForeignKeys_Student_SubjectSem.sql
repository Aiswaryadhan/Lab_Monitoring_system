alter table student ADD FOREIGN KEY (sem) REFERENCES semester(id);
alter table subject_sem ADD FOREIGN KEY (sem) REFERENCES semester(id);