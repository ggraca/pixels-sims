function showDataForUser(user = null){
  selected_user = user
  if(user === null){
    document.getElementById("player_info").style.visibility = "hidden"
    return
  }

  document.getElementById("player_info").style.visibility = "visible"

  document.getElementById("niceness_value").innerHTML = user.niceness
  document.getElementById("coding_value").innerHTML = user.coding
  document.getElementById("design_value").innerHTML = user.design
  document.getElementById("charm_value").innerHTML = user.charm

  document.getElementById("hunger_value").innerHTML = Math.round(user.hunger)
  document.getElementById("needs_value").innerHTML = Math.round(user.needs)
  document.getElementById("fun_value").innerHTML = Math.round(user.fun)
  //document.getElementById("focus_value").innerHTML = user.focus
}
