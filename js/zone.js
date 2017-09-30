class Seat {
  constructor(position){
    this.position = position
    this.user = null
  }
  available(){
    return this.user === null
  }
  assignUser(user){
    this.onUserAssign()
    this.user = user
    this.user.goTo(this.position)
  }
  removeUser(){
    this.onUserRemove()
    this.user = null
  }
  onUserAssign(){}
  onUserRemove(){}
}

class ActivitySeat extends Seat{
  constructor(position, duration, bonus_function){
    super(position)
    this.duration = duration
    this.bonus_function = bonus_function
    this.user_timer = 0
  }
  onUserAssign(user){
    this.user_timer = this.duration
  }
  onUserRemove(){
    //bonus_function(this.user)
    this.user.locked = false
  }
  update(){
    if(this.user === null)
      return

    this.user_timer -= 1
    if(this.user_timer == 0){
      this.removeUser()
    }
  }
}

class Zone {
  constructor(seats, queue_seats) {
    this.seats = seats
    this.queue_seats = queue_seats
  }
  isFull(){
    for (var i = 0; i < this.seats.length; i++) {
      if(this.seats[i].available()) return false
    }
    return true
  }
  addUser(user) {
    for(var i = 0; i < this.seats.length; i++){
      var seat = this.seats[i]
      if(seat.available()){
        user.locked = true
        seat.assignUser(user)
        return true
      }
    }

    for(var i = 0; i < this.queue_seats.length; i++){
      var seat = this.queue_seats[i]
      if(seat.available()){
        user.locked = true
        seat.assignUser(user)
        return true
      }
    }

    return false
  }
  update() {
    var i;

    // ActivitySeats
    for (i = 0; i < this.seats.length; i++)
      this.seats[i].update()

    if(this.queue_seats.length == 0) return

    // Handle new availabilities
    for(i = 0; i < this.seats.length; i++){
      var seat = this.seats[i]
      if(seat.available() && !this.queue_seats[0].available()){
        var user = this.queue_seats[0].user
        this.queue_seats[0].removeUser()
        seat.assignUser(user)
      }
    }

    // Recreate queue
    for(i = 0; i < this.queue_seats.length-1; i++){
      var seat = this.queue_seats[i]
      var previous_seat = this.queue_seats[i+1]
      if(seat.available() && !previous_seat.available()){
        var user = previous_seat.user
        previous_seat.removeUser()
        seat.assignUser()
      }
    }
  }
  getNewSeat(){
    if(this.queue_seats.length == 0){
      var temp_seats = [].concat(this.seats)
      shuffle(temp_seats)

      for (var i = 0; i < temp_seats.length; i++) {
        var seat = temp_seats[i]
        if(seat.available()) return seat
      }
      return null
    }

    for (var i = 0; i < this.queue_seats.length; i++) {
      var seat = this.queue_seats[i]
      if(seat.available()) return seat
    }
    return null
  }

}
