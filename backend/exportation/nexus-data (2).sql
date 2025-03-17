-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 17 mars 2025 à 14:31
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `nexus-data`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin_membre`
--

CREATE TABLE `admin_membre` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `admin_membre`
--

INSERT INTO `admin_membre` (`id`, `name`, `email`, `password`) VALUES
(29, 'wail ouamara', 'ouamara.wail8@gmail.com', 'Password'),
(31, 'mohamedamine', 'mohamedamine123076@gmail.com', 'amine2005'),
(43, 'soltana farid', 'faridsoltana@gmail.com', 'faridfarid');

-- --------------------------------------------------------

--
-- Structure de la table `commandes`
--

CREATE TABLE `commandes` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `numero` varchar(15) NOT NULL,
  `prix_total` decimal(10,2) NOT NULL,
  `date_commande` datetime DEFAULT NULL,
  `lieu` varchar(255) NOT NULL,
  `produit` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`produit`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commandes`
--

INSERT INTO `commandes` (`id`, `nom`, `prenom`, `email`, `numero`, `prix_total`, `date_commande`, `lieu`, `produit`) VALUES
(30, 'OUAMARA', 'WAIL', 'ouazmara.wail8@gmail.com', '0549255042', 500.00, '2025-03-15 21:36:56', '10 Boulevard Joseph Vallier', '[{\"produit_id\":\"34\",\"quantite\":1,\"prix_unitaire\":\"500.00\",\"date_ajout\":\"2025-03-15\",\"image_produit\":\"http://localhost:5050/images/1740404336201.jpg\",\"titre_produit\":\"Produit 5\",\"en_stock\":1,\"prix\":\"500.00\"}]'),
(31, 'teste2', 'test2', 'teste@gmail.com', '0549255042', 4700.00, '2025-03-17 13:15:20', '10 Boulevard Joseph Vallier', '[{\"produit_id\":\"32\",\"quantite\":1,\"prix_unitaire\":\"300.00\",\"date_ajout\":\"2025-03-07\",\"image_produit\":\"http://localhost:5050/images/1740404290506.jpg\",\"titre_produit\":\"Produit 3\",\"en_stock\":1,\"prix\":\"300.00\"},{\"produit_id\":\"41\",\"quantite\":2,\"prix_unitaire\":\"1200.00\",\"date_ajout\":\"2025-03-09\",\"image_produit\":\"http://localhost:5050/images/photo_12.jpg\",\"titre_produit\":\"Produit 12\",\"en_stock\":1,\"prix\":\"1200.00\"},{\"produit_id\":\"42\",\"quantite\":1,\"prix_unitaire\":\"1300.00\",\"date_ajout\":\"2025-03-12\",\"image_produit\":\"http://localhost:5050/images/photo_13.jpg\",\"titre_produit\":\"Produit 13\",\"en_stock\":1,\"prix\":\"1300.00\"},{\"produit_id\":\"36\",\"quantite\":1,\"prix_unitaire\":\"700.00\",\"date_ajout\":\"2025-03-12\",\"image_produit\":\"http://localhost:5050/images/photo_7.jpg\",\"titre_produit\":\"Produit 7\",\"en_stock\":1,\"prix\":\"700.00\"}]');

-- --------------------------------------------------------

--
-- Structure de la table `info_admin`
--

CREATE TABLE `info_admin` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `role` varchar(50) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `adresse` text DEFAULT NULL,
  `date_inscription` date DEFAULT curdate(),
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `info_admin`
--

INSERT INTO `info_admin` (`id`, `nom`, `email`, `role`, `telephone`, `adresse`, `date_inscription`, `password`) VALUES
(3, 'wail ouamara', 'ouamara.wail8@gmail.com', 'prprietéres ', '0549255042', '10 Boulevard Joseph Vallier', '2025-02-25', 'wail123'),
(9, 'soltana farid', 'faridsoltana7@gmail.com', 'membre fondateur ', '0552165108', 'cité 330 log bt26 n7 sebala draria alger', '2004-10-14', 'faridfarid');

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

CREATE TABLE `produits` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `categorie` varchar(100) NOT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `description` text NOT NULL,
  `prix` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `produits`
--

