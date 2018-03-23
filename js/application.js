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

/**
 * Setup the viewport for scrolling
 *
 * In order to get the child/grandchild elements to scroll properly, we are
 * having to calculate the size of the parent element.  This method will be
 * more reliable than counting on CSS alone.
 */
function setStage () {

    // Get all of the bounding boxes for the elements, then run some
    let graphs = document.getElementById( 'graphs_wrapper' )
            .getBoundingClientRect(),
        header = document.getElementById( 'layout_header' )
            .getBoundingClientRect(),
        stage = document.getElementById( 'layout_container' )
            .getBoundingClientRect(),
        bottomStage = document.getElementById( 'bottom_wrapper' ),

        // Calculate the height of the bottom element, include the 20 pixels
        // that are not accounted for...
        height = stage.height - graphs.height - header.height - 20;

    // Set the height manually.
    bottomStage.style.height = `${ height }px`;

    window.onresize = () => {


        // setStage();

        // TODO: Should destroy instances of the graphs and reinstantiate them

    };

}

