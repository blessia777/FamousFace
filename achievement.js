// FamousFace Achievements

document.addEventListener("DOMContentLoaded", function () {

    const achievementsList =
        document.getElementById("achievements-list");

    if (!achievementsList) return;

    // Get quiz history
    let quizHistory = [];

    try {
        quizHistory =
            JSON.parse(
                localStorage.getItem("famousFaceQuizHistory")
            ) || [];
    } catch (error) {
        console.error(
            "Could not read quiz history:",
            error
        );
    }

    // Basic statistics
    const totalQuizzes =
        quizHistory.length;

    const perfectScores =
        quizHistory.filter(
            quiz => Number(quiz.percentage) === 100
        ).length;

    const dailyChallenges =
        quizHistory.filter(
            quiz => quiz.dailyChallenge === true
        ).length;

    const categories = [
        "music",
        "movies",
        "sports",
        "art",
        "history"
    ];

    const achievements = [
        {
            icon: "🌟",
            name: "First Quiz",
            description: "Complete your first quiz.",
            unlocked: totalQuizzes >= 1
        },

        {
            icon: "🔥",
            name: "Quiz Master",
            description: "Complete 5 quizzes.",
            unlocked: totalQuizzes >= 5
        },

        {
            icon: "🏆",
            name: "Perfect Score",
            description: "Score 100% on a quiz.",
            unlocked: perfectScores >= 1
        },

        {
            icon: "🎵",
            name: "Music Fan",
            description: "Complete 3 Music quizzes.",
            unlocked:
                quizHistory.filter(
                    quiz => quiz.category === "music"
                ).length >= 3
        },

        {
            icon: "🎬",
            name: "Movie Buff",
            description: "Complete 3 Movies quizzes.",
            unlocked:
                quizHistory.filter(
                    quiz => quiz.category === "movies"
                ).length >= 3
        },

        {
            icon: "⚽",
            name: "Sports Expert",
            description: "Complete 3 Sports quizzes.",
            unlocked:
                quizHistory.filter(
                    quiz => quiz.category === "sports"
                ).length >= 3
        },

        {
            icon: "🎨",
            name: "Art Lover",
            description: "Complete 3 Art quizzes.",
            unlocked:
                quizHistory.filter(
                    quiz => quiz.category === "art"
                ).length >= 3
        },

        {
            icon: "🌍",
            name: "History Buff",
            description: "Complete 3 History quizzes.",
            unlocked:
                quizHistory.filter(
                    quiz => quiz.category === "history"
                ).length >= 3
        },

        {
            icon: "🔥",
            name: "Daily Warrior",
            description: "Complete 7 Daily Challenges.",
            unlocked: dailyChallenges >= 7
        }
    ];

    achievementsList.innerHTML = "";

    achievements.forEach(function (achievement) {

        const card =
            document.createElement("div");

        card.className =
            achievement.unlocked
                ? "achievement-card unlocked"
                : "achievement-card locked";

        card.innerHTML = `
            <div class="achievement-icon">
                ${achievement.icon}
            </div>

            <h3>
                ${achievement.name}
            </h3>

            <p>
                ${achievement.description}
            </p>

            <strong>
                ${
                    achievement.unlocked
                        ? "✅ Unlocked"
                        : "🔒 Locked"
                }
            </strong>
        `;

        achievementsList.appendChild(card);

    });

});
