const root = document.getElementById("root");
const root2 = document.getElementById("root2");

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      angulos: [0, 90, 180, 270],
      atualAng: 0,
      // 0 - red, 1 - blue, 2 - yellow, 3 - green, 4 - purple
      colors: [
        "invert(24%) sepia(100%) saturate(4957%) hue-rotate(351deg) brightness(99%) contrast(103%)",
        "invert(18%) sepia(99%) saturate(5179%) hue-rotate(228deg) brightness(101%) contrast(102%)",
        "invert(80%) sepia(22%) saturate(7147%) hue-rotate(2deg) brightness(106%) contrast(98%)",
        "invert(47%) sepia(33%) saturate(5479%) hue-rotate(84deg) brightness(102%) contrast(102%)",
        "invert(13%) sepia(60%) saturate(7020%) hue-rotate(280deg) brightness(78%) contrast(115%)",
      ],
      atualColor: 0,
      minutes: this.getTime(),
      seconds: 0,
      timeIsRunning: true,
    };
  }

  randomizerAng() {
    let rand;

    do {
      rand = Math.floor(Math.random() * 4);
    } while (rand == this.state.atualAng);

    this.state.atualAng = rand;

    return rand;
  }

  randomizerColor() {
    let rand;

    do {
      rand = Math.floor(Math.random() * 5);
    } while (rand == this.state.atualColor);

    this.state.atualColor = rand;

    return rand;
  }

  getTime() {
    var minute = window.location.search.split("=")[1];
    return minute;
  }

  show = () => {
    let show;

    if (this.state.timeIsRunning) {
      show = "block";
    } else {
      show = "none";
    }

    let estilo = {
      transform: "rotate(" + this.state.angulos[this.randomizerAng()] + "deg)",
      filter: this.state.colors[this.randomizerColor()],
      display: show,
    };

    let inverseShow;

    if (this.state.timeIsRunning) {
      inverseShow = "none";
    } else {
      inverseShow = "block";
    }

    let estilo2 = {
      display: inverseShow,
      fontSize: "80pt",
      fontFamily: "Arial",
    };

    console.log(this.state.minutes);

    const content = (
      <div>
        <div style={estilo}>
          <img src="images/seta.png" style={{ width: "600px" }}></img>
        </div>
        <div style={estilo2}>Treino finalizado!</div>
      </div>
    );

    ReactDOM.render(content, root);
  };

  downTimer() {
    let minutes = this.state.minutes;
    let seconds = this.state.seconds;

    if (seconds == 0) {
      minutes = minutes - 1;
      seconds = 59;
    } else {
      seconds = seconds - 1;
    }

    if (seconds <= 0 && minutes <= 0) {
      this.state.timeIsRunning = false;
      minutes = 0;
      seconds = 0;
    }

    this.state.minutes = minutes;
    this.state.seconds = seconds;
  }

  timer = () => {
    this.downTimer();

    let show;

    if (this.state.timeIsRunning) {
      show = "flex";
    } else {
      show = "none";
    }

    let estilo = {
      marginTop: "1%",
      fontSize: "50pt",
      fontFamily: "Arial, Helvetica, sans-serif",
      display: show,
      alignItems: "center",
      flexDirection: "column",
    };

    const content = (
      <div className="timer" style={estilo}>
        {this.state.minutes}:{this.state.seconds}
      </div>
    );

    ReactDOM.render(content, root2);
  };
}

var seta = new App();
seta.show();
seta.timer();
setInterval(seta.show, 2000);
setInterval(seta.timer, 1000);
