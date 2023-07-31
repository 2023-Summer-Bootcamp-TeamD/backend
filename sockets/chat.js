const dotenv = require('dotenv');
const mysql = require('mysql2');
const Sequelize = require('sequelize');

const models = require('../models');
const User = models.User;
const Word = models.Word;
const Room = models.Room;

dotenv.config();

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,  // Add this line
      dialect: 'mysql',
      logging: false
    }
);



// 게임 종료시 해당 방의 플레이어들의 최종 점수들을 DB에 삽입
const endGame = async (roomId) => {
    try {
        // 점수를 데이터베이스에 업데이트
        if(scores[roomId] && Object.keys(scores[roomId]).length > 0) {
            Object.keys(scores[roomId]).forEach(async (nickname) => {
                let user = await User.findOne({ where: { nickname, room_id: roomId } });
                if(user) {
                    user.score = scores[roomId][nickname];
                    await user.save();
                    console.log("DB에 플레이어들의 최종 점수들을 저장했습니다!");
                }
            });
        }
        // 게임 종료 알림
        io.to(roomId).emit("endGame", { message: "게임이 종료되었습니다!" });
    } catch(error) {
        console.error(error);
    }
};



export default (io) => {
    let playerCount = {}; // 방의 참여인원 count 해주는 객체
    let nicknames = {}; // 플레이어 닉네임 중복 체크
    let scores = {}; // 방의 플레이어의 점수 { 방: { 플레이어: 점수 } }
    let gameWord = {}; //각 방의 게임단어
    let rounds = {}; // 라운드 count 해주는 객체
    let roundEnded = {}; // 라운드 종료 여부 { 방: 종료여부 }
    let chosenWords = []; // 라운드마다 선택된 단어
    let chosenDrawers = []; // 라운드마다 그림 그리는 사람

    
    // 클라이언트가 소켓에 처음 연결
    io.on("connection", (socket) => {
        console.log("새로운 플레이어가 서버에 접속했습니다!");



        // 방 생성
        socket.on("createRoom", (roomId) => {
            scores[roomId] = scores[roomId] || {};

            console.log(`${roomId} 방이 생성되었습니다!`);
            socket.emit("roomCreated");
        });

        
        
        // 플레이어 방입장 및 메세지 전송
        socket.on("createUser", ({nickname, roomId}) => {
            // 닉네임 중복 처리
            if(nicknames[nickname]){
                socket.emit("error", { message: `${nickname}은 이미 존재하는 닉네임입니다!` });
                return;
            }

            socket.nickname = nickname;
            nicknames[nickname] = true;
            
            scores[roomId] = scores[roomId] || {};
            scores[roomId][nickname] = 0;

            if (!playerCount[roomId]) {
                playerCount[roomId] = 0;
            }
            playerCount[roomId]++;
            


            socket.room = roomId;
            socket.join(socket.room);

            console.log(`플레이어 ${socket.nickname}님이 ${socket.room}에 들어왔습니다.`);

            socket.emit("updateChat", { type: "INFO", message: "방에 접속하였습니다!" });
            socket.broadcast
                .to(socket.room)
                .emit("updateChat", { type: "INFO", message: `${socket.nickname}님이 ${socket.room}방에 접속하였습니다!` });            
            io.to(socket.room).emit("updateChatNum", { playerCount: playerCount[socket.room] });

            Object.keys(scores[roomId]).forEach((existingPlayer) => {
                if (existingPlayer !== nickname) { 
                    socket.emit("updateUserInfo", {nickname: existingPlayer, score: scores[roomId][existingPlayer]});
                }
            });
            io.to(socket.room).emit("updateUserInfo", {nickname: socket.nickname, score: scores[roomId][nickname]});
        });



        // 스타트 버튼을 누르기
        socket.on("pressGameStartButton", ({roomId, pressButton}) => {
            socket.broadcast.to(roomId).emit("pressGameStartButton", {pressButton: pressButton});
        });



        // 게임 매라운드 시작
        socket.on("startRound", async ({roomId, limitedTime}) => {
        
            if(rounds[roomId]){
                rounds[roomId]++;
            } else {
                rounds[roomId] = 1;
            }
            console.log(`${rounds[roomId]} 라운드가 시작되었습니다!`);

            if(rounds[roomId] > playerCount[roomId]){
                endGame(roomId);
                
                return;
            }

            // console.log("Room UUID 잘 들어가 있니?:", roomId);

            let usersInRoom;
            try {
                const room = await Room.findOne({ where: { uuid:  roomId } });
                if(!room) {
                    console.log('해당 UUID를 가진 Room을 찾을 수 없음');
                    return;
                }
                usersInRoom = await User.findAll({ where: { room_id: room.id } });
            } catch (error) {
                console.error('User를 찾을 수 없음:', error);
                return;
            }
            // console.log("해당 방의 플레이어 리스트: ", usersInRoom); // 모든 사용자 정보 출력
    
            while(drawUserIndex === undefined){
                const randomDrawer = Math.floor(Math.random() * usersInRoom.length);
                if(!chosenDrawers.includes(randomDrawer)){
                    chosenDrawers.push(randomDrawer);
                    drawUserIndex = randomDrawer;
                    // console.log("그림 그릴 사람의 인덱스: ", drawUserIndex); // 선택된 사용자 인덱스 출력
                }
            }
    
            let drawNickname;
            let drawUserIndex;
            
            if(usersInRoom[drawUserIndex]) {
                drawNickname = usersInRoom[drawUserIndex].nickname;
            } else {
                console.error(`User의 Index를 찾을 수 없음: ${drawUserIndex}`);
                return;
            }
            console.log("그림 그릴 사람: ", drawNickname); // 선택된 사용자 닉네임 출력
    
            let selectedWord;
            try {
                selectedWord = await Word.findOne({ order: Sequelize.literal('rand()') });
            } catch (error) {
                console.error('Word를 찾을 수 없음:', error);
                return;
            }
            console.log("선택된 단어: ", selectedWord); // 선택된 단어 출력
    
            gameWord[roomId] = selectedWord.word;
            // console.log("해당 방의 게임 단어: ", gameWord[roomId]); 

            roundEnded[roomId] = false;

            io.to(roomId).emit("updateScores", { scores: scores[roomId] });

            if (io.sockets.adapter.rooms.get(roomId)) {
                io.sockets.adapter.rooms.get(roomId).forEach((socketId) => {
                    const socket = io.sockets.sockets.get(socketId);
                    
                    socket.emit("announceRoundInfo", { 
                        round: rounds[roomId], 
                        word: socket.nickname === drawNickname ? gameWord[roomId] : null, 
                        drawer: drawNickname 
                    });
                });
                console.log(`${rounds[roomId]}의 단어는 ${gameWord[roomId]} 이며 그리는 사람은 ${drawNickname} 플레이어입니다!`);
            } else {
                console.error(`RoomId: ${roomId} 가 존재하지 않거나 소켓 연결 종료 되었습니다`);
            }
            });



        // 채팅 메세지 구현
        socket.on("sendMessage", (msg) => {
            // 정답 맞추면 로직처리
            if (msg.trim() !== "" && msg === gameWord[socket.room] && !roundEnded[socket.room]) {
                scores[socket.room][socket.nickname]++;
                io.to(socket.room).emit("announceResult", { gameWord: gameWord[socket.room], correctUser: socket.nickname, roundEnded: true });
            }
            io.to(socket.room).emit("updateChat", { nickname: socket.nickname, message: msg });
        });

    
    
        // 캔버스의 그림 전송
        socket.on("canvasDraw", ({roomId, drawData}) => {
            socket.broadcast.to(roomId).emit("canvasDraw", { drawData: drawData });
        });



        // 캔버스 색상 변경
        socket.on("canvasChangeColor", ({roomId, selectedColor}) => {
            socket.broadcast.to(roomId).emit("canvasChangeColor", { selectedColor: selectedColor });
        });



        // 캔버스 일부 지우기
        socket.on("canvasErase", ({roomId, eraseData}) => {
            socket.broadcast.to(roomId).emit("canvasErase", { eraseData: eraseData });
        });



        // 캔버스 전체 지우기
        socket.on("canvasEraseAll", (roomId) => {
            socket.broadcast.to(roomId).emit("canvasEraseAll");
        });



        // 클라이언트 연결 종료
        socket.on("disconnect", () => {
            console.log(`사용자 ${socket.nickname}님이 서버에 나가셨습니다.`);

            // 플레이어가 처음 소켓 연결만 하고 특정 방에 들어가지 않았을 경우 예외처리
            if(socket.room){ 
                playerCount[socket.room]--;
                delete scores[socket.room][socket.nickname];

                if(playerCount[socket.room] === 0) {
                    delete playerCount[socket.room];
                    delete scores[socket.room];
                    delete gameWord[socket.room];
                    delete rounds[socket.room];
                    delete roundEnded[socket.room];
                } else {
                    io.to(socket.room).emit("updateChatNum", { playerCount: playerCount[socket.room] });
                }
   
                socket.broadcast
                    .to(socket.room)
                    .emit("updateChat", { type: "INFO", message: `${socket.nickname}님의 연결이 종료되었습니다.` });
            }
            delete nicknames[socket.nickname];    
        });
    });  
  };


sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });