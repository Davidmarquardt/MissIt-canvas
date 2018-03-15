import { config } from './../config.js';

class LeaderBoards {
  constructor(){
    this.config = config;

    firebase.initializeApp(this.config);
  }
}

export default LeaderBoards