INSERT INTO `produits` (`id`, `titre`, `categorie`, `images`, `description`, `prix`) VALUES
(32, 'Produit 3', 'Accessoires', '[\"http://localhost:5050/images/1740404290506.jpg\",\"http://localhost:5050/images/1740404290506.jpg\"]', 'Description du produit 3', 300.00),
(33, 'Produit 4', 'Cosmétiques', '[\"http://localhost:5050/images/1740404306888.jpg\",\"http://localhost:5050/images/1740404306888.jpg\"]', 'Description du produit 4', 400.00),
(34, 'Produit 5', 'Bijoux', '[\"http://localhost:5050/images/1740404336201.jpg\",\"http://localhost:5050/images/1740404336201.jpg\"]', 'Description du produit 5', 500.00),
(36, 'Produit 7', 'Cosmétiques', '[\"http://localhost:5050/images/photo_7.jpg\", \"http://localhost:5050/images/photo_7.jpg\"]', 'Description du produit 7', 700.00),
(37, 'Produit 8', 'Bijoux', '[\"http://localhost:5050/images/photo_8.jpg\", \"http://localhost:5050/images/photo_8.jpg\"]', 'Description du produit 8', 800.00),
(38, 'Produit 9', 'Accessoires', '[\"http://localhost:5050/images/photo_9.jpg\", \"http://localhost:5050/images/photo_9.jpg\"]', 'Description du produit 9', 900.00),
(41, 'Produit 12', 'Accessoires', '[\"http://localhost:5050/images/photo_12.jpg\", \"http://localhost:5050/images/photo_12.jpg\"]', 'Description du produit 12', 1200.00),
(42, 'Produit 13', 'Cosmétiques', '[\"http://localhost:5050/images/photo_13.jpg\", \"http://localhost:5050/images/photo_13.jpg\"]', 'Description du produit 13', 1300.00),
(43, 'Produit 14', 'Bijoux', '[\"http://localhost:5050/images/photo_14.jpg\", \"http://localhost:5050/images/photo_14.jpg\"]', 'Description du produit 14', 1400.00),
(44, 'Produit 15', 'Accessoires', '[\"http://localhost:5050/images/photo_15.jpg\", \"http://localhost:5050/images/photo_15.jpg\"]', 'Description du produit 15', 1500.00),
(45, 'Produit 16', 'Cosmétiques', '[\"http://localhost:5050/images/photo_16.jpg\", \"http://localhost:5050/images/photo_16.jpg\"]', 'Description du produit 16', 1600.00),
(47, 'Produit 18', 'Accessoires', '[\"http://localhost:5050/images/photo_18.jpg\", \"http://localhost:5050/images/photo_18.jpg\"]', 'Description du produit 18', 1800.00),
(48, 'Produit 19', 'Cosmétiques', '[\"http://localhost:5050/images/photo_19.jpg\", \"http://localhost:5050/images/photo_19.jpg\"]', 'Description du produit 19', 1900.00),
(49, 'Produit 20', 'Bijoux', '[\"http://localhost:5050/images/photo_20.jpg\", \"http://localhost:5050/images/photo_20.jpg\"]', 'Description du produit 20', 2000.00),
(50, 'Produit 21', 'Accessoires', '[\"http://localhost:5050/images/photo_21.jpg\", \"http://localhost:5050/images/photo_21.jpg\"]', 'Description du produit 21', 2100.00),
(51, 'Produit 22', 'Cosmétiques', '[\"http://localhost:5050/images/photo_22.jpg\", \"http://localhost:5050/images/photo_22.jpg\"]', 'Description du produit 22', 2200.00),
(52, 'Produit 23', 'Bijoux', '[\"http://localhost:5050/images/photo_23.jpg\", \"http://localhost:5050/images/photo_23.jpg\"]', 'Description du produit 23', 2300.00),
(53, 'Produit 24', 'Accessoires', '[\"http://localhost:5050/images/photo_24.jpg\", \"http://localhost:5050/images/photo_24.jpg\"]', 'Description du produit 24', 2400.00),
(54, 'Produit 25', 'Cosmétiques', '[\"http://localhost:5050/images/photo_25.jpg\", \"http://localhost:5050/images/photo_25.jpg\"]', 'Description du produit 25', 2500.00),
(55, 'Produit 26', 'Bijoux', '[\"http://localhost:5050/images/photo_26.jpg\", \"http://localhost:5050/images/photo_26.jpg\"]', 'Description du produit 26', 2600.00),
(56, 'Produit 27', 'Accessoires', '[\"http://localhost:5050/images/photo_27.jpg\", \"http://localhost:5050/images/photo_27.jpg\"]', 'Description du produit 27', 2700.00),
(57, 'Produit 28', 'Cosmétiques', '[\"http://localhost:5050/images/photo_28.jpg\", \"http://localhost:5050/images/photo_28.jpg\"]', 'Description du produit 28', 2800.00),
(58, 'Produit 29', 'Bijoux', '[\"http://localhost:5050/images/photo_29.jpg\", \"http://localhost:5050/images/photo_29.jpg\"]', 'Description du produit 29', 2900.00),
(59, 'Produit 30', 'Accessoires', '[\"http://localhost:5050/images/1740468757458.jpg\"]', 'Description du produit 30', 3000.00),
(60, 'Produit 31', 'Cosmétiques', '[\"http://localhost:5050/images/photo_31.jpg\", \"http://localhost:5050/images/photo_31.jpg\"]', 'Description du produit 31', 3100.00),
(61, 'Produit 32', 'Bijoux', '[\"http://localhost:5050/images/photo_32.jpg\", \"http://localhost:5050/images/photo_32.jpg\"]', 'Description du produit 32', 3200.00),
(62, 'Produit 33', 'Accessoires', '[\"http://localhost:5050/images/photo_33.jpg\", \"http://localhost:5050/images/photo_33.jpg\"]', 'Description du produit 33', 3300.00),
(63, 'Produit 34', 'Cosmétiques', '[\"http://localhost:5050/images/photo_34.jpg\", \"http://localhost:5050/images/photo_34.jpg\"]', 'Description du produit 34', 3400.00),
(64, 'Produit 35', 'Bijoux', '[\"http://localhost:5050/images/photo_35.jpg\", \"http://localhost:5050/images/photo_35.jpg\"]', 'Description du produit 35', 3500.00),
(65, 'Produit 36', 'Accessoires', '[\"http://localhost:5050/images/photo_36.jpg\", \"http://localhost:5050/images/photo_36.jpg\"]', 'Description du produit 36', 3600.00),
(66, 'Produit 37', 'Cosmétiques', '[\"http://localhost:5050/images/photo_37.jpg\", \"http://localhost:5050/images/photo_37.jpg\"]', 'Description du produit 37', 3700.00),
(67, 'Produit 38', 'Bijoux', '[\"http://localhost:5050/images/photo_38.jpg\", \"http://localhost:5050/images/photo_38.jpg\"]', 'Description du produit 38', 3800.00),
(68, 'Produit 39', 'Accessoires', '[\"http://localhost:5050/images/photo_39.jpg\", \"http://localhost:5050/images/photo_39.jpg\"]', 'Description du produit 39', 3900.00),
(69, 'Produit 40', 'Cosmétiques', '[\"http://localhost:5050/images/photo_40.jpg\", \"http://localhost:5050/images/photo_40.jpg\"]', 'Description du produit 40', 4000.00),
(70, 'Produit 41', 'Bijoux', '[\"http://localhost:5050/images/photo_41.jpg\", \"http://localhost:5050/images/photo_41.jpg\"]', 'Description du produit 41', 4100.00),
(71, 'Produit 42', 'Accessoires', '[\"http://localhost:5050/images/photo_42.jpg\", \"http://localhost:5050/images/photo_42.jpg\"]', 'Description du produit 42', 4200.00),
(72, 'Produit 43', 'Cosmétiques', '[\"http://localhost:5050/images/photo_43.jpg\", \"http://localhost:5050/images/photo_43.jpg\"]', 'Description du produit 43', 4300.00),
(74, 'Produit 45', 'Accessoires', '[\"http://localhost:5050/images/photo_45.jpg\", \"http://localhost:5050/images/photo_45.jpg\"]', 'Description du produit 45', 4500.00),
(75, 'Produit 46', 'Cosmétiques', '[\"http://localhost:5050/images/photo_46.jpg\", \"http://localhost:5050/images/photo_46.jpg\"]', 'Description du produit 46', 4600.00),
(76, 'Produit 47', 'Bijoux', '[\"http://localhost:5050/images/photo_47.jpg\", \"http://localhost:5050/images/photo_47.jpg\"]', 'Description du produit 47', 4700.00),
(77, 'Produit 48', 'Accessoires', '[\"http://localhost:5050/images/photo_48.jpg\", \"http://localhost:5050/images/photo_48.jpg\"]', 'Description du produit 48', 4800.00),
(104, 'Produit 44', 'Accessoires', '[\"http://localhost:5050/images/1740340141826.jpg\"]', 'Produit 44', 90.00),
(105, 'Produit 1 ', 'Bijoux', '[\"http://localhost:5050/images/1741183316638.jpg\"]', 'Description 1', 100.00),
(106, 'Produit 11', 'Cosmétiques', '[\"http://localhost:5050/images/1741183484875.jpg\"]', 'Discription du produit 11', 1100.00),
(107, 'Produit 2', 'Bijoux', '[\"http://localhost:5050/images/1741258537966.jpg\"]', 'description du produit 2', 200.00);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admin_membre`
--
ALTER TABLE `admin_membre`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `info_admin`
--
ALTER TABLE `info_admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `produits`
--
ALTER TABLE `produits`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admin_membre`
--
ALTER TABLE `admin_membre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT pour la table `commandes`
--
ALTER TABLE `commandes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT pour la table `info_admin`
--
ALTER TABLE `info_admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `produits`
--
ALTER TABLE `produits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
