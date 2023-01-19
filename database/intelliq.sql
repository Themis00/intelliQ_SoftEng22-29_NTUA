-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Εξυπηρετητής: 127.0.0.1
-- Χρόνος δημιουργίας: 19 Ιαν 2023 στις 17:20:16
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

DELIMITER $$
--
-- Διαδικασίες
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `pr` ()  BEGIN
    IF A.qID LIKE "%TXT" THEN
        select session, ans_str from `answers` as A where A.questionnaireID = 'ques1' and A.qID = 'Q01' order by A.ans_datetime desc;
    ELSE
        select session, ans from `answers` as A where A.questionnaireID = 'ques1' and A.qID = 'Q01' order by A.ans_datetime desc;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `proc1` ()  BEGIN
    IF 'Q01' LIKE "%TXT" THEN
        select session, ans_str from `answers` where questionnaireID = 'ques1' and qID = 'Q01' order by ans_datetime desc;
    ELSE
        select session, ans from `answers` where questionnaireID = 'ques1' and qID = 'Q01' order by ans_datetime desc;
    END IF;
END$$

DELIMITER ;

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
  `ans_datetime` datetime NOT NULL,
  `ans_str` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Άδειασμα δεδομένων του πίνακα `answers`
--

INSERT INTO `answers` (`ans`, `questionnaireID`, `session`, `qID`, `ans_datetime`, `ans_str`) VALUES
('P00A1', 'ques1', '1111', 'P00', '2023-01-14 01:21:23', NULL),
('P00A2', 'ques1', '1112', 'P00', '2023-01-14 01:21:23', NULL),
('Q01A1', 'ques1', '1112', 'Q01', '2023-01-14 01:21:23', NULL),
('Q01A2', 'ques1', '1111', 'Q01', '2023-01-14 01:21:23', NULL),
('Q02A1', 'ques1', '1111', 'Q02', '2023-01-14 01:21:23', NULL),
('Q02A2', 'ques1', '1112', 'Q02', '2023-01-14 01:21:23', NULL);

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `keywords`
--

CREATE TABLE `keywords` (
  `keyword` varchar(255) NOT NULL,
  `questionnaireID` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Άδειασμα δεδομένων του πίνακα `keywords`
--

INSERT INTO `keywords` (`keyword`, `questionnaireID`) VALUES
('keyqord2', 'ques1'),
('keyword1', 'ques1'),
('keyword1', 'ques2'),
('keyword2', 'ques2');

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

--
-- Άδειασμα δεδομένων του πίνακα `options`
--

INSERT INTO `options` (`optID`, `opttxt`, `nextqID`, `qID`, `questionnaireID`) VALUES
('P00A1', 'text', NULL, 'P00', 'ques1'),
('P00A1', 'text', NULL, 'P00', 'ques2'),
('P00A2', 'text', NULL, 'P00', 'ques1'),
('P00A2', 'text', NULL, 'P00', 'ques2'),
('Q01A1', 'text', NULL, 'Q01', 'ques1'),
('Q01A1', 'text', NULL, 'Q01', 'ques2'),
('Q01A2', 'text', NULL, 'Q01', 'ques1'),
('Q01A2', 'text', NULL, 'Q01', 'ques2'),
('Q02A1', 'text', NULL, 'Q02', 'ques1'),
('Q02A1', 'text', NULL, 'Q02', 'ques2'),
('Q02A2', 'text', NULL, 'Q02', 'ques1'),
('Q02A2', 'text', NULL, 'Q02', 'ques2');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `participant`
--

CREATE TABLE `participant` (
  `session` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Άδειασμα δεδομένων του πίνακα `participant`
--

INSERT INTO `participant` (`session`) VALUES
('1111'),
('1112');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `questionnaire`
--

CREATE TABLE `questionnaire` (
  `questionnaireID` varchar(5) NOT NULL,
  `questionnaireTitle` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Άδειασμα δεδομένων του πίνακα `questionnaire`
--

INSERT INTO `questionnaire` (`questionnaireID`, `questionnaireTitle`) VALUES
('ques1', 'Questionnaire example 1'),
('ques2', 'Questionnaire example 2');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `questions`
--

CREATE TABLE `questions` (
  `qID` varchar(3) NOT NULL,
  `qtext` varchar(255) NOT NULL,
  `required` varchar(5) NOT NULL,
  `type` varchar(8) NOT NULL,
  `questionnaireID` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Άδειασμα δεδομένων του πίνακα `questions`
--

INSERT INTO `questions` (`qID`, `qtext`, `required`, `type`, `questionnaireID`) VALUES
('P00', 'example personal ', 'True', 'personal', 'ques1'),
('P00', 'example personal ', 'True', 'personal', 'ques2'),
('Q01', 'example q1', 'True', 'question', 'ques1'),
('Q01', 'example q1', 'True', 'question', 'ques2'),
('Q02', 'example q2', 'True', 'question', 'ques1'),
('Q02', 'example q2', 'True', 'question', 'ques2');

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
