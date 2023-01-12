-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Εξυπηρετητής: 127.0.0.1
-- Χρόνος δημιουργίας: 12 Ιαν 2023 στις 12:22:18
-- Έκδοση διακομιστή: 10.4.19-MariaDB
-- Έκδοση PHP: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Βάση δεδομένων: `intelliq`
--

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `admin`
--

CREATE TABLE `admin` (
  `Admin_ID` varchar(15) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `answers`
--

CREATE TABLE `answers` (
  `ans` varchar(6) NOT NULL,
  `questionnaireID` varchar(5) NOT NULL,
  `session` varchar(4) NOT NULL,
  `qID` varchar(3) NOT NULL,
  `ans_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `keywords`
--

CREATE TABLE `keywords` (
  `keyword` varchar(255) NOT NULL,
  `questionnaireID` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `options`
--

CREATE TABLE `options` (
  `optID` varchar(6) NOT NULL,
  `opttxt` varchar(255) NOT NULL,
  `nextqID` varchar(3) DEFAULT NULL,
  `qID` varchar(3) NOT NULL,
  `questionnaireID` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `participant`
--

CREATE TABLE `participant` (
  `session` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `questionnaire`
--

CREATE TABLE `questionnaire` (
  `questionnaireID` varchar(5) NOT NULL,
  `questionnaireTitle` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `questions`
--

CREATE TABLE `questions` (
  `qID` varchar(3) NOT NULL,
  `qtext` varchar(255) NOT NULL,
  `required` varchar(5) NOT NULL,
  `type` varchar(8) NOT NULL,
  `questionnaireID` varchar(5) NOT NULL,
  `answer_string` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Ευρετήρια για άχρηστους πίνακες
--

--
-- Ευρετήρια για πίνακα `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`Admin_ID`);

--
-- Ευρετήρια για πίνακα `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`ans`,`questionnaireID`,`session`),
  ADD KEY `ForeignKey9` (`questionnaireID`),
  ADD KEY `ForeignKey10` (`session`),
  ADD KEY `ForeignKey11` (`qID`);

--
-- Ευρετήρια για πίνακα `keywords`
--
ALTER TABLE `keywords`
  ADD PRIMARY KEY (`keyword`,`questionnaireID`),
  ADD KEY `ForeignKey4` (`questionnaireID`);

--
-- Ευρετήρια για πίνακα `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`optID`,`questionnaireID`),
  ADD KEY `ForeignKey` (`qID`),
  ADD KEY `ForeignKey6` (`questionnaireID`);

--
-- Ευρετήρια για πίνακα `participant`
--
ALTER TABLE `participant`
  ADD PRIMARY KEY (`session`);

--
-- Ευρετήρια για πίνακα `questionnaire`
--
ALTER TABLE `questionnaire`
  ADD PRIMARY KEY (`questionnaireID`);

--
-- Ευρετήρια για πίνακα `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`qID`,`questionnaireID`),
  ADD KEY `ForeignKey5` (`questionnaireID`);

--
-- Περιορισμοί για άχρηστους πίνακες
--

--
-- Περιορισμοί για πίνακα `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `ForeignKey10` FOREIGN KEY (`session`) REFERENCES `participant` (`session`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ForeignKey11` FOREIGN KEY (`qID`) REFERENCES `questions` (`qID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ForeignKey2` FOREIGN KEY (`ans`) REFERENCES `options` (`optID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ForeignKey9` FOREIGN KEY (`questionnaireID`) REFERENCES `questionnaire` (`questionnaireID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Περιορισμοί για πίνακα `keywords`
--
ALTER TABLE `keywords`
  ADD CONSTRAINT `ForeignKey4` FOREIGN KEY (`questionnaireID`) REFERENCES `questionnaire` (`questionnaireID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Περιορισμοί για πίνακα `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `ForeignKey` FOREIGN KEY (`qID`) REFERENCES `questions` (`QID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ForeignKey6` FOREIGN KEY (`questionnaireID`) REFERENCES `questionnaire` (`questionnaireID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Περιορισμοί για πίνακα `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `ForeignKey5` FOREIGN KEY (`questionnaireID`) REFERENCES `questionnaire` (`questionnaireID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
