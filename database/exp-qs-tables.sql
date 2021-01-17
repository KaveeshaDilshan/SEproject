DROP TABLE IF EXISTS Est_Mat CASCADE;
DROP TABLE IF EXISTS Material CASCADE;
DROP TABLE IF EXISTS Req_Mac CASCADE;
DROP TABLE IF EXISTS Machine_Request CASCADE;
DROP TABLE IF EXISTS Material_Order CASCADE;
DROP TABLE IF EXISTS Estimate CASCADE;
DROP TABLE IF EXISTS Machine CASCADE;
DROP TABLE IF EXISTS Project CASCADE;

------------------ Tables --------------------

---expedi/qs ----
CREATE TABLE Estimate (
  E_id int NOT NULL,
  P_id int NOT NULL,
  create_date date NOT NULL,
  submit_status boolean,
  submit_date date,
  PRIMARY KEY (E_id),
  FOREIGN KEY (P_id) REFERENCES Project(P_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Material (
  M_id int NOT NULL,
  name varchar(30) NOT NULL,
  unit_cost numeric NOT NULL,
  PRIMARY KEY (M_id)
);

CREATE TABLE Est_Mat (
  E_id int NOT NULL,
  M_id int NOT NULL,
  quantity int NOT NULL,
  PRIMARY KEY (E_id,M_id),
  FOREIGN KEY (E_id) REFERENCES Estimate(E_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (M_id) REFERENCES Material(M_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Material_Order (
  O_id int NOT NULL,
  E_id int NOT NULL,
  order_date date,
  ordered boolean,
  received boolean,
  PRIMARY KEY (O_id),
  FOREIGN KEY (E_id) REFERENCES Estimate(E_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Machine_Request (
  R_id int NOT NULL,
  P_id int NOT NULL,
  request_date date NOT NULL,
  duration varchar(30),
  PRIMARY KEY (R_id),
  FOREIGN KEY (P_id) REFERENCES Project(P_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Machine (
  machine_name varchar(30),
  PRIMARY KEY (machine_name)
);

CREATE TABLE Req_Mac (
  R_id int NOT NULL,
  machine_name varchar(30),
  quantity int NOT NULL,
  PRIMARY KEY (R_id,machine_name),
  FOREIGN KEY (R_id) REFERENCES Machine_Request(R_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (machine_name) REFERENCES Machine(machine_name) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Project (
  P_id int NOT NULL,
  name varchar(30) NOT NULL,
  start_date date,
  duration varchar(30),
  PRIMARY KEY (P_id)
);
