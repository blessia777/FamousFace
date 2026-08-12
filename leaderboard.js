async function loadLeaderboard() {

    const leaderboard =
        document.getElementById("leaderboard-list");

    if (!leaderboard) return;

    leaderboard.innerHTML =
        "<p>Loading leaderboard...</p>";

    try {

        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/scores?select=player_name,category,score,total_questions,percentage&order=percentage.desc&limit=10`,
            {
                method: "GET",

                headers: {
                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${SUPABASE_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const responseText = await response.text();

        console.log("Leaderboard response:", responseText);

        if (!response.ok) {
            throw new Error(
                `Supabase error ${response.status}: ${responseText}`
            );
        }

        const scores = JSON.parse(responseText);

        if (!Array.isArray(scores) || scores.length === 0) {

            leaderboard.innerHTML =
                "<p>No scores yet. Be the first to play!</p>";

            return;
        }

        leaderboard.innerHTML = "";

        scores.forEach((player, index) => {

            const row =
                document.createElement("div");

            row.className =
                "leaderboard-row";

            let rank;

            if (index === 0) {
                rank = "🥇";
            } else if (index === 1) {
                rank = "🥈";
            } else if (index === 2) {
                rank = "🥉";
            } else {
                rank = index + 1;
            }

            row.innerHTML = `
                <span>${rank}</span>
                <span>${player.player_name || "Anonymous"}</span>
                <strong>${player.percentage ?? 0}%</strong>
            `;

            leaderboard.appendChild(row);

        });

    } catch (error) {

        console.error(
            "Leaderboard error:",
            error
        );

        leaderboard.innerHTML = `
            <p>
                Unable to load leaderboard.
            </p>
        `;
    }
}

document.addEventListener(
    "DOMContentLoaded",
    loadLeaderboard
);
