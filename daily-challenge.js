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
            category: "music",
            name: "Music Challenge",
            description:
                "Test your knowledge of famous singers, musicians and bands."
        },
        {
            category: "movies",
            name: "Movies Challenge",
            description:
                "Challenge yourself with famous movies, actors and film trivia."
        },
        {
            category: "sports",
            name: "Sports Challenge",
            description:
                "Test your knowledge of famous athletes and sporting events."
        },
        {
            category: "art",
            name: "Art Challenge",
            description:
                "Explore famous artists, paintings and masterpieces."
        },
        {
            category: "history",
            name: "History Challenge",
            description:
                "Test your knowledge of famous historical people and events."
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
