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

        const apiUrl =
            `https://gnews.io/api/v4/top-headlines` +
            `?category=${selectedCategory}` +
            `&lang=en` +
            `&max=6` +
            `&apikey=${process.env.GNEWS_API_KEY}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            return new Response(
                JSON.stringify({
                    error: "News service returned an error."
                }),
                {
                    status: response.status,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        const data = await response.json();

        return new Response(
            JSON.stringify(data),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "public, max-age=300"
                }
            }
        );

    } catch (error) {

        console.error("News function error:", error);

        return new Response(
            JSON.stringify({
                error: "Unable to retrieve news."
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
