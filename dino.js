// dino.js
import {
  get_custom_property,
  increment_custom_property,
  set_custom_property
} from "./update_custom_property.js"

const dino_elem = document.querySelector("[data-dino]")
const JUMP_SPEED = .45
const GRAVITY = .0015
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

let is_jumping
let dino_frame
let current_frame_time
let y_velocity
export function setup_dino() {
  is_jumping = false
  dino_frame = 0
  current_frame_time = 0
  y_velocity = 0
  set_custom_property(dino_elem, "--bottom", 0)
  document.removeEventListener("keydown", on_jump)
  document.addEventListener("keydown", on_jump)
}

export function update_dino(delta, speed_scale) {
  handle_run(delta, speed_scale)
  handle_jump(delta)
}

function handle_run(delta, speed_scale) {
  if (is_jumping) {
    dino_elem.src = `img/dino-stationary.png`
    return
  }
  if (current_frame_time >= FRAME_TIME) {
    dino_frame = (dino_frame + 1) % DINO_FRAME_COUNT
    dino_elem.src = `img/dino-run-${dino_frame}.png`
    current_frame_time -= FRAME_TIME
  }
  current_frame_time += delta * speed_scale
}

function handle_jump(delta) {
  if (!is_jumping)
    return
  increment_custom_property(dino_elem, "--bottom", y_velocity * delta)
  if (get_custom_property(dino_elem, "--bottom") <= 0) {
    set_custom_property(dino_elem, "--bottom", 0)
    is_jumping = false
  }
  y_velocity -= GRAVITY * delta
}

function on_jump(e) {
  if (e.code !== "Space" || is_jumping)
    return
  y_velocity = JUMP_SPEED
  is_jumping = true
}