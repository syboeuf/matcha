-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  ven. 06 sep. 2019 à 17:07
-- Version du serveur :  5.7.24
-- Version de PHP :  7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
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

DROP TABLE IF EXISTS `fakeuser`;
CREATE TABLE IF NOT EXISTS `fakeuser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fakeUser` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `fakeuser`
--

INSERT INTO `fakeuser` (`id`, `fakeUser`) VALUES
(32, 'metentis'),
(33, 'tyr'),
(34, 'test'),
(35, 'bouboule'),
(36, 'HH'),
(37, 'test4'),
(39, 'test2'),
(40, 'test3'),
(41, 'test205');

-- --------------------------------------------------------

--
-- Structure de la table `likeuser`
--

DROP TABLE IF EXISTS `likeuser`;
CREATE TABLE IF NOT EXISTS `likeuser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `profilName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `likeUser` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `likeuser`
--

INSERT INTO `likeuser` (`id`, `userName`, `profilName`, `likeUser`) VALUES
(22, 'HH', 'metentis', 1),
(23, 'HH', 'jail', 1),
(24, 'HH', 'bouboule', -1),
(25, 'HH', 'tyr', -1),
(26, 'HH', 'le roi des math', 1),
(27, 'bouboule', 'HH', 1),
(28, 'bouboule', 'le roi des math', 1),
(29, 'bouboule', 'tyr', 1),
(30, 'bouboule', 'jail', -1),
(31, 'bouboule', 'metentis', 1),
(33, 'metentis', 'bouboule', -1),
(34, 'metentis', 'HH', -1),
(36, 'metentis', 'tyr', 1),
(37, 'metentis', 'le roi des math', 1),
(38, 'tyr', 'metentis', 1),
(39, 'tyr', 'jail', 1),
(40, 'tyr', 'bouboule', 1),
(41, 'tyr', 'le roi des math', 1),
(42, 'jail', 'metentis', 1),
(43, 'jail', 'bouboule', 1),
(44, 'jail', 'tyr', 1),
(45, 'jail', 'le roi des math', 1),
(46, 'jail', 'HH', 1),
(47, 'test3', 'jail', 1),
(48, 'bat test', 'metentis', 1),
(49, 'jail', 'bat test', -1),
(50, 'metentis', 'test', -1),
(53, 'metentis', 'test4', 1),
(54, 'test4', 'metentis', 1),
(55, 'metentis', 'x', 1),
(56, 'x', 'metentis', 1),
(57, 'test30', 'metentis', 1),
(59, 'metentis', 'jail', 1),
(61, 'test2', 'metentis', 1),
(62, 'test2', 'jail', 1),
(63, 'metentis', 'jail', 1),
(64, 'metentis', 'test3', 1),
(65, 'test205', 'test207', 1),
(67, 'test199', 'test198', 1),
(68, 'test198', 'test199', 1),
(69, 'test208', 'test300', 1),
(70, 'test300', 'test208', 1);

-- --------------------------------------------------------

--
-- Structure de la table `listblockprofil`
--

DROP TABLE IF EXISTS `listblockprofil`;
CREATE TABLE IF NOT EXISTS `listblockprofil` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `blockProfil` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `listblockprofil`
--

