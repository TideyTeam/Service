-- Drop previous versions of the tables if they exist, in reverse order of foreign keys.
DROP TABLE IF EXISTS MachineLocation CASCADE;
DROP TABLE IF EXISTS Machine CASCADE;
DROP TABLE IF EXISTS Dorm CASCADE;

-- Create the Dorm table.
CREATE TABLE Dorm (
    ID integer PRIMARY KEY,
    name varchar(50) NOT NULL
);

-- Create the Machine table.
CREATE TABLE Machine (
    ID integer PRIMARY KEY,
    type varchar(10) CHECK (type IN ('washer', 'dryer')),
    availability boolean NOT NULL
);

-- Create the MachineLocation table, referencing Machine and Dorm (without the floor column).
CREATE TABLE MachineLocation (
    ID integer PRIMARY KEY,
    machineID integer REFERENCES Machine(ID),
    dormID integer REFERENCES Dorm(ID)
);

-- Insert statements for initial data
INSERT INTO Dorm (ID, name) VALUES (1, 'Vanderwerp');
INSERT INTO Dorm (ID, name) VALUES (2, 'Noordewier');

INSERT INTO Machine (ID, type, availability) VALUES (1, 'washer', true);
INSERT INTO Machine (ID, type, availability) VALUES (2, 'washer', true);
INSERT INTO Machine (ID, type, availability) VALUES (3, 'washer', true);
INSERT INTO Machine (ID, type, availability) VALUES (4, 'dryer', true);
INSERT INTO Machine (ID, type, availability) VALUES (5, 'dryer', true);
INSERT INTO Machine (ID, type, availability) VALUES (6, 'dryer', true);



INSERT INTO MachineLocation (ID, machineID, dormID) VALUES (1, 3, 2); -- Machine 3 in Dorm B
