/**
 * post.js - Logic for the single blog post page
 */

document.addEventListener('DOMContentLoaded', () => {
    const postContainer = document.getElementById('post-content');

    // Get post ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id'));

    if (isNaN(postId)) {
        showError("No post ID specified.");
        return;
    }

    // Find post by ID
    const post = posts.find(p => p.id === postId);

    if (!post) {
        showError("Oops! That post doesn't exist.");
        return;
    }

    // Update Page Title and Meta Description
    document.title = post.metaTitle || `${post.title} | Flixy TV Blog`;

    // Update Canonical Link
    const canonicalLink = document.getElementById('canonical-link');
    if (canonicalLink) {
        canonicalLink.href = `https://www.flixyofficial.com/post.html?id=${post.id}`;
    }

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
    }
    metaDescription.content = post.metaDescription || post.excerpt;

    // Inject JSON-LD Schema
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.metaDescription || post.excerpt,
        "image": `https://www.flixyofficial.com/${post.image}`,
        "author": {
            "@type": "Organization",
            "name": post.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "Flixy TV Stick",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.flixyofficial.com/Images/Hero/logo.png"
            }
        },
        "datePublished": post.datePublished || "2026-02-10",
        "dateModified": post.dateModified || "2026-02-10",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.flixyofficial.com/post.html?id=${post.id}`
        }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    // Render Post
    postContainer.innerHTML = `
        <div class="post-header">
            <h1 class="post-title">${post.title}</h1>
            <div class="post-author-meta">
                <div class="author-info">
                    <h4>${post.author}</h4>
                    <span>Published on ${post.date}</span>
                </div>
            </div>
        </div>

        <img src="${post.image}" alt="${post.title}" class="featured-image-full">

        <div class="post-body">
            ${post.contentHtml}
        </div>
    `;

    // Initialize FAQ Toggle for dynamically injected content
    const blogFaqItems = postContainer.querySelectorAll('.faq-item');
    blogFaqItems.forEach(item => {
        const header = item.querySelector('.faq-question-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                blogFaqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    function showError(message) {
        postContainer.innerHTML = `
            <div class="error-container">
                <h1>Hhmm...</h1>
                <p>${message}</p>
                <br>
                <a href="blog.html" class="back-link">← Back to Blog</a>
            </div>
        `;
    }
});
