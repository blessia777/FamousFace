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

    // No quizzes completed yet
    if (quizHistory.length === 0) {

        quizzesElement.textContent = "0";
        bestElement.textContent = "0%";
        dailyElement.textContent = "0";
        averageElement.textContent = "0%";

        return;
    }

    // Total quizzes
    const totalQuizzes =
        quizHistory.length;

    // Best score
    const bestScore =
        Math.max(
            ...quizHistory.map(
                quiz => Number(quiz.percentage) || 0
            )
        );

    // Average score
    const totalPercentage =
        quizHistory.reduce(
            (total, quiz) =>
                total + (Number(quiz.percentage) || 0),
            0
        );

    const averageScore =
        Math.round(
            totalPercentage / totalQuizzes
        );

    // Daily Challenges completed
    const dailyChallenges =
        quizHistory.filter(
            quiz => quiz.dailyChallenge === true
        ).length;

    // Display results
    quizzesElement.textContent =
        totalQuizzes;

    bestElement.textContent =
        bestScore + "%";

    dailyElement.textContent =
        dailyChallenges;

    averageElement.textContent =
        averageScore + "%";

});
