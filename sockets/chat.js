export default (io) => {
    let playerCount = {}; // 방의 참여인원
    let nicknames = {}; // 사용자 닉네임
    
    // 클라이언트가 소켓에 처음 연결
    io.on("connection", (socket) => {
        console.log("새로운 플레이어가 서버에 접속했습니다!");

        socket.on("createUser", (nickname, roomId) => {
            // 닉네임 중복 처리
            if(nicknames[nickname]){
                socket.emit("error", `${nickname}은 이미 존재하는 닉네임입니다!`);
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
        
            io.sockets.to(socket.room).emit("updateChatNum", playerCount[socket.room]);
            socket.emit("updateChat", "INFO", "방에 접속하였습니다!");
            socket.broadcast
                .to(socket.room)
                .emit("updateChat", "INFO", `${socket.nickname}님이 ${socket.room}방에 접속하였습니다!`);
        });

        // 메세지 보내기
        socket.on("sendMessage", (msg) => {
            io.sockets.to(socket.room).emit("updateChat", socket.nickname, msg);
        });

        // 클라이언트 연결 종료
        socket.on("disconnect", () => {
            console.log(`사용자 ${socket.nickname}님이 서버에 나가셨습니다.`);

            // 플레이어가 처음 소켓 연결만 하고 특정 방에 들어가지 않았을 경우 예외처리
            if(socket.room){ 
                playerCount[socket.room]--;
                io.sockets.to(socket.room).emit("updateChatNum", playerCount[socket.room]);
                socket.broadcast
                    .to(socket.room)
                    .emit("updateChat", "INFO", `${socket.nickname}님의 연결이 종료되었습니다.`);
            }
            delete nicknames[socket.nickname];    
        });
    });
}