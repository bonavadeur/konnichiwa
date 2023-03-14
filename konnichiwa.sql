-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 13, 2023 at 02:03 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `konnichiwa`
--

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(4) NOT NULL,
  `sender` varchar(20) NOT NULL,
  `receiver` varchar(20) NOT NULL,
  `message` varchar(256) NOT NULL,
  `cert` varchar(512) NOT NULL,
  `signature` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `sender`, `receiver`, `message`, `cert`, `signature`) VALUES
(1, 'Arisu', 'Bobu', 'konnichiwa', 'hsfEtUMoMWjvWuR6fWAmFepbcxYDQhItO62kVlO+CbLHsivFHP+6QZq2QUFr8IAZ5exverNVPELM2rWx+MG0BT8E6Ixezjt4cOKsGdq3PD5mdJCrm+D7jq+BOcs2TouXEqbnfCUHWE8Eco+wiuS84dvNooiSr5xluYDCg8kyVfkZ/BlXFABwiw0bwoeV7KpeOSfzLB2+w8VEqOurVOBx2i/N0NaTymk/+N/FIXSecFymh5EAnvpy+22W9jw59NvwDmX1axTJalBwxVAjX0+QJcz5yoWWe4LSyUdc92QzWuda/QTTSjK4EVqG7rmf5JrtesHNIz8w6+SrMCZkDZDf1g==', 'BEGIXSfDpQlaceP1CJ3GdhNqFroLQLLjODNX+bsu3So371fctYSYfH+ooZE8+HggkLrrwwT1cZtY5ubkwSUpfcMra0adUVIpldiVawn3tE+3AzBPN7zOq9uYSB9NfP0363RzE6OuwOslWSM7CSXbvksj5cLllJ0pbDIJpRzOfdtJ4zXzApo2pPhPcZgcJQkrVVSlvpABiiCabUwCHdKeMCcCwS/+k1O1Ez/D/GwvkKuwoIR19/p6uR2JqFc33mYgXfZGb61UGQii3x0C/trHxxmCz7NQNbS3897pUoqZKYPb9CNta4uhB2qfXVW8+v1zy4c4oSigIiwTcjnboo+euQ==');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(4) NOT NULL,
  `username` varchar(10) NOT NULL,
  `password` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`) VALUES
(1, 'Arisu', '123123'),
(2, 'Bobu', '123123'),
(3, 'Tamako', '123123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
