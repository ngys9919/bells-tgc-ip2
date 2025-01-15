SET NAMES 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci';

USE aieshop3;

INSERT INTO category (id, type) VALUES
(1, 'AI-Books'),
(2, 'AI-Image'),
(3, 'AI-Music'),
(4, 'AI-Video');

INSERT INTO authors (firstName, lastName) VALUES
('Prabhakar', 'Veeraraghavan'),
('James', 'Cole'),
('Tom', 'Taulli'),
('Christoffer', 'Noring'),
('Anjali', 'Jain'),
('Marina', 'Fernandez'),
('Hadelin de Ponteves', ''),
('Mark', 'Tristan Olsson'),
('Eleanor', 'Wentworth'),
('Emma', 'Royce Smartley'),
('Nathan', 'B Crocker'),
('Sue', 'Neumann'),
('Hayden', 'Van Der Post'),
('Reactive Publishing', ''),
('Nena', 'Buenaventura'),
('TRAVIS', 'FOLEY'),
('ANURAG', 'KUMAR'),
('Dr. V Lalitha', 'Srilalitha'),
('Daniel', 'Zingaro'),
('Leo', 'Porter');


INSERT INTO aibooks (id, type_id, isbn_10, isbn_13, title, pageCount, priceTag, image, format, promotion, badge, discount, review, author_id) VALUES
(10001, 1, '', '979-8343157352', '225 AI Powered Prompts:: Boost Your Business with Digital Products, Landing Pages, and Social Media Ideas', null, 34.47, 'https://ucarecdn.com/12008e06-e652-4315-99aa-ba2a65adabc6/amazon_225aipoweredpromptsprabhakarveeraraghavan.jpg', 'Paperback', '', '', 0, 4, 1),
(10002, 1, '', '979-8346458104', 'Adventures in AI-Powered Software Development: Unlock the Power of AI to Transform Your Development Workflow', null, 35.52, 'https://ucarecdn.com/78ee116c-2f7f-417f-abb3-a5988e445321/amazon_adventuresinaipoweredsoftwaredevelopmentjamescole.jpg', 'Hardcover', 'Special Item', 'Sale', 0.15, 3, 2),
(10003, 1, '1098164563', '978-1098164560', 'Ai-Assisted Programming: Better Planning, Coding, Testing, and Deployment', 222, 79.38, 'https://ucarecdn.com/142417e7-b4fb-4048-b46c-f3fc8b93b163/amazon_aiassistedprogramming.jpg', 'Paperback', 'Sale Item', 'Sale', 0.2, 5, 3),
(10004, 1, '1835086055', '978-1835086056', 'AI-Assisted Programming for Web and Machine Learning: Improve your development workflow with ChatGPT and GitHub Copilot', 602, 71.55, 'https://ucarecdn.com/72b6c5b7-4f48-45e1-a537-7d959aa5a387/amazon_aiassistedprogrammingforwebandmachinelearning.jpg', 'Paperback', 'Popular Item', '', 0, 2, 4),
(10005, 1, '1838645357', '978-1838645359', 'AI Crash Course', 360, 48.99, 'https://ucarecdn.com/9250b8ae-1224-44ea-8f1d-c71e985c4634/amazon_aicrashcourse.jpg', 'Paperback', 'Popular Item', '', 0, 0, 7),
(10006, 1, '', '979-8302981141', 'Ai Millionaire Income Blueprint: Using ChatGPT to Create Scalable, Ai-Powered Income Streams', null, 33.44, 'https://ucarecdn.com/7cef75e4-2039-4e3f-a654-ee4d6246d221/amazon_aimillionaireincomeblueprint1marktristanolsson2eleanorwentworth.jpg', 'Hardcover', 'Popular Item', '', 0, 5, 8),
(10007, 1, '', '979-8341253957', 'AI-Powered Coding: Top Tools for Software Development in 2024', null, 31.53, 'https://ucarecdn.com/862205ae-6aeb-4e81-87cd-adb769602ddc/amazon_aipoweredcoding.jpg', 'Hardcover - Large Print', '', '', 0, 4, 10),
(10008, 1, '1633437612', '978-1633437616', 'AI-Powered Developer: Build Great Software with ChatGPT and Copilot', 240, 71.14, 'https://ucarecdn.com/56e2c62e-2bca-4dc6-a558-c82c94a9ba4e/amazon_aipowereddeveloper.jpg', 'Paperback', 'Special Item', 'Sale', 0.15, 3, 11),
(10009, 1, '', '979-8339273264', 'AI-Powered Productivity for Small Business Owners: Automate, Optimize, and Scale Your Business With Artificial Intelligence', null, 19.77, 'https://ucarecdn.com/40b5e53a-5956-466f-9fa5-52c9636de154/amazon_aipoweredproductivityforsmallbusinessownerssueneumann.jpg', 'Paperback', 'Sale Item', 'Sale', 0.2, 5, 12),
(10010, 1, '', '979-8332575884', 'AI Powered Productivity: Unlock Your Potential: Transforming Efficiency with AI-Powered Productivity', null, 44.92, 'https://ucarecdn.com/1e2792b1-911e-4847-a0da-1b790842f581/amazon_aipoweredproductivityhaydenvanderpost.jpg', 'Paperback', 'Popular Item', '', 0, 2, 13),
(10011, 1, '', '979-8345079720', 'AI-Powered Productivity: Maximizing Efficiency and Success in the Modern Workplace', 122, 26.93, 'https://ucarecdn.com/cd02f4db-6d59-40fc-a178-35845666c6c3/amazon_aipoweredproductivitynenabuenaventura.jpg', 'Paperback', 'Popular Item', '', 0, 0, 15),
(10012, 1, '', '979-8339162001', 'AI-Powered Productivity: Mastering AI Note-Taking and Code Assistants for Maximum Efficiency', null, 22.36, 'https://ucarecdn.com/ebdf32ed-f625-460b-ae71-2ae8d88c529a/amazon_aipoweredproductivitytravisfoley.jpg', 'Paperback', 'Popular Item', '', 0, 5, 16),
(10013, 1, '', '979-8344566115', 'AI Powered Virtual Assistantt', null, 22.40, 'https://ucarecdn.com/e789fbe2-bdc7-4362-9033-81a2efa5e14d/amazon_aipoweredvirtualassistant1anguragkumar2drvlalithasrilalitha.jpg', 'Paperback', 'Sale Item', 'Sale', 0.2, 5, 17),
(10014, 1, '1633437787', '978-1633437784', 'Learn AI-Assisted Python Programming with GitHub Copilot: With GitHub Copilot and ChatGPT', 296, 69.71, 'https://ucarecdn.com/77ff122b-531a-4fc3-afb4-d405c84c2168/amazon_learnaiassistedpythonprogramming1E.jpg', 'Paperback', 'Popular Item', '', 0, 2, 19),
(10015, 1, '1633435997', '978-1633435995', 'Learn Ai-Assisted Python Programming, Second Edition', 336, 67.39, 'https://ucarecdn.com/56c94dd0-f869-4845-87d0-d088e1e2b118/amazon_learnaiassistedpythonprogramming2E.jpg', 'Paperback', 'Popular Item', '', 0, 0, 19);


