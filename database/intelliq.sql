-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Εξυπηρετητής: 127.0.0.1
-- Χρόνος δημιουργίας: 08 Ιαν 2023 στις 13:51:30
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
-- Δομή πίνακα για τον πίνακα `answer_option`
--

CREATE TABLE `answer_option` (
  `OPT` varchar(6) NOT NULL,
  `OPTtxt` varchar(255) NOT NULL,
  `Qnext` varchar(3) DEFAULT NULL,
  `QuestionQID` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `participant`
--

CREATE TABLE `participant` (
  `Email` varchar(50) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Surname` varchar(40) NOT NULL,
  `Birth Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `participant's_answer`
--

CREATE TABLE `participant's_answer` (
  `ParticipantEmail` varchar(50) NOT NULL,
  `Answer_OptionOPT` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `question`
--

CREATE TABLE `question` (
  `QID` varchar(3) NOT NULL,
  `Qtext` varchar(255) NOT NULL
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
-- Ευρετήρια για πίνακα `answer_option`
--
ALTER TABLE `answer_option`
  ADD PRIMARY KEY (`OPT`),
  ADD KEY `ForeignKey` (`QuestionQID`);

--
-- Ευρετήρια για πίνακα `participant`
--
ALTER TABLE `participant`
  ADD PRIMARY KEY (`Email`);

--
-- Ευρετήρια για πίνακα `participant's_answer`
--
ALTER TABLE `participant's_answer`
  ADD PRIMARY KEY (`ParticipantEmail`,`Answer_OptionOPT`),
  ADD KEY `ForeignKey2` (`Answer_OptionOPT`);

--
-- Ευρετήρια για πίνακα `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`QID`);

--
-- Περιορισμοί για άχρηστους πίνακες
--

--
-- Περιορισμοί για πίνακα `answer_option`
--
ALTER TABLE `answer_option`
  ADD CONSTRAINT `ForeignKey` FOREIGN KEY (`QuestionQID`) REFERENCES `question` (`QID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Περιορισμοί για πίνακα `participant's_answer`
--
ALTER TABLE `participant's_answer`
  ADD CONSTRAINT `ForeignKey2` FOREIGN KEY (`Answer_OptionOPT`) REFERENCES `answer_option` (`OPT`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ForeignKey3` FOREIGN KEY (`ParticipantEmail`) REFERENCES `participant` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
