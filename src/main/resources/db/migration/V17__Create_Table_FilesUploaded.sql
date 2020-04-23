create table IF NOT EXISTS files_uploaded(
  datetime datetime not null,
  subject_id varchar(10) not null,
  student_id varchar(10) not null,
  file_name varchar(50) not null,
FOREIGN KEY (subject_id) REFERENCES subject(id),
FOREIGN KEY (student_id) REFERENCES student(id)
);