INSERT INTO author_book (author_id, book_id) VALUES
(1, 10001),
(2, 10002),
(3, 10003),
(4, 10004),
(5, 10004),
(6, 10004),
(7, 10005),
(8, 10006),
(9, 10006),
(10, 10007),
(11, 10008),
(12, 10009),
(13, 10010),
(14, 10010),
(15, 10011),
(16, 10012),
(17, 10013),
(18, 10013),
(19, 10014),
(20, 10015),
(19, 10015);

INSERT INTO publishers (publisher) VALUES
('Draft2Digital'),
('Independently Published'),
("O'REILLY"),
('Packt Publishing'),
('Manning'),
('Reactive Publishing');

INSERT INTO book_publisher (publicationDate, website, book_id, publisher_id) VALUES
('2024-10-14', 'https://www.amazon.sg/225-AI-Powered-Prompts-Business/dp/B0DK2SMJX2/ref=sr_1_30', 10001, 1),
('2024-11-12', 'https://www.amazon.sg/Adventures-AI-Powered-Software-Development-Management/dp/B0DMVPHB2M/ref=sr_1_19', 10002, 2),
('2024-05-21', 'https://www.amazon.sg/Ai-Assisted-Programming-Planning-Testing-Deployment/dp/1098164563/ref=pd_sbs_d_sccl_1_2/355-2118400-1936840', 10003, 3),
('2024-08-30', 'https://www.amazon.sg/AI-Assisted-Programming-Web-Machine-Learning/dp/1835086055/ref=sr_1_1', 10004, 4),
('2019-11-28', 'https://www.amazon.sg/AI-Crash-Course-Hadelin-Ponteves/dp/1838645357/ref=sr_1_1', 10005, 4),
('2024-12-08', 'https://www.amazon.sg/Ai-Millionaire-Income-Blueprint-Ai-Powered/dp/B0DQ26CXV2/ref=sr_1_38', 10006, 2),
('2024-10-04', 'https://www.amazon.sg/AI-Powered-Coding-Tools-Software-Development/dp/B0DJJXYNL9/ref=sr_1_10', 10007, 2),
('2024-08-27', 'https://www.amazon.sg/AI-Powered-Developer-Software-ChatGPT-Copilot/dp/1633437612/ref=sr_1_3', 10008, 5),
('2024-09-14', 'https://www.amazon.sg/AI-Powered-Productivity-Small-Business-Owners/dp/B0DH3CDXMX/ref=sr_1_6', 10009, 2),
('2024-07-08', 'https://www.amazon.sg/Powered-Productivity-Transforming-Efficiency-AI-Powered/dp/B0D93J7XX7/ref=sr_1_1', 10010, 6),
('2024-11-08', 'https://www.amazon.sg/AI-Powered-Productivity-Maximizing-Efficiency-Workplace/dp/B0DMM8VGX7/ref=sr_1_3', 10011, 2),
('2024-09-13', 'https://www.amazon.sg/AI-Powered-Productivity-Note-Taking-Assistants-Efficiency/dp/B0DH1SXZTX/ref=sr_1_4', 10012, 2),
('2023-06-07', 'https://www.amazon.sg/Powered-Virtual-Assistant-ANURAG-KUMAR/dp/B0DL4MPLR4/ref=sr_1_45', 10013, 2),
('2023-11-06', 'https://www.amazon.sg/AI-Assisted-Python-Programming-GitHub-Copilot/dp/1633437787/ref=sr_1_1', 10014, 5),
('2024-10-29', 'https://www.amazon.sg/Learn-Ai-Assisted-Python-Programming-Second/dp/1633435997/ref=sr_1_fkmr0_1', 10015, 5);



