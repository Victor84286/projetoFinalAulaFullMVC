-- MySQL initialization script for the aulasFullMvc project
-- Creates the database and the tarefas table expected by the Spring Boot application

-- Create database if it does not exist
CREATE DATABASE IF NOT EXISTS aulaFullMvc
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE aulaFullMvc;

-- Create tarefas table
CREATE TABLE IF NOT EXISTS tarefas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao VARCHAR(1000),
    data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    concluida TINYINT(1) NOT NULL DEFAULT 0
);
