import { selectComponent } from './components/select.js'

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.custom-select').forEach(select => {
    selectComponent(select)
  })
})

