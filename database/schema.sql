CREATE DATABASE IF NOT EXISTS spendwise_db;


USE spendwise_db;


CREATE TABLE `Users` (
	`id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
	`nome` VARCHAR(255),
	`email` VARCHAR(255) UNIQUE,
	`senha` VARCHAR(500),
	`img_perfil` BLOB,
	PRIMARY KEY(`id`)
);


CREATE TABLE `Receitas` (
	`id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
	`nome_receita` VARCHAR(255),
	`desc_receita` TEXT(65535),
	`valor_receita` DOUBLE,
	`data_receita` DATE,
	`metodo_pagamento` ENUM('debito', 'credito'),
	`id_conta` INTEGER,
	`id_cartao` INTEGER,
	`id_categoria` INTEGER,
	PRIMARY KEY(`id`)
) COMMENT='Relação com cartão de crédito e conta (saldo)';


CREATE TABLE `Categorias` (
	`id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
	`nome_cataegoria` VARCHAR(255),
	`icone_categoria` BLOB,
	PRIMARY KEY(`id`)
) COMMENT='Criar relação com users';


CREATE TABLE `Despesas` (
	`id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
	`nome_despesa` VARCHAR(255),
	`desc_despesa` TEXT(65535),
	`valor_despesa` DOUBLE,
	`data_despesa` DATE,
	`metodo_pagamento` ENUM('debito', 'credito'),
	`id_conta` INTEGER,
	`id_cartao` INTEGER,
	`id_categoria` INTEGER,
	PRIMARY KEY(`id`)
) COMMENT='Relação com cartão de crédito e conta (saldo)';


CREATE TABLE `Cartao_credito` (
	`id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
	`nome_cartao` VARCHAR(255),
	`icone_cartao` BLOB,
	`limite_cartao` DOUBLE,
	`limite_disponivel` DOUBLE,
	`limite_usado` DOUBLE,
	`id_conta` INTEGER,
	PRIMARY KEY(`id`)
) COMMENT='Pesquisar como criar atributos derivados';


CREATE TABLE `Conta` (
	`id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
	`nome` VARCHAR(255),
	`saldo` DOUBLE,
	`id_user` INTEGER,
	PRIMARY KEY(`id`)
);


ALTER TABLE `Users`
ADD FOREIGN KEY(`id`) REFERENCES `Conta`(`id_user`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `Conta`
ADD FOREIGN KEY(`id`) REFERENCES `Cartao_credito`(`id_conta`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `Conta`
ADD FOREIGN KEY(`id`) REFERENCES `Despesas`(`id_conta`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `Despesas`
ADD FOREIGN KEY(`id_cartao`) REFERENCES `Cartao_credito`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `Receitas`
ADD FOREIGN KEY(`id_conta`) REFERENCES `Conta`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `Receitas`
ADD FOREIGN KEY(`id_cartao`) REFERENCES `Cartao_credito`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `Receitas`
ADD FOREIGN KEY(`id_categoria`) REFERENCES `Categorias`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `Categorias`
ADD FOREIGN KEY(`id`) REFERENCES `Despesas`(`id_categoria`)
ON UPDATE NO ACTION ON DELETE NO ACTION;