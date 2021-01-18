DROP TABLE IF EXISTS Project CASCADE;
DROP TABLE IF EXISTS Estimate CASCADE;
DROP TABLE IF EXISTS MaterialValue CASCADE;
DROP TABLE IF EXISTS Est_Mat CASCADE;
DROP TABLE IF EXISTS Material_Order CASCADE;
DROP TABLE IF EXISTS Machine_Request CASCADE;
DROP TABLE IF EXISTS Machine CASCADE;
DROP TABLE IF EXISTS Req_Mac CASCADE;

------------------ Tables --------------------

---expedi/qs ----
CREATE TABLE Project (
  P_id int NOT NULL,
  name varchar(30) NOT NULL,
  start_date date,
  duration varchar(30),
  PRIMARY KEY (P_id)
);

CREATE TABLE Estimate (
  E_id int NOT NULL,
  P_id int NOT NULL,
  create_date date NOT NULL,
  submit_status boolean,
  submit_date date,
  PRIMARY KEY (E_id),
  FOREIGN KEY (P_id) REFERENCES Project(P_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE MaterialValue (
  M_id SERIAL,
  m_name varchar(30) NOT NULL,
  m_amount varchar(20) NOT NULL,
  m_cost DECIMAL NOT NULL,
  PRIMARY KEY (M_id)
);

CREATE TABLE Est_Mat (
  E_id int NOT NULL,
  M_id int NOT NULL,
  quantity int NOT NULL,
  PRIMARY KEY (E_id,M_id),
  FOREIGN KEY (E_id) REFERENCES Estimate(E_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (M_id) REFERENCES MaterialValue(M_id) ON DELETE CASCADE ON UPDATE CASCADE
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


--------------------------Procedures------------------------
CREATE OR REPLACE PROCEDURE addMaterialValue(
    val_mname VARCHAR(30),
    val_mamount VARCHAR(20),
    val_mcost DECIMAL
    
)

LANGUAGE plpgsql
AS $$
DECLARE
    existing_materials VARCHAR(30) := (SELECT m_name from MaterialValue WHERE m_name = val_mname);
BEGIN
    IF (existing_materials is null) THEN
        INSERT INTO MaterialValue(m_name, m_amount, m_cost) VALUES (val_mname,val_mamount, val_mcost);
    ELSE
        RAISE EXCEPTION '% is already exit', val_mname;
    END IF;
END;
$$;


-------------------test insert-------------------
INSERT INTO project(p_id,name,start_date,duration) VALUES (1,'first_project','08-01-2021','3 months');
INSERT INTO project(p_id,name,start_date,duration) VALUES (2,'second_project','09-01-2021','5 months');

INSERT INTO estimate(e_id,p_id,create_date,submit_status,submit_date) VALUES (1,1,'08-01-2021','1','09-01-2021');
INSERT INTO estimate(e_id,p_id,create_date,submit_status,submit_date) VALUES (2,1,'08-01-2021','1','09-01-2021');
INSERT INTO estimate(e_id,p_id,create_date,submit_status,submit_date) VALUES (3,2,'08-01-2021','1','12-01-2021');

INSERT INTO MaterialValue(m_name,m_amount,m_cost) VALUES ('mat 1','2x3x1 inch',1000);
INSERT INTO MaterialValue(m_name,m_amount,m_cost) VALUES ('mat 2','1kg',2000);
INSERT INTO MaterialValue(m_name,m_amount,m_cost) VALUES ('mat 3','fsfsfds',5000);
INSERT INTO MaterialValue(m_name,m_amount,m_cost) VALUES ('mat 4','dfsfsd',500);

INSERT INTO est_mat(e_id,m_id,quantity) VALUES (1,1,5);
INSERT INTO est_mat(e_id,m_id,quantity) VALUES (1,2,3);
INSERT INTO est_mat(e_id,m_id,quantity) VALUES (1,4,1);
INSERT INTO est_mat(e_id,m_id,quantity) VALUES (2,2,10);
INSERT INTO est_mat(e_id,m_id,quantity) VALUES (2,4,8);
INSERT INTO est_mat(e_id,m_id,quantity) VALUES (3,1,4);
INSERT INTO est_mat(e_id,m_id,quantity) VALUES (3,2,6);