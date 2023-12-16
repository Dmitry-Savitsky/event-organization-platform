-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema businesscalendar
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema businesscalendar
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `businesscalendar` DEFAULT CHARACTER SET utf8 ;
USE `businesscalendar` ;

-- -----------------------------------------------------
-- Table `businesscalendar`.`Client`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `businesscalendar`.`Client` (
  `idClient` INT NOT NULL AUTO_INCREMENT,
  `ClientName` VARCHAR(255) NOT NULL,
  `ClientPhone` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idClient`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `businesscalendar`.`Company`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `businesscalendar`.`Company` (
  `idcompany` INT NOT NULL,
  `CompanyName` VARCHAR(45) NULL,
  `CompanyPhone` VARCHAR(15) NULL,
  `CompanyAddress` VARCHAR(150) NULL,
  PRIMARY KEY (`idcompany`),
  UNIQUE INDEX `idcompany_UNIQUE` (`idcompany` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `businesscalendar`.`Executor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `businesscalendar`.`Executor` (
  `idExecutor` INT NOT NULL AUTO_INCREMENT,
  `ExecutorName` VARCHAR(255) NOT NULL,
  `ExecutorPhone` VARCHAR(45) NOT NULL,
  `idCompany` INT NOT NULL,
  PRIMARY KEY (`idExecutor`),
  INDEX `fk_executor_company1_idx` (`idCompany` ASC) VISIBLE,
  CONSTRAINT `fk_executor_company1`
    FOREIGN KEY (`idCompany`)
    REFERENCES `businesscalendar`.`Company` (`idcompany`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `businesscalendar`.`Service`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `businesscalendar`.`Service` (
  `idservice` INT NOT NULL AUTO_INCREMENT,
  `servicename` VARCHAR(255) NOT NULL,
  `servicetype` INT NOT NULL,
  `ServicePrice` INT NULL,
  `idCompany` INT NOT NULL,
  PRIMARY KEY (`idservice`),
  INDEX `fk_services_company1_idx` (`idCompany` ASC) VISIBLE,
  CONSTRAINT `fk_services_company1`
    FOREIGN KEY (`idCompany`)
    REFERENCES `businesscalendar`.`Company` (`idcompany`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `businesscalendar`.`Order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `businesscalendar`.`Order` (
  `idOrder` INT NOT NULL AUTO_INCREMENT,
  `OrderComment` VARCHAR(255) NULL,
  `idClients` INT NOT NULL,
  `idServices` INT NOT NULL,
  `OrderStart` DATETIME NOT NULL,
  `OrderEnd` DATETIME NULL,
  `OrderAddress` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`idOrder`),
  INDEX `fk_orders_clients1_idx` (`idClients` ASC) VISIBLE,
  INDEX `fk_orders_services1_idx` (`idServices` ASC) VISIBLE,
  CONSTRAINT `fk_orders_clients1`
    FOREIGN KEY (`idClients`)
    REFERENCES `businesscalendar`.`Client` (`idClient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_services1`
    FOREIGN KEY (`idServices`)
    REFERENCES `businesscalendar`.`Service` (`idservice`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `businesscalendar`.`Review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `businesscalendar`.`Review` (
  `idReview` INT NOT NULL AUTO_INCREMENT,
  `ReviewText` VARCHAR(255) NULL,
  `ReviewRating` INT NOT NULL,
  `idClients` INT NOT NULL,
  `idOrders` INT NOT NULL,
  PRIMARY KEY (`idReview`),
  INDEX `fk_reviews_clients1_idx` (`idClients` ASC) VISIBLE,
  INDEX `fk_reviews_orders1_idx` (`idOrders` ASC) VISIBLE,
  CONSTRAINT `fk_reviews_clients1`
    FOREIGN KEY (`idClients`)
    REFERENCES `businesscalendar`.`Client` (`idClient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reviews_orders1`
    FOREIGN KEY (`idOrders`)
    REFERENCES `businesscalendar`.`Order` (`idOrder`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `businesscalendar`.`ClientAddress`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `businesscalendar`.`ClientAddress` (
  `idClientAddress` INT NOT NULL,
  `ClientAddress` VARCHAR(150) NOT NULL,
  `PrimaryClientAddress` TINYINT NULL,
  `idClient` INT NOT NULL,
  UNIQUE INDEX `idclientaddress_UNIQUE` (`idClientAddress` ASC) VISIBLE,
  INDEX `fk_clientaddress_client1_idx` (`idClient` ASC) VISIBLE,
  PRIMARY KEY (`idClientAddress`),
  CONSTRAINT `fk_clientaddress_client1`
    FOREIGN KEY (`idClient`)
    REFERENCES `businesscalendar`.`Client` (`idClient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `businesscalendar`.`OrdersHasExecutor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `businesscalendar`.`OrdersHasExecutor` (
  `idOrders` INT NOT NULL,
  `idExecutor` INT NOT NULL,
  PRIMARY KEY (`idOrders`, `idExecutor`),
  INDEX `fk_orders_has_executor_executor1_idx` (`idExecutor` ASC) VISIBLE,
  INDEX `fk_orders_has_executor_orders1_idx` (`idOrders` ASC) VISIBLE,
  CONSTRAINT `fk_orders_has_executor_orders1`
    FOREIGN KEY (`idOrders`)
    REFERENCES `businesscalendar`.`Order` (`idOrder`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_has_executor_executor1`
    FOREIGN KEY (`idExecutor`)
    REFERENCES `businesscalendar`.`Executor` (`idExecutor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
