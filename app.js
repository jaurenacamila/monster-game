new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = true;
            this.saludJugador = 100;
            this.saludMonstruo = 100;
            this.turnos = [];
        },
        atacar: function () {
            var heridas = this.calcularHeridas(this.rangoAtaque);
            this.saludMonstruo -= heridas;
            this.turnos.unshift({
                esJugador: true,
                text: 'El jugador golpea por: ' + heridas
            });
            if (this.verificarGanador()){
                return;
            }
            this.ataqueDelMonstruo();
        },

        ataqueEspecial: function () {
            var heridas = this.calcularHeridas(this.rangoAtaqueEspecial);
            this.saludMonstruo -= heridas;
            this.turnos.unshift({
                esJugador: true,
                text: 'El jugador golpea por: ' + heridas
            });
            if (this.verificarGanador()){
                return;
            }
            this.ataqueDelMonstruo();
        },

        curar: function () {
            if(this.saludJugador <= 90){
                this.saludJugador += 10;
            }else {
                this.saludJugador = 100;
            }
            this.turnos.unshift({
                esJugador: true,
                text: 'El jugador está sanando +10 '
            });
            this.ataqueDelMonstruo();
        },

        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false;
            this.turnos = [];
        },

        ataqueDelMonstruo: function () {
            var heridas = this.calcularHeridas(this.rangoAtaqueDelMonstruo);
            this.saludJugador -= heridas;
            this.turnos.unshift({
                esJugador: false,
                text: 'El monstruo golpea por: ' + heridas
            });
            this.verificarGanador();
        },

        calcularHeridas: function (rango) {
            let min = rango[0];
            let max = rango[1];
            return Math.max(Math.floor(Math.random()* max) + 1, min);
        },

        verificarGanador: function () {
            if (this.saludMonstruo <= 0){
                if (confirm("Ganaste esta partida. Querés jugar de nuevo?")){
                    this.empezarPartida();
                }else {
                    this.empezarPartida = false;
                }
                return true;
            }else if(this.saludJugador<=0){
                if(confirm("Perdiste! Querés jugar de nuevo?")){
                    this.empezarPartida();
                }else{
                    this.empezarPartida = false;
                }
                return true;
            }
            return false;
        },

        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});