INSERT INTO aiimage (id, type_id, title, description, fileName, fileFormat, fileSize, priceTag, image, creator, dateCreated, downloadlink, promotion, badge, discount, review) VALUES
(20001, 2, 'regal woman', 'The image depicts a regal woman in an intricate blue outfit, adorned with jewels and floral accents.', 'nightcafe-1-1024x1024.jpg', 'JPG', '319KB', 2.99, 'https://ucarecdn.com/4d6507af-3685-4f07-bccd-8a297270997a/nightcafe11024x1024.jpg', '', '2024-11-21 21:04:00', '', '', '', 0, 4),
(20002, 2, 'totoro creature', 'A whimsical creature sits on a tree branch surrounded by durians, in a lush forest setting.', 'nightcafe-2-1024x1024.jpg', 'JPG', '248KB', 4.99, 'https://ucarecdn.com/eb5b74a5-f056-4d9e-a1f8-461f635095e4/nightcafe21024x1024.jpg', '', '2024-11-22 03:04:00', '', 'Special Item', 'Sale', 0.15, 3),
(20003, 2, 'city park', 'A vibrant city scene with diverse people interacting in a lively park, surrounded by colorful buildings and skyscrapers.', 'nightcafe-3-1024x1024.jpg', 'JPG', '70KB', 3.99, 'https://ucarecdn.com/2a66a0fb-8723-4212-b6ca-f0d679c5a253/nightcafe31024x1024.jpg', '', '2024-11-22 03:14:00', '', 'Sale Item', 'Sale', 0.2, 5),
(20004, 2, 'toddler and cat', 'A cute baby sits on a soft rug, gently interacting with a white kitten in a pastel room.', 'nightcafe-4-1024x1024.jpg', 'JPG', '47KB', 2.99, 'https://ucarecdn.com/632c6609-aa8a-47e9-9b65-2fccbbfb7920/nightcafe41024x1024.jpg', '', '2024-11-22 03:29:00', '', 'Popular Item', '', 0, 2),
(20005, 2, 'girl and bear', 'A young girl in a winter outfit gently pets a polar bear near an igloo in a snowy landscape.', 'nightcafe-5-1024x1024.jpg', 'JPG', '121KB', 3.99, 'https://ucarecdn.com/6278e8ae-696d-498c-ad64-85c6c6c7b840/nightcafe51024x1024.jpg', '', '2024-11-22 03:28:00', '', 'Popular Item', '', 0, 0),
(20006, 2, 'crystal ball', 'A festive plate features a miniature snowy village scene with trees, houses, and a glowing starry sky.', 'nightcafe-6-1024x1024.jpg', 'JPG', '132KB', 4.99, 'https://ucarecdn.com/4f9ee6e5-cc3d-497f-8230-c87d7587e44b/nightcafe61024x1024.jpg', '', '2024-11-22 03:31:00', '', 'Popular Item', '', 0, 5),
(20007, 2, 'snail', 'A cartoon snail with big eyes holds a letter in its mouth while walking down a cobblestone street.', 'nightcafe-7-1024x1024.jpg', 'JPG', '115KB', 3.99, 'https://ucarecdn.com/a1023c44-d276-4c70-b1f6-f867d7105fc6/nightcafe71024x1024.jpg', '', '2024-11-22 03:32:00', '', '', '', 0, 4),
(20008, 2, 'glowing train', 'A magical steam train, glowing with golden light, travels through a snowy winter landscape towards a village.', 'nightcafe-8-1024x1024.jpg', 'JPG', '376KB', 4.99, 'https://ucarecdn.com/78d35076-2945-4919-9b53-beb71b930cf1/nightcafe81024x1024.jpg', '', '2024-11-22 03:32:00', '', 'Special Item', 'Sale', 0.15, 3),
(20009, 2, 'polar bear and people', 'A surreal scene featuring a woman exercising with a polar bear and a man holding a dumbbell.', 'nightcafe-9-1024x1024.jpg', 'JPG', '138KB', 3.99, 'https://ucarecdn.com/5c1bb74c-0da7-45fa-b883-e083e9ad0db1/nightcafe91024x1024.jpg', '', '2024-11-22 04:13:00', '', 'Sale Item', 'Sale', 0.2, 5);


