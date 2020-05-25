create table IF NOT EXISTS notification(
  sender varchar(10),
  receiver varchar(10),
  type varchar(10),
  timestamp timestamp
);