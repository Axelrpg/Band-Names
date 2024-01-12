const BandList = require('./band-list');

class Sockets {

    constructor(io) {

        this.io = io;

        this.bandList = new BandList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {

            console.log('Cliente conectado');

            // Emitir al cliente conectado todas las bandas actuales
            socket.emit('current-bands', this.bandList.getBands());

            socket.on('vote-band', (id) => {
                this.bandList.increaseVotes(id);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            socket.on('delete-band', (id) => {
                this.bandList.removeBand(id);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            socket.on('change-band-name', ({ id, name }) => {
                console.log(id, name);
                this.bandList.changeName(id, name);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            socket.on('add-band', ({ name }) => {
                this.bandList.addBand(name);
                this.io.emit('current-bands', this.bandList.getBands());
            });
        });
    }

}


module.exports = Sockets;