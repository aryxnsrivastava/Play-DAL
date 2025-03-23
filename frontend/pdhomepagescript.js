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
    
}

function toggleJoin(button) {
    const post = button.closest('.post');
    const joinCountElement = post.querySelector('#joinCount');
    const joinButton = post.querySelector('.join-btn');
    const unjoinButton = post.querySelector('.unjoin-btn');
    
    let joined = parseInt(post.getAttribute('data-joined'));
    const total = parseInt(post.getAttribute('data-total'));

    if (button === joinButton) {
        joined += 1;
        post.setAttribute('data-joined', joined);
        joinButton.style.display = 'none';
        unjoinButton.style.display = 'inline-block';
    } else {
        joined -= 1;
        post.setAttribute('data-joined', joined);
        joinButton.style.display = 'inline-block';
        unjoinButton.style.display = 'none';
    }

    joinCountElement.textContent = `${joined}/${total}`;
}
