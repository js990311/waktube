create database toyProject;
use toyProject;

CREATE TABLE waktube(
  vid VARCHAR(255),
  views INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  uploadDate DATE,
  uploader VARCHAR(255),
  CONSTRAINT PK	PRIMARY KEY(vid)
);

CREATE TABLE ranking(
  rkey INT NOT NULL AUTO_INCREMENT UNIQUE,
  nickname  VARCHAR(255) NOT NULL,
  points INT NOT NULL
);