INSERT INTO aimusic (id, type_id, songGenre, title, description, fileName, fileFormat, fileSize, priceTag, music, image, duration, creator, dateCreated, downloadlink, promotion, badge, discount, review) VALUES
(30001, 3, 'electronic', 'Do, Re, Mi, Fa, Sol, La, Ti, Do (Remastered)', 'a cappella, powerful', 'suno-1-8492f232.mp3', 'MP3', '1,732KB', 1.99, 'https://ucarecdn.com/62bd7af0-530f-47d3-a6dc-0613b573a128/suno18492f232.mp3', 'https://ucarecdn.com/98e36a9a-0a38-49c6-84ac-d059826f509d/suno1.png', '1:13', 'Biscuit Boy', '2024-11-22 06:27:00', 'https://suno.com/song/8492f232-eda9-4663-93e0-025c371b9b00', '', '', 0, 4),
(30002, 3, 'rock', 'Last Night was the Last Night', 'quirky, energetic, raw, indie rock, garage rock revival, post-punk revival', 'suno-2-8c533f18.mp3', 'MP3', '3,306KB', 2.99, 'https://ucarecdn.com/c6e4bd86-c61f-4a90-bc69-42f9d1a37f3f/suno28c533f18.mp3', 'https://ucarecdn.com/ab9da200-3580-4259-a08e-cf59796c41ae/suno2.png', '2:20', 'IO', '2024-11-22 06:31:00', 'https://suno.com/song/8c533f18-9c2e-4138-bf85-ae083cea1ae1', 'Special Item', 'Sale', 0.15, 3),
(30003, 3, 'pop', 'Mistletoe and Missing You', 'pop acoustic', 'suno-3-5357415b.mp3', 'MP3', '2,322KB', 2.99, 'https://ucarecdn.com/8ef4b67f-fb8c-4129-aaa2-c6bf31361f4f/suno35357415b.mp3', 'https://ucarecdn.com/8fab3751-28f5-45c3-aee3-bf8a8c0756ba/suno3.png', '2:28', 'MACH', '2024-11-22 06:36:00', 'https://suno.com/song/5357415b-a202-4798-af1b-3bea6e8939bd', 'Sale Item', 'Sale', 0.2, 5),
(30004, 3, 'pop', 'Rhythm In My Soul', 'neosoul, pop, acoustic, rhodes, Wurlitzer', 'suno-4-d4c52629.mp3', 'MP3', '2,762KB', 1.99, 'https://ucarecdn.com/5514df4b-6472-4895-bce7-54867efdf5d1/suno4d4c52629.mp3', 'https://ucarecdn.com/0b86a6a7-0939-440e-8f50-12471077da12/suno4.png', '1:57', 'MACH', '2024-11-22 06:37:00', 'https://suno.com/song/d4c52629-f234-4dfc-a6c4-2c03213fcf16', 'Popular Item', '', 0, 2),
(30005, 3, 'soul', 'A is for Amazing', 'gospel soul choir', 'suno-5-b56fd324.mp3', 'MP3', '1,037KB', 0.99, 'https://ucarecdn.com/b441d67f-41d0-4cf4-855a-3d0d95148655/suno5b56fd324.mp3', 'https://ucarecdn.com/c56eb32e-dfa9-42e7-91f5-96f1daebc587/suno5.png', '1:06', 'MACH', '2024-11-22 06:39:00', 'https://suno.com/song/b56fd324-bfcb-4613-aff3-e6e0e82d95fc', 'Popular Item', '', 0, 0),
(30006, 3, '', 'Lost in the now', 'edm, guajira', 'suno-6-fc991b95.mp3', 'MP3', '3,340KB', 1.99, 'https://ucarecdn.com/e03ee0ff-8489-4dfd-a29a-715c13255991/suno6fc991b95.mp3', 'https://ucarecdn.com/1b06eca3-069c-4bb6-9461-6505eac25a0d/suno6.png', '2:22', 'keenan', '2024-11-22 06:48:00', 'https://suno.com/song/fc991b95-e4e9-4c8f-87e8-e5e4560755e7', 'Popular Item', '', 0, 5),
(30007, 3, 'rap', 'Breathe Right Strip', 'lo-fi rap, hip hop samples', 'suno-7-4fc35a27.mp3', 'MP3', '3,341KB', 1.99, 'https://ucarecdn.com/4b720470-8bb5-40e4-a147-7deb47581c86/suno74fc35a27.mp3', 'https://ucarecdn.com/a15bbd67-b331-4960-8676-3b664ed2a721/suno7.png', '2:22', 'Brody', '2024-11-22 06:49:00', 'https://suno.com/song/4fc35a27-52b5-4e07-9eaf-b2685cc8ab33', '', '', 0, 4),
(30008, 3, 'pop', 'Wanderlust Dreams', 'pop, vibrant, synth', 'suno-8-6845dc51.mp3', 'MP3', '5,247KB', 3.99, 'https://ucarecdn.com/df08dbf7-ebe1-4455-b946-6f0760786e4a/suno86845dc51.mp3', 'https://ucarecdn.com/e493435c-87c9-4fea-9654-a989424c943b/suno8.png', '3:43', 'Tony', '2024-11-22 06:51:00', 'https://suno.com/song/6845dc51-71b1-491c-b0be-1f6c691a2f42', 'Special Item', 'Sale', 0.15, 3),
(30009, 3, 'soul', 'Water', 'afrobeats', 'suno-9-8ca27921.mp3', 'MP3', '4,819KB', 3.99, 'https://ucarecdn.com/d67272f7-a319-41b1-bf1c-336a991d9812/suno98ca27921.mp3', 'https://ucarecdn.com/a314af82-1119-4cd0-b7a8-d4486a4a3e40/suno9.png', '3:25', 'ali from suno emails', '2024-11-22 06:53:00', 'https://suno.com/song/8ca27921-1960-4d40-9824-7f5192891891', 'Sale Item', 'Sale', 0.2, 5),
(30010, 3, 'jazz', 'Circles (Remastered)', 'electronic, jazz, experimental, minimal, percussion, deep voice, acid jazz', 'suno-10-4ec14116.mp3', 'MP3', '5,622KB', 3.99, 'https://ucarecdn.com/6425f790-2717-4edc-96fb-61a1c1f5c7b5/suno104ec14116.mp3', 'https://ucarecdn.com/94fa2263-9248-4b19-9d4d-a810cbfef6ea/suno10.png', '3:59', 'ClaraCo', '2024-11-22 06:55:00', 'https://suno.com/song/4ec14116-ac9b-49e3-ae62-99eb2f1ac0c2', 'Sale Item', 'Sale', 0.2, 5);


