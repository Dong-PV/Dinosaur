// update_custom_property.js
export function get_custom_property(elem, prop) {
  return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0
}

export function set_custom_property(elem, prop, value) {
  elem.style.setProperty(prop, value)
}

export function increment_custom_property(elem, prop, inc) {
  set_custom_property(elem, prop, get_custom_property(elem, prop) + inc)
}