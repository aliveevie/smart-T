const cursor = document.getElementById('cursor');
const container = document.getElementById('container');

container.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Update the cursor position
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';

    // Calculate the rotation based on the mouse position
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;
    const angle = Math.atan2(y - centerY, x - centerX);
    const rotation = angle * (180 / Math.PI);

    // Apply rotation to the cursor
    cursor.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`
});
