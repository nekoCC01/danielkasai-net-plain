const template = document.createElement('template');
template.innerHTML = `
    <p>A test paragraph from the component...</p>
`;

class HeaderComponent extends HTMLElement {
    connectedCallback() {
        this.textContent = 'hello world!';
    }
}

 export const registerHeaderComponent = () => {
    customElements.define('x-header', HeaderComponent);
}