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
-- Database: `ca`
--

-- --------------------------------------------------------

--
-- Table structure for table `cert`
--

CREATE TABLE `cert` (
  `id` int(11) NOT NULL,
  `username` varchar(10) NOT NULL,
  `cert` varchar(512) NOT NULL,
  `publicKey` varchar(512) NOT NULL,
  `outdate` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cert`
--

INSERT INTO `cert` (`id`, `username`, `cert`, `publicKey`, `outdate`) VALUES
(1, 'Arisu', 'hsfEtUMoMWjvWuR6fWAmFepbcxYDQhItO62kVlO+CbLHsivFHP+6QZq2QUFr8IAZ5exverNVPELM2rWx+MG0BT8E6Ixezjt4cOKsGdq3PD5mdJCrm+D7jq+BOcs2TouXEqbnfCUHWE8Eco+wiuS84dvNooiSr5xluYDCg8kyVfkZ/BlXFABwiw0bwoeV7KpeOSfzLB2+w8VEqOurVOBx2i/N0NaTymk/+N/FIXSecFymh5EAnvpy+22W9jw59NvwDmX1axTJalBwxVAjX0+QJcz5yoWWe4LSyUdc92QzWuda/QTTSjK4EVqG7rmf5JrtesHNIz8w6+SrMCZkDZDf1g==', '-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtYg7jTvjrIK2MHf+sCa7\r\nkq4LHE/+v9oQmScNyibDIW2zASLXGpfZb1RA60vtX9s8edB72z9T2atj8wDEsZ84\r\nWXS4hSnuQogvauf6kGrD5RSqJpgxUo2+/xmTde0PQl3gb2RA8115uCxjma4J7f89\r\nd7hD9qKHumkwdSdnfYrgVXNbHtX17AgjoTbKLmMGtC9T6+mRQyUyy3/fvHODY3p2\r\nSZdNaeRtBIoo26EfDGAdJuMUqC76LAEb9rH/biD2hCLtHIqBHCyq7ptmkh5OOqcR\r\nYhIeBe9KCaTwcBdzMBopSw68J9gFBpCPphBtJPO5vGYJZLoUX+gHBYdi8G87auAR\r\nJQIDAQAB\r\n-----END PUBLIC KEY-----', '2023-03-12 12:43:40.518197'),
(2, 'Bobu', 'BDSazbh8yfPYGnHr3LV9x9nYYw72D/RDRZ184kHdXhR6+vHzF0FWUGfSpQdQyuAsw8ukFdsLDkr9xgU/MviOCLHjBvfR0MUJp+tqw5eO6HbvdLRWxSH2OBD4BUzfSbk+rOE+wvy86oqJAj7iWJnmz+M90KOf8ndk6rZ1qBCUJUzydT5IgW9oyYIDrKwymrKaOn00hKaOkKVW1Ricejb7gTdyCocp9c+ujouTu9KiVV73G7+lAIb3FaYJlQmfsHAf0b4FplNSDj4dpMcjBnDveOpnLLpTN5Uzq1KrEmoOUomriNn+JkV6ag8qpbBEwY9FCJHHg/RGw1hLcbO/gfx8mg==', '-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvJ+0K7ljJEAALgvuBGKH\r\ngbLNXPuT9IiJH2oAme7yeLIVYh9Knfgt69fKwe1kM8lnA6b/pqEjFsb2D1iO3Y46\r\nvJAGdK4boimPnG/1yI4Fdhr+ZPeoGR0977gmn/nxwTpIJEVwUZMgBuEvjvOWTefj\r\nhG7mMapEhZh7oK9cYj0YggoboRBZ81eYHakD1+x4E/x2zFzyd7oN6CPiSKTTsGVE\r\nOnyTse7KeTQoSW7tmQLe/TGcm51t54uJj2Tqee3F3UtH3AqoyfJhOxSRx0LwOpoJ\r\nVnuUVNhQTxalm/VdB4VVBV1JCssdLjmI/ibRo9bMrEvxuhracTvinfqso4YXKitE\r\ngQIDAQAB\r\n-----END PUBLIC KEY-----', '2023-03-12 12:43:40.530871'),
(3, 'Tamako', 'uL7z8NKxoryIgfxCyK/n509rDAKdDbDiZNKIDIyWgYnDUhxwrrC8zF+X0nCwxTjMUMBs2DW46SOzUs0gA7GAB88efOvqxS7pcDPMOBHbwlZhqDu48evmgWqWG7g4IYLp81HC4+4xl+tGsL6HwOe30Jfu0sEB8DwrzghQx7mhm5i+1Avc2wq+nE/2ZpwHgutBBLKu6KAW7MsrT9HeUfnEU5jZlZg5+FHpCT6UsSA7XOhGHbOdUIZkAY7X5Efw7cEQfSP1VEZM01Uo0iTWGXDd/RlZE3C//+9VWquZRVDwWhuCrQGdU4kVPuO9XExvI41QEd7iGjiCKXdSBHasASKJSQ==', '-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtYg7jTvjrIK2MHf+sCa7\r\nkq4LHE/+v9oQmScNyibDIW2zASLXGpfZb1RA60vtX9s8edB72z9T2atj8wDEsZ84\r\nWXS4hSnuQogvauf6kGrD5RSqJpgxUo2+/xmTde0PQl3gb2RA8115uCxjma4J7f89\r\nd7hD9qKHumkwdSdnfYrgVXNbHtX17AgjoTbKLmMGtC9T6+mRQyUyy3/fvHODY3p2\r\nSZdNaeRtBIoo26EfDGAdJuMUqC76LAEb9rH/biD2hCLtHIqBHCyq7ptmkh5OOqcR\r\nYhIeBe9KCaTwcBdzMBopSw68J9gFBpCPphBtJPO5vGYJZLoUX+gHBYdi8G87auAR\r\nJQIDAQAB\r\n-----END PUBLIC KEY-----', '2023-03-12 12:43:40.534967');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cert`
--
ALTER TABLE `cert`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cert`
--
ALTER TABLE `cert`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
