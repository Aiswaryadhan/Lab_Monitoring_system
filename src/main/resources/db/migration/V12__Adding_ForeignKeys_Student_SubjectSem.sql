alter table student ADD FOREIGN KEY (sem) REFERENCES sem(id);
alter table subject_sem ADD FOREIGN KEY (sem) REFERENCES sem(id);