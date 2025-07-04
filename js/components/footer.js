const template = document.createElement('template');
template.innerHTML = `
    <footer class="bg-clr:darkest clr:white">
        <section class="layout__content">
            ©Copyright 2016 / All Rights Reserved <br><br>

            IMPRESSUM: <br>
            Daniel Kasai <br>
            22335 Hamburg <br><br>

            Tel.: 040 46777333 <br><br>

            mail@danielkasai.net <br> <br>

            Steuer ID Nr: 41763284096 <br>
            Steuer Nr: 49/123/01384
        </section>
    </footer>
`;

class FooterComponent extends HTMLElement {
    connectedCallback() {
         this.innerHTML = template.innerHTML;
    }
}

export const registerFooterComponent = () => {
    customElements.define('x-footer', FooterComponent);
}