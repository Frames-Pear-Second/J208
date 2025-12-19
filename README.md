# Bounty Hub
BountyHub to apliacja webowa inspirowana Dzikim Zachodem. Umożliwia wystawianie listów gończych *Bounties* na wirtualnej tablicy ogłoszeń, oraz zbeiranie nagród jako łowca nagród *Bounty Hunter*.

---

## Funkcjonalnosc
- Tworzenie listów gończych
- Wyswietlanie dodanych listów gończych
- Sortowanie i filtrowanie listów gończych
- Edycja listów gończych
- Tworzenie profili łowców nagród
- Zbieranie nagród jako łowca
- Leaderboard (ranking łowców nagród)

---

## Technologie
- Node.js
- Express.js
- EJS
- JavaScript
- HTML/CSS
- JSON
- MongoDB
- Docker

## Narzędzia 
- VisualStudio Code
- JotBird

---

## Instalacja i uruchomienie
### 1. Klonowanie repozytorium

### 2. Instalacja zaleznosci
```npm install```
### 3. Uruchomienie Docker'a
Szczegółowe instrukcje w pliku **docker.txt**
### 4. Uruchomienie aplikacji
```npm start```

## Endopinty

### Strona glowna

|Metoda|Endpoint|Opis|
|---|---|---|
|GET|```/```|Przekierowuje do ```/bounties ```|

### Bounties (listy goncze) ```/bounties```

|Metoda|Endpoint|Opis|
|---|---|---|
|GET|```/bounties```|Wyświetla wszystkie listy gończe|
|GET|```/bounties/add```|Wyświetla formularz dodawania nowego listu gończego|
|POST|```/bounties/add```|Dodaje list gończy do bazy danych|
|GET|```/bounties/delete/:id```|Usuwa list o podanym ID|
|GET|```/bounties/update/:id```|Wyświetla formularz do edycji listu gończego|
|POST|```/bounties/update```|Aktualizuje edytowany list gończy|

### Hunter (Łowcy nagród) ```/hunter```

|Metoda|Endpoint|Opis|
|---|---|---|
|GET|```/hunter```|Przekierowuje do formularza logowania|
|GET|```/hunter/login```|Wyświetla formularz logowania|
|POST|```/hunter/login```|Logowanie łowcy|
|GET|```/hunter/register```|Wyświetla formularz rejestracyjny|
|POST|```/hunter/register```|Rejestracja nowego łowcy|
|POST|```/claimReward```|Przypisuje nagrodę do profilu łowcy|
|GET|```/hunter/:alias```|Wyświetla profil łowcy o podanym aliasie|

### Leaderboard ```/leaderboard```
|Metoda|Endpoint|Opis|
|---|---|---|
|GET|```/leaderboard```|Wyświetla ranking łowców nagród|

## Autor
**Frames-Pear-Second** *MG4j*

## Licencja
Creative Commons Attribution-NonCommercial 4.0 (CC BY-NC 4.0)
*szczegóły w pliku* **LICENSE**
