/**
 * Müsteri listesini ve input alanini olusturan fonksiyon
 */
 function createCustomerPage() {
    return `
    <img width=150 src="https://cdn2.iconfinder.com/data/icons/free-color-halloween-icons/24/Layer-28-256.png"</img>
    <section id="customer-page">
            <div id="customer-list">
                <ul>
                    <li class="list-header">Customers
                        <ul>
                        ${createCustomer()}
                        </ul>
                    </li>
                </ul>
            </div>
            <div id="customer-form">
                <form id="customer-form-name" class="needs-validation" novalidate>
                    <div class="input-group mb-3">
                        <input id="input-customer" type="text" class="form-control border border-dark"
                            placeholder="Customer Name">
                        <div class="input-group-append">
                            <button id="add-customer" class="btn btn-dark" type="button">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
   `
}
/**
 * Müsteri sayfasini UI'da gösteren fonksiyon
 */
function showCustomerPage() {
    mainElement.innerHTML = createCustomerPage()
}
/**
 * sisteme giris eventi
 */
function enterTheSystem() {
    mainElement.addEventListener("click", function (event) {
        if (event.target.id === "login") {
            showCustomerPage();
            audio.play();
        }
    })
}
/**
 * müsteri adini input alanindan alip local-storage'da müsteri listesi olusturur
 * yeni listeyi UI'a yazdirir
 */
function setCustomerList() {
    let customerNameArea = document.querySelector("#input-customer");
    let customerList = [];
    customerList.push({
        customerName: customerNameArea.value,
        victim: []
    })
    let key = customerList[0].customerName
    localStorage.setItem(key, JSON.stringify(customerList));
    showCustomerPage();
}
/**
 * yeni müsteriyi kaydetme eventi
 */
function addCustomerHandler() {
    mainElement.addEventListener("click", (event) => {
        //event.preventDefault();
        if (event.target.id === "add-customer") {
            setCustomerList()
        }
    })
}
/**
 * Local storage daki listeyi alir ve bir array'e atar
 */
function addCustomer() {
    let storageCustomerList = [];
    for (let index = 0; index < localStorage.length; index++) {
        let customer = JSON.parse(localStorage.getItem(localStorage.key(index)));
        storageCustomerList.push(customer);
    }
    return storageCustomerList;
}
/**
 * Locale eklenen müsteriyi UI'da gösterilmek üzere olusturur
 */
function createCustomer() {
    return addCustomer().map((customers, i) =>
        customers.map((customer, index) =>
            ` 
            <li id="${customer.customerName}" class="customer-list-name">${customer.customerName} <img width=80 src="https://cdn1.iconfinder.com/data/icons/emoticon-of-avatar-woman/128/09_woman_angry_avatar_emoticon_smiley_people_user-512.png"></img></li>
            
        `)).join("")
}