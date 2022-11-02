-- CREATE DATABASE api;
-- use api;

  CREATE TABLE `countries` (
   `id`       int(10)     unsigned NOT NULL AUTO_INCREMENT,
   `name`     varchar(30) DEFAULT '',
   `travelStatus`    boolean DEFAULT true,
   `availableHotels`    int(10) DEFAULT '0',
   `toursCount`    int(10) DEFAULT '5',
  
   PRIMARY KEY (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

 INSERT INTO countries (name, travelStatus,availableHotels,toursCount) 
      VALUES ('Шрі-Ланка', true, 4, 4),
 			('Туреччина', true, 4, 4),
 			('Болгарія', true, 4, 4),
 			('Албанія', false, 4, 4),
 			('Чорногорія', true, 4, 4),
			('Португалія', true, 4, 4),
 			('Угорщина', true, 4, 4),
 			('Польща', false, 4, 4),
 			('Італія', true, 4, 4),
             ('Україна', true, 4, 4);

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
     VALUES('Fox Kandy', 3, NULL, 'Канді', 'Шрі-Ланка'),
			('Granbell Hotel Colombo', 5, NULL, 'Коломбо', 'Шрі-Ланка'),
			('Inspira ella', 2, NULL, 'Елла', 'Шрі-Ланка'),
	('Belmont Boutique Hotel', 1, NULL, 'Негомбо', 'Шрі-Ланка'),
	('Helenapolis Otel', 2, NULL, 'Altınova', 'Туреччина'),
	('Hotel54 Luxury Suite', 0, NULL, 'Serdivan', 'Туреччина'),
	('IZZ Getaway Gocek', 7, NULL, 'Karacaağaç', 'Туреччина'),
	('Akinci Konagi Hotel', 3, NULL, 'Guzelyurt', 'Туреччина'),
	('Pamir Guest House', 1, NULL, 'Pamir Guest House', 'Болгарія'),
	('Mentor Resort', 2, NULL, 'Gaytaninovo', 'Болгарія'),
	('Hotel Zlatograd', 4, NULL, 'Madan', 'Болгарія'),
	('Hotel Park Central', 5, NULL, 'Sliven', 'Болгарія'),
	('SEA & LAKE VIEW VILLA', 0, NULL, 'Kalive Gjoka', 'Албанія'),
	('Vila Sofia - Guest House', 2, NULL, 'Memaliaj', 'Албанія'),
	('RAMIS Hotel', 1, NULL, 'Ондара', 'Албанія'),
	('Hotel Hasmegaj', 4, NULL, 'Mjedë', 'Албанія'),
    ('Studios Dragana', 4, NULL, 'Рафаїловичі', 'Чорногорія'),
    ('Ethno village Moraca Skadar lake', 1, NULL, 'Vranjina', 'Чорногорія'),
    ('Guest House Pansion', 4, NULL, 'Урануполі', 'Чорногорія'),
    ('Sobe i apartmani Djurovic', 3, NULL, 'Меліне', 'Чорногорія'),
    ('Betica Hotel Rural', 3, NULL, 'Pias', 'Португалія'),
	('YMCA Camp Alambre', 0, NULL, 'Азейтан', 'Португалія'),
	('Hotel Estrela Da Idanha', 2, NULL, 'Іданья-а-Нова', 'Португалія'),
	('Hospedaria Lampião', 1, NULL, 'Пенакова', 'Португалія'),
	('Regia Panzió', 2, NULL, 'Halászi', 'Угорщина'),
	('Regia Panzió2', 5, NULL, 'Halászi', 'Угорщина'),
	('Katica Vendégház', 0, NULL, 'Mihályháza', 'Угорщина'),
	('Kolibri Panzió', 3, NULL, 'Боя', 'Угорщина'),
	('Hotel Podjadek', 1, NULL, 'Гужно', 'Польща'),
	('Senator Gran Via', 2, NULL, 'Бенджемишль','Польща'),
	('Nordowi Dwór', 4, NULL, 'Celbowo', 'Польща'),
	('Marina Mietków', 5, NULL, 'Domanice', 'Польща'),
	('Martini Rooms', 2, NULL, 'Рим', 'Італія'),
	('Masseria Brica Rossa', 2, NULL, 'Thurio', 'Італія'),
	('Albergo Sala', 0, NULL, 'Valbrona', 'Італія'),
	('Borgo Antico San Pantaleo', 4, NULL, 'Сан-Панталео', 'Італія'),
    ('Khust Hostel', 4, NULL, 'Хуст', 'Україна'),
    ('Eden Resort', 1, NULL, 'Албуфейра', 'Україна'),
    ('Deribas Готель', 0, NULL, 'Одеса', 'Україна'),
    ('Bogolvar Retreat Resort', 3, NULL, 'Анталовці', 'Україна');


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

