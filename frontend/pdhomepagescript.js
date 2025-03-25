document.addEventListener("DOMContentLoaded", () => {
    fetchPosts();

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

async function fetchPosts() {
    const postsContainer = document.getElementById('posts-container');

    try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const postsData = await response.json();

        postsContainer.innerHTML = '';

        if (postsData && postsData.length > 0) {
            postsData.forEach(post => {
                const postSection = document.createElement('section');
                postSection.classList.add('posts');

                const sportHeader = document.createElement('h4');
                sportHeader.textContent = `${post.sport} at ${post.location}`;
                postSection.appendChild(sportHeader);

                const dateTimeHeader = document.createElement('h5');
                const date = new Date(post.date);
                const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                dateTimeHeader.textContent = `Date: ${formattedDate}, Time: ${post.time}`;
                postSection.appendChild(dateTimeHeader);

                const postDiv = document.createElement('div');
                postDiv.classList.add('post');
                postSection.appendChild(postDiv);

                const postHeaderDiv = document.createElement('div');
                postHeaderDiv.classList.add('post-header');
                postDiv.appendChild(postHeaderDiv);

                const authorSpan = document.createElement('span');
                authorSpan.classList.add('author');
                authorSpan.textContent = post.author ? post.author.username : 'Unknown Author';
                postHeaderDiv.appendChild(authorSpan);

                const datePostedSpan = document.createElement('span');
                datePostedSpan.classList.add('date');
                const createdAtDate = new Date(post.createdAt);
                const formattedCreatedAtDate = createdAtDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                datePostedSpan.textContent = `Posted ${formattedCreatedAtDate}`;
                postHeaderDiv.appendChild(datePostedSpan);

                const actionsDiv = document.createElement('div');
                actionsDiv.classList.add('actions');
                postDiv.appendChild(actionsDiv);

                actionsDiv.innerHTML = `
                    <button class="like-btn">👍 <span class="count">0</span></button>
                    <button class="dislike-btn">👎</button>
                    <button class="message-btn">💬 Message</button>
                    <button class="share-btn">🔗 Share</button>
                    <button class="report-btn">⚠️ Report</button>
                `;

                postsContainer.appendChild(postSection);
            });
        } else {
            postsContainer.innerHTML = '<p>No posts available yet.</p>';
        }

        document.querySelectorAll(".like-btn").forEach(button => {
            button.addEventListener("click", () => {
                let countSpan = button.querySelector(".count");
                countSpan.textContent = parseInt(countSpan.textContent) + 1;
            });
        });


    } catch (error) {
        console.error('Error fetching posts:', error);
        postsContainer.innerHTML = '<p>Failed to load posts.</p>';
    }
}