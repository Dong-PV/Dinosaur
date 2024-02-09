// ground.js
import { get_custom_property, increment_custom_property, set_custom_property } from "./update_custom_property.js";

const SPEED = .05
const ground_elems = document.querySelectorAll("[data-ground]")

export function setup_ground() {
  set_custom_property(ground_elems[0], "--left", 0)
  set_custom_property(ground_elems[1], "--left", 300)
}

export function update_ground(delta, speed_scale) {
  ground_elems.forEach(ground => {
    increment_custom_property(ground, "--left", delta * speed_scale * SPEED * -1)
    if (get_custom_property(ground, "--left") <= -300) {
      increment_custom_property(ground, "--left", 600)
    }
  });
}