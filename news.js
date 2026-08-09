async function loadNews(category = "entertainment") {

    const container = document.getElementById("news-container");

    if (!container) return;

    container.innerHTML = "<p>Loading latest news...</p>";

    try {

        const response = await fetch(
            `/.netlify/functions/news?category=${category}`
        );

        if (!response.ok) {
            throw new Error("Could not load news");
        }

        const data = await response.json();

        if (!data.articles || data.articles.length === 0) {
            container.innerHTML =
                "<p>No news articles found.</p>";
            return;
        }

        container.innerHTML = "";

        data.articles.forEach(article => {

            const card = document.createElement("article");

            card.className = "news-card";

            card.innerHTML = `
                ${article.image ? `
                    <img
                        src="${article.image}"
                        alt=""
                        class="news-image"
                    >
                ` : ""}

                <h3>${article.title}</h3>

                <p>
                    ${article.description || "Read the latest story."}
                </p>

                <small>
                    ${article.source?.name || "News"}
                </small>

                <br>

                <a
                    href="${article.url}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Read More →
                </a>
            `;

            container.appendChild(card);
        });

    } catch (error) {

        console.error("News loading error:", error);

        container.innerHTML =
            "<p>Unable to load news right now. Please try again later.</p>";
    }
}


document.addEventListener(
    "DOMContentLoaded",
    function () {
        loadNews("entertainment");
    }
);