INSERT INTO aivideo (id, type_id, title, description, fileName, fileFormat, fileSize, priceTag, video, image, duration, creator, dateCreated, downloadlink, promotion, badge, discount, review) VALUES
(40001, 4, '西海情歌', 'totoro', 'tiktok-ck54024-1.mp4', 'MP4', '5,571KB', 2.99, 'https://ucarecdn.com/e880f2ca-d3ad-4855-9d56-cf2b6c902697/tiktokck540241.mp4', 'https://ucarecdn.com/1f4c679d-87c6-451a-af27-10dda3420883/tiktok1.png', '00:01:08', 'ck54024', '2024-11-21 10:56:00', '', '', '', 0, 4),
(40002, 4, '不敢倒下', 'construction worker', 'tiktok-ck54024-2.mp4', 'MP4', '2,119KB', 2.99, 'https://ucarecdn.com/f700b939-4768-4aac-89cd-54eedf4a11bd/tiktokck540242.mp4', 'https://ucarecdn.com/0cd1ba25-c037-4016-a814-265443d11c99/tiktok2.png', '00:00:57', 'ck54024', '2024-11-22 02:26:00', '', 'Special Item', 'Sale', 0.15, 3),
(40003, 4, '蔓莉', 'shin-chan', 'tiktok-ck54024-3.mp4', 'MP4', '1,879KB', 0.99, 'https://ucarecdn.com/723fc126-1775-4c5e-aa55-e887235abcf4/tiktokck540243.mp4', 'https://ucarecdn.com/061b3bc9-c686-4c74-9da4-917e4882fbb6/tiktok3.png', '00:00:30', 'ck54024', '2024-11-22 02:27:00', '', 'Sale Item', 'Sale', 0.2, 5),
(40004, 4, '一个很有意思的心里现象', 'doraemon', 'tiktok-ck54024-4.mp4', 'MP4', '2,333KB', 0.99, 'https://ucarecdn.com/f80f65a7-2d4f-4ac5-b47f-7bb705da3949/tiktokck540244.mp4', 'https://ucarecdn.com/f74808fc-bd9a-482b-add9-cccaf8b88d9f/tiktok4.png', '00:00:20', 'ck54024', '2024-11-22 02:27:00', '', 'Popular Item', '', 0, 2),
(40005, 4, '你来了又走心满了又空', 'city scene', 'tiktok-ck54024-5.mp4', 'MP4', '4,660KB', 1.99, 'https://ucarecdn.com/cc5622bf-7a68-4c75-ac43-2c113249bb80/tiktokck540245.mp4', 'https://ucarecdn.com/8fe9b1c0-6ac6-44d8-92a0-7e4bd12eacf9/tiktok5.png', '00:00:59', 'ck54024', '2024-11-22 02:27:00', '', 'Popular Item', '', 0, 0),
(40006, 4, '卖糖歌', 'sweet girl', 'tiktok-ck54024-6.mp4', 'MP4', '1,795KB', 1.99, 'https://ucarecdn.com/1f16c44c-7d39-4c9f-ad38-b7451014c445/tiktokck540246.mp4', 'https://ucarecdn.com/7b42974b-e9d2-41fe-8523-5194874147b4/tiktok6.png', '00:00:47', 'ck54024', '2024-11-22 02:29:00', '', 'Popular Item', '', 0, 5),
(40007, 4, '午夜香吻', 'performance stage', 'tiktok-ck54024-7.mp4', 'MP4', '1,296KB', 0.59, 'https://ucarecdn.com/715073d1-d85b-41c6-afee-e4c38dab2577/tiktokck540247.mp4', 'https://ucarecdn.com/62993496-31ba-4823-91de-f1d3ee7e82d9/tiktok7.png', '00:00:30', 'ck54024', '2024-11-22 02:29:00', '', '', '', 0, 4),
(40008, 4, '望天', 'boy and wolf', 'tiktok-ck54024-8.mp4', 'MP4', '4,939KB', 0.79, 'https://ucarecdn.com/cc43f130-7730-4d59-81c2-9f115be1b059/tiktokck540248.mp4', 'https://ucarecdn.com/02434a7d-adc6-4f39-86bd-12897c2cd6de/tiktok8.png', '00:00:42', 'ck54024', '2024-11-22 02:30:00', '', 'Special Item', 'Sale', 0.15, 3),
(40009, 4, '蛋炒饭', 'egg fried rice', 'tiktok-ck54024-9.mp4', 'MP4', '1,257KB', 0.39, 'https://ucarecdn.com/5703256b-b8bf-4d59-838c-f19a0aa5fc1c/tiktokck540249.mp4', 'https://ucarecdn.com/e3e24b43-221c-430a-a3c2-da9bfc82dae9/tiktok9.png', '00:00:23', 'ck54024', '2024-11-22 02:31:00', '', 'Sale Item', 'Sale', 0.2, 5);

