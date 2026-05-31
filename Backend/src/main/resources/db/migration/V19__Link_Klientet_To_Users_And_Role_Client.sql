-- Rename ROLE_USER to ROLE_CLIENT per RBAC spec
UPDATE roles SET name = 'ROLE_CLIENT' WHERE name = 'ROLE_USER';

-- Link business customer records to identity users
IF NOT EXISTS (
    SELECT 1 FROM sys.columns
    WHERE object_id = OBJECT_ID('Klientet') AND name = 'user_id'
)
BEGIN
    ALTER TABLE Klientet ADD user_id BIGINT NULL;
    ALTER TABLE Klientet ADD CONSTRAINT FK_Klientet_Users
        FOREIGN KEY (user_id) REFERENCES users(id);
END
