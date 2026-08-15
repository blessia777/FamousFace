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

    const dailyChallenges =
        quizHistory.filter(
            quiz => quiz.dailyChallenge === true
        ).length;

    // Display overall progress
    quizzesElement.textContent =
        totalQuizzes;

    bestElement.textContent =
        bestScore + "%";

    dailyElement.textContent =
        dailyChallenges;

    averageElement.textContent =
        averageScore + "%";


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
