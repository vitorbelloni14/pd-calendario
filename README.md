# PD-CALENDARIO

## Project setup

Para rodar o projeto localmente, é preciso instalar o node, caso já possua, verificar a versão e se preciso, alterar com nvm para node 20. 

Após bastar rodar:
```
npm install
```
e em seguida para subir o servidor local, rodar:
```
npm run serve
```

## Testing

O projesto já está com configurado para rodar testes unitários com Jest, e para rodar os testes que já existem, bastar rodar:
```
npm run test:unit
```
E para rodar somente um teste específico é só adicionar o caminho relativo do arquivo de teste ao scrip acima.

Para verificar a cobertura dos testes, basta rodar:
```
npm run test:coverage
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Script referente ao Banco de Dados

```sql
-- Script de criação de banco de dados para a funcionalidade de calendário

-- Tabela de calendários
CREATE TABLE Calendars (
    CalendarID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    IE  VARCHAR(100),
    DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Public BOOLEAN DEFAULT false,
    UserID INT,
    Active BOOLEAN DEFAULT True
);

-- Tabela de eventos
CREATE TABLE Events (
    EventID INT PRIMARY KEY AUTO_INCREMENT,
    CalendarID INT,
    Title VARCHAR(200) NOT NULL,
    EventDate DATE NOT NULL,
    NotifyDaysBefore INT,
    Active BOOLEAN DEFAULT True
);

-- Tabela para indicados que serão notificados sobres os eventos
CREATE TABLE ReferralNotifications (
    ReferralNotificationID INT PRIMARY KEY AUTO_INCREMENT,
    EventID INT NOT NULL,
    NotificationDate DATE NOT NULL,
    ReferredUserName  VARCHAR(100) NOT NULL,
    ReferredUserEmail VARCHAR(100) NULL, -- E-mail do indicado
    ReferredUserWhatsApp VARCHAR(100) NULL, -- Whatszap do indicado
    StatusEmail ENUM('pending', 'sent', 'failed') DEFAULT 'pending', -- Status da notificação
    StatusWhatsApp ENUM('pending', 'sent', 'failed') DEFAULT 'pending', -- Status da notificação
    SendDateEmail  DATE,
    SendDateWhatsApp  DATE
  );

-- Tabela para controlar recompensas de uma campanha de indicações
CREATE TABLE CalendarRewards (
    RewardID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL, -- Usuario que fez a indicação
    ReferralNotificationID INT NOT NULL, -- indicação
    ReferredUserID INT, -- Usuário indicado (null se não for cadastrado, preenchido após o cadastro)
    RewardDescription VARCHAR(255) NOT NULL, -- Cupom de Desconto
    RewardStatus ENUM('pending', 'claimed', 'expired') DEFAULT 'pending', -- Status da recompensa
    ClaimedDate DATETIME DEFAULT NULL, -- Data em que a recompensa foi resgatada
    RewardDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data de criação do registro
);
```
