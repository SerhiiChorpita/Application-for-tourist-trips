-- CREATE DATABASE api;
use api;

  CREATE TABLE `countries` (
   `id`       int(10)     unsigned NOT NULL AUTO_INCREMENT,
   `name`     varchar(30) DEFAULT '',
   `travelStatus`    boolean DEFAULT true,
   `availableHotels`    int(10) DEFAULT '0',
   `toursCount`    int(10) DEFAULT '5',
  
   PRIMARY KEY (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

 INSERT INTO countries (name, travelStatus,availableHotels,toursCount) 
      VALUES ('Sri Lanka', true, 4, 4),
 			('Turkey', true, 4, 4),
 			('Bulgaria', true, 4, 4),
 			('Albania', false, 4, 4),
 			('Montenegro', true, 4, 4),
			('Portugal', true, 4, 4),
 			('Hungary', true, 4, 4),
 			('Poland', false, 4, 4),
 			('Italy', true, 4, 4),
             ('Ukraine', true, 4, 4);

  CREATE TABLE `hotels` (
    `id`       int(60)     unsigned NOT NULL AUTO_INCREMENT,
    `name`     varchar(45) DEFAULT '',
    `availableRooms`    int(10) DEFAULT '0',
   `availableInDate`   DATE NULL DEFAULT NULL,
   `city`     varchar(30) DEFAULT '',
  `country`     varchar(30) DEFAULT '',
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8; 


INSERT INTO hotels (name, availableRooms, availableInDate, city, country) 
     VALUES('Fox Kandy', 3, NULL, 'Candi', 'Sri Lanka'),
			('Granbell Hotel Colombo', 5, NULL, 'Colombo', 'Sri Lanka'),
			('Inspira ella', 2, NULL, 'Ella', 'Sri Lanka'),
	('Belmont Boutique Hotel', 1, NULL, 'Negombo', 'Sri Lanka'),
	('Helenapolis Otel', 2, NULL, 'Altınova', 'Turkey'),
	('Hotel54 Luxury Suite', 0, NULL, 'Serdivan', 'Turkey'),
	('IZZ Getaway Gocek', 7, NULL, 'Karacaağaç', 'Turkey'),
	('Akinci Konagi Hotel', 3, NULL, 'Guzelyurt', 'Turkey'),
	('Pamir Guest House', 1, NULL, 'Pamir Guest House', 'Bulgaria'),
	('Mentor Resort', 2, NULL, 'Gaytaninovo', 'Bulgaria'),
	('Hotel Zlatograd', 4, NULL, 'Madan', 'Bulgaria'),
	('Hotel Park Central', 5, NULL, 'Sliven', 'Bulgaria'),
	('SEA & LAKE VIEW VILLA', 0, NULL, 'Kalive Gjoka', 'Albania'),
	('Vila Sofia - Guest House', 2, NULL, 'Memaliaj', 'Albania'),
	('RAMIS Hotel', 1, NULL, 'Ondara', 'Albania'),
	('Hotel Hasmegaj', 4, NULL, 'Mjedë', 'Albania'),
    ('Studios Dragana', 4, NULL, 'Rafailovichi', 'Montenegro'),
    ('Ethno village Moraca Skadar lake', 1, NULL, 'Vranjina', 'Montenegro'),
    ('Guest House Pansion', 4, NULL, 'Ouranupoli', 'Montenegro'),
    ('Sobe i apartmani Djurovic', 3, NULL, 'Melina', 'Montenegro'),
    ('Betica Hotel Rural', 3, NULL, 'Pias', 'Portugal'),
	('YMCA Camp Alambre', 0, NULL, 'Azeitan', 'Portugal'),
	('Hotel Estrela Da Idanha', 2, NULL, 'Idanya-a-Nova', 'Portugal'),
	('Hospedaria Lampião', 1, NULL, 'Penakova', 'Portugal'),
	('Regia Panzió', 2, NULL, 'Halászi', 'Hungary'),
	('Regia Panzió2', 5, NULL, 'Halászi', 'Hungary'),
	('Katica Vendégház', 0, NULL, 'Mihályháza', 'Hungary'),
	('Kolibri Panzió', 3, NULL, 'Boya', 'Hungary'),
	('Hotel Podjadek', 1, NULL, 'Guzno', 'Poland'),
	('Senator Gran Via', 2, NULL, 'Benjemishl','Poland'),
	('Nordowi Dwór', 4, NULL, 'Celbowo', 'Poland'),
	('Marina Mietków', 5, NULL, 'Domanice', 'Poland'),
	('Martini Rooms', 2, NULL, 'Rome', 'Italy'),
	('Masseria Brica Rossa', 2, NULL, 'Thurio', 'Italy'),
	('Albergo Sala', 0, NULL, 'Valbrona', 'Italy'),
	('Borgo Antico San Pantaleo', 4, NULL, 'San Pantaleo', 'Italy'),
    ('Khust Hostel', 4, NULL, 'Hust', 'Ukraine'),
    ('Eden Resort', 1, NULL, 'Albufeira', 'Ukraine'),
    ('Deribas Готель', 0, NULL, 'Odessa', 'Ukraine'),
    ('Bogolvar Retreat Resort', 3, NULL, 'Antalovci', 'Ukraine');


CREATE TABLE `tickets` (
    `id`       int(5)     unsigned NOT NULL AUTO_INCREMENT,
    `nameAirline`     varchar(45) DEFAULT '',
    `numberOfSeats`    int(10) DEFAULT '0',
   `flightCity`   varchar(30) DEFAULT '',
   `flightDates`      DATE NULL DEFAULT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8; 


INSERT INTO tickets (nameAirline, numberOfSeats, flightCity, flightDates) 
     VALUES('Cathay Pacific', 20, '', NULL),
			('Emirates Airline', 20, '', NULL),
            ('Qatar Airways', 20, '', NULL),
            ('Malaysia Airlines', 20, '', NULL),
            ('Air France', 20, '', NULL);
            
            
CREATE TABLE `successfulOrder` (
    `successfulOrder`    int(10) DEFAULT '200'
) 