INSERT INTO `listblockprofil` (`id`, `user`, `blockProfil`) VALUES
(70, 'x', 'bouboule'),
(71, 'x', 'tyr');

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fromUser` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `toUser` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `message` text,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=282 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `fromUser`, `toUser`, `message`, `date`) VALUES
(71, 'metentis', 'jail', 'coucou', '2019-07-25 10:28:25'),
(72, 'jail', 'metentis', 'ojook', '2019-07-26 12:34:43'),
(73, 'jail', 'metentis', 'ojookrdsvfjsfhdiuvbhsfiuhbfviuhsiufhviulsfhuyghuhduilvresoa;vnhroilrsehnvolghnurtfgoir', '2019-07-26 12:34:58'),
(74, 'jail', 'metentis', 'ok', '2019-08-13 09:33:03'),
(75, 'metentis', 'jail', 'test', '2019-08-26 09:33:00'),
(76, 'metentis', 'jail', 'oki', '2019-08-26 11:23:11'),
(77, 'jail', 'metentis', 'rew', '2019-08-26 11:25:46'),
(78, 'metentis', 'jail', 'few', '2019-08-26 12:16:51'),
(79, 'jail', 'metentis', 'frewfer', '2019-08-26 13:39:17'),
(80, 'metentis', 'jail', 'greg', '2019-08-26 13:39:31'),
(81, 'metentis', 'jail', 'few', '2019-08-26 13:39:38'),
(82, 'jail', 'metentis', 'gbsrt', '2019-08-27 09:10:26'),
(83, 'jail', 'metentis', 'edgrw', '2019-08-27 09:10:28'),
(84, 'jail', 'metentis', 'dvsrg', '2019-08-27 09:10:29'),
(85, 'jail', 'metentis', 'grsdg', '2019-08-27 09:10:30'),
(86, 'jail', 'metentis', 'rgsw', '2019-08-27 09:10:31'),
(87, 'jail', 'metentis', 'gwdg', '2019-08-27 09:10:32'),
(88, 'jail', 'metentis', 'qweqweqw', '2019-08-27 09:10:33'),
(89, 'jail', 'metentis', 'ewqads', '2019-08-27 09:10:35'),
(90, 'jail', 'metentis', 'wascdfv', '2019-08-27 09:10:36'),
(91, 'jail', 'metentis', 'feaqed', '2019-08-27 09:10:37'),
(92, 'jail', 'metentis', 'feaqsad', '2019-08-27 09:10:39'),
(93, 'jail', 'metentis', 'feacfaw', '2019-08-27 09:10:40'),
(94, 'jail', 'metentis', 'faefcsas', '2019-08-27 09:10:41'),
(95, 'jail', 'metentis', 'feadfae', '2019-08-27 09:10:43'),
(96, 'jail', 'metentis', 'faefde', '2019-08-27 09:10:44'),
(97, 'jail', 'metentis', 'fesafea', '2019-08-27 09:10:46'),
(98, 'jail', 'metentis', 'feasfe', '2019-08-27 09:10:48'),
(99, 'jail', 'metentis', 'adefve', '2019-08-27 09:10:53'),
(100, 'jail', 'metentis', 'deafa', '2019-08-27 09:10:55'),
(101, 'jail', 'test3', 'dew', '2019-08-27 10:57:45'),
(102, 'jail', 'test3', 'fecsd', '2019-08-27 10:57:47'),
(103, 'jail', 'test3', 'efw', '2019-08-27 10:57:48'),
(104, 'jail', 'test3', 'efa', '2019-08-27 10:57:50'),
(105, 'jail', 'test3', 'fcsd', '2019-08-27 10:57:51'),
(106, 'jail', 'test3', 'ewsdcf', '2019-08-27 10:57:52'),
(107, 'jail', 'test3', 'fesadf', '2019-08-27 10:57:53'),
(108, 'jail', 'test3', 'htryh', '2019-08-27 10:57:54'),
(109, 'jail', 'test3', 'hty', '2019-08-27 10:57:55'),
(110, 'jail', 'test3', 'htyf', '2019-08-27 10:57:55'),
(111, 'jail', 'test3', 'hryg', '2019-08-27 10:57:56'),
(112, 'jail', 'test3', 'hyr', '2019-08-27 10:57:57'),
(113, 'jail', 'test3', 'rygh', '2019-08-27 10:57:58'),
(114, 'jail', 'test3', 'htr', '2019-08-27 10:57:59'),
(115, 'jail', 'test3', 'trtrh', '2019-08-27 10:58:00'),
(116, 'jail', 'test3', 'htr', '2019-08-27 10:58:02'),
(117, 'jail', 'test3', 'hrth', '2019-08-27 10:58:03'),
(118, 'jail', 'test3', 'htrh', '2019-08-27 10:58:04'),
(119, 'jail', 'test3', 'htr', '2019-08-27 10:58:05'),
(120, 'jail', 'test3', 'htrdr', '2019-08-27 10:58:06'),
(121, 'jail', 'test3', 'hdgth', '2019-08-27 10:58:07'),
(122, 'jail', 'test3', 'hdrth', '2019-08-27 10:58:09'),
(123, 'jail', 'test3', 'hdrdhtr', '2019-08-27 10:58:10'),
(124, 'jail', 'test3', 'rtdws', '2019-08-27 10:58:11'),
(125, 'jail', 'test3', 'wqqw', '2019-08-27 10:58:12'),
(126, 'jail', 'test3', 'wqewq', '2019-08-27 10:58:13'),
(127, 'jail', 'test3', 'ewqd', '2019-08-27 10:58:14'),
(128, 'jail', 'test3', 'wsdqw', '2019-08-27 10:58:16'),
(129, 'jail', 'test3', 'wsadf', '2019-08-27 10:58:18'),
(130, 'jail', 'test3', 'sfe', '2019-08-27 10:58:19'),
(131, 'jail', 'test3', 'feqfq', '2019-08-27 10:58:20'),
(132, 'jail', 'test3', 'fewf', '2019-08-27 10:58:41'),
(133, 'jail', 'test3', 'fd', '2019-08-27 10:58:41'),
(134, 'jail', 'test3', 'vdf', '2019-08-27 10:58:42'),
(135, 'jail', 'test3', 'fda', '2019-08-27 10:58:44'),
(136, 'jail', 'test3', 'dsaf', '2019-08-27 10:58:45'),
(137, 'jail', 'test3', 'fsaf', '2019-08-27 10:58:46'),
(138, 'jail', 'test3', 'fdsf', '2019-08-27 10:58:48'),
(139, 'jail', 'test3', 'fsaf', '2019-08-27 10:58:49'),
(140, 'jail', 'test3', 'fsafd', '2019-08-27 10:58:50'),
(141, 'jail', 'test3', 'fdaf', '2019-08-27 10:58:51'),
(142, 'jail', 'test3', 'sfad', '2019-08-27 10:58:52'),
(143, 'jail', 'test3', 'fsaf', '2019-08-27 10:58:53'),
(144, 'jail', 'metentis', 'fre', '2019-08-27 11:30:15'),
(145, 'metentis', 'jail', 'dew', '2019-08-28 09:21:05'),
(146, 'metentis', 'jail', 'ewf', '2019-08-28 09:21:32'),
(147, 'metentis', 'jail', 'qed', '2019-08-28 09:21:35'),
(148, 'metentis', 'jail', 'rgrth', '2019-08-28 09:21:37'),
(149, 'metentis', 'jail', 'qwdefs', '2019-08-28 09:21:40'),
(150, 'metentis', 'jail', 'dew', '2019-08-28 09:56:55'),
(151, 'metentis', 'jail', 'dwq', '2019-08-28 09:56:57'),
(152, 'metentis', 'jail', 'aqswd', '2019-08-28 09:56:58'),
(153, 'metentis', 'jail', 'efas', '2019-08-28 09:56:59'),
(154, 'metentis', 'jail', 'wsdq', '2019-08-28 09:57:00'),
(155, 'metentis', 'jail', 'wqdwq', '2019-08-28 09:57:02'),
(156, 'metentis', 'jail', 'dwsasdq', '2019-08-28 09:57:03'),
(157, 'metentis', 'jail', 'dwsad', '2019-08-28 09:57:04'),
(158, 'metentis', 'jail', 'dwqefgt', '2019-08-28 09:57:05'),
(159, 'metentis', 'jail', 'resger', '2019-08-28 09:57:07'),
(160, 'metentis', 'jail', 'ferfeq', '2019-08-28 09:57:08'),
(161, 'metentis', 'jail', 'fewfe', '2019-08-28 16:37:28'),
(162, 'metentis', 'jail', 'efw', '2019-08-28 16:45:47'),
(163, 'metentis', 'jail', 'btb', '2019-08-28 16:45:49'),
(164, 'metentis', 'jail', 'loi', '2019-08-28 16:46:17'),
(165, 'metentis', 'jail', 'l0', '2019-08-28 16:46:23'),
(166, 'metentis', 'jail', 'gtd', '2019-08-28 16:54:08'),
(167, 'metentis', 'jail', 'few', '2019-08-28 16:57:02'),
(168, 'metentis', 'jail', 'vd', '2019-08-28 17:01:50'),
(169, 'metentis', 'jail', 'vdss', '2019-08-28 17:01:52'),
(170, 'metentis', 'jail', 'oi', '2019-08-28 17:03:20'),
(171, 'metentis', 'jail', 'gtr', '2019-08-28 17:03:46'),
(172, 'metentis', 'jail', 'fewfwe', '2019-08-28 17:05:15'),
(173, 'metentis', 'jail', 'feq', '2019-08-28 17:05:35'),
(174, 'metentis', 'x', 'feq', '2019-08-28 17:05:45'),
(175, 'metentis', 'x', 'fqeef', '2019-08-28 17:05:48'),
(176, 'metentis', 'x', 'fqe', '2019-08-28 17:05:55'),
(177, 'metentis', 'jail', 'wqd', '2019-08-28 17:05:58'),
(178, 'metentis', 'jail', 'gregrwgvfdh', '2019-08-28 17:16:30'),
(179, 'metentis', 'jail', 'freg', '2019-08-28 17:26:26'),
(180, 'metentis', 'jail', 'qqqqqq', '2019-08-28 17:26:31'),
(181, 'metentis', 'jail', 'ffff', '2019-08-28 17:26:41'),
(182, 'metentis', 'jail', 'qqqwewqqde', '2019-08-28 17:26:49'),
(183, 'metentis', 'jail', 'wdqwsd', '2019-08-28 17:26:52'),
(184, 'metentis', 'jail', 'few', '2019-08-28 17:28:36'),
(185, 'metentis', 'jail', 'qwef', '2019-08-28 17:28:38'),
(186, 'metentis', 'jail', 'bghfswws', '2019-08-28 17:28:43'),
(187, 'metentis', 'jail', 'dwadwadscsregvbdfdxrtbtt', '2019-08-28 17:28:50'),
(188, 'metentis', 'jail', 'fewdpsofijbhfkirugf;ouphearguv9;hqediu;vgoiu;hv;gheru;oivh;ougiu;h', '2019-08-28 17:49:58'),
(189, 'jail', 'metentis', 'test', '2019-08-29 09:27:52'),
(190, 'jail', 'metentis', 'test', '2019-08-29 09:28:08'),
(191, 'jail', 'metentis', 'fewf', '2019-08-29 09:44:34'),
(192, 'jail', 'metentis', 'feqefa', '2019-08-29 09:44:45'),
(193, 'jail', 'metentis', 'fewfd', '2019-08-29 09:45:05'),
(194, 'jail', 'metentis', 'fedsf', '2019-08-29 09:45:06'),
(195, 'metentis', 'jail', 'few', '2019-08-29 09:51:07'),
(196, 'metentis', 'jail', 'qqqqq', '2019-08-29 09:51:16'),
(197, 'metentis', 'jail', 'hmgf', '2019-08-29 09:51:54'),
(198, 'metentis', 'jail', 'edrftyhujik', '2019-08-29 09:52:01'),
(199, 'metentis', 'jail', 'ertyu', '2019-08-29 09:57:26'),
(200, 'metentis', 'jail', 'wqwfr', '2019-08-29 10:00:32'),
(201, 'metentis', 'jail', 'hhh', '2019-08-29 10:00:36'),
(202, 'metentis', 'jail', 'rhyt', '2019-08-29 10:00:39'),
(203, 'metentis', 'jail', 'htry', '2019-08-29 10:02:54'),
(204, 'metentis', 'jail', 'kuygkg', '2019-08-29 10:03:00'),
(205, 'metentis', 'jail', 'kiuyy', '2019-08-29 10:03:04'),
(206, 'metentis', 'jail', 'iulut', '2019-08-29 10:03:06'),
(207, 'metentis', 'jail', '][[p', '2019-08-29 10:03:12'),
(208, 'metentis', 'jail', '34', '2019-08-29 10:03:17'),
(209, 'metentis', 'jail', 'wqergfg', '2019-08-29 10:05:34'),
(210, 'metentis', 'jail', 'wqedfsdgfwqaedfgqwdfg', '2019-08-29 10:06:03'),
(211, 'metentis', 'jail', 'htgrewq', '2019-08-29 10:06:10'),
(212, 'metentis', 'jail', 'q', '2019-08-29 10:06:26'),
(213, 'metentis', 'jail', 'qqwewq', '2019-08-29 10:06:29'),
(214, 'metentis', 'jail', 'ewqrdew', '2019-08-29 10:06:32'),
(215, 'metentis', 'jail', 'eqwdwea', '2019-08-29 10:06:36'),
(216, 'metentis', 'jail', '44444', '2019-08-29 10:06:39'),
(217, 'metentis', 'jail', 'wqery', '2019-08-29 10:10:50'),
(218, 'metentis', 'jail', 'wda', '2019-08-29 10:12:06'),
(219, 'metentis', 'jail', 'qwewq', '2019-08-29 10:12:07'),
(220, 'metentis', 'jail', 'fwaqdefrgtyhu', '2019-08-29 10:33:05'),
(221, 'metentis', 'jail', '6574986156', '2019-08-29 10:33:10'),
(222, 'metentis', 'jail', 'werfgthyty', '2019-08-29 10:37:52'),
(223, 'metentis', 'jail', '65746831', '2019-08-29 10:37:55'),
(224, 'metentis', 'jail', '897986546wferergvrwse', '2019-08-29 10:38:03'),
(225, 'metentis', 'jail', 'eafdwea', '2019-08-29 10:38:05'),
(226, 'metentis', 'jail', 'efre', '2019-08-29 10:39:28'),
(227, 'metentis', 'jail', 'qwadwaq', '2019-08-29 10:39:38'),
(228, 'metentis', 'jail', 'feasq', '2019-08-29 10:40:02'),
(229, 'metentis', 'jail', 'dwqfqwq', '2019-08-29 10:40:12'),
(230, 'metentis', 'jail', 'ewrt8572', '2019-08-29 10:59:49'),
(231, 'metentis', 'jail', 'p4', '2019-08-29 10:59:53'),
(232, 'metentis', 'jail', 'wsdfgh7854', '2019-08-29 11:24:39'),
(233, 'metentis', 'jail', '654133', '2019-08-29 11:25:35'),
(234, 'metentis', 'jail', 'opljiokjhgfdsawadfghnbgdffvsdv', '2019-08-29 12:48:08'),
(235, 'metentis', 'jail', 'fwefwe', '2019-08-29 12:48:16'),
(236, 'jail', 'metentis', 'few', '2019-08-29 12:48:44'),
(237, 'jail', 'metentis', 'efw', '2019-08-29 12:49:40'),
(238, 'metentis', 'jail', 'qaewdrfg', '2019-08-29 12:49:43'),
(239, 'jail', 'metentis', 'dwdqwdwq', '2019-08-29 12:51:01'),
(240, 'metentis', 'jail', 'gtrstrs', '2019-08-29 12:53:34'),
(241, 'metentis', 'jail', ';ipokmjip', '2019-08-29 13:08:19'),
(242, 'jail', 'metentis', 'p;o', '2019-08-29 13:08:21'),
(243, 'jail', 'metentis', 'wfewdsswf', '2019-08-29 13:13:53'),
(244, 'metentis', 'jail', 'fewfew', '2019-08-29 13:13:55'),
(245, 'jail', 'metentis', 'few', '2019-08-29 14:12:04'),
(246, 'jail', 'metentis', 'verfb', '2019-08-29 14:12:07'),
(247, 'jail', 'metentis', 'qwfeqfwefefewew', '2019-08-29 14:34:54'),
(248, 'jail', 'metentis', 'few', '2019-08-29 14:36:58'),
(249, 'jail', 'metentis', 'fwe', '2019-08-29 14:37:00'),
(250, 'jail', 'metentis', 'dwq', '2019-08-29 14:37:17'),
(251, 'jail', 'metentis', 'fewefq', '2019-08-29 14:37:20'),
(252, 'jail', 'metentis', 'fre', '2019-08-29 14:39:07'),
(253, 'jail', 'metentis', 'rewrew', '2019-08-29 14:55:40'),
(254, 'metentis', 'jail', 'fewqewqrw', '2019-08-29 14:55:46'),
(255, 'jail', 'metentis', 'fewfewaaaaaaaaa', '2019-08-29 15:06:05'),
(256, 'metentis', 'jail', 'fewfwfew', '2019-08-29 15:07:30'),
(257, 'metentis', 'jail', 'fkrbrehdqh', '2019-08-30 13:33:53'),
(258, 'jail', 'test2', 'f', '2019-09-02 12:33:38'),
(259, 'jail', 'test2', 'f', '2019-09-02 12:33:41'),
(260, 'jail', 'test2', 'f', '2019-09-02 12:33:52'),
(261, 'jail', 'test2', 'q', '2019-09-02 12:33:58'),
(262, 'metentis', 'jail', 'k', '2019-09-02 23:00:52'),
(263, 'metentis', 'jail', '&', '2019-09-02 23:01:55'),
(264, 'test205', 'test207', 'salut', '2019-09-06 14:00:52'),
(265, 'test207', 'test205', 'coucou', '2019-09-06 14:01:07'),
(266, 'test205', 'test207', 'lfez', '2019-09-06 14:01:54'),
(267, 'test207', 'test205', 'csqc', '2019-09-06 14:02:03'),
(268, 'test205', 'test207', 'ko', '2019-09-06 14:02:07'),
(276, 'test198', 'test199', 'ht', '2019-09-06 17:00:54'),
(277, 'test199', 'test198', 'lk', '2019-09-06 17:00:59'),
(278, 'test300', 'test208', 'fver', '2019-09-06 18:01:41'),
(279, 'test300', 'test208', 'cf', '2019-09-06 18:01:50'),
(280, 'test300', 'test208', 'cer', '2019-09-06 18:25:31'),
(281, 'test300', 'test208', 'dez', '2019-09-06 18:25:35');

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `notificationUser` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `notificationType` text NOT NULL,
  `notificationRead` int(11) NOT NULL DEFAULT '0',
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1053 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `notifications`
--


-- --------------------------------------------------------

--
-- Structure de la table `picturesusers`
--

DROP TABLE IF EXISTS `picturesusers`;
CREATE TABLE IF NOT EXISTS `picturesusers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `picture` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=227 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `picturesusers`
--

