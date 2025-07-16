-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 16, 2025 at 11:20 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `message` text NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `schools`
--

CREATE TABLE `schools` (
  `id` int(11) NOT NULL,
  `school_name` varchar(150) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schools`
--

INSERT INTO `schools` (`id`, `school_name`, `username`, `password`, `created_at`) VALUES
(1, 'Talniya Public School', 'talniya', 'jagu', '2025-07-11 16:00:28'),
(2, 'Mayur School', 'mayur', 'mayur', '2025-07-14 10:39:47'),
(3, 'Noble School', 'noble', 'noble', '2025-07-14 10:40:15');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `class` varchar(50) NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `address` text DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `school_id`, `teacher_id`, `name`, `username`, `password`, `class`, `gender`, `address`, `photo`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Mahendra Maich', 'mahi', 'mahi', '9th', 'Male', 'Mandal Jodha', NULL, '2025-07-11 16:02:56', '2025-07-14 10:22:56'),
(2, 1, 1, 'Jitendra Bhalan', 'jitu', 'jitu', '8th', 'Male', 'Degana', NULL, '2025-07-14 10:24:23', '2025-07-14 15:46:15'),
(3, 1, 1, 'Sumit Roy', 'sumitroy', 'sumit', '5th', 'Male', 'Kota', NULL, '2025-07-11 16:01:47', '2025-07-11 16:01:47'),
(4, 1, 1, 'Anita Meena', 'anitameena', 'anita', '6th', 'Female', 'Ajmer', NULL, '2025-07-11 16:01:47', '2025-07-11 16:01:47'),
(5, 1, 3, 'Ravi Verma', 'raviverma', 'ravi', '6th', 'Male', 'Tonk', NULL, '2025-07-14 10:42:53', '2025-07-14 10:42:53'),
(6, 1, 3, 'Neha Soni', 'nehasoni', 'neha', '7th', 'Female', 'Bhilwara', NULL, '2025-07-14 10:42:53', '2025-07-14 10:42:53'),
(7, 1, 3, 'Sahil Jain', 'sahiljain', 'sahil', '6th', 'Male', 'Jaipur', NULL, '2025-07-14 10:42:53', '2025-07-14 10:42:53'),
(8, 1, 3, 'Priya Singh', 'priyasingh', 'priya', '7th', 'Female', 'Alwar', NULL, '2025-07-14 10:42:53', '2025-07-14 10:42:53'),
(9, 1, 4, 'Varun Choudhary', 'varunch', 'varun', '5th', 'Male', 'Bikaner', NULL, '2025-07-14 10:43:39', '2025-07-14 10:43:39'),
(10, 1, 4, 'Geeta Yadav', 'geetayadav', 'geeta', '6th', 'Female', 'Sikar', NULL, '2025-07-14 10:43:39', '2025-07-14 10:43:39'),
(11, 1, 4, 'Ramesh Lal', 'rameshlal', 'ramesh', '5th', 'Male', 'Nagaur', NULL, '2025-07-14 10:43:39', '2025-07-14 10:43:39'),
(12, 1, 4, 'Pooja Meena', 'poojameena', 'pooja', '6th', 'Female', 'Jodhpur', NULL, '2025-07-14 10:43:39', '2025-07-14 10:43:39'),
(13, 1, 5, 'Kamal Joshi', 'kamal', 'kamaljoshi', '7th', 'Male', 'Jaipur', NULL, '2025-07-14 10:44:21', '2025-07-14 10:44:21'),
(14, 1, 5, 'Reena Kumari', 'reena', 'reenak', '6th', 'Female', 'Kota', NULL, '2025-07-14 10:44:21', '2025-07-14 10:44:21'),
(15, 1, 5, 'Tarun Pal', 'tarun', 'tarunpal', '6th', 'Male', 'Udaipur', NULL, '2025-07-14 10:44:21', '2025-07-14 10:44:21'),
(16, 1, 5, 'Sneha Jain', 'sneha', 'snehajain', '7th', 'Female', 'Bharatpur', NULL, '2025-07-14 10:44:21', '2025-07-14 10:44:21'),
(17, 1, 6, 'Dev Meena', 'dev', 'devmeena', '5th', 'Male', 'Ajmer', NULL, '2025-07-14 10:45:34', '2025-07-14 10:45:34'),
(18, 1, 6, 'Pinki Sahu', 'pinki', 'pinkisahu', '6th', 'Female', 'Alwar', NULL, '2025-07-14 10:45:34', '2025-07-14 10:45:34'),
(19, 1, 6, 'Laksh Verma', 'laksh', 'lakshv', '6th', 'Male', 'Dausa', NULL, '2025-07-14 10:45:34', '2025-07-14 10:45:34'),
(20, 1, 6, 'Bhavna Joshi', 'bhavna', 'bhavnaj', '7th', 'Female', 'Jaipur', NULL, '2025-07-14 10:45:34', '2025-07-14 10:45:34'),
(21, 1, 7, 'Ritu Sharma', 'ritu', 'ritusharma', '6th', 'Female', 'Karauli', NULL, '2025-07-14 10:46:33', '2025-07-14 10:46:33'),
(22, 1, 7, 'Deepak Jangid', 'deepak', 'deepakj', '7th', 'Male', 'Jhunjhunu', NULL, '2025-07-14 10:46:33', '2025-07-14 10:46:33'),
(23, 1, 7, 'Sonam Bhati', 'sonam', 'sonamb', '5th', 'Female', 'Sawai Madhopur', NULL, '2025-07-14 10:46:33', '2025-07-14 10:46:33'),
(24, 1, 7, 'Harshit Raj', 'harshit', 'harshitr', '6th', 'Male', 'Ajmer', NULL, '2025-07-14 10:46:33', '2025-07-14 14:16:58'),
(25, 2, 8, 'Nitin Choudhary', 'nitin', 'nitinch', '5th', 'Male', 'Sikar', NULL, '2025-07-14 10:50:45', '2025-07-14 10:50:45'),
(26, 2, 8, 'Monika Kumari', 'monika', 'monikak', '6th', 'Female', 'Kota', NULL, '2025-07-14 10:50:45', '2025-07-14 10:50:45'),
(27, 2, 8, 'Keshav Meena', 'keshav', 'keshavm', '7th', 'Male', 'Tonk', NULL, '2025-07-14 10:50:45', '2025-07-14 10:50:45'),
(28, 2, 8, 'Divya Raj', 'divya', 'divyaraj', '5th', 'Female', 'Jaipur', NULL, '2025-07-14 10:50:45', '2025-07-14 10:50:45'),
(205, 2, 9, 'Divya Jain', 'divyajain7', 'divya', '6th', 'Female', 'Jodhpur', NULL, '2025-07-14 10:51:16', '2025-07-14 10:51:16'),
(206, 2, 9, 'Nitin Raj', 'nitinraj8', 'nitin', '7th', 'Male', 'Jaipur', NULL, '2025-07-14 10:51:16', '2025-07-14 10:51:16'),
(207, 2, 9, 'Ritu Joshi', 'ritujoshi1', 'ritu', '5th', 'Female', 'Kota', NULL, '2025-07-14 10:51:16', '2025-07-14 10:51:16'),
(208, 2, 9, 'Deepak Bhati', 'deepakbhati16', 'deepak', '6th', 'Male', 'Udaipur', NULL, '2025-07-14 10:51:16', '2025-07-14 10:51:16'),
(209, 2, 10, 'Sneha Pal', 'snehapal11', 'sneha', '7th', 'Female', 'Ajmer', NULL, '2025-07-14 10:51:49', '2025-07-14 10:51:49'),
(210, 2, 11, 'Amit Sharma', 'amitsharma12', 'amit', '5th', 'Male', 'Alwar', NULL, '2025-07-14 10:52:35', '2025-07-14 10:52:35'),
(211, 2, 12, 'Neha Verma', 'nehaverma13', 'neha', '6th', 'Female', 'Bhilwara', NULL, '2025-07-14 10:53:19', '2025-07-14 10:53:19'),
(212, 2, 13, 'Ravi Meena', 'ravimeena14', 'ravi', '7th', 'Male', 'Nagaur', NULL, '2025-07-14 10:53:51', '2025-07-14 10:53:51'),
(213, 3, 14, 'Pooja Patel', 'poojapatel15', 'pooja', '5th', 'Female', 'Jodhpur', NULL, '2025-07-14 10:57:17', '2025-07-14 10:57:17'),
(214, 3, 15, 'Sumit Yadav', 'sumityadav16', 'sumit', '6th', 'Male', 'Jaipur', NULL, '2025-07-14 10:57:53', '2025-07-14 10:57:53'),
(215, 3, 16, 'Kiran Soni', 'kiransoni17', 'kiran', '7th', 'Female', 'Kota', NULL, '2025-07-14 10:58:26', '2025-07-14 10:58:26'),
(216, 3, 17, 'Sahil Lal', 'sahillal18', 'sahil', '5th', 'Male', 'Udaipur', NULL, '2025-07-14 10:59:04', '2025-07-14 10:59:04'),
(217, 3, 18, 'Divya Jain', 'divyajain19', 'divya', '6th', 'Female', 'Ajmer', NULL, '2025-07-14 11:00:27', '2025-07-14 11:00:27'),
(218, 3, 19, 'Nitin Raj', 'nitinraj20', 'nitin', '7th', 'Male', 'Alwar', NULL, '2025-07-14 11:01:36', '2025-07-14 11:01:36'),
(219, 1, 3, 'Maish Raj', 'manish', '123456', '9th', 'Male', 'Nagaur', NULL, '2025-07-14 15:28:50', '2025-07-14 15:28:50'),
(220, 1, 1, 'Sunil Singh', 'sunil', 'sunil', '8th', 'Male', 'Jaipur', '1752641319_jagu.jpg', '2025-07-16 10:18:39', '2025-07-16 10:18:39');

-- --------------------------------------------------------

--
-- Table structure for table `superadmins`
--

CREATE TABLE `superadmins` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `superadmins`
--

INSERT INTO `superadmins` (`id`, `name`, `username`, `password`, `created_at`) VALUES
(1, 'Jagrup Talniya', 'superadmin', 'super123', '2025-07-11 15:59:51');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `school_id`, `name`, `username`, `password`, `subject`, `created_at`, `updated_at`) VALUES
(1, 1, 'Jagrup Talniya', 'jagutalniya', 'jagu', 'English', '2025-07-11 16:01:47', '2025-07-14 14:08:14'),
(3, 1, 'Rakesh Maich', 'rakesh', 'rakesh', 'Mathematics', '2025-07-14 10:42:53', '2025-07-14 10:42:53'),
(4, 1, 'Deepak Maich', 'deepak', 'deepak', 'Hindi', '2025-07-14 10:43:39', '2025-07-14 10:43:39'),
(5, 1, 'Ashish Talniya', 'ashish', 'ashish', 'Science', '2025-07-14 10:44:21', '2025-07-14 10:44:21'),
(6, 1, 'Nikhil Singh', 'nikhil', 'nikhil', 'Social Science', '2025-07-14 10:45:34', '2025-07-14 10:45:34'),
(7, 1, 'Rahul Bhalan', 'rahul', 'rahul', 'Sanskrit', '2025-07-14 10:46:33', '2025-07-14 10:46:33'),
(8, 2, 'Mahendra Talniya', 'mahendra', 'mahi', 'Hindi', '2025-07-14 10:50:45', '2025-07-14 10:50:45'),
(9, 2, 'Kishor Kumar', 'kishor', 'kishor', 'Sanskrit', '2025-07-14 10:51:16', '2025-07-14 10:51:16'),
(10, 2, 'Dhanraj Meghwal', 'dhanraj', 'dhanraj', 'Science', '2025-07-14 10:51:49', '2025-07-14 10:51:49'),
(11, 2, 'Vishnu Kumar', 'vishnu', 'vishnu', 'Social Science', '2025-07-14 10:52:35', '2025-07-14 10:52:35'),
(12, 2, 'Dinesh Chiniya', 'dinesh', 'dinesh', 'Mathematics', '2025-07-14 10:53:19', '2025-07-14 10:53:19'),
(13, 2, 'Sunil Maich', 'sunil', 'sunil', 'English', '2025-07-14 10:53:51', '2025-07-14 10:53:51'),
(14, 3, 'Manohar Lal', 'manohar', 'manohar', 'Mathematics', '2025-07-14 10:57:17', '2025-07-14 10:57:17'),
(15, 3, 'Suresh Maich', 'suresh', 'suresh', 'Sanskrit', '2025-07-14 10:57:53', '2025-07-14 10:57:53'),
(16, 3, 'Shyam Sundar', 'syam', 'syam', 'English', '2025-07-14 10:58:26', '2025-07-14 10:58:26'),
(17, 3, 'Ganapat Lal', 'ganapat', 'ganpat', 'Social Science', '2025-07-14 10:59:04', '2025-07-14 10:59:04'),
(18, 3, 'Rajendra Meghwal', 'rajendra', 'rajendra', 'Science', '2025-07-14 11:00:27', '2025-07-14 11:00:27'),
(19, 3, 'Rohit Kumar', 'rohit', 'rohit', 'Hindi', '2025-07-14 11:01:36', '2025-07-14 11:01:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `school_id` (`school_id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Indexes for table `superadmins`
--
ALTER TABLE `superadmins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `fk_school` (`school_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `schools`
--
ALTER TABLE `schools`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=221;

--
-- AUTO_INCREMENT for table `superadmins`
--
ALTER TABLE `superadmins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `schools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teachers`
--
ALTER TABLE `teachers`
  ADD CONSTRAINT `fk_school` FOREIGN KEY (`school_id`) REFERENCES `schools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
