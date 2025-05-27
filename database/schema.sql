CREATE DATABASE IF NOT EXISTS spendwise_db;
USE spendwise_db;

-- Usuários
CREATE TABLE Users (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	senha VARCHAR(500) NOT NULL,
	img_perfil BLOB
);

-- Conta (uma por usuário)
CREATE TABLE Conta (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(255) NOT NULL,
	saldo DOUBLE NOT NULL DEFAULT 0,
	id_user INT UNSIGNED UNIQUE NOT NULL,
	FOREIGN KEY (id_user) REFERENCES Users(id)
);

-- Categorias (cada usuário tem as suas)
CREATE TABLE Categorias (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	nome_categoria VARCHAR(255) NOT NULL,
	icone_categoria VARCHAR(500),
	id_user INT UNSIGNED NOT NULL,
	FOREIGN KEY (id_user) REFERENCES Users(id)
);

-- Cartões de crédito
CREATE TABLE Cartao_credito (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	nome_cartao VARCHAR(255) NOT NULL,
	icone_cartao VARCHAR(500),
	limite_cartao DOUBLE NOT NULL,
	limite_disponivel DOUBLE NOT NULL,
	limite_usado DOUBLE NOT NULL,
	id_user INT UNSIGNED NOT NULL,
	FOREIGN KEY (id_user) REFERENCES Users(id)
);

-- Receitas
CREATE TABLE Receitas (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	nome_receita VARCHAR(255) NOT NULL,
	desc_receita TEXT,
	valor_receita DOUBLE NOT NULL,
	data_receita DATE NOT NULL,
	metodo_pagamento ENUM('debito', 'credito') NOT NULL,
	id_conta INT UNSIGNED,
	id_cartao INT UNSIGNED,
	id_categoria INT UNSIGNED,
	id_user INT UNSIGNED NOT NULL,
	FOREIGN KEY (id_user) REFERENCES Users(id),
	FOREIGN KEY (id_conta) REFERENCES Conta(id),
	FOREIGN KEY (id_cartao) REFERENCES Cartao_credito(id),
	FOREIGN KEY (id_categoria) REFERENCES Categorias(id)
);

-- Despesas
CREATE TABLE Despesas (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	nome_despesa VARCHAR(255) NOT NULL,
	desc_despesa TEXT,
	valor_despesa DOUBLE NOT NULL,
	data_despesa DATE NOT NULL,
	metodo_pagamento ENUM('debito', 'credito') NOT NULL,
	tipo_pagamento ENUM('avista', 'recorrente', 'parcelado') DEFAULT NULL,
	id_conta INT UNSIGNED,
	id_cartao INT UNSIGNED,
	id_categoria INT UNSIGNED,
	id_user INT UNSIGNED NOT NULL,
	FOREIGN KEY (id_user) REFERENCES Users(id),
	FOREIGN KEY (id_conta) REFERENCES Conta(id),
	FOREIGN KEY (id_cartao) REFERENCES Cartao_credito(id),
	FOREIGN KEY (id_categoria) REFERENCES Categorias(id)
);