-- Insert AI-Books into the master list
INSERT INTO aiproducts (productCodeID, productID, source_table)
SELECT type_id, id, 'aibooks'
FROM aibooks;

-- Insert AI-Images into the master list
INSERT INTO aiproducts (productCodeID, productID, source_table)
SELECT type_id, id, 'aiimage'
FROM aiimage;

-- Insert AI-Music into the master list
INSERT INTO aiproducts (productCodeID, productID, source_table)
SELECT type_id, id, 'aimusic'
FROM aimusic;

-- Insert AI-Videos into the master list
INSERT INTO aiproducts (productCodeID, productID, source_table)
SELECT type_id, id, 'aivideo'
FROM aivideo;

INSERT INTO marketing_preferences (id, preference) VALUES (1, 'email');  -- Email Marketing
INSERT INTO marketing_preferences (id, preference) VALUES (2, 'sms');    -- SMS Marketing

INSERT INTO users (name, email, password, salutation, country, created_at) VALUES
('admin', 'admin@aieshop.com.sg', '$2b$10$tXEb1v7DrO2Qkl/ddi.8J.K2gKPOmgx6gJEPG6M2G3eNPl54.xOHi', 'Mr', 'sg', NOW());

-- Inserting data into Employees
INSERT INTO Employees (name, designation, department, date_joined) VALUES
('Tan Ah Kow', 'IT Manager', 'MIS', '2005-08-21'),
('Jon Tan', 'VP', 'RnD', '1994-04-11'),
('Alex Chua', 'Product Manager', 'RnD', '2007-03-12'),
('Andrew Ng', 'Engineer', 'RnD', '1994-07-22'),
('Ang Chwee Eng', 'Senior Product Engineer', 'RnD', '2013-09-12');

