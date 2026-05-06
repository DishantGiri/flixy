/**
 * blog.js - Logic for the blog listing page
 */

document.addEventListener('DOMContentLoaded', () => {
    const blogGrid = document.getElementById('blog-grid');

    if (!blogGrid) return;

    // posts array is available globally from js/posts.js
    function renderPosts() {
        blogGrid.innerHTML = posts.map(post => `
            <article class="blog-card" onclick="window.location.href='post.html?id=${post.id}'">
                <img src="${post.image}" alt="${post.title}" class="card-image">
                <div class="card-content">
                    <div class="card-meta">
                        <span>${post.author}</span>
                        <span>•</span>
                        <span>${post.date}</span>
                    </div>
                    <h2 class="card-title">${post.title}</h2>
                    <p class="card-excerpt">${post.excerpt}</p>
                    <div class="card-footer">
                        Read Story <span>→</span>
                    </div>
                </div>
            </article>
        `).join('');

        // Inject Blog Schema
        const schemaData = {
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Flixy TV Stick",
            "description": "Explore the latest in streaming tech, entertainment tips, and smart TV insights on the Flixy TV Stick blog.",
            "url": "https://www.flixyofficial.com/blog.html",
            "blogPost": posts.map(post => ({
                "@type": "BlogPosting",
                "headline": post.title,
                "url": `https://www.flixyofficial.com/post.html?id=${post.id}`,
                "datePublished": post.datePublished || "2026-02-10",
                "author": {
                    "@type": "Person",
                    "name": post.author
                }
            }))
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schemaData);
        document.head.appendChild(script);
    }

    renderPosts();
});
