const template = document.createElement('template');
template.innerHTML = `
    <header>
        <box-l borderWidth="0" padding="var(--s-1)" class="bg-clr:turquoise-dark clr:white">
            <div class="layout__content">
                <a class="clr:white" href="mailto:mail@danielkasai.net">mail@danielkasai.net</a>
            </div>
        </box-l>
        <box-l borderWidth="0" id="header__main" padding="var(--s0)">
            <cluster-l justify="space-between" align="center">
                <a href="/">
                    <img id="header__logo" src="/img/header__logo.png" alt="">
                </a>

                <cluster-l role="list" justify="flex-start" space="var(--s0)">
                    <div role="listitem">
                        <a href="/">Home</a>
                    </div>
                    <div role="listitem">
                        <a href="/pages/vita.html">Vita</a>
                    </div>
                    <div role="listitem">
                        <a href="/pages/portfolio.html">Portfolio</a>
                    </div>
                    <div role="listitem">
                        <a href="/pages/impressum.html">Impressum</a>
                    </div>
                </cluster-l>
            </cluster-l>
        </box-l>
    </header>
`;

class HeaderComponent extends HTMLElement {
    connectedCallback() {
         this.innerHTML = template.innerHTML;
    }
}

export const registerHeaderComponent = () => {
    customElements.define('x-header', HeaderComponent);
}