function createStartPage() {
    return `
    <img width=250 src="https://cdn2.iconfinder.com/data/icons/free-color-halloween-icons/24/Layer-28-256.png"</img>
    <section id="start-page">
    <h2>Cleaner Ismet</h2>
    <button class="btn btn-dark" id="login">Login</button>
</section>
    `
}

function showStartPage() {
    mainElement.innerHTML = createStartPage();
}