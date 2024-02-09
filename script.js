// script.js
import { setup_ground, update_ground } from './ground.js'
import { setup_dino, update_dino } from './dino.js'

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = .0001

const world_elem = document.querySelector('[data-world]')
const score_elem = document.querySelector('[data-score]')
const start_screen_elem = document.querySelector('[data-start-screen]')

set_pixel_to_world_scale()
window.addEventListener("resize", set_pixel_to_world_scale)
document.addEventListener("keydown", handle_start, { once: true })

setup_ground()

let last_time
let speed_scale
let score
function update(time) {
  if (last_time == null) {
    last_time = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - last_time
  update_ground(delta, speed_scale)
  update_dino(delta, speed_scale)
  update_speed_scale(delta)
  update_score(delta)
  last_time = time
  window.requestAnimationFrame(update)
}

function update_score(delta) {
  score += delta * .01
  score_elem.textContent = Math.floor(score)
}

function update_speed_scale(delta) {
  speed_scale += delta * SPEED_SCALE_INCREASE
}

function handle_start() {
  last_time = null
  speed_scale = 1
  score = 0
  setup_ground()
  setup_dino()
  start_screen_elem.classList.add("hide")
  window.requestAnimationFrame(update)
}

function set_pixel_to_world_scale() {
  let world_to_pixel_scale
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    world_to_pixel_scale = window.innerWidth / WORLD_WIDTH
  }
  else {
    world_to_pixel_scale = window.innerHeight / WORLD_HEIGHT
  }
  world_elem.style.width = `${WORLD_WIDTH * world_to_pixel_scale}px`
  world_elem.style.height = `${WORLD_HEIGHT * world_to_pixel_scale}px`
}