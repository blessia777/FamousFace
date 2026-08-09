async function loadLeaderboard() {
    const leaderboard = document.getElementById("leaderboard-list");

    if (!leaderboard) return;

    leaderboard.innerHTML = "<p>Loading leaderboard...</p>";

    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/scores?select=player_name,category,score,total_questions,percentage,created_at&order=percentage.desc,created_at.asc&limit=10`,
            {
                headers: {
                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${SUPABASE_KEY}`
                }
            }
        );

        if (!response.ok) {
            throw new Error("Could not load leaderboard");
        }

        const scores = await response.json();

        if (scores.length === 0) {
            leaderboard.innerHTML =
                "<p>No scores yet. Be the first to play!</p>";
            return;
        }

        leaderboard.innerHTML = "";

        scores.forEach((player, index) => {

            const row = document.createElement("div");
            row.className = "leaderboard-row";

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
                <span>${player.player_name}</span>
                <strong>${player.percentage}%</strong>
            `;

            leaderboard.appendChild(row);
        });

    } catch (error) {

        console.error("Leaderboard error:", error);

        leaderboard.innerHTML =
            "<p>Unable to load leaderboard.</p>";
    }
}

document.addEventListener("DOMContentLoaded", loadLeaderboard);
