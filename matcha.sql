-- phpMyAdmin SQL Dump
-- version 4.5.5.1
-- http://www.phpmyadmin.net
--
-- Client :  localhost:3306
-- Généré le :  Ven 26 Juillet 2019 à 03:47
-- Version du serveur :  5.6.29
-- Version de PHP :  5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `matcha`
--

-- --------------------------------------------------------

--
-- Structure de la table `fakeuser`
--

CREATE TABLE `fakeuser` (
  `id` int(11) NOT NULL,
  `fakeUser` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `fakeuser`
--

INSERT INTO `fakeuser` (`id`, `fakeUser`) VALUES
(32, 'metentis'),
(33, 'tyr'),
(34, 'test'),
(35, 'bouboule'),
(36, 'HH');

-- --------------------------------------------------------

--
-- Structure de la table `inlineuser`
--

CREATE TABLE `inlineuser` (
  `id` int(11) NOT NULL,
  `user` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `inline` int(11) NOT NULL DEFAULT '0',
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `inlineuser`
--

INSERT INTO `inlineuser` (`id`, `user`, `inline`, `date`) VALUES
(1, 'metentis', 1, '2019-07-26 11:11:49'),
(2, 'jai', 1, '2019-07-26 11:08:31'),
(3, 'HH', 0, '2019-06-09 00:13:25'),
(4, 'tyr', 0, '2019-06-09 00:12:53'),
(5, 'bouboule', 0, '2019-06-12 14:10:16'),
(6, 'le roi des math', 0, '2019-06-09 00:13:39'),
(7, 'test5', 0, '2019-06-14 14:02:48'),
(8, 'test6', 0, '2019-06-14 14:00:55'),
(9, 'test9', 0, '2019-06-14 13:59:29'),
(10, 'test11', 0, '2019-06-13 11:09:52'),
(11, 'test12', 0, '2019-06-14 13:55:38'),
(12, 'test15', 0, '2019-06-13 11:16:12'),
(13, 'test16', 0, '2019-06-13 11:18:25'),
(14, 'test17', 0, '2019-06-14 14:05:00'),
(15, 'test18', 0, '2019-06-14 14:06:45'),
(16, 'test19', 0, '2019-06-14 14:09:54'),
(17, 'test20', 0, '2019-06-14 14:18:48'),
(18, 'test21', 0, '2019-06-14 14:19:29'),
(19, 'test25', 0, '2019-06-17 18:32:06'),
(20, 'test26', 0, '2019-06-17 18:35:21'),
(21, 'test27', 0, '2019-06-17 19:54:17'),
(22, 'test28', 0, '2019-06-17 19:54:55'),
(23, 'test29', 0, '2019-06-17 20:02:58'),
(24, 'test30', 0, '2019-06-17 21:20:11'),
(25, 'x', 0, '2019-06-17 21:21:06'),
(26, 'test40', 0, '2019-07-25 12:14:43'),
(27, 'spiderman', 0, '2019-07-25 12:26:26'),
(28, 'test41', 0, '2019-07-25 12:35:16'),
(29, 'test42', 0, '2019-07-25 12:39:55'),
(30, 'test43', 0, '2019-07-25 12:41:21'),
(31, 'test45', 1, '2019-07-26 11:10:52');

-- --------------------------------------------------------

--
-- Structure de la table `likeuser`
--

CREATE TABLE `likeuser` (
  `id` int(11) NOT NULL,
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `profilName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `likeUser` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `likeuser`
--

INSERT INTO `likeuser` (`id`, `userName`, `profilName`, `likeUser`) VALUES
(22, 'HH', 'metentis', 1),
(23, 'HH', 'jai', 1),
(24, 'HH', 'bouboule', -1),
(25, 'HH', 'tyr', -1),
(26, 'HH', 'le roi des math', 1),
(27, 'bouboule', 'HH', 1),
(28, 'bouboule', 'le roi des math', 1),
(29, 'bouboule', 'tyr', 1),
(30, 'bouboule', 'jai', -1),
(31, 'bouboule', 'metentis', 1),
(33, 'metentis', 'bouboule', -1),
(34, 'metentis', 'HH', -1),
(35, 'metentis', 'jai', 1),
(36, 'metentis', 'tyr', 1),
(37, 'metentis', 'le roi des math', 1),
(38, 'tyr', 'metentis', 1),
(39, 'tyr', 'jai', 1),
(40, 'tyr', 'bouboule', 1),
(41, 'tyr', 'le roi des math', 1),
(42, 'jai', 'metentis', 1),
(43, 'jai', 'bouboule', 1),
(44, 'jai', 'tyr', 1),
(45, 'jai', 'le roi des math', 1),
(46, 'jai', 'HH', 1),
(47, 'test3', 'jai', 1),
(48, 'bat test', 'metentis', 1),
(49, 'jai', 'bat test', -1),
(50, 'metentis', 'test', -1),
(51, 'metentis', 'test2', 1),
(52, 'metentis', 'test3', 1),
(53, 'metentis', 'test4', 1),
(54, 'test4', 'metentis', 1),
(55, 'metentis', 'x', 1),
(56, 'x', 'metentis', 1),
(57, 'test30', 'metentis', 1);

-- --------------------------------------------------------

--
-- Structure de la table `listblockprofil`
--

CREATE TABLE `listblockprofil` (
  `id` int(11) NOT NULL,
  `user` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `blockProfil` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `listblockprofil`
--

INSERT INTO `listblockprofil` (`id`, `user`, `blockProfil`) VALUES
(70, 'x', 'bouboule'),
(71, 'x', 'tyr'),
(72, 'x', 'HH'),
(73, 'metentis', 'test30');

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `fromUser` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `toUser` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `message` text,
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `messages`
--

INSERT INTO `messages` (`id`, `fromUser`, `toUser`, `message`, `date`) VALUES
(71, 'metentis', 'jai', 'coucou', '2019-07-25 10:28:25'),
(72, 'jai', 'metentis', 'ojook', '2019-07-26 12:34:43'),
(73, 'jai', 'metentis', 'ojookrdsvfjsfhdiuvbhsfiuhbfviuhsiufhviulsfhuyghuhduilvresoa;vnhroilrsehnvolghnurtfgoir', '2019-07-26 12:34:58');

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `notificationUser` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `notificationType` text NOT NULL,
  `notificationRead` int(11) NOT NULL DEFAULT '0',
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `notifications`
--

INSERT INTO `notifications` (`id`, `notificationUser`, `notificationType`, `notificationRead`, `date`) VALUES
(468, 'jai', 'You are new message from metentis', 0, '2019-07-25 10:28:25'),
(469, 'test4', 'metentis visit you\'re profil', 0, '2019-07-26 11:02:11'),
(470, 'metentis', 'jai visit you\'re profil', 0, '2019-07-26 11:03:07'),
(471, 'test4', 'jai visit you\'re profil', 0, '2019-07-26 11:05:37'),
(472, 'test4', 'jai visit you\'re profil', 0, '2019-07-26 12:29:49'),
(473, 'test30', 'jai visit you\'re profil', 0, '2019-07-26 12:34:21'),
(474, 'metentis', 'You are new message from jai', 0, '2019-07-26 12:34:43'),
(475, 'metentis', 'You are new message from jai', 0, '2019-07-26 12:34:58'),
(476, 'metentis', 'jai visit you\'re profil', 0, '2019-07-26 12:36:02'),
(477, 'test30', 'jai visit you\'re profil', 0, '2019-07-26 12:36:16'),
(478, 'test4', 'jai visit you\'re profil', 0, '2019-07-26 12:36:37');

-- --------------------------------------------------------

--
-- Structure de la table `picturesusers`
--

CREATE TABLE `picturesusers` (
  `id` int(11) NOT NULL,
  `userId` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `picture` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `picturesusers`
--

INSERT INTO `picturesusers` (`id`, `userId`, `picture`) VALUES
(179, '128', 'image3.jpg'),
(180, '128', 'image.jpeg'),
(181, '128', 'image2.jpeg'),
(183, '128', 'download.jpeg'),
(184, '129', 'image4.jpg'),
(185, '141', 'image4.jpg'),
(186, '142', 'FR.jpg'),
(187, '143', 'FR.TR.jpg'),
(188, '142', 'FR.jpg'),
(189, '142', 'CD.jpg'),
(190, '137', 'image3.jpg'),
(191, '136', 'image2.jpeg'),
(192, '135', 'image4.jpg'),
(193, '134', 'download.jpeg'),
(194, '128', 'image4.jpg'),
(195, '130', 'image4.jpg'),
(196, '165', 'FR.jpg'),
(197, '165', 'FR.TR.jpg'),
(198, '164', 'folder.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `profil`
--

CREATE TABLE `profil` (
  `id` int(11) NOT NULL,
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `lastName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `firstName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `confirmKey` bigint(20) NOT NULL,
  `confirmKeyOk` int(11) NOT NULL DEFAULT '0',
  `keyResetPassword` varchar(255) DEFAULT NULL,
  `bantime` varchar(50) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `profil`
--

INSERT INTO `profil` (`id`, `userName`, `password`, `email`, `lastName`, `firstName`, `confirmKey`, `confirmKeyOk`, `keyResetPassword`, `bantime`) VALUES
(128, 'metentis', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'sylvain.boeuf@orange.fr', 'boeuf', 'sylvain', 8394950248921, 1, NULL, '0'),
(129, 'jai', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'florent.boeuf@free.fr', 'boeuf', 'florent', 6923653259421, 1, NULL, '0'),
(130, 'bouboule', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'audrey.boeuf@free.fr', 'boeuf', 'audrey', 7772988799848, 1, NULL, '0'),
(131, 'tyr', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'amandine.richard@free.fr', 'Richard', 'amandine', 9971396599816, 1, NULL, '0'),
(132, 'HH', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'dimitri.richard@free.fr', 'richard', 'dimitri', 2200237506864, 1, NULL, '1564306715'),
(133, 'le roi des math', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'bruno.chatelain@free.fr', 'chatelin', 'bruno', 7136743763158, 1, NULL, '0'),
(134, 'test', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test@gmail.com', 'test', 'test', 3454300560392, 1, NULL, '0'),
(135, 'test2', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test2@gmail.com', 'test2', 'test2', 1677337025450, 1, NULL, '0'),
(136, 'test3', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test3@gmail.fr', 'test3', 'test3', 2376701668198, 1, NULL, '0'),
(137, 'test4', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test4@gmail.com', 'test4', 'test4', 6037373664254, 1, NULL, '0'),
(139, 'coucou', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'coucoucou@gmail.com', 'coucou', 'coucou', 6981057521520, 1, NULL, '0'),
(142, 'bat test', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'sylvain.boeuf@gmail.fr', 'Wayne', 'Bruce', 7960381791630, 1, NULL, '0'),
(143, 'the man of steel', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'sylvain.boeuf@fre.fr', 'kent', 'Clark', 8318236214024, 1, NULL, '0'),
(144, 'test5', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test5@gmail.com', 'test5', 'test5', 7566931969138, 1, NULL, '0'),
(145, 'test6', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test6@gmail.com', 'test6', 'test6', 582266724213, 1, NULL, '0'),
(146, 'test9', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test9@gmail.com', 'test9', 'test9', 3488552820732, 1, NULL, '0'),
(147, 'test10', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test10@gmail.com', 'test10', 'test10', 7358031551689, 0, NULL, '0'),
(148, 'test11', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test11@gmail.fr', 'test11', 'test11', 9736868538874, 1, NULL, '0'),
(149, 'test12', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test12@gmail.fr', 'test12', 'test12', 4021348015825, 1, NULL, '0'),
(150, 'test13', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test13@gmail.fr', 'test13', 'test13', 6033169455479, 0, NULL, '0'),
(151, 'test14', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test14@gmail.com', 'test14', 'test14', 6190844112524, 0, NULL, '0'),
(152, 'test15', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test15@gmail.com', 'test15', 'test15', 5783414770008, 1, NULL, '0'),
(153, 'test16', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test16@gmail.com', 'test16', 'test16', 2569539059679, 1, NULL, '0'),
(154, 'test17', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test17@gmail.com', 'test17', 'test17', 9559486991302, 1, NULL, '0'),
(155, 'test18', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test18@gmail.com', 'test18', 'test18', 8335081320354, 1, NULL, '0'),
(156, 'test19', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test19@gmail.com', 'test19', 'test19', 7533706907012, 1, NULL, '0'),
(157, 'test20', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test20@gmail.fr', 'test20', 'test20', 8699907264766, 1, NULL, '0'),
(158, 'test21', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test21@gmail.com', 'test21', 'test21', 9861767162669, 1, NULL, '0'),
(159, 'test25', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test25@gmail.com', 'test25', 'test25', 8279664659955, 1, NULL, '0'),
(160, 'test26', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test26@gmail.com', 'test26', 'test26', 1559224598050, 1, NULL, '0'),
(161, 'test27', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test27@gmail.com', 'test27', 'test27', 3505394069835, 1, NULL, '0'),
(162, 'test28', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test28@gmail.com', 'test28', 'test28', 3001966743280, 1, NULL, '0'),
(163, 'test29', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test29@gmail.com', 'test29', 'test29', 5287304086401, 1, NULL, '0'),
(164, 'test30', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test30@gmail.com', 'test30', 'test30', 914499620047, 1, NULL, '0'),
(165, 'x', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'xavier@hotmail.free', 'boeuf', 'xa', 318246101647, 1, NULL, '0'),
(166, 'test40', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test40@gmail.com', 'test40', 'test40', 8468830061885, 1, NULL, '0'),
(167, 'spiderman', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'sylvain.boeuf@fr.fr', 'spider', 'man', 5809011190170, 1, NULL, '0'),
(168, 'test41', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test41@gmail.com', 'test41', 'test41', 6978960014910, 1, NULL, '0'),
(169, 'test42', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'sylvain.boeuf@ve.fr', 'test42', 'test42', 3111879212092, 1, NULL, '0'),
(170, 'test43', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test43@gmail.com', 'test43', 'test43', 9435144338801, 1, NULL, '0'),
(171, 'test45', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'sylvain.boeuf@free.fr', 'test45', 'test45', 6679666313965, 1, NULL, '0');

-- --------------------------------------------------------

--
-- Structure de la table `profilmatch`
--

CREATE TABLE `profilmatch` (
  `id` int(11) NOT NULL,
  `firstPerson` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `secondPerson` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `profilmatch`
--

INSERT INTO `profilmatch` (`id`, `firstPerson`, `secondPerson`) VALUES
(12, 'tyr', 'bouboule'),
(14, 'jai', 'tyr'),
(15, 'jai', 'HH'),
(16, 'metentis', 'jai'),
(20, 'test3', 'jai'),
(22, 'metentis', 'x');

-- --------------------------------------------------------

--
-- Structure de la table `userinfos`
--

CREATE TABLE `userinfos` (
  `id` int(11) NOT NULL,
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `age` int(11) DEFAULT NULL,
  `biography` text,
  `gender` text,
  `orientation` text,
  `listInterest` text,
  `userLocation` text,
  `userApproximateLocation` text,
  `userAddress` text,
  `userApproximateCity` text,
  `populareScore` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `userinfos`
--

INSERT INTO `userinfos` (`id`, `userName`, `age`, `biography`, `gender`, `orientation`, `listInterest`, `userLocation`, `userApproximateLocation`, `userAddress`, `userApproximateCity`, `populareScore`) VALUES
(1, 'metentis', 27, 'plus maintenannt', 'Femme', 'Homme', 'null#Movie#data processing#NigthParty#Sport#Manga', '48.887609988891555 , 2.3128799816781886', '48.85341, 2.3488', 'Dr. Giroux Bruno, 7 Boulevard Pereire, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Paris', 100),
(2, 'jai', 22, 'jcavjlerabv', 'Male', 'Homme', 'null#Movie#Manga#Sport', '48.887609988891555 , 2.3128799816781886', '48.85341, 2.3488', 'Dr. Giroux Bruno, 7 Boulevard Pereire, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Paris', 60),
(3, 'bouboule', 29, 'vhkrueiubv', 'Male', 'Femme', 'null#data processing#NigthParty#Sport', '48.8079933, 2.2396035999999997', '48.8574, 2.3795', '2bis Rue Servien, 92190 Meudon, France', 'Paris', 0),
(6, 'tyr', 23, 'vsdvhuy', 'Male', 'Femme', 'null#Movie#Manga#Sport#NigthParty#data processing', '48.8079933, 2.2396035999999997', '48.8138, 2.235', '2bis Rue Servien, 92190 Meudon, France', 'Meudon', 0),
(7, 'HH', 30, 'null', 'Male', 'Homme', 'null#Manga#Sport', '48.8042, 2.2810200000000123', '48.8138, 2.235', '46 Rue Jean Jaurès, 92320 Châtillon, France', 'Meudon', 0),
(8, 'le roi des math', 39, 'ewfthyeg', 'Male', 'Homme', 'null#data processing#NigthParty#Sport#Manga#Movie', '48.8079933, 2.2396035999999997', '48.8138, 2.235', '2bis Rue Servien, 92190 Meudon, France', 'Meudon', 0),
(9, 'test', 50, 'ca bug', 'Femme', 'Femme', 'null#Sport#NigthParty', '48.8964, 2.3184499999999844', '48.8574, 2.3795', '96 Boulevard Bessières, Paris 17e Arrondissement, France', 'Paris', -100),
(10, 'test2', 60, 'testtsetsets', 'Male', 'Femme', 'null#Manga#NigthParty', '48.8079933, 2.2396035999999997', '48.8574, 2.3795', '2bis Rue Servien, 92190 Meudon, France', 'Paris', 100),
(12, 'test3', 70, '', 'Femme', 'Femme', 'null', NULL, '48.8574, 2.3795', NULL, 'Paris', 100),
(13, 'test4', 10, 'htrhdghjydnjuyrj', 'Male', 'Bisexuelle', 'null#Manga#Sport', '48.8079933, 2.2396035999999997', '48.8574, 2.3795', '2bis Rue Servien, 92190 Meudon, France', 'Paris', 100),
(15, 'coucou', 46, '', 'Male', 'Femme', 'null#Sport', '48.812498899999994, 2.24694', '48.8138, 2.235', '12BIS Rue du Docteur Vuillième, 92190 Meudon, France', 'Meudon', 0),
(18, 'bat test', 0, 'null', 'Male', 'Femme', 'null#Sport#data processing#NigthParty', '48.80921180000001, 2.2395904', '48.8138, 2.235', '89A Rue de Paris, 92190 Meudon, France', 'Meudon', -100),
(19, 'the man of steel', 35, 'im superman yeah !!!', 'Femme', 'Homme', 'null#Manga#Sport#Movie', '48.8127305, 2.2468664', '48.8138, 2.235', '8 Rue du Docteur Vuillième, 92190 Meudon, France', 'Meudon', 0),
(20, 'test5', NULL, NULL, NULL, NULL, NULL, '48.8967101, 2.3183450999999997', '48.8763,2.3183', '96 Boulevard Bessières, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Paris, Ile-de-France, France', 0),
(21, 'test6', NULL, NULL, NULL, NULL, NULL, '48.8966685, 2.3183566', '48.8763,2.3183', '96 Boulevard Bessières, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Paris, Ile-de-France, France', 0),
(22, 'test9', NULL, NULL, NULL, NULL, NULL, '48.8966946, 2.3183746999999997', '48.8763,2.3183', '96 Boulevard Bessières, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Paris, Ile-de-France, France', 0),
(25, 'test12', NULL, NULL, NULL, NULL, NULL, '48.8966338, 2.3183534', '48.8763,2.3183', '96 Boulevard Bessières, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Paris, Ile-de-France, France', 0),
(29, 'test16', NULL, NULL, NULL, NULL, NULL, '48.8967101, 2.3183359', '48.8574, 2.3795', '96 Boulevard Bessières, 75017 Paris, France', 'Paris', 0),
(30, 'test17', NULL, NULL, NULL, NULL, NULL, '48.8967113, 2.3183545999999997', '48.8763,2.3183', '96 Boulevard Bessières, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Paris, Ile-de-France, France', 0),
(31, 'test18', NULL, NULL, NULL, NULL, NULL, '48.8966505, 2.3183648999999997', '48.8763,2.3183', '96 Boulevard Bessières, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Paris, Ile-de-France, France', 0),
(32, 'test19', NULL, NULL, NULL, NULL, NULL, '48.8966505, 2.3183648999999997', '48.8763,2.3183', '96 Boulevard Bessières, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Paris, Ile-de-France, France', 0),
(33, 'test20', NULL, NULL, NULL, NULL, NULL, '48.8966583, 2.3183534', '48.8574, 2.3795', '96 Boulevard Bessières, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Paris, France', 0),
(34, 'test21', NULL, NULL, NULL, NULL, NULL, '48.8966583, 2.3183534', '48.8574, 2.3795', '96 Boulevard Bessières, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Paris, France', 0),
(35, 'test25', NULL, NULL, NULL, NULL, NULL, '48.80799184533588 , 2.2395570507480613', '48.8138, 2.235', '2-6 Rue Servien, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', 'Meudon, France', 0),
(36, 'test26', NULL, NULL, NULL, NULL, NULL, '48.80799184533588 , 2.2395570507480613', '48.8138, 2.235', '2-6 Rue Servien, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', 'Meudon, France', 0),
(37, 'test27', NULL, NULL, NULL, NULL, NULL, '48.8125933694097 , 2.2471824262798554', '48.8138, 2.235', '12B Rue du Docteur Vuillième, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', 'Meudon, France', 0),
(38, 'test28', NULL, NULL, NULL, NULL, NULL, '48.8125933694097 , 2.2471824262798554', '48.8138, 2.235', '12B Rue du Docteur Vuillième, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', 'Meudon, France', 0),
(39, 'test29', NULL, NULL, NULL, NULL, NULL, '48.80799184533588 , 2.2395570507480613', '48.8138, 2.235', '2-6 Rue Servien, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', 'Meudon, France', 0),
(40, 'test30', 40, '', 'null', 'null', 'null', '48.80799184533588 , 2.2395570507480613', '48.81206000000003, 2.2377800000000434', '2-6 Rue Servien, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', 'Meudon, Hauts-de-Seine, Île-de-France', 100),
(41, 'x', 40, 'bonjour, les amis', 'null', 'Femme', 'null#Movie', '48.812541380518205, 2.2472115401061767', '48.81206000000003, 2.2377800000000434', '12 Rue du Docteur Vuillième, 92190, Meudon, Hauts-de-Seine, Île-de-France', 'Meudon, Hauts-de-Seine, Île-de-France', 100),
(42, 'test40', NULL, NULL, 'Male', 'Bisexuelle', NULL, '48.88745128980902 , 2.3134637153442483', '48.85341, 2.3488', '1 Boulevard Pereire, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Paris', 0),
(43, 'spiderman', NULL, NULL, 'Male', 'Bisexuelle', NULL, '48.88745128980902 , 2.3134637153442483', '48.85341, 2.3488', '1 Boulevard Pereire, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Paris', 0),
(44, 'test41', NULL, NULL, 'Male', 'Bisexuelle', NULL, '48.88745128980902 , 2.3134637153442483', '48.85341, 2.3488', '1 Boulevard Pereire, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Paris', 0),
(45, 'test42', NULL, NULL, 'Male', 'Bisexuelle', NULL, '48.88745128980902 , 2.3134637153442483', '48.85341, 2.3488', '1 Boulevard Pereire, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Paris', 0),
(46, 'test43', NULL, NULL, 'Male', 'Bisexuelle', NULL, '48.88745128980902 , 2.3134637153442483', '48.85341, 2.3488', '1 Boulevard Pereire, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Paris', 0),
(47, 'test45', NULL, NULL, 'Male', 'Bisexuelle', NULL, '48.887609988891555 , 2.3128799816781886', '48.85341, 2.3488', 'Dr. Giroux Bruno, 7 Boulevard Pereire, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Paris', 0);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `fakeuser`
--
ALTER TABLE `fakeuser`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `inlineuser`
--
ALTER TABLE `inlineuser`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `likeuser`
--
ALTER TABLE `likeuser`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `listblockprofil`
--
ALTER TABLE `listblockprofil`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `picturesusers`
--
ALTER TABLE `picturesusers`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `profil`
--
ALTER TABLE `profil`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `profilmatch`
--
ALTER TABLE `profilmatch`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `userinfos`
--
ALTER TABLE `userinfos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `fakeuser`
--
ALTER TABLE `fakeuser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT pour la table `inlineuser`
--
ALTER TABLE `inlineuser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT pour la table `likeuser`
--
ALTER TABLE `likeuser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
--
-- AUTO_INCREMENT pour la table `listblockprofil`
--
ALTER TABLE `listblockprofil`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;
--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;
--
-- AUTO_INCREMENT pour la table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=479;
--
-- AUTO_INCREMENT pour la table `picturesusers`
--
ALTER TABLE `picturesusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=199;
--
-- AUTO_INCREMENT pour la table `profil`
--
ALTER TABLE `profil`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=172;
--
-- AUTO_INCREMENT pour la table `profilmatch`
--
ALTER TABLE `profilmatch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT pour la table `userinfos`
--
ALTER TABLE `userinfos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
