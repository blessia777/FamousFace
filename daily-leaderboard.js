async function loadDailyLeaderboard() {

    const leaderboard =
        document.getElementById("daily-leaderboard-list");

    if (!leaderboard) return;

    leaderboard.innerHTML =
        "<p>Loading daily leaderboard...</p>";

    try {

        const today =
            new Date().toISOString().split("T")[0];

        const url =
            `${SUPABASE_URL}/rest/v1/scores` +
            `?select=player_name,category,score,total_questions,percentage` +
            `&daily_challenge=eq.true` +
            `&created_at=gte.${today}T00:00:00` +
            `&created_at=lt.${today}T23:59:59` +
            `&order=percentage.desc` +
            `&limit=10`;

        const response = await fetch(
            url,
            {
                method: "GET",

                headers: {
                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${SUPABASE_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const responseText =
            await response.text();

        console.log(
            "Daily leaderboard response:",
            responseText
        );

        if (!response.ok) {

            throw new Error(
                `Supabase error ${response.status}: ${responseText}`
            );

        }

        const scores =
            JSON.parse(responseText);

        if (
            !Array.isArray(scores) ||
            scores.length === 0
        ) {

            leaderboard.innerHTML =
                "<p>No Daily Challenge scores yet. Be the first!</p>";

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
            "Daily leaderboard error:",
            error
        );

        leaderboard.innerHTML = `
            <p>
                Unable to load Daily Challenge leaderboard.
            </p>
        `;

    }
}


document.addEventListener(
    "DOMContentLoaded",
    loadDailyLeaderboard
);
