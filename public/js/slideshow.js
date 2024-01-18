let currentElementIndex = 0;
const elements = document.querySelectorAll('.deck-image');

function scrollToNextElement() {
    if (currentElementIndex >= elements.length) {
        clearInterval(scrollInterval); // Stop scrolling
        return;
    }

    if (elements[currentElementIndex]) {
        elements[currentElementIndex].scrollIntoView({ behavior: 'smooth' });
    }
    currentElementIndex++;
}

const scrollInterval = setInterval(scrollToNextElement, 15000); // 15 seconds interval
