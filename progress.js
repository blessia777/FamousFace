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

    // Get the latest saved score
    const latestScore =
        localStorage.getItem("famousFaceLatestScore");

    // Get the latest Daily Challenge score
    const dailyScore =
        localStorage.getItem("famousFaceDailyScore");

    let totalQuizzes = 0;
    let bestScore = 0;
    let totalPercentage = 0;
    let scoreCount = 0;
    let dailyChallenges = 0;

    // Read latest score
    if (latestScore) {

        try {

            const score =
                JSON.parse(latestScore);

            totalQuizzes = 1;

            bestScore =
                Number(score.percentage) || 0;

            totalPercentage =
                Number(score.percentage) || 0;

            scoreCount = 1;

        } catch (error) {

            console.error(
                "Progress error:",
                error
            );

        }
    }

    // Read Daily Challenge score
    if (dailyScore) {

        try {

            const daily =
                JSON.parse(dailyScore);

            dailyChallenges = 1;

            const dailyPercentage =
                Number(daily.percentage) || 0;

            if (dailyPercentage > bestScore) {
                bestScore = dailyPercentage;
            }

            if (scoreCount > 0) {

                totalPercentage +=
                    dailyPercentage;

                scoreCount++;

            } else {

                totalPercentage =
                    dailyPercentage;

                scoreCount = 1;

            }

        } catch (error) {

            console.error(
                "Daily progress error:",
                error
            );

        }
    }

    // Calculate average
    const averageScore =
        scoreCount > 0
            ? Math.round(
                totalPercentage / scoreCount
              )
            : 0;

    // Display progress
    quizzesElement.textContent =
        totalQuizzes;

    bestElement.textContent =
        bestScore + "%";

    dailyElement.textContent =
        dailyChallenges;

    averageElement.textContent =
        averageScore + "%";

});
