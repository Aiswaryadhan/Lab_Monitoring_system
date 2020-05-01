create table IF NOT EXISTS blocked_sites(
  sub_id varchar(10),
  url varchar(255),
  FOREIGN KEY (sub_id) REFERENCES subject(id)

);