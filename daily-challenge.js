// FamousFace Daily Challenge

document.addEventListener("DOMContentLoaded", function () {

    const dailyTitle =
        document.getElementById("daily-title");

    const dailyDescription =
        document.getElementById("daily-description");

    const dailyButton =
        document.getElementById("daily-button");

    if (!dailyTitle || !dailyDescription || !dailyButton) {
        return;
    }

    const challenges = [
    {
        category: "rap",
        name: "Rap Battle",
        description:
            "🔥 Test your knowledge of rappers, albums, songs, hip-hop history and rap culture."
    }

    ];

    // Get today's date
    const today = new Date();

    // Create a consistent number for the current day
    const dayNumber =
        Math.floor(
            Date.UTC(
                today.getFullYear(),
                today.getMonth(),
                today.getDate()
            ) / 86400000
        );

    // Select today's challenge
    const challenge =
        challenges[dayNumber % challenges.length];

    // Format today's date
    const formattedDate =
        today.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });

    // Update the Daily Challenge title
    dailyTitle.textContent =
        "🔥 Today's " + challenge.name;

    // Update description
    dailyDescription.innerHTML =
        `${challenge.description}<br><br>
        📅 <strong>${formattedDate}</strong><br>
        🔄 A new challenge arrives tomorrow!`;

    // Update quiz button
    dailyButton.href =
        "quiz.html?category=" +
        challenge.category +
        "&daily=1";

});
