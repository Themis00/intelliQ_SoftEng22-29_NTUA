-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Εξυπηρετητής: 127.0.0.1
-- Χρόνος δημιουργίας: 30 Ιαν 2023 στις 19:23:04
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
-- Δομή πίνακα για τον πίνακα `answers`
--

CREATE TABLE `answers` (
  `ans` varchar(6) DEFAULT NULL,
  `questionnaireID` varchar(5) NOT NULL,
  `session` varchar(4) NOT NULL,
  `qID` varchar(3) NOT NULL,
  `ans_datetime` datetime NOT NULL,
  `ans_str` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
('footbal', 'QQ000'),
('islands', 'QQ000'),
('timezone', 'QQ000');

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
('P00TXT', '<open string>', 'P01', 'P00', 'QQ000'),
('P01A1', '<30', 'Q01', 'P01', 'QQ000'),
('P01A2', '30-50', 'Q01', 'P01', 'QQ000'),
('P01A3', '50-70', 'Q01', 'P01', 'QQ000'),
('P01A4', '>70', 'Q01', 'P01', 'QQ000'),
('Q01A1', 'Πράσινο', 'Q02', 'Q01', 'QQ000'),
('Q01A2', 'Κόκκινο', 'Q02', 'Q01', 'QQ000'),
('Q01A3', 'Κίτρινο', 'Q02', 'Q01', 'QQ000'),
('Q02A1', 'Ναι', 'Q03', 'Q02', 'QQ000'),
('Q02A2', 'Οχι', 'Q04', 'Q02', 'QQ000'),
('Q03A1', 'Παναθηναϊκός', 'Q04', 'Q03', 'QQ000'),
('Q03A2', 'Ολυμπιακός', 'Q04', 'Q03', 'QQ000'),
('Q03A3', 'ΑΕΚ', 'Q04', 'Q03', 'QQ000'),
('Q04A1', 'Ναι', 'Q05', 'Q04', 'QQ000'),
('Q04A2', 'Οχι', 'Q06', 'Q04', 'QQ000'),
('Q05A1', 'Καμία', 'Q07', 'Q05', 'QQ000'),
('Q05A2', 'Μικρή', 'Q07', 'Q05', 'QQ000'),
('Q05A3', 'Μεγάλη', 'Q07', 'Q05', 'QQ000'),
('Q06A1', 'Ναι', 'Q07', 'Q06', 'QQ000'),
('Q06A2', 'Οχι', 'Q07', 'Q06', 'QQ000'),
('Q07A1', 'Σπάνια - καθόλου', 'Q08', 'Q07', 'QQ000'),
('Q07A2', 'Περιστασιακά', 'Q08', 'Q07', 'QQ000'),
('Q07A3', 'Τακτικά', 'Q08', 'Q07', 'QQ000'),
('Q08A1', 'Ναι', NULL, 'Q08', 'QQ000'),
('Q08A2', 'Οχι', 'Q09', 'Q08', 'QQ000'),
('Q09A1', 'Θερινή', NULL, 'Q09', 'QQ000'),
('Q09A2', 'Χειμερινή', NULL, 'Q09', 'QQ000');

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
('QQ000', 'My first research questionnaire');

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
('P00', 'Ποιο είναι το mail σας;', 'FALSE', 'profile', 'QQ000'),
('P01', 'Ποια είναι η ηλικία σας;', 'TRUE', 'profile', 'QQ000'),
('Q01', 'Ποιο είναι το αγαπημένο σας χρώμα;', 'TRUE', 'question', 'QQ000'),
('Q02', 'Ασχολείστε με το ποδόσφαιρο;', 'TRUE', 'question', 'QQ000'),
('Q03', 'Τι ομάδα είστε;', 'TRUE', 'question', 'QQ000'),
('Q04', 'Έχετε ζήσει σε νησί;', 'TRUE', 'question', 'QQ000'),
('Q05', 'Με δεδομένο ότι απαντήσατε [*Q04A1] στην ερώτηση [*Q04]: Ποια η σχέση σας με το θαλάσσιο σκι;', 'TRUE', 'question', 'QQ000'),
('Q06', 'Είστε χειμερινός κολυμβητής', 'TRUE', 'question', 'QQ000'),
('Q07', 'Κάνετε χειμερινό σκι;', 'TRUE', 'question', 'QQ000'),
('Q08', 'Συμφωνείτε να αλλάζει η ώρα κάθε χρόνο;', 'TRUE', 'question', 'QQ000'),
('Q09', 'Με δεδομένο ότι απαντήσατε [*Q08A2] στην ερώτηση [*Q08]: Προτιμάτε τη θερινή ή την χειμερινή ώρα;', 'TRUE', 'question', 'QQ000');

--
-- Ευρετήρια για άχρηστους πίνακες
--

--
-- Ευρετήρια για πίνακα `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`questionnaireID`,`session`,`qID`),
  ADD KEY `AnsForeignKey` (`ans`),
  ADD KEY `AnsQIDForeignKey` (`qID`),
  ADD KEY `SessionForeignKey` (`session`);

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
  ADD KEY `ForeignKey6` (`questionnaireID`),
  ADD KEY `ForeignKey_nextqID` (`nextqID`);

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
  ADD CONSTRAINT `AnsForeignKey` FOREIGN KEY (`ans`) REFERENCES `options` (`optID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `AnsQIDForeignKey` FOREIGN KEY (`qID`) REFERENCES `questions` (`QID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `AnsQuesIDForeignKey` FOREIGN KEY (`questionnaireID`) REFERENCES `questionnaire` (`questionnaireID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `SessionForeignKey` FOREIGN KEY (`session`) REFERENCES `participant` (`session`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `ForeignKey6` FOREIGN KEY (`questionnaireID`) REFERENCES `questionnaire` (`questionnaireID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ForeignKey_nextqID` FOREIGN KEY (`nextqID`) REFERENCES `questions` (`QID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Περιορισμοί για πίνακα `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `ForeignKey5` FOREIGN KEY (`questionnaireID`) REFERENCES `questionnaire` (`questionnaireID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
