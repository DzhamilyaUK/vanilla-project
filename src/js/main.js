import { selectComponent } from './components/select.js'
import { dropdown } from './components/dropdown.js';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.custom-select').forEach(select => {
    selectComponent(select)
  })
  document.querySelectorAll('.js-dropdown').forEach(element => {
    dropdown(element)
  })
})

