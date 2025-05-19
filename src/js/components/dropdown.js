const dropdown = (element) => {
    let isOpen = false;
    const trigger = element.querySelector('.dropdown__button');
    const viewbox = element.querySelector('.dropdown__viewbox');

    trigger.addEventListener('click', () => {
        isOpen =!isOpen;
        element.classList.toggle('open', isOpen);
    });

    document.addEventListener('click', (event) => {
        if (!element.contains(event.target) && isOpen) {
            isOpen = false;
            element.classList.remove('open');
        }
    })

    viewbox.addEventListener('click', (event) => {
        if (event.target.closest('a, button')) {
            isOpen = false;
            element.classList.remove('open');
        }
    });
}

export { dropdown }