-- Inserting data into Contacts
INSERT INTO Contacts (address1, address2, address3, mobile_phone, home_phone, office_phone, office_did, personal_email, company_email, employee_id) VALUES
('Block 118 #03-51', 'Yishun Street 17', 'Singapore 520118', 81123456, 63827908, '62779015 Ext 331', 62779331, 'tanak@gmail.com.sg', 'tanahkow@xyz.com', 1),
('Block 165 #02-190', 'Woodlands Drive 70', 'Singapore 730165', 92241290, 63331988, '62779015 Ext 237', 62779237, 'jt1199@yahoo.com', 'jontan@xyz.com', 2),
('Block 911 #11-55', 'Pasir Ris Avenue 5', 'Singapore 203911', 88813756, 62907771, '62779015 Ext 190', 62779190, 'alexchua10@gmail.com', 'alexchua@xyz.com', 3),
('Block A #06-51', 'Casa Blanca', 'Singapore 730124', 81811355, 63229856, '62779015 Ext 235', 62779235, 'andyng909@yahoo.com', 'andrewng@xyz.com', 4),
('Block 713 #03-61', 'Pasir Ris Avenue 10', 'Singapore 203713', 92209220, 63221093, '62779015 Ext 220', 62779220, 'freddyang@gmail.com', 'angchweeeng@xyz.com', 5);

-- Inserting data into Supervisors
INSERT INTO Supervisors (name) VALUES
('Jon Tan'),
('Alex Chua');

-- Inserting data into EmployeeSupervisor
INSERT INTO EmployeeSupervisor (employee_id, supervisor_id, ranking) VALUES
(4, 1, 'A+'),
(1, 1, 'B'),
(2, NULL, NULL),
(3, 1, 'A'),
(5, 2, 'A');

-- Inserting data into Taskforces
INSERT INTO Taskforces (taskforce_name) VALUES
('alpha-team');

-- Inserting data into EmployeeTaskforce
INSERT INTO EmployeeTaskforce (employee_id, taskforce_id, role) VALUES
(1, 1, 'chairman'),
(2, 1, 'treasurer'),
(3, 1, 'secretary'),
(4, 1, 'member'),
(5, 1, 'member');
