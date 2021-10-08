-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 08 Okt 2021 pada 11.17
-- Versi server: 10.4.21-MariaDB
-- Versi PHP: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tickez`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `invoice` varchar(277) NOT NULL,
  `userId` varchar(277) NOT NULL,
  `fullName` varchar(277) NOT NULL,
  `Email` varchar(277) NOT NULL,
  `phoneNumber` varchar(277) NOT NULL,
  `scheduleId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `dateBooking` date NOT NULL,
  `timeBooking` time NOT NULL,
  `totalTicket` int(11) NOT NULL,
  `totalPayment` int(11) NOT NULL,
  `paymentMethod` varchar(50) NOT NULL,
  `statusPayment` varchar(50) NOT NULL,
  `statusUsed` enum('active','alreadyUsed') NOT NULL DEFAULT 'active',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `booking`
--

INSERT INTO `booking` (`id`, `invoice`, `userId`, `fullName`, `Email`, `phoneNumber`, `scheduleId`, `movieId`, `dateBooking`, `timeBooking`, `totalTicket`, `totalPayment`, `paymentMethod`, `statusPayment`, `statusUsed`, `createdAt`, `updatedAt`) VALUES
(24, 'INV-5866-1-9', '5', 'Haris Viclates', 'Haris@gmail.com', '082288855562', 10, 9, '2021-10-25', '19:00:00', 3, 60, 'Pulsa', 'success', 'active', '2021-10-01 04:41:45', NULL),
(25, 'INV-8181-7-9', '0', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-10-25', '19:00:00', 3, 60, 'Pulsa', 'success', 'active', '2021-10-06 17:53:44', NULL),
(26, 'INV-7583-7-9', '7373653e-12d1-45ec-895b-d873d48eb5af', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-10-25', '19:00:00', 3, 60, 'Pulsa', 'success', 'active', '2021-10-06 17:54:56', NULL),
(27, 'INV-4973-7-9', '7373653e-12d1-45ec-895b-d873d48eb5af', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'Pulsa', 'success', 'active', '2021-06-02 18:03:37', NULL),
(28, 'INV-1575-8-9', '7373653e-12d1-45ec-895b-d873d48eb5af', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'Pulsa', 'success', 'active', '2021-10-07 17:13:25', NULL),
(29, 'INV-6701-8-9', '7373653e-12d1-45ec-895b-d873d48eb5af', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'Pulsa', 'success', 'active', '2021-10-07 17:13:43', NULL),
(30, 'INV-3190-8-9', '7373653e-12d1-45ec-895b-d873d48eb5af', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'Pulsa', 'success', 'active', '2021-10-07 17:14:21', NULL),
(31, 'INV-7842-8-9', '7373653e-12d1-45ec-895b-d873d48eb5af', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'Pulsa', 'success', 'active', '2021-10-07 17:14:28', NULL),
(32, 'INV-6103-8-9', '7373653e-12d1-45ec-895b-d873d48eb5af', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'Pulsa', 'success', 'active', '2021-10-07 17:14:36', NULL),
(33, 'INV-1596-8-9', '7373653e-12d1-45ec-895b-d873d48eb5af', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'Pulsa', 'success', 'active', '2021-10-07 17:14:57', NULL),
(34, 'INV-6304-8-9', '7373653e-12d1-45ec-895b-d873d48eb5af', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'Pulsa', 'success', 'active', '2021-10-07 17:16:03', NULL),
(35, 'INV-4168-8-9', '7373653e-12d1-45ec-895b-d873d48eb5af', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'Pulsa', 'success', 'active', '2021-10-07 17:17:37', NULL),
(36, 'INV-2580-8-9', '7373653e-12d1-45ec-895b-d873d48eb5af', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'Pulsa', 'success', 'active', '2021-10-07 17:18:47', NULL),
(37, 'INV-6121-8-9', '7373653e-12d1-45ec-895b-d873d48eb5af', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'Pulsa', 'success', 'active', '2021-10-07 17:19:32', NULL),
(38, 'INV-6625-8-9', '7373653e-12d1-45ec-895b-d873d48eb5af', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'Pulsa', 'success', 'active', '2021-10-07 17:20:11', NULL),
(39, 'INV-3231-8-9', '7373653e-12d1-45ec-895b-d873d48eb5af', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'Pulsa', 'success', 'active', '2021-10-07 17:21:53', NULL),
(40, 'INV-7728-8-9', '7373653e-12d1-45ec-895b-d873d48eb5af', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'Pulsa', 'success', 'active', '2021-10-07 17:22:43', NULL),
(41, 'INV-8003-8-9', '7373653e-12d1-45ec-895b-d873d48eb5af', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'Pulsa', 'success', 'active', '2021-10-07 17:23:01', NULL),
(42, 'INV-6716-8-9', '7373653e-12d1-45ec-895b-d873d48eb5af', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'Pulsa', 'success', 'active', '2021-10-07 18:00:12', NULL),
(43, 'INV-1798-8-9', '7373653e-12d1-45ec-895b-d873d48eb5af', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'Pulsa', 'failed', 'active', '2021-10-07 18:02:03', NULL),
(44, 'INV-7058-8-9', '7373653e-12d1-45ec-895b-d873d48eb5af', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'bca_klikpay', 'success', 'active', '2021-10-07 18:08:12', NULL),
(45, 'INV-2285-8-9', '7373653e-12d1-45ec-895b-d873d48eb5af', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'bca_klikpay', 'success', 'active', '2021-10-07 18:10:01', NULL),
(46, 'INV-5970-8-9', '7373653e-12d1-45ec-895b-d873d48eb5af', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'bca_klikpay', 'success', 'active', '2021-10-07 18:11:41', NULL),
(47, 'INV-7189-8-9', '7373653e-12d1-45ec-895b-d873d48eb5af', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'bca_klikpay', 'success', 'active', '2021-10-07 18:12:35', NULL),
(48, 'INV-4589-8-9', '7373653e-12d1-45ec-895b-d873d48eb5af', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'Pulsa', 'Pending', 'active', '2021-10-08 02:26:03', NULL),
(49, 'INV-4731-8-9', '7373653e-12d1-45ec-895b-d873d48eb5af', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'Pulsa', 'Pending', 'active', '2021-10-08 02:27:20', NULL),
(50, 'INV-5891-8-9', '7373653e-12d1-45ec-895b-d873d48eb5af', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'Pulsa', 'Pending', 'active', '2021-10-08 03:03:19', NULL),
(51, 'INV-2357-8-9', '7373653e-12d1-45ec-895b-d873d48eb5af', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'Pulsa', 'Pending', 'active', '2021-10-08 03:04:20', NULL),
(52, 'INV-7647-8-9', '7373653e-12d1-45ec-895b-d873d48eb5af', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'bca_klikpay', 'success', 'active', '2021-10-08 03:09:58', NULL),
(53, 'INV-2642-8-9', 'f14b0810-249c-4217-93f6-6ce3580a109a', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'Pulsa', 'Pending', 'active', '2021-10-08 08:55:52', NULL),
(54, 'INV-2967-8-9', 'f14b0810-249c-4217-93f6-6ce3580a109a', 'Fajri', 'Fajri@gmail.com', '082288855562', 10, 9, '2021-08-25', '19:00:00', 3, 60, 'Pulsa', 'Pending', 'active', '2021-10-08 08:55:57', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `movie`
--

CREATE TABLE `movie` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `releaseDate` date NOT NULL,
  `duration` varchar(277) NOT NULL,
  `director` varchar(255) NOT NULL,
  `cast` varchar(255) NOT NULL,
  `sypnosis` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `movie`
--

INSERT INTO `movie` (`id`, `name`, `category`, `image`, `releaseDate`, `duration`, `director`, `cast`, `sypnosis`, `createdAt`, `updatedAt`) VALUES
(1, 'Upin Ipin', 'Action', '', '2020-10-09', '2', 'Jon Watss', 'Tom Holland, Michael Keaton, Robert Downey Jr', 'Lorem ipsum...', '2021-09-21 06:46:38', '2021-09-26 05:16:25'),
(2, 'Si Bolang Bocah Betawi', 'Romance', '', '2015-08-17', '2', 'Naoshi Arakawa', 'Naoshi Arakawa', 'Shigatsu wa Kimi no Uso adalah serial manga Jepang yang ditulis dan diilustrasikan oleh Naoshi Arakawa. Diadaptasi oleh A-1 Pictures sebagai serial anime televisi yang disiarkan pada Oktober 2014 hingga Maret 2015 di Fuji TV blok noitaminA.', '2021-09-21 06:48:33', '2021-10-01 07:49:52'),
(4, 'Batman', 'Action', '', '2015-08-20', '0', 'Hajime Isayama', 'Hajime Isayama', 'berlatar di dunia tempat umat manusia hidup di wilayah yang dikelilingi tiga lapis tembok besar, yang melindungi mereka dari makhluk pemakan manusia berukuran raksasa yang dikenal sebagai Titan', '2021-09-21 06:51:11', NULL),
(5, 'Suparman', 'Action', '', '2001-08-20', '1', ' Vin Diesel, Justin Lin, James Wan, F. Gary Gray, David Leitch, Rob Cohen, John Singleton, Philip Atwell', 'Universal Pictures', 'The Fast and the Furious adalah sebuah seri film aksi, yang berpusat balapan jalanan liar dan perampokan. Didistribusikan oleh Universal Pictures', '2021-09-21 06:53:34', NULL),
(6, 'Spiderman', 'Adventure', '', '2019-04-06', '2', 'Koyoharu Gotoge', 'Koyoharu Gotoge', 'Kimetsu no Yaiba, yang diterbitkan di Indonesia dengan judul Demon Slayer: Kimetsu no Yaiba, adalah sebuah seri manga Jepang yang ditulis dan diilustrasikan oleh Koyoharu Gotoge', '2021-09-21 06:55:38', NULL),
(7, 'My Love MY Life', 'Action', '', '2021-09-22', '9', 'Rino', 'Rino', 'Lorem ipsum....', '2021-09-21 17:00:00', NULL),
(8, 'Ipin Upin', 'Action', '', '2018-08-07', '2', 'Jon Watss', 'Tom Holland, Michael Keaton, Robert Downey Jr', 'Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, under the watchful eye of his new mentor Tony Stark ', '2021-09-21 06:46:38', '2021-09-22 06:54:04'),
(9, 'Si Doel', 'Action', '', '2020-10-09', '2', 'Elon Musk', 'Elon Musk and Steve Jobs', 'Lorem ipsum...', '2021-09-27 00:53:35', '2021-09-27 00:54:00'),
(14, 'Naruto Shippuden5s', 'adventure', '2021-10-08T03-08-49.002ZQuiz1@2x.png', '2020-10-09', '2', 'Elon Musk', 'Elon Musk and Steve Jobs', 'Lorem ipsum...', '2021-09-28 06:58:53', '2021-10-08 03:08:49'),
(56, 'Money Heist', 'Action', '2021-10-07T10-08-15.307ZQuiz1@2x.png', '2003-09-10', '2 Hourse 58 Minute', 'Steve Jobs', 'Steve Jobs', 'Lorem Ipsum...', '2021-10-07 10:08:15', NULL),
(59, 'Money Heist', 'Action', '2021-10-07T11-02-54.787ZQuiz1@2x.png', '2003-09-10', '2 Hourse 58 Minute', 'Steve Jobs', 'Steve Jobs', 'Lorem Ipsum...', '2021-10-07 11:02:54', NULL),
(62, 'Money Heist', 'Action', '2021-10-08T04-09-43.358Zunnamed.png', '2003-09-10', '2 Hourse 58 Minute', 'Steve Jobs', 'Steve Jobs', 'Lorem Ipsum...', '2021-10-08 04:09:43', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `movieID` int(11) NOT NULL,
  `price` int(25) NOT NULL,
  `premier` enum('ebuid','hiflix','cineone21') NOT NULL,
  `location` varchar(255) NOT NULL,
  `dateStart` date NOT NULL,
  `dateEnd` date NOT NULL,
  `time` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `schedule`
--

INSERT INTO `schedule` (`id`, `movieID`, `price`, `premier`, `location`, `dateStart`, `dateEnd`, `time`, `createdAt`, `updatedAt`) VALUES
(1, 3, 90, 'ebuid', 'Medan', '2021-08-21', '2021-08-22', '07:00', '2021-09-21 08:15:39', '2021-09-27 01:54:40'),
(3, 3, 10, 'cineone21', 'Malang', '2021-09-19', '2021-09-20', '02:10:15', '2021-08-31 17:00:00', NULL),
(4, 4, 20, 'cineone21', 'Jakarta', '2021-08-21', '2021-08-22', '07:00:00', '2021-09-22 06:39:00', NULL),
(6, 5, 20, 'ebuid', 'Jakarta', '2021-09-21', '2021-09-23', '02:06:00', '2021-09-21 17:00:00', NULL),
(7, 10, 20, 'hiflix', 'Aceh', '2021-05-10', '2021-05-11', '20:00:00', '2021-09-22 13:46:13', '2021-09-22 13:49:01'),
(8, 10, 20, 'cineone21', 'Madura', '2021-08-21', '2021-08-22', '08:30, 10:30', '2021-09-23 12:53:14', NULL),
(10, 3, 20, 'ebuid', 'Jakarta', '2021-08-21', '2021-08-22', '08:30,10:30,12:00,14:00,16:30,19:00,20:30', '2021-09-26 06:13:25', NULL),
(17, 3, 20, 'cineone21', 'Jakarta', '2021-08-21', '2021-08-22', '08:30,10:30,12:00,14:00,16:30,19:00,20:30', '2021-09-27 01:54:27', NULL),
(18, 3, 10, 'cineone21', 'Jakarta', '2021-08-21', '2021-08-22', '08:30,10:30,12:00,14:00,16:30,19:00,20:30', '2021-09-27 01:55:06', NULL),
(21, 3, 20, 'cineone21', 'Jakarta', '2021-08-21', '2021-08-22', ' 08:30, 10:30, 12:00, 14:00, 16:30, 19:00, 20:30', '2021-10-06 17:14:01', NULL),
(22, 3, 90, 'cineone21', 'Jakarta', '2021-08-21', '2021-08-22', ' 08:30, 10:30, 12:00, 14:00, 16:30, 19:00, 20:30', '2021-10-07 14:09:13', '2021-10-07 16:41:04'),
(23, 3, 20, 'cineone21', 'Jakarta', '2021-08-21', '2021-08-22', ' 08:30, 10:30, 12:00, 14:00, 16:30, 19:00, 20:30', '2021-10-07 16:10:06', NULL),
(24, 3, 20, 'cineone21', 'Jakarta', '2021-08-21', '2021-08-22', ' 08:30, 10:30, 12:00, 14:00, 16:30, 19:00, 20:30', '2021-10-07 16:59:14', NULL),
(25, 3, 20, 'cineone21', 'Jakarta', '2021-08-21', '2021-08-22', ' 08:30, 10:30, 12:00, 14:00, 16:30, 19:00, 20:30', '2021-10-07 16:59:16', NULL),
(26, 3, 20, 'cineone21', 'Jakarta', '2021-08-21', '2021-08-22', ' 08:30, 10:30, 12:00, 14:00, 16:30, 19:00, 20:30', '2021-10-07 16:59:17', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `seatbooking`
--

CREATE TABLE `seatbooking` (
  `id` int(11) NOT NULL,
  `bookingId` int(11) NOT NULL,
  `scheduleId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `dateSchedule` date DEFAULT NULL,
  `timeSchedule` time NOT NULL,
  `seat` varchar(50) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `seatbooking`
--

INSERT INTO `seatbooking` (`id`, `bookingId`, `scheduleId`, `movieId`, `dateSchedule`, `timeSchedule`, `seat`, `createdAt`, `updatedAt`) VALUES
(62, 24, 10, 9, '2021-10-25', '19:00:00', 'V1', '2021-10-01 04:41:45', NULL),
(63, 24, 10, 9, '2021-10-25', '19:00:00', 'V2', '2021-10-01 04:41:45', NULL),
(64, 24, 10, 9, '2021-10-25', '19:00:00', 'V3', '2021-10-01 04:41:45', NULL),
(65, 25, 10, 9, '2021-10-25', '19:00:00', 'V1', '2021-10-06 17:53:44', NULL),
(66, 25, 10, 9, '2021-10-25', '19:00:00', 'V2', '2021-10-06 17:53:44', NULL),
(67, 25, 10, 9, '2021-10-25', '19:00:00', 'V3', '2021-10-06 17:53:44', NULL),
(68, 26, 10, 9, '2021-10-25', '19:00:00', 'V1', '2021-10-06 17:54:56', NULL),
(69, 26, 10, 9, '2021-10-25', '19:00:00', 'V2', '2021-10-06 17:54:56', NULL),
(70, 26, 10, 9, '2021-10-25', '19:00:00', 'V3', '2021-10-06 17:54:56', NULL),
(71, 27, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-06 18:03:37', NULL),
(72, 27, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-06 18:03:37', NULL),
(73, 27, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-06 18:03:37', NULL),
(74, 28, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-07 17:13:25', NULL),
(75, 28, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-07 17:13:25', NULL),
(76, 28, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-07 17:13:25', NULL),
(77, 29, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-07 17:13:43', NULL),
(78, 29, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-07 17:13:43', NULL),
(79, 29, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-07 17:13:43', NULL),
(80, 30, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-07 17:14:21', NULL),
(81, 30, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-07 17:14:21', NULL),
(82, 30, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-07 17:14:21', NULL),
(83, 31, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-07 17:14:28', NULL),
(84, 31, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-07 17:14:28', NULL),
(85, 31, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-07 17:14:28', NULL),
(86, 32, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-07 17:14:36', NULL),
(87, 32, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-07 17:14:36', NULL),
(88, 32, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-07 17:14:36', NULL),
(89, 33, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-07 17:14:57', NULL),
(90, 33, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-07 17:14:57', NULL),
(91, 33, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-07 17:14:57', NULL),
(92, 34, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-07 17:16:03', NULL),
(93, 34, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-07 17:16:03', NULL),
(94, 34, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-07 17:16:03', NULL),
(95, 35, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-07 17:17:37', NULL),
(96, 35, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-07 17:17:37', NULL),
(97, 35, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-07 17:17:37', NULL),
(98, 36, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-07 17:18:47', NULL),
(99, 36, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-07 17:18:47', NULL),
(100, 36, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-07 17:18:47', NULL),
(101, 37, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-07 17:19:32', NULL),
(102, 37, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-07 17:19:32', NULL),
(103, 37, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-07 17:19:32', NULL),
(104, 38, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-07 17:20:11', NULL),
(105, 38, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-07 17:20:11', NULL),
(106, 38, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-07 17:20:11', NULL),
(107, 39, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-07 17:21:53', NULL),
(108, 39, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-07 17:21:53', NULL),
(109, 39, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-07 17:21:53', NULL),
(110, 40, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-07 17:22:43', NULL),
(111, 40, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-07 17:22:43', NULL),
(112, 40, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-07 17:22:43', NULL),
(113, 41, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-07 17:23:01', NULL),
(114, 41, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-07 17:23:01', NULL),
(115, 41, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-07 17:23:01', NULL),
(116, 42, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-07 18:00:12', NULL),
(117, 42, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-07 18:00:12', NULL),
(118, 42, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-07 18:00:12', NULL),
(119, 43, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-07 18:02:03', NULL),
(120, 43, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-07 18:02:03', NULL),
(121, 43, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-07 18:02:03', NULL),
(122, 44, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-07 18:08:12', NULL),
(123, 44, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-07 18:08:12', NULL),
(124, 44, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-07 18:08:12', NULL),
(125, 45, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-07 18:10:01', NULL),
(126, 45, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-07 18:10:01', NULL),
(127, 45, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-07 18:10:01', NULL),
(128, 46, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-07 18:11:41', NULL),
(129, 46, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-07 18:11:41', NULL),
(130, 46, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-07 18:11:41', NULL),
(131, 47, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-07 18:12:35', NULL),
(132, 47, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-07 18:12:35', NULL),
(133, 47, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-07 18:12:35', NULL),
(134, 48, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-08 02:26:03', NULL),
(135, 48, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-08 02:26:03', NULL),
(136, 48, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-08 02:26:03', NULL),
(137, 49, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-08 02:27:20', NULL),
(138, 49, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-08 02:27:20', NULL),
(139, 49, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-08 02:27:20', NULL),
(140, 50, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-08 03:03:19', NULL),
(141, 50, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-08 03:03:19', NULL),
(142, 50, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-08 03:03:19', NULL),
(143, 51, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-08 03:04:20', NULL),
(144, 51, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-08 03:04:20', NULL),
(145, 51, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-08 03:04:20', NULL),
(146, 52, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-08 03:09:58', NULL),
(147, 52, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-08 03:09:58', NULL),
(148, 52, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-08 03:09:58', NULL),
(149, 53, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-08 08:55:52', NULL),
(150, 53, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-08 08:55:52', NULL),
(151, 53, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-08 08:55:52', NULL),
(152, 54, 10, 9, '2021-08-25', '19:00:00', 'V1', '2021-10-08 08:55:57', NULL),
(153, 54, 10, 9, '2021-08-25', '19:00:00', 'V2', '2021-10-08 08:55:57', NULL),
(154, 54, 10, 9, '2021-08-25', '19:00:00', 'V3', '2021-10-08 08:55:57', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` varchar(16) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `status` enum('notActive','active') NOT NULL DEFAULT 'notActive',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `phoneNumber`, `password`, `image`, `role`, `status`, `createdAt`, `updatedAt`) VALUES
('f14b0810-249c-4217-93f6-6ce3580a109a', 'M', 'Rahuld', 'ezlife9909@gmail.com', '0812383782', '$2b$10$uegjaLLhqBY9LoHC7gQwLufpjlbathgOPgEcSojoNOwB9rCBP0Lk6', NULL, 'admin', 'active', '2021-10-08 03:02:22', '2021-10-08 03:05:43');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `seatbooking`
--
ALTER TABLE `seatbooking`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT untuk tabel `movie`
--
ALTER TABLE `movie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT untuk tabel `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT untuk tabel `seatbooking`
--
ALTER TABLE `seatbooking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=155;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
