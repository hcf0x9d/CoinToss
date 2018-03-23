class Coin {

    constructor( coin, button ) {

        this.coin = document.getElementById( coin );
        this.button = document.getElementById( button );
        this.face = this.coin.getElementsByClassName( 'text' )[0];

        this.button.addEventListener( 'click', () => {

            this.coin.classList += ' is-flipping';
            this.face.innerText = '';

            setTimeout( () => {
                this.coin.classList.remove( 'is-flipping' );
            }, 300 );

            this.tossCoin();

        } );
    }

    tossCoin() {

        let bool = isOdd( Math.floor(Math.random() * 100) + 1 );

        setTimeout( () => {

            if ( bool === 0 ) {

                this.face.innerText = 'Comma';

            } else {

                this.face.innerText = 'No';

            }

        }, 500 );


        function isOdd(num) {
            return num % 2;
        }
    }
}

new Coin( 'coin', 'coin_toss');