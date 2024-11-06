--Queries for CalvinKlean:

--Find all available washers:
    SELECT machine.ID, machine.type
    FROM machine
    WHERE machine.type = 'washer' AND machine.availability = TRUE;

--Find all available dryers:
    SELECT machine.ID, machine.type
    FROM machine
    WHERE machine.type = 'dryer' AND machine.availability = TRUE;
--Find all washers in Noordewier dorm:
    SELECT machine.ID, machine.type
    FROM machine, machinelocation, dorm
    WHERE machine.type = 'washer'
        AND machinelocation.machineid = machine.ID
        AND machinelocation.dormid = dorm.ID
        AND dorm.name = 'Noordewier' ;

--Find all dryers in Noordewier dorm: 
    SELECT COUNT(machine.ID)
    FROM machine, machinelocation, dorm
    WHERE machine.type = 'washer' OR 'dryer'
        AND machinelocation.machineid = machine.ID
        AND machinelocation.dormid = dorm.ID
        AND dorm.name = 'Noordewier' ;

--Find all open machines:
    SELECT machine.ID, machine.type
    FROM machine
    WHERE machine.availability = TRUE;
