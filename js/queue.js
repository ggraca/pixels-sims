class Zone {
  constructor(seats, queue_seats) {
    this.users = [];
    this.seats = seats;
    this.queue_users = [];
    this.queue_seats = queue_seats
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
  getFreePosition(){
    var empty

    empty = this.seats.length - this.users.length
    if(empty > 0)
      return this.seats[this.users.length]

    empty = this.queue_seats.length - this.queue_users.length
    if(empty > 0)
      return this.queue_seats[this.queue_users.length]

    return null
  }

}

class WC extends Zone{
  constructor(){
    super([{x: 55, y: 20}, {x: 55, y: 20}], [])
  }
}
