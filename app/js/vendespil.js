
// 2 Globale lister der indeholder de forskellige ting, der passer sammen. Altså hvert index i listerne passer sammen. Så text_items[0] passer med image_items[0].
let text_items = ["Koala", "Anakonda", "Jaguar", "Dovendyr", "Papegøje", "Tapir"]
let image_items = ["/app/img/koala.jpg", "/app/img/anakonda.jpg", "/app/img/jaguar.jpg", "/app/img/dovendyr.jpg", "/app/img/papegoeje.jpg", "/app/img/tapir.jpg"]

// Returns a path to the matching image, if the item is found in text_items. Otherwise returns null.
const find_matching_image = (item) => {
    let index = text_items.indexOf(item);
    return (index != -1) ? image_items[index] : null;
}

// Tjekker om elementerne passer med hinanden.
const is_matching_image = (item, img) => {
    let index = text_items.indexOf(item);
    return image_items[index] == img;
}

// Laver et nyt text item og retunerer dette.
const create_text_item = (item, index) => {
    const item_text = document.createElement("p") // Først laver den et nyt <p>  element.
    item_text.innerHTML = item; // Derefter sætter den teksten til at item.
    item_text.classList.add("item_text"); // Så giver den den en klasse for at ændre udseendet på elementet.
    
    const item_container = document.createElement("div"); // Vores item_text er child til item_container.
    item_container.classList.add("item_container")
    item_container.appendChild(item_text); // Sørg for at <p> er inde i <div>.
    
    item_container.addEventListener("click", () => handle_item_click(item_text, false)) // Kør en funktion når item_container bliver trykket på.
    item_container.id = "text" + index; // Vi giver den et unikt id, så vi kan ændre på den senere.
    return item_container; // Retunerer elementet.
}

const create_image_item = (image, index) => {
    // Sætter at billedet skal indlæses fra `image`. Ellers samme som ovenover.
    const item_image = document.createElement("img")
    item_image.src = image;
    item_image.classList.add("item_image");

    const item_container = document.createElement("div");
    item_container.classList.add("item_container")
    item_container.appendChild(item_image);

    item_container.addEventListener("click", () => handle_item_click(item_image, true))
    item_container.id = "img" + index; // Bruger "img" + index her i stedet for "text".
    return item_container;
}

// 2 variabler, der bruges til at finde ud af om det er første eller andet tryk.
let previous_index = null; 
let previous_image = false;
const handle_item_click = (elem, is_image) => {
    if (is_image) {

        let index = 0;
        for(; index < image_items.length; index++)
        {
            if (elem.src.search(image_items[index]) != -1)break; // Finder elements index i image_items.
        };

        // Tjekker om de 2 elementer passer sammen.
        if (index == previous_index && previous_image != true) {
            window.alert("Korrekt!");
            previous_index = null;
            previous_image = false;
            handle_correct(index); // Opdaterer udseendet på klasserne
            return;
        } else if (previous_image != true && previous_index == null)
        {
            previous_index = index;
            previous_image = true;
            return;
        } else {
            previous_index = null;
            previous_image = false;
            window.alert("Forkert!")
        }


    } else {
        let index = text_items.indexOf(elem.innerHTML);
        console.log(index);
        if (index == previous_index && previous_image == true) {
            window.alert("Korrekt!");
            previous_index = null;
            previous_image = false;
            handle_correct(index);
            return;
        }

        if (previous_index == null) {
            previous_index = index;
            previous_image = false;
            return;
        }

        previous_index = null;
        previous_image = false;
        window.alert("Forkert!");
    }
}

// Gør sådan at boksene bliver grønne, når der er valgt 2, der passer sammen.
// Det er her vi benytter vores id'er.
const handle_correct = (index) => {
    document.getElementById("text" + index).classList.add("item_correct");
    let image_container = document.getElementById("img" + index);
    image_container.classList.add("item_correct"); 

    let image = image_container.getElementsByTagName("img")[0];
    image.src = "";
    let image_text = document.createElement("p");
    image_text.innerText = text_items[index];
    image_container.appendChild(image_text);
}

// Tilfældigt genere positionerne for elementerne.
const init_vendespil = (parent) => {
    let random_elements = [];
    text_items.map((item, index) => {
        // Det er altid et billede og et stykke tekst, der passer sammen.
        const text_element = create_text_item(item, index);
        const image_element = create_image_item(image_items[index], index);

        // Generer indekset i listen.
        random_elements.splice(Math.round(Math.random() * index), 0, text_element);
        random_elements.splice(Math.round(Math.random() * index), 0, image_element)
    });

    // Loop'er over vores elementer og gør dem barn af vores parent.
    random_elements.map((element) => {
        parent.appendChild(element);
    })
}

// Entrypoint. Vi tager et element med klassen container.
init_vendespil(document.getElementsByClassName("container")[0]);