
-- Faculdade Senac - Projeto Interdiciplinar III
-- Clinica Psiquiatrica
-- Leandro Raineri
-- Marco Antônio
-- Rafael Eraldo
-- Valdisson Nunes

-- Schema
DROP DATABASE IF EXISTS Psicologia;
CREATE DATABASE Psicologia DEFAULT CHARACTER SET utf8;
USE Psicologia;

-- Tabela Estado Civil
CREATE TABLE `tab_estado_civil` (
	`pk_estado_civil` INT NOT NULL AUTO_INCREMENT,
	`descricao_estado_civil` VARCHAR(45) NOT NULL,
	PRIMARY KEY (`pk_estado_civil`)
)
ENGINE = InnoDB;

-- Tabela Psicologo
CREATE TABLE `tab_psicologo` (
	`pk_psicologo` INT NOT NULL AUTO_INCREMENT,
	`nome_psicologo` VARCHAR(60) NOT NULL,
	`crp_psicologo` BIGINT(15) NOT NULL,
	`cep_psicologo` INT NULL,
	`cep_complemento_psicologo` VARCHAR(45) NULL,
	`fk_estado_civil_psicologo` INT NULL,
	PRIMARY KEY (`pk_psicologo`),
	CONSTRAINT `estado_civil_psicologo` FOREIGN KEY (`fk_estado_civil_psicologo`) REFERENCES `tab_estado_civil` (`pk_estado_civil`) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE = InnoDB;

-- Tabela Paciente
CREATE TABLE `tab_paciente` (
	`pk_paciente` INT NOT NULL AUTO_INCREMENT,
	`nome_paciente` VARCHAR(60) NOT NULL,
	`nome_mae_paciente` VARCHAR(60) NULL,
	`nome_pai_paciente` VARCHAR(60) NULL,
	`cpf_paciente` BIGINT(11) ZEROFILL NOT NULL,
	`data_nascimento` DATE NOT NULL,
	`telefone_paciente` INT(11) NULL,
	`cep_paciente` INT NULL,
	`cep_complemento_paciente` VARCHAR(45) NULL,
	`cod_evolucao_clinica` INT NOT NULL,
	`fk_psicologo_paciente` INT NOT NULL,
	`fk_estado_civil_paciente` INT NOT NULL,
	PRIMARY KEY (`pk_paciente`),
	CONSTRAINT `psicologo_paciente` FOREIGN KEY (`fk_psicologo_paciente`) REFERENCES `tab_psicologo` (`pk_psicologo`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `estado_civil_paciente` FOREIGN KEY (`fk_estado_civil_paciente`) REFERENCES `tab_estado_civil` (`pk_estado_civil`) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE = InnoDB;

-- Tabela Anamnese
CREATE TABLE `tab_anamnese` (
	`pk_anamnese` INT NOT NULL AUTO_INCREMENT,
	`queixa_principal` VARCHAR(1000) NOT NULL,
	`caracteristicas_infancia` VARCHAR(1000) NULL,
	`caracteristicas_adolescencia` VARCHAR(1000) NULL,
	`caracteristicas_adulta` VARCHAR(1000) NULL,
	`relacoes_sociais` VARCHAR(1000) NULL,
	`fk_psicologo_anamnese` INT NOT NULL,
	`fk_paciente_anamnese` INT NOT NULL,
	PRIMARY KEY (`pk_anamnese`),
	CONSTRAINT `psicologo_anamnese` FOREIGN KEY (`fk_psicologo_anamnese`) REFERENCES `tab_psicologo` (`pk_psicologo`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `paciente_anamnese` FOREIGN KEY (`fk_paciente_anamnese`) REFERENCES `tab_paciente` (`pk_paciente`) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE = InnoDB;

-- Tabela Consulta
CREATE TABLE `tab_consulta` (
	`pk_consulta` INT NOT NULL AUTO_INCREMENT,
	`data_hora_consulta` DATETIME NOT NULL,
	`fk_anamnese_consulta` INT NOT NULL,
	`fk_psicologo_consulta` INT NOT NULL,
	`fk_paciente_consulta` INT NOT NULL,
	PRIMARY KEY (`pk_consulta`),
	CONSTRAINT `anamnese_consulta` FOREIGN KEY (`fk_anamnese_consulta`) REFERENCES `tab_anamnese` (`pk_anamnese`) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT `psicologo_consulta` FOREIGN KEY (`fk_psicologo_consulta`) REFERENCES `tab_psicologo` (`pk_psicologo`) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT `paciente_consulta` FOREIGN KEY (`fk_paciente_consulta`) REFERENCES `tab_paciente` (`pk_paciente`) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE = InnoDB;

-- Tabela Evolucao Clinica
CREATE TABLE `tab_evolucao_clinica` (
	`pk_evolucao_clinica` INT NOT NULL AUTO_INCREMENT,
	`descricao_clinica` VARCHAR(10000) NULL,
	`fk_psicologo_clinica` INT NOT NULL,
	`fk_paciente_clinica` INT NOT NULL,
	`fk_anamnese_clinica` INT NOT NULL,
	`fk_consulta_clinica` INT NOT NULL,
	PRIMARY KEY (`pk_evolucao_clinica`),
	CONSTRAINT `psicologo_clinica` FOREIGN KEY (`fk_psicologo_clinica`) REFERENCES `tab_psicologo` (`pk_psicologo`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `paciente_clinica` FOREIGN KEY (`fk_paciente_clinica`) REFERENCES `tab_paciente` (`pk_paciente`) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT `anamnese_clinica` FOREIGN KEY (`fk_anamnese_clinica`) REFERENCES `tab_anamnese` (`pk_anamnese`) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT `consulta_clinica` FOREIGN KEY (`fk_consulta_clinica`) REFERENCES `tab_consulta` (`pk_consulta`) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE = InnoDB;

-- Index
CREATE UNIQUE INDEX crp_psicologo ON tab_psicologo (crp_psicologo);
CREATE UNIQUE INDEX cpf_paciente ON tab_paciente (cpf_paciente);
CREATE INDEX nome_psicologo ON tab_psicologo (nome_psicologo);
CREATE INDEX nome_paciente ON tab_paciente (nome_paciente);
CREATE INDEX data_hora_consulta on tab_consulta (data_hora_consulta);

-- Dados para teste
INSERT INTO tab_estado_civil (descricao_estado_civil) VALUES ('Solteiro');
INSERT INTO tab_estado_civil (descricao_estado_civil) VALUES ('Casado');
INSERT INTO tab_psicologo (nome_psicologo, crp_psicologo, cep_psicologo, cep_complemento_psicologo, fk_estado_civil_psicologo) VALUES ('Dino da Silva', '8514', '71203154', 'Asa Norte', '1');
INSERT INTO tab_psicologo (nome_psicologo, crp_psicologo, cep_psicologo, cep_complemento_psicologo, fk_estado_civil_psicologo) VALUES ('Leandro Lima', '1207', '74512009', 'Asa Sul', '2');
INSERT INTO tab_psicologo (nome_psicologo, crp_psicologo, cep_psicologo, cep_complemento_psicologo, fk_estado_civil_psicologo) VALUES ('Joana Alcantra', '9847', '74512009', 'Taguatinga', '1');