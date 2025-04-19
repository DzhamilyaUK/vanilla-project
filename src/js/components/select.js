import { formatNumber } from "@js/utils/countDictinary";

const selectComponent = (select) => {
  if (select.dataset.initialized === 'true') return;

  const header = select.querySelector('.select-header');
  const options = select.querySelector('.select-options');
  const arrow = select.querySelector('.select-arrow');
  const inputs = select.querySelectorAll('input');
  const current = select.querySelector('.select-current');
  const isMultiple = select.dataset.multiple;
  const isDisabled = select.dataset.disabled === 'true';

  header.addEventListener('click', (e) => {
    if (isDisabled) return;
    e.stopPropagation();
    const isOpen = options.classList.toggle('is-open');
    select.classList.toggle('is-open', isOpen);
    arrow.style.transform = isOpen
      ? 'translateY(-50%) rotate(180deg)'
      : 'translateY(-50%) rotate(0deg)';
  });

  inputs.forEach(input => {
    input.addEventListener('change', () => {
      if (!isMultiple) {
        select.classList.remove('is-open');
        options.classList.remove('is-open');
        arrow.style.transform = 'translateY(-50%) rotate(0deg)';
        current.textContent = input.nextElementSibling.querySelector('.select-text').textContent;
      }
      updateSelectedCount();
    });
  });

  document.addEventListener('click', (e) => {
    if (!select.contains(e.target)) {
      select.classList.remove('is-open');
      options.classList.remove('is-open');
      arrow.style.transform = 'translateY(-50%) rotate(0deg)';
    }
  });

  const updateSelectedCount = () => {
    if (!isMultiple) return;
    const selected = select.querySelectorAll('input:checked').length;
    current.textContent = selected
      ? `Выбрано ${selected} ${formatNumber(selected, 'variants')}`
      : 'Выберите варианты';
  };

  select.dataset.initialized = 'true';
}

export { selectComponent }