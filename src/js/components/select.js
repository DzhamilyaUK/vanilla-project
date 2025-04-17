document.querySelectorAll('.custom-select').forEach(select => {
    const header = select.querySelector('.select-header');
    const options = select.querySelector('.select-options');
    const inputs = select.querySelectorAll('input');
    const current = select.querySelector('.select-current');
    const isMultiple = select.dataset.multiple;
  
    // Переключение видимости списка
    header.addEventListener('click', (e) => {
      e.stopPropagation();
      options.classList.toggle('is-open');
    });
  
    // Обработка выбора опции
    inputs.forEach(input => {
      input.addEventListener('change', () => {
        if (!isMultiple) {
          options.classList.remove('is-open');
          current.textContent = input.nextElementSibling.querySelector('.select-text').textContent;
        }
        updateSelectedCount();
      });
    });
  
    // Закрытие при клике вне селекта
    document.addEventListener('click', (e) => {
      if (!select.contains(e.target)) {
        options.classList.remove('is-open');
      }
    });
  
    // Обновление счетчика выбранных
    function updateSelectedCount() {
      if (!isMultiple) return;
      
      const selected = select.querySelectorAll('input:checked').length;
      current.textContent = selected 
        ? `Выбрано ${selected}`
        : header.dataset.placeholder;
    }
  });