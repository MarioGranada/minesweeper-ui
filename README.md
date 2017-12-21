Deviget minesweeper UI
=======================

Web UI layer for Deviget minesweeper. It is built linked to an API built as well on Ruby on Rails which is linked to a MongoDB Local Database. Given API runs on http://localhost:3000/

As usual, this app runs on http://localhost:8080/

## It is recommended to use a CORS extension at the browser in order to set up  access to same origin local API 

Recommended CORS plugin/extension [Moesif Origin & CORS Changer](https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc).

Npm VERSION
```5.5.1```

VueJS
```2.5.2```

### General special notes
1. **Right Click** to mark a cell as a red flag.
2. **Sign in** and **Sign up** are limited to search for (search by email) and create a new user, respectively. Session module is not yet implemented.
3. For each User it is saved name, email and password.
4. At user's profile page it is possible to create a game board by number of rows, columns and mines. The mines will be allocated randomly among the game board.
5. Each click (left or right) on each cell updates both the given cell or group of cells as well as the board state and time spent in game.

### Routes

| Path                       | Redirect to | Title        |
|----------------------------|-------------|--------------|
| /                          | /login      |              |
| /login                     |             | Login        |
| /register                  |             | Register     |
| /my-account/:id            |             | My Profile   | 
| /my-account/games/:game_id |             | Current Game |

## Build Setup

```
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

**Author:** Mario Granada
