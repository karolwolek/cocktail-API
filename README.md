# Cocktail-API

Jest to projekt API do aplikacji zarządzania koktajlami oraz ich składnikami. Przygotowany na potrzeby rekrutacyjne do koła naukowego

# Wykorzystane technologie

Z wyboru do implementacji bazy danych wybrałem relacyjny model mysql.
* javascript
* Node.js v20.18.0
* express.js v4.21.1
* Joi v17.13.3 (walidacja danych)

Jest to moja druga styczność z tworzeniem backendu do aplikacji webowej.
Pierwszy raz miałem okazję współtworzyć coś podobnego przy projekcie na uczelni: https://github.com/Skiperpol/HotelManagement (WolekXD contributor)

# Projekt bazy danych
![image](https://github.com/user-attachments/assets/6cf0eb74-79a8-4f8c-bddc-8c9f7eaea160)
Tabela Cocktail_Ingredients służy jako pośrednik do połączenia tabel Ingredient oraz Cocktail N-N

# Uruchomienie
Inicjalizacja paczek zdefiniowanych w pliku package.json:
```
npm init
```
utworzenie bazy danych:
* Schemat bazy danych jest w pliku schema.sql w głównym folderze projektu
* należy zainicjalizować swoje własne env z danymi do bazy danych oraz credentials
  * ```
    // .env file in main dir
    MYSQL_HOST="xyz" 
    MYSQL_USER="xyz"
    MYSQL_PASSWORD="xyz"
    MYSQL_DATABASE="xyz"
    ```
uruchomienie serwera komendą:
```
npm run dev
```
dokumentacja dostępna będzie pod adresem: http://localhost:8080/api-docs/



