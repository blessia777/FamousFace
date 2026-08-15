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
const dailyHistory =
    quizHistory.filter(
        quiz => quiz.dailyChallenge === true
    );

function calculateDailyStreak(history) {

    if (history.length === 0) return 0;

    const dates = [
        ...new Set(
            history
                .map(quiz => quiz.date)
                .filter(Boolean)
        )
    ].sort().reverse();

    if (dates.length === 0) return 0;

    const today =
        new Date().toISOString().split("T")[0];

    if (dates[0] !== today) return 0;

    let streak = 0;

    for (let i = 0; i < dates.length; i++) {

        const expectedDate = new Date();

        expectedDate.setDate(
            expectedDate.getDate() - i
        );

        const expected =
            expectedDate.toISOString().split("T")[0];

        if (dates[i] === expected) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
}

const dailyStreak =
    calculateDailyStreak(dailyHistory);
    // Category counts
    const categoryCount = function (category) {

        return quizHistory.filter(
            quiz => quiz.category === category
        ).length;

    };

    // Achievement definitions
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
            unlocked: categoryCount("music") >= 3
        },

        {
            icon: "🎬",
            name: "Movie Buff",
            description: "Complete 3 Movies quizzes.",
            unlocked: categoryCount("movies") >= 3
        },

        {
            icon: "⚽",
            name: "Sports Expert",
            description: "Complete 3 Sports quizzes.",
            unlocked: categoryCount("sports") >= 3
        },

        {
            icon: "🎨",
            name: "Art Lover",
            description: "Complete 3 Art quizzes.",
            unlocked: categoryCount("art") >= 3
        },

        {
            icon: "🌍",
            name: "History Buff",
            description: "Complete 3 History quizzes.",
            unlocked: categoryCount("history") >= 3
        },

        {
            icon: "🔥",
            name: "Daily Warrior",
            description: "Complete 7 Daily Challenges.",
            unlocked: dailyChallenges >= 7
        }
        {
    icon: "🔥",
    name: "3-Day Streak",
    description: "Complete Daily Challenges for 3 consecutive days.",
    unlocked: dailyStreak >= 3
},

{
    icon: "🔥",
    name: "7-Day Streak",
    description: "Complete Daily Challenges for 7 consecutive days.",
    unlocked: dailyStreak >= 7
}

    ];

    // Display achievement cards
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


    // --------------------------------
    // Achievement Notification
    // --------------------------------

    const notification =
        document.getElementById(
            "achievement-notification"
        );

    const notificationName =
        document.getElementById(
            "achievement-notification-name"
        );

    const closeButton =
        document.getElementById(
            "achievement-notification-close"
        );

    if (!notification || !notificationName) {
        return;
    }


    // Get previously unlocked achievements
    let unlockedAchievements = [];

    try {

        unlockedAchievements =
            JSON.parse(
                localStorage.getItem(
                    "famousFaceUnlockedAchievements"
                )
            ) || [];

    } catch (error) {

        unlockedAchievements = [];

    }


    // Find newly unlocked achievements
    const newlyUnlocked =
        achievements.filter(function (achievement) {

            return (
                achievement.unlocked &&
                !unlockedAchievements.includes(
                    achievement.name
                )
            );

        });


    // Save all currently unlocked achievements
    const allUnlocked =
        achievements
            .filter(
                achievement => achievement.unlocked
            )
            .map(
                achievement => achievement.name
            );

    localStorage.setItem(
        "famousFaceUnlockedAchievements",
        JSON.stringify(allUnlocked)
    );


    // Show newest achievement
    if (newlyUnlocked.length > 0) {

        const achievement =
            newlyUnlocked[0];

        notificationName.textContent =
            `${achievement.icon} ${achievement.name}`;

        notification.classList.add("show");

        // Automatically hide after 5 seconds
        setTimeout(function () {

            notification.classList.remove("show");

        }, 5000);

    }


    // Close button
    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function () {

                notification.classList.remove(
                    "show"
                );

            }
        );

    }

});
