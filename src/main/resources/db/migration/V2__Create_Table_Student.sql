create table IF NOT EXISTS student(
    student_id varchar(10) primary key,
    student_name varchar(30) not null,
    student_password varchar(20) not null,
    sem int
);