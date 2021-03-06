document.addEventListener("click", (event) => {
    //event.preventDefault();
    if (event.target.className === "customer-list-name") {
        currentCustomer = event.target.id
        showVictimPage();
    }
})
/**
 * Kurban listesini UI'da gösteren fonksiyon
 */
function showVictimPage() {
    mainElement.innerHTML = createVictimPage()
}
/**
 * Kurban listesini ve input alaninin olusturan fonksiyon
 */
function createVictimPage() {
    return `
    <img width=150 src="https://cdn2.iconfinder.com/data/icons/free-color-halloween-icons/24/Layer-28-256.png"</img>
    <section id="death-page">
            <div id="death-list">
                <ul>
                    <li class="list-header">Victim List
                    <ul>
                    ${showVictimList()} 
                  
                    </ul>
                    </li>
                </ul>
            </div>
            <div class="input-form" id="victim-form">
                <form id="victim-form-name" class="needs-validation" novalidate>
                    <div class="input-group mb-3">
                        <input id="input-victim" type="text" class="form-control border border-dark"
                            placeholder="victim Name">
                        <div class="input-group-append">
                            <button id="add-victim" class="btn btn-dark" type="button">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
   `
}
/**
 * Locale eklenen yeni müsteriyi UI'da gösterilmek üzere olusturur
 */
function showVictimList() {
    return getVictim().victim.map(victims => {
        return `    
    <li class="victim-info" id="${victims.victimName}">${victims.victimName}
   ${checkStatus(victims)} 
        </li>     
`
    }).join("")
}

/**
 * kurbanin temizlenip temizlenmedigini kontrol eden fonksiyon
 * @param {*} pVictim 
 */
function checkStatus(pVictim) {
    if (pVictim.status) {
        return `
        <img id="checked-img" width=120 src="https://cdn0.iconfinder.com/data/icons/kameleon-free-pack/110/Man-1-256.png"></img>
<input type="checkbox" class="form-check-input" checked id="${pVictim.victimName}-check"/>
`
    } else {
        return `
        <img id="unchecked-img" width=120 src="https://cdn0.iconfinder.com/data/icons/kameleon-free-pack/110/Man-1-256.png"></img>
        <input type="checkbox" class="form-check-input"  id="${pVictim.victimName}-check"/>`
    }
}
/**
 * Localdeki bilgiyi alip bir arraya atan fonksiyon
 */
function getVictim() {
    let victimList = [];
    victimList = JSON.parse(localStorage.getItem(currentCustomer));
    return victimList[0];
}
/**yeni kurban ekleme eventi */
document.addEventListener("click", (event) => {
    //event.preventDefault();
    if (event.target.id === "add-victim") {
        setVictimList();
        showVictimPage();
    }
})
/**
 * local storage'da ki müsterilere kurban ekleyerek güncelleyen fonksiyon
 */
function setVictimList() {
    let victimNameArea = document.querySelector("#input-victim");
    let victimList = [];
    victimList = JSON.parse(localStorage.getItem(currentCustomer));
    console.log(victimList[0])
    victimList[0].victim.push({
        victimName: victimNameArea.value,
        status: false,
        address: []
    })
    localStorage.setItem(currentCustomer, JSON.stringify(victimList));
    return victimList
}

/**adres sayfasini acma eventi */
document.addEventListener("click", (event) => {
    // event.preventDefault();
    if (event.target.className === "victim-info") {
        currentVictim = event.target.id
        mainElement.innerHTML = showAdressPage();
        audioAfrican.pause();
    }
})
/**
 * adres sayfasini olusturan fonksiyon
 */
function showAdressPage() {
    return `
    <section id="address-section">
            <div id="address-list">
                <ul>
                    <li class="list-header">Victim ${currentVictim}'s Address
                    <ul id="address-info">
                    ${showAdress()} 
                    </ul>
                    </li>
                </ul>
            </div>
            <div id="address-form">
                <form id="address-form-name" class="needs-validation" novalidate>
                    <div class="input-group mb-3">
                        <input id="input-address" type="text" class="form-control border border-dark"
                            placeholder="Enter Address">
                        <div class="input-group-append">
                            <button id="add-address" class="btn btn-dark" type="button">Save Adress</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
   `
}
/**
 * yeni adresi UI'da yazdirmak üzere olusturan fonksiyon
 */
function showAdress() {
    return getVictimAdress().map((address, index) => {
        return `    
    <li class="victim-address" id="${address}">${index+1}.${address}
        </li>
`
    }).join("")
}
/**
 * local storage'da ki adresleri alip bir array'e atan fonksiyon
 */
function getVictimAdress() {
    let victimList = []
    victimList = JSON.parse(localStorage.getItem(currentCustomer));
    let clickVictim = victimList[0].victim.filter(victim => {
        if (victim.victimName == currentVictim) {
            return victim
        }
    })
    return clickVictim[0].address;
}
/**yeni adres ekleme eventi */
document.addEventListener("click", (event) => {
    //event.preventDefault();
    if (event.target.id === "add-address") {
        setVictimAddress();
        mainElement.innerHTML = showAdressPage();
    }
})
/**
 * adres listesini local storge'dan alan ve yeni adres bilgisi ile güncelleyen fonksiyon
 */
function setVictimAddress() {
    let addressArea = document.querySelector("#input-address");
    let addressList = [];
    addressList = JSON.parse(localStorage.getItem(currentCustomer));
    addressList[0].victim.map(vict => {
        if (vict.victimName == currentVictim) {
            vict.address.push(addressArea.value)
            localStorage.setItem(currentCustomer, JSON.stringify(addressList));
        }
    })
    return addressList
}
/**
 * kurbanin temizlik bilgisini localde güncelleyen fonksiyon
 * @param {*} pEvent 
 * @param {*} pStatus 
 */
function setStatus(pEvent, pStatus) {
    let customer = [];
    customer = JSON.parse(localStorage.getItem(currentCustomer));
    customer[0].victim.map(vict => {
        if (vict.victimName + "-check" == pEvent.target.id) {
            vict.status = pStatus
        }
    })
    localStorage.setItem(currentCustomer, JSON.stringify(customer));
}

/**temizlik eventi */
document.addEventListener('change', (event) => {
    if (event.target.className == "form-check-input") {
        getVictim().victim.map(victims => {
            if (event.target.id == victims.victimName + "-check") {
                if (event.target.checked) {
                    setStatus(event, true);
                    showVictimPage();
                    audio.pause();
                    audioAfrican.play();
                } else {
                    setStatus(event, false)
                    showVictimPage();
                    audioAfrican.pause();
                    audio.play();
                }
            }
        })
    }
})