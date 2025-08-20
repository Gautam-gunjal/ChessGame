const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js")

const path = require("path");
const app = express();
app.set("view engine", "ejs");//can use ejs file which is similar to html
app.use(express.static(path.join(__dirname, "public")));//can use static files which is stored in public file


const server = http.createServer(app);//Intializing http server with express
const io = socket(server);

const chess = new Chess();//All rules related to chess is in const chess 
let players = {};
let currentPlayer = "w"


app.get("/", (req, res) => {
    res.render("index")
})

io.on("connection", function (uniquesocket) {
    console.log("connected");

    if (!players.white) {                    //Role Selection (White or Black)
        players.white = uniquesocket.id;
        uniquesocket.emit("playerRole", "w");
    } else if (!players.black) {
        players.black = uniquesocket.id;
        uniquesocket.emit("playerRole", "b")
    } else {
        uniquesocket.emit("spectatorRole")
    }


    uniquesocket.on("disconnect", function () {     // if any player disconnects 
        if (uniquesocket.id === players.white) {
            delete players.white;
        } else if (uniquesocket.id === players.black) {
            delete players.black;
        }

    })


    uniquesocket.on("move", (move) => {
        try {
            if (chess.turn() === "w" && uniquesocket.id !== players.white) return; //Making sure that,
            if (chess.turn() === "b" && uniquesocket.id !== players.black) return; // its a valid move

            const result=chess.move(move);//After the move is executed, its outcome is saved in the result constant.


            if(result)
            {
                currentPlayer=chess.turn();
                io.emit("move",move)
                io.emit("boardState",chess.fen())
            }else{
                console.log("Invalid move:",move)
                uniquesocket.emit("invalidMove",move)
            }

        } catch (err) {
            console.log(err)
            uniquesocket.emit("Invalid move: ",move)
        }
    })


})

server.listen(3000,()=>{
    console.log("server running on port 3000");
})