INSERT INTO `picturesusers` (`id`, `userId`, `picture`) VALUES
(179, '128', 'FR.TR.jpg'),
(180, '128', 'FR.jpg'),
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
(194, '128', 'image3.jpg'),
(195, '130', 'image4.jpg'),
(196, '165', 'FR.jpg'),
(197, '165', 'FR.TR.jpg'),
(198, '164', 'folder.jpg'),
(199, '129', 'FR.TR.jpg'),
(200, '144', 'FR.jpg'),
(201, '144', 'FR.TR.jpg'),
(202, '145', 'CD.jpg'),
(203, '146', 'FR.TR.jpg'),
(204, '149', 'FR.jpg'),
(205, '153', 'FR.TR.jpg'),
(206, '155', 'FR.jpg'),
(207, '154', 'FR.jpg'),
(208, '156', 'FR.jpg'),
(209, '157', 'FR.TR.jpg'),
(210, '158', 'FR.TR.jpg'),
(211, '159', 'FR.TR.jpg'),
(212, '160', 'FR.jpg'),
(213, '181', 'FR.jpg'),
(214, '182', 'FR.jpg'),
(215, '183', 'FR.TR.jpg'),
(216, '183', 'FR.jpg'),
(217, '184', 'FR.TR.jpg'),
(218, '185', 'FR.jpg'),
(219, '186', 'CD.jpg'),
(220, '192', 'CD.jpg'),
(221, '193', 'FR.jpg'),
(222, '192', 'FR.jpg'),
(223, '192', 'CD.jpg'),
(224, '192', 'CD.jpg'),
(225, '192', 'CD.jpg'),
(226, '193', 'CD.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `profil`
--

DROP TABLE IF EXISTS `profil`;
CREATE TABLE IF NOT EXISTS `profil` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `lastName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `firstName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `age` int(11) DEFAULT NULL,
  `lastConnection` datetime DEFAULT NULL,
  `confirmKey` bigint(20) DEFAULT NULL,
  `confirmKeyOk` int(11) NOT NULL DEFAULT '0',
  `keyResetPassword` varchar(255) DEFAULT NULL,
  `bantime` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=196 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `profil`
--

INSERT INTO `profil` (`id`, `userName`, `password`, `email`, `lastName`, `firstName`, `age`, `lastConnection`, `confirmKey`, `confirmKeyOk`, `keyResetPassword`, `bantime`) VALUES
(128, 'metentis', '67c4a5487916a3fcbfd28423270afa3a346f9e44c9d57ecb5d1c09b3bf022d2f', 'sylvain.boeuf@frae.fr', 'boeuf', 'sylvain', 28, '2019-09-04 23:35:26', 8394950248921, 1, NULL, '0'),
(129, 'jail', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'florent.boeuf@free.fr', 'boeuf', 'florent', 22, '2019-09-04 23:49:08', 6923653259421, 1, NULL, '0'),
(130, 'bouboule', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'audrey.boeuf@free.fr', 'boeuf', 'audrey', 24, NULL, 7772988799848, 1, NULL, '0'),
(131, 'tyr', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'amandine.richard@free.fr', 'Richard', 'amandine', 70, NULL, 9971396599816, 1, NULL, '0'),
(132, 'HH', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'dimitri.richard@free.fr', 'richard', 'dimitri', 60, NULL, 2200237506864, 1, NULL, '1564306715'),
(133, 'le roi des math', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'bruno.chatelain@free.fr', 'chatelin', 'bruno', 30, NULL, 7136743763158, 1, NULL, '0'),
(134, 'test', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test@gmail.com', 'test', 'test', 70, NULL, 3454300560392, 1, NULL, '0'),
(135, 'test2', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test2@gmail.com', 'test2', 'test2', 40, '2019-09-02 13:44:01', 1677337025450, 1, NULL, '0'),
(136, 'test3', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test3@gmail.fr', 'test3', 'test3', 50, NULL, 2376701668198, 1, NULL, '0'),
(137, 'test4', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test4@gmail.com', 'test4', 'test4', 60, NULL, 6037373664254, 1, NULL, '0'),
(139, 'coucou', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'coucoucou@gmail.com', 'coucou', 'coucou', 55, NULL, 6981057521520, 1, NULL, '0'),
(142, 'bat test', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'sylvain.boeuf@gmail.fr', 'Wayne', 'Bruce', 45, NULL, 7960381791630, 1, NULL, '0'),
(143, 'the man of steel', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'sylvain.boeuf@fre.fr', 'kent', 'Clark', 35, NULL, 8318236214024, 1, NULL, '0'),
(144, 'test5', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test5@gmail.com', 'test5', 'test5', 25, '2019-09-03 21:43:49', 7566931969138, 1, NULL, '0'),
(145, 'test6', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test6@gmail.com', 'test6', 'test6', 19, '2019-09-03 21:46:55', 582266724213, 1, NULL, '0'),
(146, 'test9', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test9@gmail.com', 'test9', 'test9', 18, '2019-09-03 21:55:58', 3488552820732, 1, NULL, '0'),
(147, 'test10', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test10@gmail.com', 'test10', 'test10', 60, NULL, 7358031551689, 0, NULL, '0'),
(148, 'test11', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test11@gmail.fr', 'test11', 'test11', 63, NULL, 9736868538874, 1, NULL, '0'),
(149, 'test12', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test12@gmail.fr', 'test12', 'test12', 69, '2019-09-03 21:59:49', 4021348015825, 1, NULL, '0'),
(150, 'test13', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test13@gmail.fr', 'test13', 'test13', 69, NULL, 6033169455479, 0, NULL, '0'),
(151, 'test14', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test14@gmail.com', 'test14', 'test14', 34, NULL, 6190844112524, 0, NULL, '0'),
(152, 'test15', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test15@gmail.com', 'test15', 'test15', 35, NULL, 5783414770008, 1, NULL, '0'),
(153, 'test16', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test16@gmail.com', 'test16', 'test16', 24, '2019-09-03 22:01:01', 2569539059679, 1, NULL, '0'),
(154, 'test17', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test17@gmail.com', 'test17', 'test17', 28, '2019-09-03 22:02:47', 9559486991302, 1, NULL, '0'),
(155, 'test18', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test18@gmail.com', 'test18', 'test18', 92, '2019-09-03 22:02:06', 8335081320354, 1, NULL, '0'),
(156, 'test19', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test19@gmail.com', 'test19', 'test19', 27, '2019-09-03 22:04:34', 7533706907012, 1, NULL, '0'),
(157, 'test20', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test20@gmail.fr', 'test20', 'test20', 26, '2019-09-03 22:12:46', 8699907264766, 1, NULL, '0'),
(158, 'test21', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test21@gmail.com', 'test21', 'test21', 24, '2019-09-03 22:50:24', 9861767162669, 1, NULL, '0'),
(159, 'test25', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test25@gmail.com', 'test25', 'test25', 36, '2019-09-03 22:52:17', 8279664659955, 1, NULL, '0'),
(160, 'test26', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test26@gmail.com', 'test26', 'test26', 37, '2019-09-03 22:53:25', 1559224598050, 1, NULL, '0'),
(161, 'test27', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test27@gmail.com', 'test27', 'test27', 46, NULL, 3505394069835, 1, NULL, '0'),
(162, 'test28', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test28@gmail.com', 'test28', 'test28', 45, NULL, 3001966743280, 1, NULL, '0'),
(163, 'test29', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test29@gmail.com', 'test29', 'test29', 50, NULL, 5287304086401, 1, NULL, '0'),
(164, 'test30', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test30@gmail.com', 'test30', 'test30', 51, NULL, 914499620047, 1, NULL, '0'),
(165, 'x', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'xavier@hotmail.free', 'boeuf', 'xa', 53, NULL, 318246101647, 1, NULL, '0'),
(166, 'test40', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test40@gmail.com', 'test40', 'test40', 56, NULL, 8468830061885, 1, NULL, '0'),
(167, 'spiderman', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'sylvain.boeuf@fr.fr', 'spider', 'man', 80, NULL, 5809011190170, 1, NULL, '0'),
(168, 'test41', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test41@gmail.com', 'test41', 'test41', 81, NULL, 6978960014910, 1, NULL, '0'),
(169, 'test42', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'sylvain.boeuf@ve.fr', 'test42', 'test42', 83, NULL, 3111879212092, 1, NULL, '0'),
(170, 'test43', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test43@gmail.com', 'test43', 'test43', 88, NULL, 9435144338801, 1, NULL, '0'),
(171, 'test45', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'sylvain.boeuf@vrj.fr', 'test45', 'test45', 76, NULL, 6679666313965, 1, NULL, '0'),
(173, 'test60', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test60@frewr.fr', 'test60', 'test60', 78, NULL, 6813953404058, 0, NULL, '0'),
(174, 'test61', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test601@frewr.fr', 'test61', 'test61', 74, NULL, 5034110158542, 0, NULL, '0'),
(175, 'undefined', 'ezcfzr', 'metentis', 'verr', 'edzedezfrefe', NULL, NULL, 1615, 0, NULL, '0'),
(176, 'test100', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'test100@gmail.com', 'test100', 'test100', NULL, NULL, 4145558030057, 0, NULL, '0'),
(177, 'test92', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'sylvain.boeuf@free.fp', 'test92', 'test92', NULL, NULL, 4458785191319, 0, NULL, '0'),
(178, 'test93', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'sylvain.boeuf@free.', 'test93', 'test93', NULL, NULL, 5771372165128, 0, NULL, '0'),
(180, 'test101', '88d093c646a6ab751441641f00f01bfbd9104c9a804e4a72e03c36eb4ca3247d', 'sylvain.boeuf@free.gr', 'test101', 'test101', NULL, NULL, 0, 1, NULL, '0'),
(181, 'test200', '$2b$10$MjlKlW.GQ6647AyNzPTZwOwZzBcoIAEKOH/BbQ/2jRWGeuIDeycpS', 'sylvain.boeuf@free.f', 'test200', 'test200', 22, '2019-09-05 22:22:23', 5720116610654, 1, NULL, '0'),
(182, 'test202', 'Azerty01', 'sylvainboeuf@gmail.fr', 'test020', 'test202', 40, '2019-09-05 22:12:40', 5814718088613, 1, NULL, '0'),
(183, 'test207', '$2b$10$tl2Zum3oF0fzyVoLoTQUDuDJSfLDE/Gtk3PtmqZ8gtxpJgE9yWfOK', 'sylvain.boeuf@free.fm', 'test203', 'test203', 26, '2019-09-06 14:05:49', 7222903854510, 1, NULL, '0'),
(184, 'test205', '$2b$10$.cUFQbeXooCPR9bUiqf8..n8LmCNXlj9wvl2h9m5t0KMheU7vBVpi', 'test205@free.fr', 'test205', 'test205', 25, '2019-09-06 16:03:30', 6843348695100, 1, NULL, '0'),
(185, 'test198', '$2b$10$cOJec8oBjNLPcJmJA6p/J.SDQfPQJ/FVnAsx5ULvNmYgVix4bvBI.', 'test198@gmail.com', 'test198', 'test198', 31, '2019-09-06 17:03:27', 7870194228343, 1, NULL, '0'),
(186, 'test199', '$2b$10$L7NUiB/HeP6/IdzzHQ6syOOILRNAX/dwM5F.VjW.FoLstbnx8QiVq', 'test199@free.fr', 'test199', 'test199', 34, '2019-09-06 17:03:27', 7261193138403, 1, NULL, '0'),
(192, 'test208', '$2b$10$iGID2foBAejdKAN94wS.VuUgenHhu0uyPjtf3vMZh7mnoFn8XHCKW', 'sylvain.uf@free.fr', 'test208', 'test208', 28, '2019-09-06 18:27:57', 0, 1, NULL, '0'),
(193, 'test300', '$2b$10$Bpc6TDtjeT1csKGpMi2d9OKEyMZcX1X2m8EgffIfgU4zqSTcsVCEa', 'test300@free.fr', 'test300', 'test300', 18, '2019-09-06 18:58:41', 3306339342903, 1, NULL, '0'),
(194, 'test301', '$2b$10$e5U/J6zUaztkfEnMRHGj/eOyOVMh01.NRBLSO1oD9FaSQbsC1t/XW', 'test301@free.fr', 'test301', 'test301', 150, NULL, 7637905906785, 1, NULL, '0'),
(195, 'test400', '$2b$10$VdXbIcJQ0sIbHP7WxqKL0uWxnFsRD08iPmj5DcfM05qRzT9y..qle', 'sylvain.boeuf@free.fr', 'test400', 'test400', 40, '2019-09-06 19:04:43', NULL, 1, NULL, '0');

-- --------------------------------------------------------

--
-- Structure de la table `profilmatch`
--

DROP TABLE IF EXISTS `profilmatch`;
CREATE TABLE IF NOT EXISTS `profilmatch` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstPerson` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `secondPerson` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `chatId` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `profilmatch`
--

INSERT INTO `profilmatch` (`id`, `firstPerson`, `secondPerson`, `chatId`) VALUES
(12, 'tyr', 'bouboule', '123456781'),
(14, 'jail', 'tyr', '123456782'),
(15, 'jail', 'HH', '123456783'),
(20, 'test3', 'jail', '123456785'),
(22, 'metentis', 'x', '123456786'),
(111, 'jail', 'metentis', '1567633734766878'),
(114, 'test198', 'test199', '15677814947937375'),
(115, 'test198', 'test199', '15677814947982946'),
(116, 'test208', 'test300', '15677856844491043'),
(117, 'test208', 'test300', '15677856844547051');

-- --------------------------------------------------------

--
-- Structure de la table `userinfos`
--

DROP TABLE IF EXISTS `userinfos`;
CREATE TABLE IF NOT EXISTS `userinfos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `biography` text,
  `gender` text,
  `orientation` text,
  `listInterest` text,
  `userLocation` text,
  `userApproximateLocation` text,
  `userAddress` text,
  `userApproximateCity` text,
  `populareScore` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `userinfos`
--

INSERT INTO `userinfos` (`id`, `userName`, `biography`, `gender`, `orientation`, `listInterest`, `userLocation`, `userApproximateLocation`, `userAddress`, `userApproximateCity`, `populareScore`) VALUES
(1, 'metentis', 'fi', 'Femme', 'Bisexuelle', '#Movie', NULL, '48.8138,2.2350', NULL, 'Meudon', 100),
(2, 'jail', 'jcavjlerabv', 'Male', 'Bisexuelle', 'null#Movie#Manga#Sport', '48.8126023694097 , 2.2471824262798554', '48.8138,2.2350', '12B Rue du Docteur Vuillième, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', 'Meudon', 60),
(3, 'bouboule', 'vhkrueiubv', 'Male', 'Femme', 'null#Data processing#NigthParty#Sport', '48.8079933, 2.2396035999999997', '48.8574, 2.3795', '2bis Rue Servien, 92190 Meudon, France', 'Paris', 0),
(6, 'tyr', 'vsdvhuy', 'Male', 'Femme', 'null#Movie#Manga#Sport#NigthParty#Data processing', '48.8079933, 2.2396035999999997', '48.8138, 2.235', '2bis Rue Servien, 92190 Meudon, France', 'Meudon', 0),
(7, 'HH', 'null', 'Male', 'Male', 'null#Manga#Sport', '48.8042, 2.2810200000000123', '48.8648,2.3335', '46 Rue Jean Jaurès, 92320 Châtillon, France', 'Paris', 0),
(8, 'le roi des math', 'ewfthyeg', 'Male', 'Male', 'null#Data processing#NigthParty#Sport#Manga#Movie', '48.8079933, 2.2396035999999997', '48.8138, 2.235', '2bis Rue Servien, 92190 Meudon, France', 'Meudon', 0),
(9, 'test', 'ca bug', 'Femme', 'Femme', 'null#Sport#NigthParty', '48.8964, 2.3184499999999844', '48.8574, 2.3795', '96 Boulevard Bessières, Paris 17e Arrondissement, France', 'Paris', 0),
(10, 'test2', 'testtsetsets', 'Male', 'Femme', 'null#Manga#NigthParty', '48.8079933, 2.2396035999999997', '48.8648,2.3335', '2bis Rue Servien, 92190 Meudon, France', 'Paris', 100),
(12, 'test3', '', 'Femme', 'Femme', 'null', NULL, '48.8574, 2.3795', NULL, 'Paris', 100),
(13, 'test4', 'htrhdghjydnjuyrj', 'Male', 'Bisexuelle', 'null#Manga#Sport', '48.8079933, 2.2396035999999997', '48.8574, 2.3795', '2bis Rue Servien, 92190 Meudon, France', 'Paris', 100),
(15, 'coucou', '', 'Male', 'Femme', 'null#Sport', '48.812498899999994, 2.24694', '48.8138, 2.235', '12BIS Rue du Docteur Vuillième, 92190 Meudon, France', 'Meudon', 0),
(18, 'bat test', 'null', 'Male', 'Femme', 'null#Sport#Data processing#NigthParty', '48.80921180000001, 2.2395904', '48.8138, 2.235', '89A Rue de Paris, 92190 Meudon, France', 'Meudon', 0),
(19, 'the man of steel', 'im superman yeah !!!', 'Femme', 'Male', 'null#Manga#Sport#Movie', '48.8127305, 2.2468664', '48.8138, 2.235', '8 Rue du Docteur Vuillième, 92190 Meudon, France', 'Meudon', 0),
(20, 'test5', 'coucou', 'Femme', 'Femme', 'null#Sport#Manga', '48.810699000000014 , 2.2405410000000114', '48.8138,2.2350', 'Rue de Paris, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', 'Meudon', 0),
(21, 'test6', 'yop', 'Femme', 'Femme', 'null#Sport#NightParty', '48.8966685, 2.3183566', '48.8138,2.2350', '96 Boulevard Bessières, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Meudon', 0),
(22, 'test9', 'plop', 'Male', 'Male', 'null#Manga', '48.8966946, 2.3183746999999997', '48.8138,2.2350', '96 Boulevard Bessières, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Meudon', 0),
(25, 'test12', 'yop', 'Femme', 'Bisexuelle', '#Sport', '48.8966338, 2.3183534', '48.8138,2.2350', '96 Boulevard Bessières, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Meudon', 0),
(29, 'test16', 'odhez', 'Femme', 'Bisexuelle', '#Manga', '48.8967101, 2.3183359', '48.8138,2.2350', '96 Boulevard Bessières, 75017 Paris, France', 'Meudon', 0),
(30, 'test17', 'mlc,d', 'Femme', 'Femme', '#Manga#Sport', '48.8967113, 2.3183545999999997', '48.8138,2.2350', '96 Boulevard Bessières, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Meudon', 0),
(31, 'test18', 'kl', 'Femme', 'Bisexuelle', '#Manga', '48.8966505, 2.3183648999999997', '48.8138,2.2350', '96 Boulevard Bessières, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Meudon', 0),
(32, 'test19', 'lfcerfo', 'Femme', 'Bisexuelle', '#Sport#NightParty#Movie#Manga#Data Processing', '48.8966505, 2.3183648999999997', '48.8138,2.2350', '96 Boulevard Bessières, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Meudon', 0),
(33, 'test20', 'jfe', 'Femme', 'Bisexuelle', '#Manga#Sport', '48.8966583, 2.3183534', '48.8138,2.2350', '96 Boulevard Bessières, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Meudon', 0),
(34, 'test21', 'fezf', 'null', 'Bisexuelle', '#Sport#Manga#Movie', '48.8966583, 2.3183534', '48.8138,2.2350', '96 Boulevard Bessières, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Meudon', 0),
(35, 'test25', 'vfdv', 'Femme', 'Bisexuelle', '#Sport#Manga', '48.80799184533588 , 2.2395570507480613', '48.8138,2.2350', '2-6 Rue Servien, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', 'Meudon', 0),
(36, 'test26', 'mcfd', 'Femme', 'Bisexuelle', '#Manga', '48.80799184533588 , 2.2395570507480613', '48.8138,2.2350', '2-6 Rue Servien, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', 'Meudon', 0),
(37, 'test27', NULL, NULL, NULL, NULL, '48.8125933694097 , 2.2471824262798554', '48.8138, 2.235', '12B Rue du Docteur Vuillième, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', 'Meudon, France', 0),
(38, 'test28', NULL, NULL, NULL, NULL, '48.8125933694097 , 2.2471824262798554', '48.8138, 2.235', '12B Rue du Docteur Vuillième, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', 'Meudon, France', 0),
(39, 'test29', NULL, NULL, NULL, NULL, '48.80799184533588 , 2.2395570507480613', '48.8138, 2.235', '2-6 Rue Servien, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', 'Meudon, France', 0),
(40, 'test30', '', 'null', 'null', 'null', '48.80799184533588 , 2.2395570507480613', '48.81206000000003, 2.2377800000000434', '2-6 Rue Servien, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', 'Meudon, Hauts-de-Seine, Île-de-France', 100),
(41, 'x', 'bonjour, les amis', 'null', 'Femme', 'null#Movie', NULL, '48.8648,2.3335', NULL, 'Paris', 100),
(42, 'test40', NULL, 'Male', 'Bisexuelle', NULL, '48.88745128980902 , 2.3134637153442483', '48.85341, 2.3488', '1 Boulevard Pereire, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Paris', 0),
(43, 'spiderman', NULL, 'Male', 'Bisexuelle', NULL, '48.88745128980902 , 2.3134637153442483', '48.85341, 2.3488', '1 Boulevard Pereire, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Paris', 0),
(44, 'test41', NULL, 'Male', 'Bisexuelle', NULL, '48.88745128980902 , 2.3134637153442483', '48.85341, 2.3488', '1 Boulevard Pereire, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Paris', 0),
(45, 'test42', NULL, 'Male', 'Bisexuelle', NULL, '48.88745128980902 , 2.3134637153442483', '48.85341, 2.3488', '1 Boulevard Pereire, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Paris', 0),
(46, 'test43', NULL, 'Male', 'Bisexuelle', NULL, '48.88745128980902 , 2.3134637153442483', '48.85341, 2.3488', '1 Boulevard Pereire, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Paris', 0),
(47, 'test45', NULL, 'Male', 'Bisexuelle', NULL, '48.887609988891555 , 2.3128799816781886', '48.85341, 2.3488', 'Dr. Giroux Bruno, 7 Boulevard Pereire, 75017, 17e Arrondissement, Paris, Île-de-France, FRA', 'Paris', 0),
(48, 'test60', NULL, 'Male', 'Bisexuelle', NULL, NULL, NULL, NULL, NULL, 0),
(49, 'test60', NULL, 'Male', 'Bisexuelle', NULL, NULL, NULL, NULL, NULL, 0),
(50, 'test61', NULL, 'Male', 'Bisexuelle', NULL, NULL, NULL, NULL, NULL, 0),
(51, 'undefined', NULL, 'Male', 'Bisexuelle', NULL, '48.810699000000014 , 2.2405410000000114', NULL, 'Rue de Paris, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', NULL, 0),
(52, 'test100', NULL, 'Male', 'Bisexuelle', NULL, NULL, NULL, NULL, NULL, 0),
(53, 'test92', NULL, 'Male', 'Bisexuelle', NULL, NULL, NULL, NULL, NULL, 0),
(54, 'test93', NULL, 'Male', 'Bisexuelle', NULL, NULL, NULL, NULL, NULL, 0),
(55, 'test101', NULL, 'Male', 'Bisexuelle', NULL, NULL, NULL, NULL, NULL, 0),
(56, 'test101', NULL, 'Male', 'Bisexuelle', NULL, NULL, NULL, NULL, NULL, 0),
(57, 'test200', 'coucou', 'Male', 'Bisexuelle', '#Sport#Manga', '48.80791858673322 , 2.239603989035746', '48.8138,2.2350', '2B Rue Servien, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', 'Meudon', 0),
(58, 'test202', 'salut, je suis nouveau ici', 'Male', 'Bisexuelle', '#Movie#Manga', '48.80791858673322 , 2.239603989035746', '48.8138,2.2350', '2B Rue Servien, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', 'Meudon', 0),
(59, 'test207', 'salut tout le monde', 'Male', 'Bisexuelle', '#Manga#Sport#NightParty', '48.84996719849053 , 2.6370453605384747', '48.7999,2.3326', '7-7 Cours de l\'Arche Guédon, 77200, Torcy, Seine-et-Marne, Île-de-France, FRA', 'Arcueil', 0),
(60, 'test205', 'dzad', 'Femme', 'Bisexuelle', '#Sport#Data Processing', '48.81245098306313 , 2.247290991373006', '48.8138,2.2350', '14 Rue du Docteur Vuillième, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', 'Meudon', 0),
(61, 'test198', 'salut all', 'Male', 'Bisexuelle', '#Sport#Manga', '48.8126023694097 , 2.2471824262798554', '48.8138,2.2350', '12B Rue du Docteur Vuillième, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', 'Meudon', 0),
(62, 'test199', 'coucou all', 'Male', 'Bisexuelle', '#Sport#Manga', '48.8126023694097 , 2.2471824262798554', '48.8138,2.2350', '12B Rue du Docteur Vuillième, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', 'Meudon', 0),
(63, 'test208', 'yop', 'Male', 'Bisexuelle', '#Sport#Manga', '48.80791858673322 , 2.239603989035746', '48.8138,2.2350', '2B Rue Servien, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', 'Meudon', 0),
(64, 'test208', 'yop', 'Male', 'Bisexuelle', '#Sport#Manga', '48.80791858673322 , 2.239603989035746', '48.8138,2.2350', '2B Rue Servien, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', 'Meudon', 0),
(65, 'test208', 'yop', 'Male', 'Bisexuelle', '#Sport#Manga', '48.80791858673322 , 2.239603989035746', '48.8138,2.2350', '2B Rue Servien, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', 'Meudon', 0),
(66, 'test208', 'yop', 'Male', 'Bisexuelle', '#Sport#Manga', '48.80791858673322 , 2.239603989035746', '48.8138,2.2350', '2B Rue Servien, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', 'Meudon', 0),
(67, 'test208', 'yop', 'Male', 'Bisexuelle', '#Sport#Manga', '48.80791858673322 , 2.239603989035746', '48.8138,2.2350', '2B Rue Servien, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', 'Meudon', 0),
(68, 'test208', 'yop', 'Male', 'Bisexuelle', '#Sport#Manga', '48.80791858673322 , 2.239603989035746', '48.8138,2.2350', '2B Rue Servien, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', 'Meudon', 0),
(69, 'test300', 'plop', 'Male', 'Bisexuelle', '#Manga', '48.80791858673322 , 2.239603989035746', '48.8138,2.2350', '2B Rue Servien, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', 'Meudon', 0),
(70, 'test301', NULL, 'Male', 'Bisexuelle', NULL, NULL, NULL, NULL, NULL, 0),
(71, 'test400', NULL, 'Male', 'Bisexuelle', NULL, '48.80791858673322 , 2.239603989035746', '48.8138,2.2350', '2B Rue Servien, 92190, Meudon, Hauts-de-Seine, Île-de-France, FRA', 'Meudon', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
