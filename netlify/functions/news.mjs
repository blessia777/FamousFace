export default async function handler(request) {
    try {
        const url = new URL(request.url);

        const category =
            url.searchParams.get("category") || "entertainment";

        const allowedCategories = [
            "entertainment",
            "sports",
            "general"
        ];

        const selectedCategory =
            allowedCategories.includes(category)
                ? category
                : "entertainment";

        const apiKey = Netlify.env.get("GNEWS_API_KEY");

        if (!apiKey) {
            return new Response(
                JSON.stringify({
                    error: "GNEWS_API_KEY is not available in Netlify."
                }),
                {
                    status: 500,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        const apiUrl = new URL(
            "https://gnews.io/api/v4/top-headlines"
        );

        apiUrl.searchParams.set("category", selectedCategory);
        apiUrl.searchParams.set("lang", "en");
        apiUrl.searchParams.set("max", "5");
        apiUrl.searchParams.set("apikey", apiKey);

        const response = await fetch(apiUrl.toString());

        const data = await response.json();

        if (!response.ok) {
            console.error("GNews error:", data);

            return new Response(
                JSON.stringify({
                    error: "GNews API error",
                    details: data
                }),
                {
                    status: response.status,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        return new Response(
            JSON.stringify(data),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

    } catch (error) {

        console.error("News function error:", error);

        return new Response(
            JSON.stringify({
                error: "News function failed",
                details: error.message
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }
}
