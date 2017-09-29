class Queue {
  constructor(seats) {
    this.users = [];
    this.seats = seats;
  }
  addUser(user) {
    if (this.users.length === this.seats.length) {
      return false;
    }
    this.users.push(user);
    var index = this.users.length-1;
    user.x=this.seats[index].x;
    user.y=this.seats[index].y;
  }
  removeUser() {
    this.users.reverse().pop();
    this.users.reverse();
    for (var i = 0; i < this.users.length; i++) {
      this.users[i].x=this.seats[i].x;
      this.users[i].y=this.seats[i].y;
    }
  }
}
