CREATE DATABASE cocktails_app;
USE cocktails_app;

CREATE TABLE Cocktail (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL, -- create validation
    description TEXT,
    image_url VARCHAR(255)
);

CREATE TABLE Ingredient (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL, -- create validation
    description TEXT,
    is_alcoholic BOOLEAN NOT NULL,
    percentage INT,
    image_url VARCHAR(255)
);

CREATE TABLE Cocktail_Ingredients (
    cocktail_id INT,
    ingredient_id INT,
    quantity VARCHAR(50),
    PRIMARY KEY (cocktail_id, ingredient_id),
    FOREIGN KEY (cocktail_id) REFERENCES Cocktail(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES Ingredient(id) ON DELETE CASCADE
);

-- Insert into Cocktail table
INSERT INTO Cocktail (name, category, description, image_url)
VALUES 
    ('Margarita', 'Classic', 'A refreshing tequila cocktail', 'margarita.jpg'),
    ('Piña Colada', 'Signature', 'A sweet tropical cocktail', 'pina_colada.jpg'),
    ('Hot Toddy', 'Seasonal', 'A warm winter drink', 'hot_toddy.jpg');

-- Insert into Ingredient table
INSERT INTO Ingredient (name, type, description, is_alcoholic, percentage, image_url)
VALUES 
    ('Tequila', 'Alcohol', 'A distilled spirit from Mexico', 1, 40, 'tequila.jpg'),
    ('Lime Juice', 'Mixer', 'Freshly squeezed lime juice', 0, NULL, 'lime_juice.jpg'),
    ('Honey', 'Garnish', 'Natural sweetener', 0, NULL, 'honey.jpg');

-- Insert into Cocktail_Ingredients table
INSERT INTO Cocktail_Ingredients (cocktail_id, ingredient_id, quantity)
VALUES 
    (1, 1, '50 ml'),   -- Margarita with Tequila
    (1, 2, '20 ml'),   -- Margarita with Lime Juice
    (2, 1, '30 ml'),   -- Piña Colada with Tequila
    (3, 3, '10 ml');   -- Hot Toddy with Honey