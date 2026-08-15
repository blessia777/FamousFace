// FamousFace My Progress

document.addEventListener("DOMContentLoaded", function () {

    const quizzesElement =
        document.getElementById("progress-quizzes");

    const bestElement =
        document.getElementById("progress-best");

    const dailyElement =
        document.getElementById("progress-daily");

    const averageElement =
        document.getElementById("progress-average");
    const streakElement =
    document.getElementById("progress-streak");

    if (
        !quizzesElement ||
        !bestElement ||
        !dailyElement ||
        !averageElement
    ) {
        return;
    }

    // Get complete quiz history
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

        quizHistory = [];
    }

    // Overall statistics
    const totalQuizzes =
        quizHistory.length;

    const bestScore =
        totalQuizzes > 0
            ? Math.max(
                ...quizHistory.map(
                    quiz => Number(quiz.percentage) || 0
                )
              )
            : 0;

    const totalPercentage =
        quizHistory.reduce(
            (total, quiz) =>
                total + (Number(quiz.percentage) || 0),
            0
        );

    const averageScore =
        totalQuizzes > 0
            ? Math.round(
                totalPercentage / totalQuizzes
              )
            : 0;

  const dailyHistory =
    quizHistory.filter(
        quiz => quiz.dailyChallenge === true
    );

const dailyChallenges =
    dailyHistory.length;


// Calculate Daily Challenge streak
function calculateStreak(history) {

    if (history.length === 0) {
        return 0;
    }

    const uniqueDates = [
        ...new Set(
            history
                .map(quiz => quiz.date)
                .filter(Boolean)
        )
    ].sort().reverse();

    if (uniqueDates.length === 0) {
        return 0;
    }

    const today =
        new Date().toISOString().split("T")[0];

    // Streak only counts if the player completed
    // a Daily Challenge today.
    if (uniqueDates[0] !== today) {
        return 0;
    }

    let streak = 0;

    for (let i = 0; i < uniqueDates.length; i++) {

        const expectedDate = new Date();

        expectedDate.setDate(
            expectedDate.getDate() - i
        );

        const expected =
            expectedDate
                .toISOString()
                .split("T")[0];

        if (uniqueDates[i] === expected) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
}

const dailyStreak =
    calculateStreak(dailyHistory); 

    // Display overall progress
    quizzesElement.textContent =
        totalQuizzes;

    bestElement.textContent =
        bestScore + "%";

    dailyElement.textContent =
        dailyChallenges;

    averageElement.textContent =
        averageScore + "%";
    if (streakElement) {

    streakElement.textContent =
        `${dailyStreak} ${
            dailyStreak === 1
                ? "day"
                : "days"
        }`;

}


    // Category progress
    const categories = [
        "music",
        "movies",
        "sports",
        "art",
        "history"
    ];

    categories.forEach(function (category) {

        const categoryScores =
            quizHistory.filter(
                quiz => quiz.category === category
            );

        const plays =
            categoryScores.length;

        const categoryBest =
            plays > 0
                ? Math.max(
                    ...categoryScores.map(
                        quiz =>
                            Number(quiz.percentage) || 0
                    )
                  )
                : 0;

        const element =
            document.getElementById(
                category + "-progress"
            );

      if (!element) return;

element.textContent =
    `${plays} ${plays === 1 ? "play" : "plays"} • Best: ${categoryBest}%`;

const progressBar =
    document.getElementById(
        category + "-progress-bar"
    );

if (progressBar) {
    progressBar.style.width =
        categoryBest + "%";
}
    });

});
