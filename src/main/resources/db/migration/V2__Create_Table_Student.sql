create table IF NOT EXISTS student(
    id varchar(10) primary key,
    name varchar(30) not null,
    password varchar(20) not null,
    sem int
);