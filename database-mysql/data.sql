use ebookstore;

INSERT INTO authors (firstName, lastName) VALUES
('Thomas', 'More'),
('George', 'Eliot'),
('Jane', 'Austen'),
('Lincoln', 'Child');

INSERT INTO books (isbn_10, isbn_13, bookTitle, pageCount, priceTag, image, format, promotion, badge, discount, review, author_id) VALUES
('9780486295831', '978-0486295831', 'Utopia', 96, 10.30, 'https://ucarecdn.com/a3d6914f-7490-4cad-8d5d-292f42676d68/amazonthomasmoreutopia.jpg', 'Paperback', '', '', 0, 4, 1),
('9354406904', '978-9354406904', 'Silas Marner', 216, 13.60, 'https://ucarecdn.com/276a4dc1-c19f-45ff-abc0-922aad038687/amazongeorgeeliotsilasmarner.jpg', 'Paperback', 'Special Item', 'Sale', 0.15, 3, 2),
('0553213105', '978-0486295831', 'Pride and Prejudice', 352, 9.64, 'https://ucarecdn.com/f351d7db-3abf-4a0d-9501-afbda5c60fe7/amazonjaneaustenprideandprejudice.jpg', 'Mass Market Paperback', 'Sale Item', 'Sale', 0.2, 5, 3),
('030794672X', '978-0307946720', 'Deep Storm: 1', 384, 30.16, 'https://ucarecdn.com/cd92181b-4293-488c-bdf5-ac30a30e5484/amazonlincolnchild1deepstorm.jpg', 'Hardcover', 'Popular Item', '', 0, 2, 4),
('0307473759', '978-0307473752', 'The Forgotten Room: 4', 400, 17.83, 'https://ucarecdn.com/def6f109-87d1-4a54-9724-eda51bce2557/amazonlincolnchild4theforgottenroom.jpg', 'Mass Market Paperback', 'Popular Item', '', 0, 0, 4),
('0525562486', '978-0525562481', 'Chrysalis: A Thriller: 6', 336, 21.80, 'https://ucarecdn.com/5a21c6da-34b4-4bfe-a5b1-d34e95ed895d/amazonlincolnchild6chrysalis.jpg', 'Paperback', 'Popular Item', '', 0, 5, 4);

INSERT INTO publishers (publisher) VALUES
('Dover Thrift Editions'),
('Fingerprint Publishing'),
('Bantam Classics'),
('Penguin Random House');

INSERT INTO book_publisher (publicationDate, website, book_id, publisher_id) VALUES
('2000-02-01', 'https://www.amazon.sg/Utopia-Sir-Thomas-More/dp/0486295834', 1, 1),
('2023-09-01', 'https://www.amazon.sg/Silas-Marner-George-Eliot/dp/9354406904', 2, 2),
('1983-12-01', 'https://www.amazon.sg/Pride-Prejudice-Jane-Austen/dp/0553213105', 3, 3),
('2011-07-19', 'https://www.amazon.sg/Deep-Storm-1-Lincoln-Child/dp/030794672X', 4, 4),
('2016-05-31', 'https://www.amazon.sg/Forgotten-Room-4-Lincoln-Child/dp/0307473759', 5, 4),
('2023-06-06', 'https://www.amazon.sg/Chrysalis-Thriller-6-Lincoln-Child/dp/0525562486', 6, 4);

INSERT INTO marketing_preferences (id, preference) VALUES (1, 'email');  -- Email Marketing
INSERT INTO marketing_preferences (id, preference) VALUES (2, 'sms');    -- SMS Marketing
