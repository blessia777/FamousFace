document.addEventListener("DOMContentLoaded", function () {

    let playerName =
        localStorage.getItem("famousFacePlayerName");

    if (!playerName) {

        playerName =
            prompt("👋 Welcome to FamousFace! What should we call you?");

        if (playerName && playerName.trim()) {

            playerName = playerName.trim();

            localStorage.setItem(
                "famousFacePlayerName",
                playerName
            );
        }
    }

});
