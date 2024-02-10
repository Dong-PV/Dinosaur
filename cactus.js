// cactus.js
import {
  get_custom_property,
  increment_custom_property,
  set_custom_property
} from "./update_custom_property.js"

const SPEED = .05
const CACTUS_INTERVAL_MIN = 500
const CACTUS_INTERVAL_MAX = 2000
const world_elem = document.querySelector('[data-world]')

let next_cactus_time
export function setup_cactus() {
  next_cactus_time = CACTUS_INTERVAL_MIN
  document.querySelectorAll('[data-cactus]').forEach(cactus => {
    cactus.remove()
  });
}

export function update_cactus(delta, speed_scale) {
  document.querySelectorAll('[data-cactus]').forEach(cactus => {
    increment_custom_property(cactus, '--left', delta * speed_scale * SPEED * -1)
    if (get_custom_property(cactus, '--left') <= -100) {
      cactus.remove()
    }
  })
  if (next_cactus_time <= 0) {
    create_cactus()
    next_cactus_time = random_number_between(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speed_scale
  }
  next_cactus_time -= delta
}

export function get_dino_rect() {
  const rect = dino_elem.getBoundingClientRect()
  const ratio = .9
  return {
    left: rect.left + (rect.right - rect.left) * (1 - ratio) / 2,
    top: rect.top + (rect.bottom - rect.top) * (1 - ratio) / 2,
    right: rect.right - (rect.right - rect.left) * (1 - ratio) / 2,
    bottom: rect.bottom - (rect.bottom - rect.top) * (1 - ratio) / 2
  }
}

// export function get_cactus_rects() {
//   return [...document.querySelectorAll('[data-cactus]')].map(cactus_elem => {
//     return cactus_elem.getBoundingClientRect()
//   })
// }

export function get_cactus_rects() {
  return [...document.querySelectorAll('[data-cactus]')].map(cactus_elem => {
    const rect = cactus_elem.getBoundingClientRect()
    const ratio = .8
    return {
      left: rect.left + (rect.right - rect.left) * (1 - ratio) / 2,
      top: rect.top + (rect.bottom - rect.top) * (1 - ratio) / 2,
      right: rect.right - (rect.right - rect.left) * (1 - ratio) / 2,
      bottom: rect.bottom - (rect.bottom - rect.top) * (1 - ratio) / 2
    }
  })
}

function create_cactus() {
  const cactus = document.createElement('img')
  cactus.dataset.cactus = true
  cactus.src = 'img/cactus.png'
  cactus.classList.add('cactus')
  set_custom_property(cactus, '--left', 100)
  world_elem.append(cactus)
}

function random_number_between(min, max) {
  return Math.floor(Math.random() * (max - min + 1))
}