export default (io) => {
    let playerCount = {}; // 방의 참여인원 count 해주는 객체
    let nicknames = {}; // 플레이어 닉네임
    let scores = {}; // 플레이어 점수
    let gameWord = {}; //각 방의 게임단어
    let rounds = {}; // 라운드 count 해주는 객체

    
    // 클라이언트가 소켓에 처음 연결
    io.on("connection", (socket) => {
        console.log("새로운 플레이어가 서버에 접속했습니다!");


        // 플레이어 방입장 및 메세지 전송
        socket.on("createUser", ({nickname, roomId}) => {
            // 닉네임 중복 처리
            if(nicknames[nickname]){
                socket.emit("error", { message: `${nickname}은 이미 존재하는 닉네임입니다!` });
                return;
            }

            socket.nickname = nickname;
            nicknames[nickname] = true;
            socket.room = roomId;
            socket.join(socket.room);

            if(playerCount[socket.room]){ 
                playerCount[socket.room]++;
            } else {
                playerCount[socket.room] = 1;
            }

            console.log(`플레이어 ${socket.nickname} 님이 성공적으로 서버에 생성되었습니다!`);

            socket.emit("updateChat", { type: "INFO", message: "방에 접속하였습니다!" });
            socket.broadcast
                .to(socket.room)
                .emit("updateChat", { type: "INFO", message: `${socket.nickname}님이 ${socket.room}방에 접속하였습니다!` });
            // 플레이어가 방에 입장할때마다 방의 참여인원이 1씩 증가
            io.sockets.to(socket.room).emit("updateChatNum", { playerCount: playerCount[socket.room] });
        });



        // 매라운드가 시작
        socket.on("startRound", ({roomId, drawNickname, selectWord}) => {
            gameWord[roomId] = selectWord;
        
            if(rounds[roomId]){
                rounds[roomId]++;
            } else {
                rounds[roomId] = 1;
            }
            // 그림을 그리는 플레이어만 단어 전달
            io.sockets.to(socket.room).sockets.forEach((socket) => {
                if (socket.nickname === drawNickname) {
                    socket.emit("announceRoundInfo", { round: rounds[roomId], word: gameWord[roomId], drawer: drawNickname });
                } else {
                    socket.emit("announceRoundInfo", { round: rounds[roomId], drawer: drawNickname });
                }
            });
        
            if(rounds[roomId] >= maxPlayersPerRoom[roomId]){
                endGame(roomId);
            }
        });




        // 라운드 종료

        
        // 메세지 보내기
        socket.on("sendMessage", (msg) => {
            io.sockets.to(socket.room).emit("updateChat", { nickname: socket.nickname, message: msg });
        });

        // 클라이언트 연결 종료
        socket.on("disconnect", () => {
            console.log(`사용자 ${socket.nickname}님이 서버에 나가셨습니다.`);

            // 플레이어가 처음 소켓 연결만 하고 특정 방에 들어가지 않았을 경우 예외처리
            if(socket.room){ 
                playerCount[socket.room]--;
                io.sockets.to(socket.room).emit("updateChatNum", { playerCount: playerCount[socket.room] });
                socket.broadcast
                    .to(socket.room)
                    .emit("updateChat", { type: "INFO", message: `${socket.nickname}님의 연결이 종료되었습니다.` });
            }
            delete nicknames[socket.nickname];    
        });
    });
}