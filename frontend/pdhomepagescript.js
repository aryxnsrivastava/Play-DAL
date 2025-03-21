document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".like-btn").forEach(button => {
        button.addEventListener("click", () => {
            let countSpan = button.querySelector(".count");
            countSpan.textContent = parseInt(countSpan.textContent) + 1;
        });
    });
});

function toggleDropdown() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function makePost() {
    alert('Redirecting to Make a Post page...');
    // Here you can add actual functionality for redirecting to a post creation page.
}
